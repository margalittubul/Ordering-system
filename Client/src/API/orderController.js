const BASE_URL = 'http://localhost:3000';

// קבלת כל ההזמנות 
export const getAllOrders = async () => {
  const token = localStorage.getItem('userToken'); 
  const res = await fetch(`${BASE_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ תגובת fetch:", text);
    throw new Error("שגיאה בקבלת ההזמנות");
  }

  return await res.json();
};

// יצירת הזמנה חדשה (admin בלבד – דורש טוקן)
export const createOrder = async (orderData) => {
  const token = localStorage.getItem('userToken');

  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });

  return await res.json();
};

// עדכון הזמנה (admin או ספק – לפי הרשאות בטוקן)
export const updateOrder = async (orderId, updateData) => {
  const token = localStorage.getItem('userToken');

  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updateData)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "שגיאה בעדכון הזמנה");
  }

  return await res.json();
};
