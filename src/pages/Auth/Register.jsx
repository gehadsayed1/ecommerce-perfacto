import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { REGISTER, baseUrl } from "../../Api/Api";
import SpinnerComponent from "../../components/laoding/Laoding";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  const date = new Date();

  const [laoding, setLaoding] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    role_id: 0,
    name: "",
    name_ar: "",
    email: "",
    password: "",
    datacrteate: date.toLocaleString(),
    role_name: "user"
  });
  const focus = useRef(null);
  
  useEffect(() => {
    focus.current.focus();
  }, []);
  
  const [errors, setErrors] = useState({});

  const arabicPattern = /^[\u0600-\u06FF\s]+$/;
  const englishPattern = /^[A-Za-z\s]+$/;

  function handleChange(e) {
    const { name, value } = e.target;
    
    if (name === "name_ar" && !arabicPattern.test(value)) {
      setErrors({ ...errors, [name]: t("ArabicTextError") });
    } else if (name === "name" && !englishPattern.test(value)) {
      setErrors({ ...errors, [name]: t("EnglishTextError") });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLaoding(true);

    if (errors.name || errors.name_ar) {
      setLaoding(false);
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/${REGISTER}`, form);
      
      if (res.data === "User added successfully!") {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      setLaoding(false);
      
      if (err.response && err.response.status >= 400) {
        setError(t("EmailTakenError"));
      } else {
        setError(t("ServerError"));
      }
    }
  }

  return (
    <>
      {laoding && <SpinnerComponent />}
      <div className="container mt-1">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <h1>{t("SignUpTitle")}</h1>
            <Form.Group className="form-custem" controlId="exampleForm.ControlInput1">
              <Form.Control
                value={form.name}
                onChange={handleChange}
                required
                type="text"
                name="name"
                ref={focus}
                placeholder={t("EnterYourNameInEnglish")}
              />
              <Form.Label>{t("Name")}</Form.Label>
              {errors.name && <span className="error" style={{ color: "red" }}>{errors.name}</span>}
            </Form.Group>
            <Form.Group className="form-custem" controlId="exampleForm.ControlInput2">
              <Form.Control
                value={form.name_ar}
                onChange={handleChange}
                required
                type="text"
                name="name_ar"
                placeholder={t("EnterYourNameInArabic")}
              />
              <Form.Label>{t("NameInArabic")}</Form.Label>
              {errors.name_ar && <span className="error" style={{ color: "red" }}>{errors.name_ar}</span>}
            </Form.Group>
            <Form.Group className="form-custem" controlId="exampleForm.ControlInput3">
              <Form.Control
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                name="email"
                placeholder={t("EnterYourEmail")}
              />
              <Form.Label>{t("Email")}</Form.Label>
              {errors.email && <span className="error" style={{ color: "red" }}>{errors.email}</span>}
            </Form.Group>
            <Form.Group className="form-custem" controlId="exampleForm.ControlInput4">
              <Form.Control
                value={form.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder={t("EnterYourPassword")}
                minLength={8}
                required
              />
              <Form.Label>{t("Password")}</Form.Label>
              {errors.password && <span className="error" style={{ color: "red" }}>{errors.password}</span>}
            </Form.Group>
            <button className="btn btn-dark" type="submit">{t("SignUp")}</button>
            <h6 className="mt-3 ms-3">
              {t("AlreadyHaveAnAccount")} <Link to="/Login">{t("Login")}</Link>
            </h6>
            {error && <span className="error" style={{ color: "red" }}>{error}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}
