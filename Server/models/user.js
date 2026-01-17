import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true //מנקה רווחים בתחילה ובסוף המחרוזת
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'provider'], 
    default: 'admin',
    required: true
  }
});

export default mongoose.model('User', userSchema);
