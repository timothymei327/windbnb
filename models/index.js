const mongoose = require('mongoose')
const userSchema = require('./user')

const User = mongoose.model('User', userSchema)

module.exports = {
  User
}
