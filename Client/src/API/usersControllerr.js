// const BASE_URL = 'http://localhost:3000'; 
const BASE_URL = 'https://ordering-system-3f6c.onrender.com';

// קבלת כל המשתמשים (admin בלבד - דורש טוקן)
export const getAllUsers = async () => {
  const token = localStorage.getItem('userToken');
  const res = await fetch(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
};

// יצירת משתמש חדש (admin או ספק)
export const createUser = async (userData) => {
  const token = localStorage.getItem('userToken');
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(userData)
  });
  return await res.json();
};

// התחברות משתמש – מחזיר טוקן
export const loginCustomer = async (formData) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return await res.json();
};

//פונקציה שמחזירה את פרטי המשתמש
export const fetchUserDetails = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) return null;

    try {
        const response = await fetch(`${BASE_URL}/users/getUserFromToken`, {
           headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('שגיאה בשליפת שם המשתמש');
            return null;
        }
    } catch (error) {
        console.error('שגיאת רשת:', error);
        return null;
    }
};