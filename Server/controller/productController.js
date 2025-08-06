import Product from '../models/products.js';

// GET – שליפת כל המוצרים (פתוח)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST – יצירת מוצר חדש (רק לספקים)
export const createProduct = async (req, res) => {
  try {
    if (req.user?.role !== 'provider') {
      return res.status(403).json({ message: 'גישה אסורה – רק ספקים יכולים להוסיף מוצר' });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
