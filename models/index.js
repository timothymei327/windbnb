const mongoose = require('mongoose')
const userSchema = require('./user')
const homeSchema = require('./Home')

const User = mongoose.model('User', userSchema)
const Home = mongoose.model('Home', homeSchema)

module.exports = {
  User,
  Home
}
