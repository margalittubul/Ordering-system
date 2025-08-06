import User from '../models/user.js';
import jwt from 'jsonwebtoken';

//  קבלת כל המשתמשים (שמורה רק לאדמין)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  יצירת משתמש חדש (admin או ספק)
export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'שם המשתמש כבר קיים במערכת' });
    }

    const user = new User({ username, password, role });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'שגיאה ביצירת משתמש', error: err.message });
  }
};

//  התחברות לפי שם משתמש וסיסמה
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'שם משתמש או סיסמה שגויים' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '3h' }
    );

    res.json({ token });
  } catch (e) {
    res.status(400).json({ message: 'שגיאה בהתחברות', error: e.message });
  }
};


export const getUserFromToken = (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = authHeader.slice(7); 
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      id: payload.id,
      username: payload.username,
      role: payload.role,
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};