import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./footer.module.css";
import logoFooter from "../imgWed/Perfecto New.png";
import { Link } from "react-router-dom";
import rghit from "../imgWed/photo_2024-07-28_14-31-22.jpg";
const Footer = () => {
  const handleFacebookClick = () => {
    window.location.href =
      "https://www.facebook.com/perfectoegypt1?mibextid=ZbWKwL"; // رابط صفحة الفيسبوك الخاصة بك
  };

  const handleTiktokClick = () => {
    window.location.href =
      "https://www.tiktok.com/@perfecto_egypt?_r=1&_d=e9dfd96lfcml6g&sec_uid=MS4wLjABAAAAnHWnhhmq1SthuTC7jW3nLTUSTkbfMBCTAyfK1eXhsODSM97ApwrpmUJY0bU_9-2w&share_author_id=7213440753522213893&sharer_language=ar&source=h5_m&u_code=e73g4ali7a2mc9&timestamp=1720368954&user_id=7213440753522213893&sec_user_id=MS4wLjABAAAAnHWnhhmq1SthuTC7jW3nLTUSTkbfMBCTAyfK1eXhsODSM97ApwrpmUJY0bU_9-2w&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7388003688033421057&share_link_id=abb78e74-7a86-4957-8835-03f161fa4f08&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb0229&social_share_type=5&enable_checksum=1"; // رابط حساب تويتر الخاص بك
  };

  const handleInstagramClick = () => {
    window.location.href =
      "https://www.instagram.com/invites/contact/?igsh=116i5hhpy2w4i&utm_content=fm7az38"; // رابط حساب إنستجرام الخاص بك
  };
  const handlTelegramClick = () => {
    window.location.href = "https://t.me/PerfectoEgypt"; // رابط حساب إنستجرام الخاص بك
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col sm={12} md={6} lg={3} className="mb-4  mt-5">
            <h5>Contact Us</h5>
            <ul className="list-unstyled text-dark">
              <li className=" d-flex  align-items: center justify-content-center mt-2">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                <p>
                  To contact us, please call{" "}
                  <a
                    className=" text-decoration-none text-dark"
                    href="tel:+201096810423"
                  >
                    01096810423
                  </a>
                  .
                </p>
              </li>
              <li>
                <a
                  href="mailto:Perfecto.eg@gmail.com"
                  className="d-flex align-items-center text-dark text-decoration-none mb-2"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  Perfecto.eg@outlook.com
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                <Link
                  className=" text-decoration-none text-dark"
                  to="/ourbandes"
                >
                  Look at Our Sites
                </Link>
              </li>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3} className="mb-4">
            <h5>Follow Us</h5>
            <ul className={`list-unstyled `}>
              <a
                href="https://www.facebook.com/perfectoegypt1?mibextid=ZbWKwL"
                onClick={handleFacebookClick}
                className={styles.socialIconLink}
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://www.tiktok.com/@perfecto_egypt?_r=1&_d=e9dfd96lfcml6g&sec_uid=MS4wLjABAAAAnHWnhhmq1SthuTC7jW3nLTUSTkbfMBCTAyfK1eXhsODSM97ApwrpmUJY0bU_9-2w&share_author_id=7213440753522213893&sharer_language=ar&source=h5_m&u_code=e73g4ali7a2mc9&timestamp=1720368954&user_id=7213440753522213893&sec_user_id=MS4wLjABAAAAnHWnhhmq1SthuTC7jW3nLTUSTkbfMBCTAyfK1eXhsODSM97ApwrpmUJY0bU_9-2w&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7388003688033421057&share_link_id=abb78e74-7a86-4957-8835-03f161fa4f08&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb0229&social_share_type=5&enable_checksum=1"
                onClick={handleTiktokClick}
                className={styles.socialIconLink}
              >
                <FontAwesomeIcon
                  icon={faTiktok}
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://www.instagram.com/invites/contact/?igsh=116i5hhpy2w4i&utm_content=fm7az38"
                onClick={handleInstagramClick}
                className={styles.socialIconLink}
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://t.me/PerfectoEgypt"
                onClick={handlTelegramClick}
                className={styles.socialIconLink}
              >
                <FontAwesomeIcon
                  icon={faTelegram}
                  className={styles.socialIcon}
                />
              </a>
            </ul>
          </Col>

          <Col sm={12} md={6} lg={3} className="mb-4">
            <h4>About us...</h4>
            <ul className={`list-unstyled fw-bold ${styles.uls}`}>
              <li>
                <Link
                  className="text-decoration-none text-dark"
                  to={"/abuotus"}
                >
                  Read about Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-dark"
                  to={"/ourbandes"}
                >
                  Our branches
                </Link>
              </li>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3} className="mb-4">
            <img src={logoFooter} alt="" className=" w-50  mb-3 " />
            <ul className={`list-unstyled fw-bold ${styles.uls}`}>
              <li>
                <Link
                  className="text-decoration-none text-dark"
                  to={"/AllDetilse#section1"}
                >
                  TERMSAND & CONDITIONS
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-dark"
                  to={"/AllDetilse#section2"}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-dark"
                  to={"/AllDetilse#section3"}
                >
                  SHIPPING POLICY
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-dark"
                  to={"/AllDetilse#section4"}
                >
                  PROMOTIONS POLICY
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-dark "
                  to={"/AllDetilse#section5"}
                >
                  RETURN & EXCHANGE POLICY
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-dark"
                  to={"/AllDetilse#section6"}
                >
                  DEFECT POLICY
                </Link>
              </li>
            </ul>
            {/* Add form for newsletter subscription */}
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
          
            <Row className="mt-3">
          <Col className="text-center">
          <div className=" d-flex align-items-center justify-content-center">
            <p className="mb-0 ">
              &copy; 2024 Your Clothing Company. All rights reserved.
            </p>
        
              <a
              
                href="https://www.facebook.com/RightSocialMedia?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className={styles.copy} src={rghit} alt="" />
              </a>
              </div>
            <p className="fw-bold">
              Develop by{" "}
              <a
                href="https://wa.me/201033671306"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jihad
              </a>{" "}
              &{" "}
              <a
                href="https://wa.me/201553172593"
                target="_blank"
                rel="noopener noreferrer"
              >
                Omar
              </a>
            </p>
          </Col>
        </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
