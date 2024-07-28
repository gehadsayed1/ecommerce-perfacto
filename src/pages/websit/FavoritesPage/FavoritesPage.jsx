import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import styles from "./favorites.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFavorite = (product) => {
    const updatedFavorites = favorites.filter((fav) => fav.Id !== product.Id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className=" mb-3">Favorites</h1>
      <Row xs={12} sm={12} md={12} lg={3} xl={3} className="g-4">
        {favorites.length > 0 ? (
          favorites.map((product, index) => (
            <Col key={index} className=" d-flex align-items-center justify-content-center">
              <Card className={styles.custom_card}>
                <Card.Img
                  variant="top"
                  className={styles.imgCaed}
                  src={`https://perfect.somee.com/${product.Imageproudect}`}
                />
                <Card.Body>
                  <Card.Title>{product.ProductName}</Card.Title>
                  <Card.Text>
                    <p className=" fs-5">EGP: {product.PriceProduct}</p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFavorite(product)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Remove
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <h3>No favorites yet.</h3>
        )}
      </Row>
    </Container>
  );
};

export default FavoritesPage;
