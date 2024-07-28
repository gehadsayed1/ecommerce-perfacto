import {
  Nav,
  NavDropdown,
  Navbar,
  Form,
  FormControl,
  Container,
} from "react-bootstrap";
import logo from "../imgWed/Perfecto New.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChartLine,
  faHeart,
  faMagnifyingGlass,
  faBars,
  faTimes,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import sginup from "../imgWed/sign-in.png";
import login from "../imgWed/log-in (1).png";
import { EIDETUSERS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";

export default function Header() {
  const [length, setLength] = useState();

  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("ecommerc");

  useEffect(() => {
    if (token) {
      allow(token);
    }
  }, []);

  // toggleSidebar
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // log out
  const handleLogout = () => {
    cookies.remove("ecommerc"); // حذف الكوكي
    navigate("/");
  };

  async function allow(token) {
    try {
      const res = await Axios.get(`/${EIDETUSERS}/?id=${token}`);
      const userData = res.data;

      if (userData.Role_id === 1) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }

  const [searchQuery, setSearchQuery] = useState(""); // حالة لحفظ قيمة البحث
  const [value, setValue] = useState({
    groubId: "",
    subGroubId: "",
  });
  useEffect(() => {
    const handleProductChange = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setLength(cartItems.length);
    };

    handleProductChange(); // Initial cart count update

    window.addEventListener("storage", handleProductChange); // Listen for changes in local storage

    return () => {
      window.removeEventListener("storage", handleProductChange); // Remove event listener on component unmount
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  }, [searchQuery, navigate]);

  const handleSelect = (eventKey) => {
    setValue((value.subGroubId = eventKey));
    navigate(`filter/${value.groubId}/${value.subGroubId}`);
  };

  return (
    <>
      <Navbar expand="lg" className={`bg-body-tertiary ${styles.navbar}`}>
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img className={styles.logoo} src={logo} alt="logo" />
            </Link>
            {isAdmin && (
              <FontAwesomeIcon
                icon={faChartLine}
                className={` btn btn-outline-dark ${styles.button_dash}`}
                onClick={() => navigate("/Dashbord/chaer")}
              />
            )}
          </Navbar.Brand>

          <div className={styles.search}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles.iconSearch}
            />
            <Form>
              <FormControl
                type="search"
                placeholder="Search here"
                aria-label="Search"
                className={`${styles.searchInput} w-100`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form>
          </div>
          <Nav.Link
            as={Link}
            to="/sale"
            className={`text-danger ${styles.sale}`}
          >
            Sale <span className={styles.saleSpan}>20%-50%</span>
          </Nav.Link>
          <div className=" d-flex align-items-center justify-content-center">
            <Link className={styles.haerd} to="/favorites">
              <FontAwesomeIcon icon={faHeart} />
            </Link>
            <div className={styles.comp_card}>
              <Link className="text-dark" to="/bullits">
                <span className={styles.count}>{length}</span>
                <FontAwesomeIcon
                  className={`text-dark ${styles.cart_icon}`}
                  icon={faCartShopping}
                />
              </Link>
            </div>
          </div>
          {token ? (
            <div className={styles.contLogout}>
              <FontAwesomeIcon
                icon={faRightToBracket}
                onClick={handleLogout}
                cursor={"pointer"}
                className={`${styles.logout} fs-3 btn btn-outline-dark`}
              />
            </div>
          ) : (
            <div
              className={` ${styles.auth} d-flex align-items-center justify-content-end `}
            >
              <Nav.Link as={Link} to="/register">
                <img
                  src={sginup}
                  alt="sginup"
                  className={styles.registration}
                />
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <img src={login} alt="login" className={styles.registration} />
              </Nav.Link>
            </div>
          )}

          <div>
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className={styles.sidebarIcon}
              onClick={toggleSidebar}
            />
            <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
              <div className={styles.lik}>
                <Nav.Link className={styles.link} as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link className={styles.link} as={Link} to="/contactus">
                  ContactUs
                </Nav.Link>
                <Nav.Link className={styles.link} as={Link} to="/abuotus">
                  AboutUs
                </Nav.Link>
                <Nav.Link className={styles.link} as={Link} to="/product">
                  All Products
                </Nav.Link>
                <NavDropdown
                  className={styles.link}
                  onSelect={handleSelect}
                  onClick={() =>
                    setValue({
                      ...value,
                      groubId: "3fa85f64-5717-4562-b3fc-2c963f66af60",
                    })
                  }
                  title="Casual"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66afa5">
                    Blouses
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66afa6">
                    Dresses
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66afa8">
                    Blazer
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66afa7">
                    Skirt
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66af10">
                    Pants
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="j3fa85f64-5717-4562-b3fc-2c963f66af13">
                    Shorts
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66af12">
                    T-shirts
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66afa9">
                    Chemise
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66af11">
                    Shirt
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  className={styles.link}
                  onSelect={handleSelect}
                  onClick={() =>
                    setValue({
                      ...value,
                      groubId: "3fa85f64-5717-4562-b3fc-2c963f66af70",
                    })
                  }
                  title="Formal"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66af13">
                    Full Suit
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66af14">
                    Skirt (Formal)
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66af15">
                    Shirt (Formal)
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66af16">
                    Blazer (Formal)
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="j3fa85f64-5717-4562-b3fc-2c963f66af17">
                    Dress (Formal)
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66af18">
                    Pants (Formal)
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  className={styles.link}
                  onSelect={handleSelect}
                  onClick={() =>
                    setValue({
                      ...value,
                      groubId: "3fa85f64-5717-4562-b3fc-2c963f66af80",
                    })
                  }
                  title="Evening"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66af19">
                    Dress (Evening)
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  className={styles.link}
                  onSelect={handleSelect}
                  onClick={() =>
                    setValue({
                      ...value,
                      groubId: "3fa85f64-5717-4562-b3fc-2c963f66af90",
                    })
                  }
                  title="Perfumes"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item eventKey="3fa85f64-5717-4562-b3fc-2c963f66af20">
                    Perfumes
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
