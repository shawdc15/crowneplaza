const mongoose = require('mongoose')

const ReceiptSchema = new mongoose.Schema({
  receiptFor: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  reason: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  cardHolderName: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  creditCardNumber: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  reservation_id: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  channel: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
  total: {
    type: Number,
    required: [true, 'Please fill up this field'],
  },
  status: {
    type: String,
    required: [true, 'Please fill up this field'],
  },
})

module.exports =
  mongoose.models.Receipt || mongoose.model('Receipt', ReceiptSchema)
