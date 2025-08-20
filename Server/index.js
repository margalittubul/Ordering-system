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

app.use(cors()); 

app.use(bodyParser.json()); 
app.use(express.json()); 

app.use('/products', productRoutes); 
app.use('/providers', providerRoutes); 
app.use('/orders', orderRoutes); 
app.use('/users', userRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`)); 
