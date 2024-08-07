import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTelegram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import styles from "./footer.module.css";
import logoFooter from "../imgWed/Perfecto New.png";
import { Link } from "react-router-dom";
import rghit from "../imgWed/photo_2024-07-28_14-31-22.jpg";
import withDirection from "../../../components/websit/withDirection/withDirection";

const Footer = ({ css }) => {
  const { t } = useTranslation();

  const handleFacebookClick = () => {
    window.location.href = "https://www.facebook.com/perfectoegypt1?mibextid=ZbWKwL";
  };

  const handleTiktokClick = () => {
    window.location.href = "https://www.tiktok.com/@perfecto_egypt?_r=1&_d=e9dfd96lfcml6g&sec_uid=MS4wLjABAAAAnHWnhhmq1SthuTC7jW3nLTUSTkbfMBCTAyfK1eXhsODSM97ApwrpmUJY0bU_9-2w&share_author_id=7213440753522213893&sharer_language=ar&source=h5_m&u_code=e73g4ali7a2mc9&timestamp=1720368954&user_id=7213440753522213893&sec_user_id=MS4wLjABAAAAnHWnhhmq1SthuTC7jW3nLTUSTkbfMBCTAyfK1eXhsODSM97ApwrpmUJY0bU_9-2w&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7388003688033421057&share_link_id=abb78e74-7a86-4957-8835-03f161fa4f08&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb0229&social_share_type=5&enable_checksum=1";
  };

  const handleInstagramClick = () => {
    window.location.href = "https://www.instagram.com/invites/contact/?igsh=116i5hhpy2w4i&utm_content=fm7az38";
  };

  const handlTelegramClick = () => {
    window.location.href = "https://t.me/PerfectoEgypt";
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col sm={12} md={6} lg={3} className="mb-4 mt-5">
            <h5>{t("footer.contactUs")}</h5>
            <ul className="list-unstyled text-dark">
              <li className="d-flex align-items-center justify-content-center mt-2">
                <FontAwesomeIcon icon={faPhone} className="me-2 ms-2" />
                <p>
                  {t("footer.phoneText")}{" "}
                  <a className="text-decoration-none text-dark" href="tel:+201096810423">
                    01096810423
                  </a>
                  .
                </p>
              </li>
              <li>
                <a href="mailto:Perfecto.eg@gmail.com" className="d-flex align-items-center text-dark text-decoration-none mb-2">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2 ms-2" />
                  {t("footer.email")}
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 ms-2" />
                <Link className="text-decoration-none text-dark" to="/ourbandes">
                  {t("footer.lookAtOurSites")}
                </Link>
              </li>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3} className="mb-4">
            <h5>{t("footer.followUs")}</h5>
            <ul className={`list-unstyled ${styles.socialIcons}`}>
              <li>
                <span onClick={handleFacebookClick} className={styles.socialIconLink} role="button">
                  <FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} />
                </span>
              </li>
              <li>
                <span onClick={handleTiktokClick} className={styles.socialIconLink} role="button">
                  <FontAwesomeIcon icon={faTiktok} className={styles.socialIcon} />
                </span>
              </li>
              <li>
                <span onClick={handleInstagramClick} className={styles.socialIconLink} role="button">
                  <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} />
                </span>
              </li>
              <li>
                <span onClick={handlTelegramClick} className={styles.socialIconLink} role="button">
                  <FontAwesomeIcon icon={faTelegram} className={styles.socialIcon} />
                </span>
              </li>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3} className="mb-4">
            <h4>{t("footer.aboutUs")}</h4>
            <ul className={`list-unstyled fw-bold ${styles.uls}`}>
              <li>
                <Link className="text-decoration-none text-dark" to={"/abuotus"}>
                  {t("footer.readAboutUs")}
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none text-dark" to={"/ourbandes"}>
                  {t("footer.ourBranches")}
                </Link>
              </li>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3} className="mb-4">
            <img src={logoFooter} alt="" className="w-50 mb-3" />
            <ul className={`list-unstyled fw-bold ${styles.uls}`}>
              <li>
                <Link className="text-decoration-none text-dark" to={"/AllDetilse#section1"}>
                  {t("footer.termsAndConditions")}
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none text-dark" to={"/AllDetilse#section2"}>
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none text-dark" to={"/AllDetilse#section3"}>
                  {t("footer.shippingPolicy")}
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none text-dark" to={"/AllDetilse#section4"}>
                  {t("footer.promotionsPolicy")}
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none text-dark" to={"/AllDetilse#section5"}>
                  {t("footer.returnExchangePolicy")}
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none text-dark" to={"/AllDetilse#section6"}>
                  {t("footer.defectPolicy")}
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={6} className="text-center ">
            <div className="d-flex align-items-center justify-content-center">
              <h5 className="fw-bold">{t("footer.allRightsReserved")}</h5>
              <img className={`${styles.rightImage} ${css.rghit}`} src={rghit} alt="" />
            </div>
            <p className={`fw-bold`}>
              {t("footer.developedBy")}{" "}
              <a href="https://www.facebook.com/jihad.ahmed.jihad?mibextid=ZbWKwL" className="text-decoration-none text-dark">
                {t("footer.jihad")}
              </a>{" "}
              &{" "}
              <a href="https://www.facebook.com/omar.zaki.963?mibextid=ZbWKwL" className="text-decoration-none text-dark">
                {t("footer.omar")}
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default withDirection(Footer);
