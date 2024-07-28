import React, { useEffect, useState } from "react";
import css from "./homepage.module.css";
import { Axios } from "../../../Api/Axios";
import { HomeGET } from "../../../Api/Api";

import SpinnerComponent from "../../../components/laoding/Laoding";

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

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
    }, 2000);

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
          <h3>
            <strong className={`fs-2 text-danger`}>Perfecto</strong>
            Choose your own style
          </h3>
          <h4>A more casual collection to suit you</h4>
        </div>
      </div>
    </>
  );
}