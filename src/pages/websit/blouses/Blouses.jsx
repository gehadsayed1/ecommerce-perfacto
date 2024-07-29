import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { GETGROUB } from "../../../Api/Api";
import { useParams } from 'react-router-dom';
import ProductShow from "../../../components/websit/productShow/ProductShow";

export default function Blouses() {
    const { groubId, subGroubId } = useParams();
    const [loading, setLoading] = useState(true);
    const [dataGroub, setDataGroub] = useState([]);

    useEffect(() => {
        setLoading(true);
        Axios.get(`/${GETGROUB}?id=${groubId}`)
            .then((data) => {
                const product = data.data.filter((item) => item.subGroupId === subGroubId);
                setDataGroub(product);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [groubId, subGroubId]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : dataGroub.length === 0 ? (
              
                <h2 className=" mt-5">There are no products yet</h2>
            ) : (
                <ProductShow data={dataGroub} loading={loading} />
            )}
        </>
    );
}
