import { API } from '../config';

export const signup = async (user) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const signin = async (user) => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const authenticate = (data, callback) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    callback();
  }
};

export const signout = (callback) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    return fetch(`${API}/signout`, {
      method: 'GET',
    })
      .then(callback)
      .catch((e) => console.log(e));
  }
};

export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return JSON.parse(jwt);
    } else {
      return false;
    }
  }
};
