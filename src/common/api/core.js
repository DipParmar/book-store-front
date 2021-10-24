import { API } from '../../config';
import queryString from 'query-string';

export const getProducts = (sortBy) => {
  return fetch(`${API}/product?sortBy=${sortBy}&order=desc&limit=20`, { method: 'GET' })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getFilterdProducts = ({ skip, limit, filters = {} }) => {
  const data = {
    limit,
    skip,
    filters,
  };
  return fetch(`${API}/product/by/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const list = (params) => {
  const query = queryString.stringify(params);
  console.log(query);
  return fetch(`${API}/product/search?${query}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
