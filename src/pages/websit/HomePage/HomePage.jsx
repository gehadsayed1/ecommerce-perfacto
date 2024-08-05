import React, { useEffect, useState } from "react";
import css from "./homepage.module.css";
import { Axios } from "../../../Api/Axios";
import { HomeGET } from "../../../Api/Api";
import { useTranslation } from "react-i18next";
import SpinnerComponent from "../../../components/laoding/Laoding";
import { useNavigate } from 'react-router-dom';
import Formal from '.././imgWed/Formal.webp'
import soarii from '.././imgWed/dress-739665_960_720.jpg'
import cagual from '.././imgWed/download (1).jpg'
import perfoim from '../imgWed/download (2).jpg'
export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/${HomeGET}`)
      .then((response) => {
        setImages(response.data);
        setIsLoading(false); // Set loading to false when images are fetched
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (isLoading) {
    return <SpinnerComponent />; // Render spinner while images are loading
  }

  const handleDivClick = (id) => {
  
    navigate(`/groub/${id}`);

  };

  return (
    <>
      <div className={css.container}>
        {images.map((img, i) => (
          <img
            key={i}
            src={`https://perfect.somee.com/${img?.imageweb}`}
            alt={`img-${i}`}
            className={`${css.image} ${
              i === currentImageIndex ? css.active : ""
            } ${
              i === (currentImageIndex - 1 + images.length) % images.length
                ? css.previous
                : ""
            }`}
          />
        ))}
      </div>
      <div className={css.sation}>
      <div className={`${css.info5} container`}>
      <h1>
        <strong className={`fs-1 text-white `}>{t("PerfectoTitle")}</strong>
        {` ${t("ChooseStyle")}`}
      </h1>
      <h2>{t("CasualCollection")}</h2>
    </div>
      </div>
      <div className={css.sation2}>
      <div className=" row ">
        <div className=" position-relative col-12 col-md-6 col-lg-6" onClick={() => handleDivClick('3fa85f64-5717-4562-b3fc-2c963f66af60')}>
          <img className=" w-100" src={Formal} alt="" />
          <p className={css.info1}>{t('everything_you_need')}</p>
        </div>
        <div  className=" position-relative col-12 col-md-6 col-lg-6" onClick={() => handleDivClick('3fa85f64-5717-4562-b3fc-2c963f66af70')}>
          <img className=" w-100" src={soarii} alt="" />
          <p className={`${css.info}`}>{t('evening_dresses')}</p>
        </div>

      </div>
      </div>
      
      <div className={css.sation2}>
      <div className=" row ">
        <div className=" position-relative col-12 col-md-6 col-lg-6" onClick={() => handleDivClick('3fa85f64-5717-4562-b3fc-2c963f66af80')}>
          <img className=" w-100" src={cagual} alt="" />
          <p className={css.info2}>{t('distinctive_casual')}</p>
        </div>
        <div  className=" position-relative col-12 col-md-6 col-lg-6" onClick={() => handleDivClick('3fa85f64-5717-4562-b3fc-2c963f66af90')}>
          <img className=" w-100" src={perfoim} alt="" />
          <p className={css.info3}>{t('unique_fragrance')}</p>
        </div>

      </div>
      </div>
    </>
  );
}