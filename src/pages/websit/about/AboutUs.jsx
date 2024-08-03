import React from 'react';
import styles from "./aboutus.module.css";
import imgAbout from "../../websit/imgWed/417433848_693187839691350_4451161736274379705_n.jpg";
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className={`container mt-5 ${styles.abut}`}>
      <h2 className="mb-5">{t('about.title')}</h2>
      <div className="row">
        <div className="col-12 mb-3 col-md-12 col-lg-6">
          <img className="w-100 mb-3" src={imgAbout} alt="imgAbout" />
        </div>
        <div className="col-12">
          <p>
            {t('about.description1')}
          </p>
          <p>
            {t('about.description2')}
          </p>
          <p>
            {t('about.description3')}
          </p>
        </div>
      </div>
    </div>
  );
}
