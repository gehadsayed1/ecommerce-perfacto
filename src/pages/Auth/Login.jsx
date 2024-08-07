import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { baseUrl, LOGIN, EIDETUSERS } from "../../Api/Api";
import Laoding from "../../components/laoding/Laoding";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { Axios } from "../../Api/Axios";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const focus = useRef(null);

  useEffect(() => {
    focus.current.focus();
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.post(`/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });

      const cookies = new Cookies();
      cookies.set("ecommerc", res.data);

      allow(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (err.response && err.response.status >= 400) {
        setError(t("WrongEmailOrPassword"));
      } else {
        setError(t("ServerError"));
      }
    }
  }

  async function allow(id) {
    try {
      const res = await Axios.get(`/${EIDETUSERS}/?id=${id}`);
      const userData = res.data;

      const cookies = new Cookies();
      cookies.set("ecommerc", userData.id);

      if (userData.Role_id === 1) {
        navigate("/Dashbord/chaer");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(t("FailedToVerifyRole"));
    }
  }

  return (
    <>
      {loading && <Laoding />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <h1>{t("LoginTitle")}</h1>
            <Form.Group className="form-custem mt-5" controlId="exampleForm.ControlInput1">
              <Form.Control
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                name="email"
                ref={focus}
                placeholder={t("EnterYourEmailLogin")}
              />
              <Form.Label>{t("EmailLogin")}</Form.Label>
            </Form.Group>
            <Form.Group className="form-custem" controlId="exampleForm.ControlInput2">
              <Form.Control
                value={form.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder={t("EnterYourPasswordLogin")}
                minLength={8}
                required
              />
              <Form.Label>{t("PasswordLogin")}</Form.Label>
            </Form.Group>
            <button className="btn btn-dark">{t("LoginTitle")}</button>
            <h6 className="mt-3 ms-3">
              {t("NoAccountYet")} <Link to="/Register">{t("SignUpLogin")}</Link>
            </h6>
            {error !== "" && <span className="error" style={{ color: "red" }}>{error}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}
