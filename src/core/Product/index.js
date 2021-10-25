import React, { useState, useEffect, useCallback } from 'react';
import { listRelated, read } from '../../common/api';
import { ProductCard } from '../../common/Components/ProductCard';
import Layout from '../Layout';

export const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const loadSingleProduct = useCallback((productId) => {
    read({ productId }).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setProduct(response);
        listRelated({ productId: response._id }).then((response) => {
          if (response.error) {
            setError(response.error);
          } else {
            setRelatedProducts(response);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    const productId = match.params.productId;
    loadSingleProduct(productId);
  }, [loadSingleProduct, match.params.productId]);

  return (
    <Layout title={product?.name} description={product?.description?.substring(0, 100)} className='container-fluid'>
      <h2 className='mb-4'>{product?.name}</h2>
      <div className='row'>
        <div className='col-8 mb-3'>
          <ProductCard {...{ product }} showViewProductButton={false}></ProductCard>
        </div>
        <div className='col-4 mb-3'>
          <h2>Related Products</h2>
          {relatedProducts.map((product) => (
            <ProductCard key={product._id} {...{ product }}></ProductCard>
          ))}
        </div>
      </div>
    </Layout>
  );
};
