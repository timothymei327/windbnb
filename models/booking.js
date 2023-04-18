const { Schema } = require('mongoose')

const bookingSchema = new Schema({
  tenant: { type: Schema.Types.ObjectId, ref: 'User' },
  listing: { type: Schema.Types.ObjectId, ref: 'Home' },
  checkInDate: String,
  checkOutDate: String,
  guests: Number,
  numberOfNights: Number,
  totalPrice: Number
})

module.exports = bookingSchema
