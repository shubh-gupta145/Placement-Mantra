const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  message:    { type: String, required: true },
  type:       { 
    type: String, 
    enum: ['general', 'reminder', 'update', 'alert'], 
    default: 'general' 
  },
  frequency:  { 
    type: String, 
    enum: ['once', 'weekly', 'monthly', 'yearly'], 
    default: 'once' 
  },
  sentTo:     { 
    type: String, 
    enum: ['all', 'specific'], 
    default: 'all' 
  },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  readBy:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);