// src/pages/websit/FavoritesPage/FavoritesPage.jsx
import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import ProductShow from '../../../components/websit/productShow/ProductShow';
import { useTranslation } from 'react-i18next';
import withDirection from '../../../components/websit/withDirection/withDirection';

const FavoritesPage = ({ css }) => {
  const [favorites, setFavorites] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter(item => item.Id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Container className={`mt-5 mb-5 ${css.container}`}>
      <h1 className={`mb-3 ${css.heading}`}>{t('favorites')}</h1>
      {favorites.length === 0 ? (
        <h2 className={css.vivor}>{t('no_favorites')}</h2>
      ) : (
        <ProductShow data={favorites} isFavoritesPage={true} onRemoveFavorite={handleRemoveFavorite} />
      )}
    </Container>
  );
};

export default withDirection(FavoritesPage);
