import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  provider_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Provider',                     
    required: true                   
  },
 products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }
  ],
  status: {
    type: String,                       
    enum: ['הוזמן', 'בתהליך', 'הושלם'], 
    default: 'הוזמן',                
    required: true                   
  },
    totalAmount: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Order', orderSchema);
