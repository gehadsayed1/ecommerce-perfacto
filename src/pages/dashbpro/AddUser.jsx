import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Laoding from "../../components/laoding/Laoding";
import { Form } from "react-bootstrap";
import { REGISTER, baseUrl } from "../../Api/Api";
import styles from "./dashbourd.module.css";
import { useTranslation } from 'react-i18next'; // استيراد useTranslation

export default function AddUser() {
  const { t } = useTranslation(); // تهيئة useTranslation
  const date = new Date();
  const idRandom = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    dtoc: idRandom,
    Role_id: '',
    Name: "",
    Name_ar: "",
    Email: "",
    Password: "",
    Datacrteate: date.toLocaleString(),
    Role_name: "user"
  });

  const [errors, setErrors] = useState({});

  const arabicPattern = /^[\u0600-\u06FF\s]+$/;
  const englishPattern = /^[A-Za-z\s]+$/;

  function handleChange(e) {
    const { name, value } = e.target;

    // التحقق من صحة الإدخال بناءً على اسم الحقل
    if (name === "Name_ar" && !arabicPattern.test(value)) {
      setErrors({ ...errors, [name]: t("nameArError") });
    } else if (name === "Name" && !englishPattern.test(value)) {
      setErrors({ ...errors, [name]: t("nameError") });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/${REGISTER}`, form);

      setLoading(false);
      const idToken = res.data;
      const cookies = new Cookies();
      cookies.set("e-commerce", idToken);
      navigate("/Dashbord/Users", { replace: true });
    } catch (err) {
      console.error("Error: ", err);
      setLoading(false);
      if (err.response && err.response.status >= 400) {
        setError(t("emailError"));
      } else {
        setError(t("serverError"));
      }
    }
  }

  // تحقق من امتلاء الحقول
  const isFormValid = form.Name && form.Name_ar && form.Email && form.Password && form.Role_id;

  return (
    <>
      {loading && <Laoding />}
      <div className="container mt-5">
        <div className={styles.contain_home}>
          <Form onSubmit={handleSubmit}>
            <h1 className="mb-2 fw-bold abs">{t("addUser")}</h1>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label className=" fw-bold">{t("name")}</Form.Label>
              <Form.Control
                value={form.Name}
                onChange={handleChange}
                required
                type="text"
                name="Name"
                placeholder={t("name")}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label className=" fw-bold">{t("nameAr")}</Form.Label>
              <Form.Control
                value={form.Name_ar}
                onChange={handleChange}
                required
                type="text"
                name="Name_ar"
                placeholder={t("nameAr")}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Label className=" fw-bold">{t("email")}</Form.Label>
              <Form.Control
                value={form.Email}
                onChange={handleChange}
                required
                type="email"
                name="Email"
                placeholder={t("email")}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput4">
              <Form.Label className=" fw-bold">{t("password")}</Form.Label>
              <Form.Control
                value={form.Password}
                onChange={handleChange}
                type="password"
                name="Password"
                placeholder={t("password")}
                minLength={8}
                required
              />
            </Form.Group>
            <Form.Select
              className="mt-3"
              name="Role_id"
              value={form.Role_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>{t("selectRole")}</option>
              <option value="1">{t("admin")}</option>
              <option value="0">{t("user")}</option>
            </Form.Select>
            <button disabled={!isFormValid} className="btn btn-dark mt-4">
              {t("save")}
            </button>

            {error && <span className="error">{error}</span>}
            {!error && errors.Name && <span className="error">{errors.Name}</span>}
            {!error && errors.Name_ar && <span className="error">{errors.Name_ar}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}
