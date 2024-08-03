import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ourbranches.module.css";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import imgBranes from "../imgWed/store-locator-banner-ar-mob.png";
import { useTranslation } from "react-i18next";

export default function Ourbandes() {
  const { t } = useTranslation();

  return (
    <div className={styles.ourbandes}>
      <div className="container">
        <h3 className="mb-3">{t("ourBranches.title")}</h3>
        <img src={imgBranes} alt="" className="mb-4 w-100" />

        <div className="row">
          <div className="mt-2 col-md-12 col-lg-4 col-sm-12">
            <h4>{t("ourBranches.heliopolis.title")}</h4>
            <p className="text-black-50">{t("ourBranches.heliopolis.address")}</p>
            <div className="d-flex align-items-center justify-content-start mb-2 fw-bold">
              <FontAwesomeIcon icon={faPhone} className="fs-4" />
              <p className="ms-1">{t("ourBranches.heliopolis.phone")}</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3452.0627181251966!2d31.3180045755555!3d30.09239007489942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDA1JzMyLjYiTiAzMcKwMTknMTQuMSJF!5e0!3m2!1sen!2seg!4v1720811867701!5m2!1sen!2seg"
              width="250"
              height="200"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mt-4 col-md-12 col-lg-4 col-sm-12">
            <h4>{t("ourBranches.abbasElAkkad.title")}</h4>
            <p className="text-black-50">{t("ourBranches.abbasElAkkad.address")}</p>
            <div className="d-flex align-items-center justify-content-start fw-bold mb-2">
              <FontAwesomeIcon icon={faPhone} className="fs-4" />
              <p className="ms-1">{t("ourBranches.abbasElAkkad.phone")}</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.0064918542225!2d31.3369416!3d30.0653484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fd0cf232b6b%3A0x88089923101572ab!2sperfecto!5e0!3m2!1sar!2seg!4v1720813107537!5m2!1sar!2seg"
              width="250"
              height="200"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mt-4 col-md-12 col-lg-4 col-sm-12">
            <h4>{t("ourBranches.giza.title")}</h4>
            <p className="text-black-50">{t("ourBranches.giza.address")}</p>
            <div className="d-flex align-items-center justify-content-start fw-bold">
              <FontAwesomeIcon icon={faPhone} className="fs-4" />
              <p className="ms-1">{t("ourBranches.giza.phone")}</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3455.474881252063!2d31.157212675551847!3d29.994517874948784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDU5JzQwLjMiTiAzMcKwMDknMzUuMiJF!5e0!3m2!1sen!2seg!4v1720813437162!5m2!1sen!2seg"
              width="250"
              height="200"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="row d-flex justify-content-around mt-3">
          <div className="mt-4 col-md-12 col-lg-4 col-sm-12">
            <h4>{t("ourBranches.faisal.title")}</h4>
            <p className="text-black-50">{t("ourBranches.faisal.address")}</p>
            <div className="d-flex align-items-center justify-content-start fw-bold mb-2">
              <FontAwesomeIcon icon={faPhone} className="fs-4" />
              <p className="ms-1">{t("ourBranches.faisal.phone")}</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.887365718084!2d31.19296!3d30.0113904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584728725d1c89%3A0x9acdc592d464146a!2sperfecto!5e0!3m2!1sar!2seg!4v1720813312843!5m2!1sar!2seg"
              width="250"
              height="200"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mt-4 col-md-12 col-lg-4 col-sm-12">
            <h4>{t("ourBranches.helwan.title")}</h4>
            <p className="text-black-50">{t("ourBranches.helwan.address")}</p>
            <div className="d-flex align-items-center justify-content-start fw-bold mb-2">
              <FontAwesomeIcon icon={faPhone} className="fs-4" />
              <p className="ms-1">{t("ourBranches.helwan.phone")}</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3460.5067863183804!2d31.329210275546323!3d29.849655175022328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDUwJzU4LjgiTiAzMcKwMTknNTQuNCJF!5e0!3m2!1sen!2seg!4v1720813366927!5m2!1sen!2seg"
              width="250"
              height="200"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
