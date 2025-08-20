import express from 'express'; 

import cors from 'cors'; 

import bodyParser from 'body-parser'; 

import connectDB from './databace.js'; 

import productRoutes from './routes/productRoutes.js'; 
import providerRoutes from './routes/providerRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js'; 
import userRoutes from './routes/userRoutes.js';

const app = express(); 

const port = process.env.PORT || 3000;

connectDB(); 

const allowedOrigins = [
  "http://localhost:5173", 
  "https://ordering-system-1-rxqk.onrender.com" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
// app.use(cors()); 

app.use(bodyParser.json()); 
app.use(express.json()); 

app.use('/products', productRoutes); 
app.use('/providers', providerRoutes); 
app.use('/orders', orderRoutes); 
app.use('/users', userRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`)); 
