import { API } from '../../../config';
import './index.css';

export const Image = ({ item, url }) => (
  <div className='product-image'>
    <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className='mb-3' />
  </div>
);
