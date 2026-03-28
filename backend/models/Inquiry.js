const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  projectInterest: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false
  },
  budget: {
    type: String
  },
  preferredContact: {
    type: String,
    enum: ['email', 'phone', 'whatsapp'],
    default: 'email'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
