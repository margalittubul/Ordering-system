import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  company_name: {
    type: String, 
    required: [true, 'Company name is required'], 
    trim: true, //מנקה רווחים בתחילה ובסוף המחרוזת
    minlength: [2, 'Company name too short'] 
  },
  phone: {
    type: String, 
    required: [true, 'Phone number is required'], 
    trim: true, //

  },
  Representative_name: {
    type: String,
    required: [true, 'Representative name is required'], 
    trim: true, //
    minlength: [2, 'Representative name too short'] 
  },
  password: {
    type: String,
    required: true,
    minlength: 6 
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product'
  }]
});

export default mongoose.model('Provider', providerSchema);
