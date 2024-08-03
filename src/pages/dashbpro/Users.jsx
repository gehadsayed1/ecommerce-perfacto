import React, { useEffect, useState } from "react";
import { USERS, USERDELETE } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import TableShow from "../../components/dashbord/Table";
import SpinnerComponent from "../../components/laoding/Laoding";
import styles from "./dashbourd.module.css";
import { useTranslation } from 'react-i18next'; // استيراد useTranslation

export default function Users() {
  const { t, i18n } = useTranslation(); // تهيئة useTranslation
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((data) => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const header = [
    {
      key: i18n.language === "en" ? "Name" : "Name_ar",
      name: t("username"),
    },
    {
      key: "Email",
      name: t("email"),
    },
    {
      key: "Datacrteate",
      name: t("dateTime"),
    },
    {
      key: "Role_id",
      name: t("role"),
    },
  ];

  async function handelDelet(id) {
    try {
      const res = await Axios.delete(`/${USERDELETE}?id=${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container-fluid">
      <div className={styles.contain_home}>
        <h1 className="mb-5 fw-bold">{t("usersPage")}</h1>
        {loading ? (
          <SpinnerComponent loading={loading} />
        ) : (
          <TableShow
            data={users}
            header={header}
            isLoading={loading}
            pages={pages}
            setPages={setPages}
            limet={7} // تغيير العدد إلى العدد المطلوب لكل صفحة
            delete={handelDelet}
          />
        )}
      </div>
    </div>
  );
}
