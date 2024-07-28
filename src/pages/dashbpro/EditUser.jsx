import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { SAVEUSER, EIDETUSERS, baseUrl } from "../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditUser() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
      Name: '',
      Name_ar: '',
      Email: '',
      Role_id: ''
  });
  const [disapl, setDisapl] = useState(true);
  //git id
  const {id} = useParams();
  

  useEffect(() => {
    axios
      .get(`${baseUrl}/${EIDETUSERS}/?id=${id}`)
      .then((data) => {
        setUserData(data.data);
        // console.log(data.data)
      })
      .then(() => setDisapl(false))
      .catch((err) => console.log(err));
  }, [id]);
  //new data

  //handel save
  async function handelSave(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/${SAVEUSER}/?id=${id}`,
        userData
      );
      navigate("/Dashbord/Users", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className=" container mt-5">
      <h1>Edit User</h1>
      <Form className="bg-white w-100 p-3 mx-2" onSubmit={handelSave}>
        <Form.Group className="mb-3" controlId="formBasicName1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={userData.Name}
            onChange={(e) => setUserData({ ...userData, Name: e.target.value })}
            type="text"
            required
            placeholder="Enter Name .."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName2">
          <Form.Label>User Name in Arabic</Form.Label>
          <Form.Control
            value={userData.Name_ar}
            onChange={(e) =>
              setUserData({ ...userData, Name_ar: e.target.value })
            }
            type="text"
            required
            placeholder="Enter Name in Arabic.."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={userData.Email}
            onChange={(e) =>
              setUserData({ ...userData, Email: e.target.value })
            }
            type="email"
            required
            placeholder="Enter Email .."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={userData.Role_id}
            onChange={(e) =>
              setUserData({ ...userData, Role_id: e.target.value })
            }
          >
            <option value={""} disabled>
              Select Role{" "}
            </option>
            <option value="1">Admin</option>
            <option value="0">User</option>
          </Form.Select>
        </Form.Group>
        <Button disabled={disapl} variant="dark" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}
