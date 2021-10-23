import { useCallback, useEffect, useState } from 'react';
import Layout from '../Layout';
import { APP_NAME } from '../../config';
import { getProducts } from '../../common/api/core';

import './index.css';
import { ProductCard } from '../../common/Components/ProductCard';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = useCallback(() => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  }, []);

  const loadProductsByArrival = useCallback(() => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  }, []);

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, [loadProductsByArrival, loadProductsBySell]);
  return (
    <Layout title='Home Page' className='container-fluid ' description={APP_NAME}>
      <h2 className='mb-4'> Best Sellers </h2>
      <div className='row'>
        {productsBySell.map((product, i) => (
          <ProductCard key={i} {...{ product }}></ProductCard>
        ))}
      </div>

      <h2 className='mb-4'> New Arrivals </h2>
      <div className='row'>
        {productsByArrival.map((product, i) => (
          <ProductCard key={i} {...{ product }}></ProductCard>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
