import React, { useEffect, useState } from "react";
import { CONTACTDELET, CONTACTGET } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import TableShow from "../../components/dashbord/Table";
import SpinnerComponent from "../../components/laoding/Laoding"; 
import styles from "./dashbourd.module.css";

export default function Contact() {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    Axios.get(`/${CONTACTGET}`)
      .then((data) => {
        setContact(data.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); 
      });
  }, []);

  const header = [
    {
      key: "ContectName",
      name: "Username",
    },
    {
      key: "Email",
      name: "Email",
    },
    {
      key: "phone",
      name: "Phone",
    },
    {
      key: "About",
      name: "About",
    },
  ];

  async function handelDelet(ContectId) {
    try {
      const res = await Axios.delete(`/${CONTACTDELET}?id=${ContectId}`);
      setContact(prev => prev.filter((item) => item.ContectId !== ContectId));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container-fluid">
      <div className={styles.contain_home}>
        <h1 className="mb-5 fw-bold">Contact</h1>
        {loading ? (
          <SpinnerComponent loading={loading} />
        ) : (
          <TableShow 
            data={contact} 
            header={header} 
            isLoading={loading} 
            pages={pages} 
            setPages={setPages} 
            limet={3} // تغيير العدد إلى العدد المطلوب لكل صفحة
            delete={handelDelet} 
          />
        )}
      </div>
    </div>
  );
}
