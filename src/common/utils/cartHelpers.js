export const addItem = (item, callback) => {
  if (typeof window !== 'undefined') {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cart.push({
      ...item,
      count: 1,
    });
    console.log(cart);

    cart = Array.from(
      new Set(
        cart.map(({ _id }) => {
          return _id;
        })
      )
    ).map((id) => {
      return cart.find((p) => p._id === id);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    callback();
  }
};

export const updateItem = (productId, quantity) => {
  if (typeof window !== 'undefined') {
    console.log(productId, quantity);
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    console.log(cart);
    cart = cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].quantity = quantity;
      }
      return product;
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeItem = (product) => {
  if (typeof window !== 'undefined') {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    cart = cart.filter(({ _id }) => _id !== product._id);

    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const itemTotal = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0;
  }
};

export const getCart = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
  return [];
};
