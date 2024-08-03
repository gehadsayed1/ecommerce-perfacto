import React, { useEffect, useState } from "react";
import css from "./homepage.module.css";
import { Axios } from "../../../Api/Axios";
import { HomeGET } from "../../../Api/Api";
import { useTranslation } from "react-i18next";

import SpinnerComponent from "../../../components/laoding/Laoding";

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { t } = useTranslation();
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
      <div className={`${css.info} container`}>
      <h1>
        <strong className={`fs-1 text-white `}>{t("PerfectoTitle")}</strong>
        {` ${t("ChooseStyle")}`}
      </h1>
      <h2>{t("CasualCollection")}</h2>
    </div>
      </div>
    </>
  );
}