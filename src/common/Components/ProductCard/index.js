import { Link, Redirect } from 'react-router-dom';
import { Image } from '../Image';
import moment from 'moment';
import { addItem, removeItem, updateItem } from '../../utils/cartHelpers';
import { useCallback, useState } from 'react';

export const ProductCard = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showRemoveProductButton = false,
  cartUpdate = false,
  setRun,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity > 0 ? product.quantity : 1);

  const addToCart = useCallback(() => {
    addItem(product, () => {
      setRedirect(true);
    });
  }, [product]);

  const shoudlRedirect = useCallback((redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  }, []);

  const removeFromCart = useCallback(() => {
    removeItem(product);
    setRun(true);
  }, [product, setRun]);

  const handleChange = useCallback(
    (productId) => (event) => {
      setQuantity(event.target.value < 1 ? 1 : event.target.value);
      if (event.target.value >= 1) {
        updateItem(productId, event.target.value);
      }
      setRun((val) => !val);
    },
    [setRun]
  );

  return (
    <div className='card'>
      <div className='card-header name'>{product.name}</div>
      <div className='card-body'>
        {shoudlRedirect(redirect)}
        <Image item={product} url='product' />
        <p className='lead mt-2'>{product?.description?.substring(0, 100)}</p>
        <p className='black-10'>₹{product.price}</p>
        <p className='black-9'>Category: {product.category?.name}</p>
        <p className='black-8'>Added on: {moment(product.createdAt).fromNow()}</p>
        <Link to={`/product/${product._id}`}>
          {product.quantity > 0 ? (
            <span className='badge badge-primary badge-pill'>In stock</span>
          ) : (
            <span className='badge badge-secondary badge-pill'> Out fo stock</span>
          )}
          <div>
            {showViewProductButton && <button className='btn btn-outline-info mt-2 mb-2 mr-2'>View Product</button>}
            {showAddToCartButton && (
              <button className='btn btn-outline-primary mt-2 mb-2' onClick={addToCart}>
                Add to Cart
              </button>
            )}
          </div>
        </Link>
        {cartUpdate && (
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust quantity</span>
            </div>
            <input type='number' className='form-control' value={quantity} onChange={handleChange(product._id)} />
          </div>
        )}
        {showRemoveProductButton && (
          <button className='btn btn-outline-danger mt-2 mb-2' onClick={removeFromCart}>
            Remove Product
          </button>
        )}
      </div>
    </div>
  );
};
