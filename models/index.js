const mongoose = require('mongoose')
const userSchema = require('./user')
const homeSchema = require('./home')
const bookingSchema = require('./booking')

const User = mongoose.model('User', userSchema)
const Home = mongoose.model('Home', homeSchema)
const Booking = mongoose.model('Booking', bookingSchema)

module.exports = {
  User,
  Home,
  Booking
}
