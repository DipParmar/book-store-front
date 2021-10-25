import { API } from '../../../config';
import './index.css';

export const Image = ({ item: { _id, name }, url }) => (
  <div className='product-image'>
    <img src={`${API}/${url}/photo/${_id}`} alt={name} className='mb-3' />
  </div>
);
