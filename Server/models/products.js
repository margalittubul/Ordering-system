import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,          
  },
  price_per_item: {
    type: Number,
    required: true,          
    min: 0                  
  },
  minimum_purchase_quantity: {
    type: Number,
    required: true,        
    min: 1,               
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be an integer'
    }
  }
});

export default mongoose.model('Product', productSchema);
