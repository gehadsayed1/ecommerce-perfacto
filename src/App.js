import { HashRouter ,Route, Routes } from "react-router-dom";
import Home from "./pages/dashbpro/Home.jsx";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashbord from "./pages/dashbpro/Dashbord";
import Users from "./pages/dashbpro/Users";
import EditUser from "./pages/dashbpro/EditUser";
import AddUser from "./pages/dashbpro/AddUser";
import Error403 from "./pages/Auth/Error403";
import Error404 from "./pages/Auth/Error404";
import RecuirAuth from "./pages/Auth/RecuirAuth";
import HomePage from "./pages/websit/HomePage/HomePage";
import Products from "./pages/dashbpro/Products";
import AddProduct from "./pages/dashbpro/AddProduct.jsx";
import ContactUs from "./pages/websit/contactUs/ContactUs.jsx";
import Layout from "./pages/websit/layout/Layout.jsx";
import ProductsShow from "./pages/websit/product/ProductsShow.jsx";
import Contact from "./pages/dashbpro/Contact.jsx";
import AboutUs from "./pages/websit/about/AboutUs.jsx";
import Ourbandes from "./pages/websit/Ourbranches/Ourbandes.jsx";
import Blouses from "./pages/websit/blouses/Blouses.jsx";
import ProductDetails from "./pages/websit/productDetails/ProductDetails.jsx";
import AllDetilse from "./pages/websit/allDetelilse/AllDetilse.jsx";
import Bullits from "./components/websit/bullitsComponant/Bullits.jsx";
import Sale from "./pages/websit/sale/Sale.jsx";
import FavoritesPage from "./pages/websit/FavoritesPage/FavoritesPage.jsx";
import SearchResults from "./pages/websit/SearchResults/SearchResults.jsx";
import MyChart from "./pages/dashbpro/chart/MyChart.jsx";
import InvoicesDash from "./pages/dashbpro/InvoicesDash.jsx";
import OrderSentPage from "./pages/websit/ordersent/OrderSentPage .jsx";
import ShowOrder from "./pages/dashbpro/ShowOrder.jsx";

function App() {
  return (
    <HashRouter>
    <div className="App">
      <Routes>
        {/* Public routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/abuotus" element={<AboutUs />} />
          <Route path="/AllDetilse" element={<AllDetilse />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/bullits" element={<Bullits />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/n" element={<OrderSentPage />} />

          {/* <Route path="/cart" element={<CardPage/>} /> */}
          <Route path="/ourbandes" element={<Ourbandes />} />
          <Route path="/product" element={<ProductsShow />} />
          <Route path="/produact/:id" element={<ProductDetails />} />
          <Route path="filter/:groubId/:subGroubId" element={<Blouses />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Error404 />} />

        {/* Protected routes */}
        <Route element={<RecuirAuth />}>
          <Route path="/Dashbord" element={<Dashbord />}>
            <Route path="chaer" element={<MyChart />} />
            <Route path="users" element={<Users />} />
            <Route path="invoices" element={<InvoicesDash />} />
            <Route path="invoices/:id" element={<ShowOrder />} />
            <Route path="home" element={<Home />} />
            <Route path="users/:id" element={<EditUser />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="products" element={<Products />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="contact" element={<Contact />} />
            <Route path="403" element={<Error403 />} />
          </Route>
        </Route>
      </Routes>
    </div>
    </HashRouter>
  );
}

export default App;
