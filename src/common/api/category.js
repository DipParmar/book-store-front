import { API } from '../../config';

export const createCategory = async ({ userId, token, category }) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: category }),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
