const { Schema } = require('mongoose')

const homeSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  thingsToKnow: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number
})

module.exports = homeSchema
