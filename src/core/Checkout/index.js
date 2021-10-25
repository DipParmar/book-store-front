import { useState, useEffect, useCallback } from 'react';
import Layout from '../Layout';
import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';

export const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const getTotal = useCallback(() => {
    return products.reduce((currentValue, nextValue) => currentValue + nextValue.quantity * nextValue.price, 0);
  }, [products]);
  return (
    <div>
      <h2>Total:₹{getTotal()}</h2>
      {isAuthenticated() ? (
        <button className='btn btn-success'>Checkout</button>
      ) : (
        <Link to='/signin'>
          <button className='btn btn-primary'>Sign in to checkout</button>
        </Link>
      )}
    </div>
  );
};
