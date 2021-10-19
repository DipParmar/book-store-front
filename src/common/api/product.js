import { API } from '../../config';

export const createProduct = async ({ userId, token, product }) => {
  console.log(userId, token, product);
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
