import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { baseUrl, GETBILL } from "../../Api/Api";
import TableShow from "../../components/dashbord/Table";
import axios from "axios";

export default function InvoicesDash() {
    const { t } = useTranslation();
    const [invoices, setInvoices] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pages, setPages] = useState(1); // Add state for pages
    const limit = 8; // Adjust limit as needed

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
        { key: "CustomerName", name: t("tableHeaders.customerName") },
        { key: "CustomerPhone", name: t("tableHeaders.customerPhone") },
        { key: "CustomerAdderes", name: t("tableHeaders.customerAddress") },
        { key: "BillData", name: t("tableHeaders.date") },
        { key: "totalprice", name: t("tableHeaders.totalPrice") },
    ];

    if (loading) {
        return <div>{t("loading")}</div>;
    }

    if (error) {
        return <div>{t("errorLoading", { message: error.message })}</div>;
    }

    return (
        <div className="container">
            <TableShow 
                header={header}
                data={invoices}
                isLoading={loading}
                pages={pages}
                limet={limit}
                setPages={setPages}
            />
        </div>
    );
}
