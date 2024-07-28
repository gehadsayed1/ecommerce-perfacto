import axios from "axios";
import TableShow from "../../components/dashbord/Table";
import { useEffect, useRef, useState } from "react";
import { baseUrl, HOMEDELET, HOME, HomeGET } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Form } from "react-bootstrap";
import Laoding from "../../components/laoding/Laoding";
import styles from "./dashbourd.module.css";

export default function Home() {
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const uplodImg = useRef(null);
  const [pages, setPages] = useState(1);

  // Fetch home images on component mount
  useEffect(() => {
    Axios.get(`/${HomeGET}`)
      .then((response) => setImages(response.data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  // Define header for home images table
  const header = [
    {
      key: "imageweb",
      name: "Image",
    },
  ];

  // Function to delete home image
  const handleDelete = async (id) => {
   
    try {
      await axios.delete(`${baseUrl}/${HOMEDELET}?id=${id}`);
      setImages((prevImages) => prevImages.filter((item) => item.Id !== id));
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  // Function to handle form submission to add image
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!imageFile) {
      console.error("No image selected.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("imageweb", imageFile);

    try {
      const response = await axios.post(`${baseUrl}/${HOME}`, formData);
      
      

      // Check if the image URL is valid before updating state
    
      if (response.data === "Done") {
        Axios.get(`/${HomeGET}`)
      .then((response) => setImages(response.data))
      .catch((err) => console.error("Error fetching images:", err));
      } else {
        console.error("Invalid image URL received.");
      }
      
      setLoading(false);
      setImageFile(null);
    } catch (err) {
      setLoading(false);
      console.error("Error adding image:", err);
    }
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle upload image button click
  const handelUplodImag = () => {
    uplodImg.current.click();
  };

  return (
    <>
      {loading && <Laoding />}
      <div className="container-fluid">
        <div className={styles.contain_home}>
          <div className="d-flex align-items-center justify-content-between p-4">
            <h1 className="mb-2 fw-bold abs">Home Page</h1>
          </div>
          <TableShow 
            data={images} 
            header={header} 
            isLoading={loading} 
            pages={pages} 
            setPages={setPages} 
            limet={3} // تغيير العدد إلى العدد المطلوب لكل صفحة
            delete={handleDelete}  
          />
        </div>
        {/* Add home image form */}
        <div className="container mt-5">
          <div style={{ height: "100vh" }}>
            <Form onSubmit={handleSubmit}>
              <h1 className="mb-2 fw-bold abs">Add Home Image</h1>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  hidden
                  ref={uplodImg}
                />
              </Form.Group>
              <div className={styles.uplod_img} onClick={handelUplodImag}>
                <img
                  src={require("./imags/cloud-2044823_1280.webp")}
                  alt="Upload Here"
                  width="100px"
                />
                <p className={styles.uplod_p}>Upload Images</p>
              </div>
              <button
                disabled={!imageFile}
                type="submit"
                className="btn btn-dark mt-4"
              >
                Save
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
