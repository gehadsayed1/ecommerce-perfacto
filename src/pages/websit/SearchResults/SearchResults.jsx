import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductShow from '../../../components/websit/productShow/ProductShow';

import { baseUrl, SEARCHPROD } from '../../../Api/Api';
import axios from 'axios';
// import { Axios } from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search).get('query');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query) {
      fetchProducts(query);
    }
  }, [query]);
 

  const fetchProducts = async (query) => {
    try {
        setLoading(true);
      const response = await axios.get(`${baseUrl}/${SEARCHPROD}?name=${query}`);
      
      setProducts(response.data); 
      setLoading(false);
    } catch (error) {

      console.error('Error fetching products:', error);
      setLoading(false);
      setProducts([]);
    }
  };

  return (
    <div>
      <h3>Search Results for "{query}"</h3>
  {products?  <ProductShow data={products} loading={loading}/> : <p>No products found.</p>}
    </div>
  );
};

export default SearchResults;
