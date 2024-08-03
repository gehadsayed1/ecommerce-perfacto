import { faUsers, faPlus, faHouse, faShop, faComment, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export const Links = () => {
  const { t } = useTranslation();
  
  return [
    {
      name: t("Users"),
      path: "Users",
      icon: faUsers,
      role: "1"
    },
    {
      name: t("Add User"),
      path: "/Dashbord/adduser",
      icon: faPlus,
      role: "1"
    },
    {
      name: t("Home"),
      path: "/Dashbord/home",
      icon: faHouse,
      role: "1"
    },
    {
      name: t("products"),
      path: "/Dashbord/products",
      icon: faShop,
      role: "1"
    },
    {
      name: t("Add Product"),
      path: "/Dashbord/addproduct",
      icon: faPlus,
      role: "1"
    },
    {
      name: t("Contact"),
      path: "/Dashbord/contact",
      icon: faComment,
      role: "1"
    },
    {
      name: t("Invoices"),
      path: "/Dashbord/invoices",
      icon: faFileInvoiceDollar,
      role: "1"
    },
  ];
};
