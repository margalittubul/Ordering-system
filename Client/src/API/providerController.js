const BASE_URL = 'http://localhost:3000';

// רישום ספק חדש (יוצר גם משתמש ומחזיר טוקן)
export const createProvider = async (providerData) => {
  const res = await fetch(`${BASE_URL}/providers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(providerData)
  });
  return await res.json();
};

// קבלת כל הספקים עם המוצרים (דורש טוקן של admin)
export const getAllProviders = async () => {
  const token = localStorage.getItem('userToken');
  const res = await fetch(`${BASE_URL}/providers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
};
//פונקציה להוספת מוצר לספק
export const addProductToProvider = async (productId) => {
  const token = localStorage.getItem("userToken");
  const res = await fetch(`${BASE_URL}/providers/add-product`, {
     method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ productId })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update provider");
  return data;
};

// GET – קבלת פרטי הספק המחובר כולל המוצרים
export const getProviderDetails = async () => {
  const token = localStorage.getItem("userToken");
  if (!token) throw new Error("User token missing");

  const res = await fetch(`${BASE_URL}/providers/getProviderDetails`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch provider details");

  return data;
};

// GET – שליפת כל המוצרים של הספק המחובר
export const getProviderProducts = async () => {
  const token = localStorage.getItem('userToken');

  const res = await fetch(`${BASE_URL}/providers/my-product`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch provider products');
  }

  return await res.json();
};

export const getProviderProductsById = async (providerId) => {
  const token = localStorage.getItem('userToken');

  const res = await fetch(`${BASE_URL}/providers/${providerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    throw new Error('שגיאה בשליפת מוצרים של הספק');
  }

  return await res.json();
};
