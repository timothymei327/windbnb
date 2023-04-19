const mongoose = require('mongoose')
const userSchema = require('./user')
const listingSchema = require('./listing')
const bookingSchema = require('./booking')

const User = mongoose.model('User', userSchema)
const Listing = mongoose.model('Listing', listingSchema)
const Booking = mongoose.model('Booking', bookingSchema)

module.exports = {
  User,
  Listing,
  Booking
}
