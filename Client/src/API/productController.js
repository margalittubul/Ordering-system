// const BASE_URL = 'http://localhost:3000'; 
const BASE_URL = 'https://ordering-system-3f6c.onrender.com';

// GET – שליפת כל המוצרים (פתוח לכולם)
export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return await res.json();
};

// POST – הוספת מוצר חדש (דורש טוקן של ספק)
export const createProduct = async (productData) => {
  const token = localStorage.getItem('userToken');

  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });

  return await res.json();
};



