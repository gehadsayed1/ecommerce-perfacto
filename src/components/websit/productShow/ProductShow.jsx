import { Card, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import styles from "./product.module.css";
import Sekelcton from "../sekelton/Sekelcton";

export default function ProductShow({ data, loading }) {
  const [favorites, setFavorites] = useState([]);

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
      return words.slice(0, 5).join(" ") + "... عرض المزيد";
    }
    return title;
  };

  return (
    <Container className="mt-4">
      {loading && <Sekelcton />}

      <Row xs={12} sm={12} md={12} lg={3} xl={3} className="g-4">
        {data?.map((product, index) => (
          <Col key={index}>
            <Card className={styles.custom_card}>
              <Card.Img
                variant="top"
                className={styles.imgCaed}
                src={`https://perfect.somee.com/${product.Imageproudect}`}
              />
              <FontAwesomeIcon
                icon={faHeart}
                className={`heart-icon ${styles.hartIcon} ${
                  isFavorite(product) ? styles.favorite : ""
                }`}
                onClick={() => handleFavoriteClick(product)}
              />
              <Card.Body>
                <Card.Title>{truncateTitle(product.ProductName)}</Card.Title>
                <Card.Text as="div">
                  {product.Pricesale ? (
                    <div className="d-flex align-items-center justify-content-start fs-5">
                      <del>EGP {product.PriceProduct}</del>
                      <p className="text-danger m-0">
                        : EGP {product.Pricesale}
                      </p>
                    </div>
                  ) : (
                    <div className=" fs-5">EGP: {product.PriceProduct}</div>
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
                  <a href={`/products/${product.Id}`}>View Details</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
