import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import styles from "./dashbourd.module.css";
import { ADDPRO } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import SpinnerComponent from "../../components/laoding/Laoding";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const uplodImg = useRef(null);
  const SaleInput = useRef(null);
  const uplodImgMultiple = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image
  const [uplodangProgress, setUplodangProgress] = useState(0);

  const [form, setForm] = useState({
    id: "",
    Editor: "admin",
    ProductName_ar: "",
    ProductName: "",
    GroupId: "",
    Imageproudect: "",
    Imagefile: "",
    subGroupId: "",
    Datecreate: "",
    PriceProduct: "",
    QuantityProduct: "",
    DescriptionProduct: "",
    sale: "",
    Pricesale: "",
    DeleteProduct: false,
    ActiveProduct: false,
    SizeProduct: "",
    imageList: [],
  });

  // Handle upload image
  function handelUplodImag() {
    uplodImg.current.click();
  }

  const arabicPattern = /^[\u0600-\u06FF\s]+$/;
  const englishPattern = /^[A-Za-z\s]+$/;

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;

    // Validate Arabic input
    if (name === "ProductName_ar" && !arabicPattern.test(value)) {
      setErrors({
        ...errors,
        [name]: "النص المدخل يجب أن يكون باللغة العربية فقط.",
      });
    }
    // Validate English input
    else if (name === "ProductName" && !englishPattern.test(value)) {
      setErrors({
        ...errors,
        [name]: "النص المدخل يجب أن يكون باللغة الإنجليزية فقط.",
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    setForm({ ...form, [name]: value });
  }

  // Handle single file selection
  function handleFileChange(e) {
    const file = e.target.files[0];
    setForm({ ...form, Imagefile: file });
    setSelectedImage(file); // Set the selected image
  }

  // Handle multiple file selection
  function handleMultipleFilesChange(e) {
    const files = Array.from(e.target.files);
    const updatedImageList = files.map((file, index) => ({
      ImageId: `${form.id}-${index}`,
      ImageName: file.name,
      Imagefile: file,
      ProductId: form.id,
      colorId: "#000000", // Default color value
    }));
    setForm({ ...form, imageList: updatedImageList });
  }

  // Handle color change for images
  function handleColorChange(e, index) {
    const updatedImageList = [...form.imageList];
    updatedImageList[index].colorId = e.target.value;
    setForm({ ...form, imageList: updatedImageList });
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("id", form.id || "");
      formData.append("Editor", form.Editor || "");
      formData.append("ProductName_ar", form.ProductName_ar || "");
      formData.append("ProductName", form.ProductName || "");
      formData.append("GroupId", form.GroupId || "");
      formData.append("Imagefile", form.Imagefile || "");
      formData.append("subGroupId", form.subGroupId || "");
      formData.append("Datecreate", form.Datecreate || "");
      formData.append("PriceProduct", form.PriceProduct || "");
      formData.append("SizeProduct", form.SizeProduct || "");
      formData.append("ActiveProduct", form.ActiveProduct);
      formData.append("QuantityProduct", form.QuantityProduct || "");
      formData.append("DescriptionProduct", form.DescriptionProduct || "");
      formData.append("Imageproudect", form.Imageproudect || "");
      formData.append("DeleteProduct", form.DeleteProduct);
      formData.append("sale", form.sale);
      formData.append("Pricesale", form.Pricesale);

      form.imageList.forEach((image, index) => {
        formData.append(`imageList[${index}].Imagefile`, image.Imagefile);
        formData.append(`imageList[${index}].colorId`, image.colorId);
      });

      const res = await Axios.post(`/${ADDPRO}`, formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setUplodangProgress(Math.floor((loaded * 100) / total));

          // Update UI with upload progress if needed
        },
      });

     
      setLoading(false);
      setForm({
        id: "",
        Editor: "admin",
        ProductName_ar: "",
        ProductName: "",
        GroupId: "",
        Imageproudect: "",
        Imagefile: "",
        subGroupId: "",
        Datecreate: "",
        PriceProduct: "",
        QuantityProduct: "",
        DescriptionProduct: "",
        DeleteProduct: false,
        ActiveProduct: false,
        SizeProduct: "",
        imageList: [],
      });

      // الانتقال إلى صفحة Dashboard/products
      window.location.replace("/Dashbord/products", "");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (SaleInput.current) {
      if (form.sale === "true") {
        SaleInput.current.style.display = "block";
      } else {
        SaleInput.current.style.display = "none";
      }
    }
  }, [form.sale]);

  return (
    <>
      {loading && <SpinnerComponent />}
      <div className="container mt-3">
        <div className={styles.contain_home}>
          <Form onSubmit={handleSubmit}>
            <h1 className="mb-2 fw-bold abs p-5">Add Product</h1>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">Title in English</Form.Label>
                  <Form.Control
                    value={form.ProductName}
                    onChange={handleChange}
                    required
                    type="text"
                    name="ProductName"
                    placeholder="Enter Your Product Name ..."
                  />
                  {errors.ProductName && (
                    <span className="error">{errors.ProductName}</span>
                  )}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlInput2"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">Title in Arabic</Form.Label>
                  <Form.Control
                    value={form.ProductName_ar}
                    onChange={handleChange}
                    required
                    type="text"
                    name="ProductName_ar"
                    placeholder="Enter Your Name in Arabic ..."
                  />
                  {errors.ProductName_ar && (
                    <span className="error">{errors.ProductName_ar}</span>
                  )}
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlInput3"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">Price</Form.Label>
                  <Form.Control
                    value={form.PriceProduct}
                    onChange={handleChange}
                    required
                    type="number"
                    name="PriceProduct"
                    placeholder="Enter Your Price..."
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Select
                    name="GroupId"
                    value={form.GroupId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Choose Category
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af60">
                      Casual
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af70">
                      Formal
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af80">
                      Soirée
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af90">
                      Perfumes
                    </option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlInput5"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">Size</Form.Label>
                  <Form.Control
                    value={form.SizeProduct}
                    onChange={handleChange}
                    required
                    type="text"
                    name="SizeProduct"
                    placeholder="s,l,xl,xxl,xxxl"
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlInput6"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">Quantity</Form.Label>
                  <Form.Control
                    value={form.QuantityProduct}
                    onChange={handleChange}
                    required
                    type="number"
                    name="QuantityProduct"
                    placeholder="Enter Your Quantity Product"
                  />  
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlSelect10"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">Sale</Form.Label>
                  <Form.Select
                    name="sale"
                    value={form.sale}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Choose Sale
                    </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlSelect2"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">Sub Category</Form.Label>
                  <Form.Select
                    name="subGroupId"
                    value={form.subGroupId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Sub Category
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66afa5">
                      Blouse
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66afa6">
                      Dress
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66afa7">
                      Skirt
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66afa8">
                      Blazer
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66afa9">
                      Chemise
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af10">
                      Pants
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af11">
                      Shirt
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af12">
                      T-Shirt
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af13">
                      Full Suit
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af14">
                      Skirt (Formal)
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af15">
                      Shirt (Formal)
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af16">
                      Blazer (Formal)
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af17">
                      Pants (Formal)
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af18">
                      Soiree Dress
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af19">
                      Perfumes
                    </option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlInput90"
                  className={styles.customRow}
                >
                  <Form.Control
                    value={form.Pricesale}
                    onChange={handleChange}
                    required
                    type="number"
                    name="Pricesale"
                    ref={SaleInput}
                    placeholder="Enter Price after Sale..."
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlTextarea1"
                  className="mb-3"
                >
                  <Form.Label className="fw-bold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.DescriptionProduct}
                    onChange={handleChange}
                    required
                    name="DescriptionProduct"
                    placeholder="Enter Your Description"
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group
              controlId="exampleForm.ControlInput7"
              className={styles.customRow}
            >
              <Form.Label className="fw-bold">Upload Image</Form.Label>
              <Form.Control
                className="d-none"
                onChange={handleFileChange}
                type="file"
                ref={uplodImg}
                name="Imagefile"
                placeholder="Upload Your image"
              />
              <button
                type="button"
                onClick={handelUplodImag}
                className="btn bg-dark text-light my-2 w-100"
              >
                Upload Image
              </button>
            </Form.Group>

            {selectedImage && (
              <div>
                <div className=" m-auto mt-3  w-25 h-25">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className=" w-100"
                  />
                  <div className={styles.custem_progress}>
                    <span
                      percent={`${uplodangProgress}%`}
                      style={{ width: `${uplodangProgress}%` }}
                      className={styles.inner_progress}
                    ></span>
                  </div>
                </div>
              </div>
            )}

            <Form.Group
              controlId="exampleForm.ControlInput8"
              className={styles.customRow}
            >
              <Form.Label className="fw-bold">
                Upload Multiple Images
              </Form.Label>
              <Form.Control
                className="d-none"
                onChange={handleMultipleFilesChange}
                type="file"
                ref={uplodImgMultiple}
                name="imageList"
                placeholder="Upload Your images"
                multiple
              />
              <div
                onClick={() => uplodImgMultiple.current.click()}
                className="btn bg-dark text-light my-2 w-100"
              >
                <p> Upload Multiple Images</p>
              </div>
            </Form.Group>

            <div className="row d-flex align-items-center justify-content-between">
              {form.imageList.map((image, index) => (
                <div
                  className={`col-md-5  m-2  col-sm-12 ${styles.imagdown} `}
                  key={index}
                >
                  <div className="d-flex align-items-center justify-content-between ">
                    <img
                      src={URL.createObjectURL(image.Imagefile)}
                      alt={`Product Image ${index + 1}`}
                      style={{
                        maxWidth: "35%",
                        height: "35%",
                        marginRight: "20px",
                      }}
                    />
                    <input
                      className=" rounded"
                      type="color"
                      value={image.colorId}
                      onChange={(e) => handleColorChange(e, index)}
                    />
                  </div>

                  <div className={styles.custem_progress}>
                    <span
                      percent={`${uplodangProgress}%`}
                      style={{ width: `${uplodangProgress}%` }}
                      className={styles.inner_progress}
                    ></span>
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-dark  w-25  mb-5">
              Add Product
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
