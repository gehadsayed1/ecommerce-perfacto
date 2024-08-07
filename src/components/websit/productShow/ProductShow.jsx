import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./product.module.css";
import Sekelcton from "../sekelton/Sekelcton";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function ProductShow({ data, loading, isFavoritesPage, onRemoveFavorite }) {
  const [favorites, setFavorites] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteClick = (product) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.Id === product.Id)) {
      updatedFavorites = favorites.filter((fav) => fav.Id !== product.Id);
    } else {
      updatedFavorites = [...favorites, product];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (product) => {
    return favorites.some((fav) => fav.Id === product.Id);
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 8) {
      return words.slice(0, 5).join(" ") + `... ${t('Show More')}`;
    }
    return title;
  };

  const handleRemoveClick = (id) => {
    confirmAlert({
      title: t('Confirm to submit'),
      message: t('Are you sure to remove this item?'),
      buttons: [
        {
          label: t('Yes'),
          onClick: () => onRemoveFavorite(id)
        },
        {
          label: t('No'),
        }
      ]
    });
  };

  return (
    <Container className="mt-4">
      {loading && <Sekelcton />}

      <Row xs={12} sm={12} md={12} lg={3} xl={3} className="g-4">
        {data?.map((product, index) => (
          <Col key={index} className="d-flex justify-content-center">
            <Card className={styles.custom_card}>
              <Card.Img
                variant="top"
                className={styles.imgCaed}
                src={`https://perfect.somee.com/${product.Imageproudect}`}
              />
              <FontAwesomeIcon
                icon={faHeart}
                className={`heart-icon  ${styles.hartIcon} ${
                  isFavorite(product) ? styles.favorite : ""
                }`}
                onClick={() => handleFavoriteClick(product)}
              />
              <Card.Body>
                <Card.Title>{truncateTitle(  i18n.language === 'en' ?product.ProductName :product.ProductName_ar)}</Card.Title>
                <Card.Text as="div">
                  {product.Pricesale ? (
                    <div className="d-flex align-items-center justify-content-start fs-5">
                      <del>EGP {product.PriceProduct}</del>
                      <p className="text-danger m-0">
                        : EGP {product.Pricesale}
                      </p>
                    </div>
                  ) : (
                    <div className="fs-5">EGP: {product.PriceProduct}</div>
                  )}
                </Card.Text>

                <div>
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={styles.starIcon}
                      />
                    ))}
                </div>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <div className={styles.details}>
                  <Link to={`/produact/${product.Id}`}>{t('View Details')}</Link>
                </div>
              
                {isFavoritesPage && (
                  <Button variant="danger" className=" me-1" onClick={() => handleRemoveClick(product.Id)}>
                    {t('Remove')}
                  </Button>
                )}
                
              </Card.Footer>


            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
