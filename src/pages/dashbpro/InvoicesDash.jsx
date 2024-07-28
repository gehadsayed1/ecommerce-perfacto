import { useEffect, useState } from "react";

import { baseUrl, GETBILL } from "../../Api/Api";
import TableShow from "../../components/dashbord/Table";
import axios from "axios";

export default function InvoicesDash() {
    const [invoices, setInvoices] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pages, setPages] = useState(1); // Add state for pages
    const limit = 10; // Adjust limit as needed

    useEffect(() => {
        axios.get(`${baseUrl}/${GETBILL}`)
          .then((response) => {
            setInvoices(response.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setError(err);
            setLoading(false);
          });
    }, []);

  

    const header = [
        { key: "CustomerName", name: "Customer Name" },
        { key: "CustomerPhone", name: "Customer Phone" },
        { key: "CustomerAdderes", name: "Customer Address" },
        { key: "BillData", name: "Date" },
        { key: "totalprice", name: "Total Price" },
        
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading invoices: {error.message}</div>;
    }

    return (
        <div className=" container">
            <TableShow 
                header={header}
                data={invoices}
                isLoading={loading}
                pages={pages}
                limet={limit}
                setPages={setPages}
                delete={(id) => {
                 
                }}
            />
        </div>
    );
}
