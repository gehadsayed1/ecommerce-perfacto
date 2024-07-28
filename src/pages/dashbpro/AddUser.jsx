import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Laoding from "../../components/laoding/Laoding";
import { Form } from "react-bootstrap";
import { REGISTER, baseUrl } from "../../Api/Api";
import styles from "./dashbourd.module.css"

export default function AddUser() {
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
      setErrors({ ...errors, [name]: "النص المدخل يجب أن يكون باللغة العربية فقط." });
    } else if (name === "Name" && !englishPattern.test(value)) {
      setErrors({ ...errors, [name]: "النص المدخل يجب أن يكون باللغة الإنجليزية فقط." });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Form Data: ", form);
      const res = await axios.post(`${baseUrl}/${REGISTER}`, form);

      setLoading(false);
      const idToken = res.data;
      const cookies = new Cookies();
      cookies.set("e-commerce", idToken);
      navigate("/Dashbord/Users", { replace: true });
    } catch (err) {
      console.log("Error: ", err);
      setLoading(false);
      if (err.response && err.response.status >= 400) {
        setError("Email is already been taken");
      } else {
        setError("Internal Server Error");
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
            <h1 className="mb-2 fw-bold abs">Add User</h1>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name </Form.Label>
              <Form.Control
                value={form.Name}
                onChange={handleChange}
                required
                type="text"
                name="Name"
                placeholder="Enter Your Name ..."
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Name in Arabic</Form.Label>
              <Form.Control
                value={form.Name_ar}
                onChange={handleChange}
                required
                type="text"
                name="Name_ar"
                placeholder="Enter Your Name in Arabic ..."
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={form.Email}
                onChange={handleChange}
                required
                type="email"
                name="Email"
                placeholder="Enter Your Email..."
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={form.Password}
                onChange={handleChange}
                type="password"
                name="Password"
                placeholder="Enter Your password.."
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
              <option value="" disabled>Select Role</option>
              <option value="1">Admin</option>
              <option value="0">User</option>
            </Form.Select>
            <button disabled={!isFormValid} className="btn btn-dark mt-4">
              Save
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
