import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import styles from "./dashbourd.module.css";
import { ADDPRO } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import SpinnerComponent from "../../components/laoding/Laoding";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const {t}=useTranslation()
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const uplodImg = useRef(null);
  const SaleInput = useRef(null);
  const uplodImgMultiple = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image
  const [uplodangProgress, setUplodangProgress] = useState(0);
const navigate = useNavigate()
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
    DescriptionProduct_AR: "",
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

  // Validation functions
  const validateProductNameAr = (value) => arabicPattern.test(value);
  const validateProductName = (value) => englishPattern.test(value);
  const validateDescriptionAr = (value) => arabicPattern.test(value);
  const validateDescription = (value) => englishPattern.test(value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "ProductName_ar" && !validateProductNameAr(value)) {
      error = t('productNameAr');
    } else if (name === "ProductName" && !validateProductName(value)) {
      error = t('productName');
    } else if (name === "DescriptionProduct_AR" && !validateDescriptionAr(value)) {
      error = t('descriptionAr');
    } else if (name === "DescriptionProduct" && !validateDescription(value)) {
      error = t('description');
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

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
      formData.append("DescriptionProduct_AR", form.DescriptionProduct_AR || "");
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
        DescriptionProduct_AR: "",
        DeleteProduct: false,
        ActiveProduct: false,
        SizeProduct: "",
        imageList: [],
      });

      navigate("/Dashbord/products", { replace: true });
    } catch (err) {
      console.error(err);
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
            <h1 className="mb-2 fw-bold abs p-5">{t('titlepro')}</h1>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">{t('titleEnglish')}</Form.Label>
                  <Form.Control
                    value={form.ProductName}
                    onChange={handleChange}
                    required
                    type="text"
                    name="ProductName"
                    placeholder={t('enterProductName')}
                  />
                  {errors.ProductName && <span className="error">{errors.ProductName}</span>}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlInput2"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">{t('titleArabic')}</Form.Label>
                  <Form.Control
                    value={form.ProductName_ar}
                    onChange={handleChange}
                    required
                    type="text"
                    name="ProductName_ar"
                    placeholder={t('enterNameArabic')}
                  />
                  {errors.ProductName_ar && <span className="error">{errors.ProductName_ar}</span>}
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlInput3"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">{t('price')}</Form.Label>
                  <Form.Control
                    value={form.PriceProduct}
                    onChange={handleChange}
                    required
                    type="number"
                    name="PriceProduct"
                    placeholder={t('enterPrice')}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">{t('Category')}</Form.Label>
                  <Form.Select
                    name="GroupId"
                    value={form.GroupId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                     {t('selectGroup')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af60">
                     {t('Casual')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af70">
                     {t('Formal')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af80">
                      {t('Soirée')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af90">
                      {t('Perfumes')}
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
                  <Form.Label className="fw-bold">{t('Size')}</Form.Label>
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
                  <Form.Label className="fw-bold">{t('quantity')}</Form.Label>
                  <Form.Control
                    value={form.QuantityProduct}
                    onChange={handleChange}
                    required
                    type="number"
                    name="QuantityProduct"
                    placeholder={t('enterQuantity')}
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
                  <Form.Label className="fw-bold">{t('Sale')}</Form.Label>
                  <Form.Select
                    name="sale"
                    value={form.sale}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      {t('Choose Sale')}
                    </option>
                    <option value={true}>{t('Yes')}</option>
                    <option value={false}>{t('No')}</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlSelect2"
                  className={styles.customRow}
                >
                  <Form.Label className="fw-bold">{t('subGroup')}</Form.Label>
                  <Form.Select
                    name="subGroupId"
                    value={form.subGroupId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      {t('selectSubGroup')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66afa5">
                     {t('Blouses')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66afa6">
                      {t('Dresses')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66afa7">
                      {t('Skirt')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66afa8">
                      {t('Blazer')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66afa9">
                      {t('Chemise')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af10">
                      {t('Pants')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af11">
                      {t('Shirt')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af12">
                      {t('T-shirts')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af13">
                      {t('Full Suit')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af14">
                     {t('Skirt (Formal)')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af15">
                      {t('jaket (Formal)')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af16">
                      {t('Blazer (Formal)')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af17">
                      {t('Pants (Formal)')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af18">
                      {t('Dress (Formal)')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af19">
                      {t('Dress (Evening)')}
                    </option>
                    <option value="3fa85f64-5717-4562-b3fc-2c963f66af20">
                      {t('Perfumes')}
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
                    placeholder={t('afterPrice')}
                  />
                </Form.Group>
              </div>
            </div>
            <div className=" row">
            <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlTextarea1"
                  className="mb-3"
                >
                  <Form.Label className="fw-bold">{t('descriptionEnglish')}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.DescriptionProduct}
                    onChange={handleChange}
                    required
                    name="DescriptionProduct"
                    placeholder={t('enterDescription')}
                  />
                    {errors.DescriptionProduct && <span className="error">{errors.DescriptionProduct}</span>}

                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  controlId="exampleForm.ControlTextarea1"
                  className="mb-3"
                >
                  <Form.Label className="fw-bold">{t('descriptionArabic')}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.DescriptionProduct_AR}
                    onChange={handleChange}
                    required
                    name="DescriptionProduct_AR"
                    placeholder={t('enterDescriptionArabic')}
                  />
                    {errors.DescriptionProduct_AR && <span className="error">{errors.DescriptionProduct_AR}</span>}
                </Form.Group>
              </div>
            </div>
            <Form.Group
              controlId="exampleForm.ControlInput7"
              className={styles.customRow}
            >
              <Form.Label className="fw-bold">{t('uploadImage')}</Form.Label>
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
                {t('uploadImage')}
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
                {t('uploadMultipleImages')}
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
                <p> {t('uploadMultipleImages')}</p>
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
              {t('submit')}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
