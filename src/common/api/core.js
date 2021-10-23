import { API } from '../../config';

export const getProducts = (sortBy) => {
  return fetch(`${API}/product?sortBy=${sortBy}&order=desc&limit=20`, { method: 'GET' })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
