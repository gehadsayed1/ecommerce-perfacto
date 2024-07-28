import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { baseUrl, LOGIN, EIDETUSERS } from "../../Api/Api";
import Laoding from "../../components/laoding/Laoding";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { Axios } from "../../Api/Axios";
import Cookies from "universal-cookie";

export default function Login() {
  // states
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // navigate
  const navigate = useNavigate();

  // focus input
  const focus = useRef(null);

  useEffect(() => {
    focus.current.focus();
  }, []);

  // loading
  const [loading, setLoading] = useState(false);

  // error
  const [error, setError] = useState("");

  // handle form change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://perfect.somee.com/api/UserAccount/Login", {
        email: form.email,
        password: form.password,
      });

      const cookies = new Cookies();
      cookies.set("ecommerc", res.data);

      allow(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response && err.response.status >= 400) {
        setError("Wrong Email Or Password");
      } else {
        setError("Internal Server Error");
      }
    }
  }

  // function to allow login
  async function allow(id) {
    try {
      const res = await Axios.get(`/${EIDETUSERS}/?id=${id}`);
      const userData = res.data;

      const cookies = new Cookies();
      cookies.set("ecommerc", userData.id);
     
      
   
      if (userData.Role_id === 1) {
        navigate("/Dashbord/chaer");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
      setError("Failed to verify user role.");
    }
  }

  

  return (
    <>
      {loading && <Laoding />}
      <div className=" container">
        <div className="row " style={{ height: "100vh" }}>
          <Form className="form " onSubmit={handleSubmit}>
            <h1>Login</h1>

            <Form.Group
              className=" form-custem"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                name="email"
                ref={focus}
                placeholder="Enter Your Email..."
              />
              <Form.Label>Email</Form.Label>
            </Form.Group>

            <Form.Group
              className=" form-custem"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                value={form.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter Your passward.."
                minLength={8}
                required
              />
              <Form.Label>Password</Form.Label>
            </Form.Group>

            <button className="btn btn-dark">Login</button>
            <h6 className="mt-3 ms-3">
              Don't have an account yet?<Link to="/Register">Sign Up</Link>
            </h6>
            {error !== "" && <span className="error">{error}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}
