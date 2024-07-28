import { faUsers, faPlus , faHouse, faShop, faComment, faFileInvoiceDollar} from "@fortawesome/free-solid-svg-icons";

export const Links = [
  {
    name: "Users",
    path: "Users",
    icon: faUsers,
    role: "1"
  },
  {
    name: "Add User",
    path: "/Dashbord/adduser",
    icon: faPlus,
     role: "1"
  },
  {
    name: "Home",
    path: "/Dashbord/home",
    icon: faHouse,
    role: "1"
  },
  {
    name: "products",
    path: "/Dashbord/products",
    icon:  faShop,
    role: "1"
  },
  {
    name: "Add Product",
    path: "/Dashbord/addproduct",
    icon:  faPlus,
    role: "1"
  },
  {
    name: "Contact",
    path: "/Dashbord/contact",
    icon:  faComment,
    role: "1"
  },
  {
    name: "Invoices",
    path: "/Dashbord/invoices",
    icon:  faFileInvoiceDollar,
    role: "1"
  },
];
