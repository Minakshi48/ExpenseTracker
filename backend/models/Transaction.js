const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true, min: [0, 'Amount must be >= 0'] },
  description: { type: String, trim: true },
  category: { type: String, required: true, trim: true },
  date: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
