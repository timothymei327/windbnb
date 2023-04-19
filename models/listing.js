const { Schema } = require('mongoose')

const listingSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  thingsToKnow: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price: Number
})

module.exports = listingSchema
