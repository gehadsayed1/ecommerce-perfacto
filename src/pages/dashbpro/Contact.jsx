import React, { useEffect, useState } from "react";
import { CONTACTDELET, CONTACTGET } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import TableShow from "../../components/dashbord/Table";
import SpinnerComponent from "../../components/laoding/Laoding"; 
import styles from "./dashbourd.module.css";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
const {t} =useTranslation()
  useEffect(() => {
    Axios.get(`/${CONTACTGET}`)
      .then((data) => {
        setContact(data.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); 
      });
  }, []);

  const header = [
    {
      key: "ContectName",
      name: t("Username"),
    },
    {
      key: "Email",
      name: t("Email"),
    },
    {
      key: "phone",
      name: t("Phone"),
    },
    {
      key: "About",
      name: t("About"),
    },
  ];

  async function handelDelet(ContectId) {
    try {
      const res = await Axios.delete(`/${CONTACTDELET}?id=${ContectId}`);
      setContact(prev => prev.filter((item) => item.ContectId !== ContectId));
    } catch (err) {
      console.error(err);
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
