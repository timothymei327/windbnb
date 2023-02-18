const { default: mongoose } = require('mongoose')
require('dotenv').config()

// Add this line to prepare for the `strictQuery` deprecation warning
mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Successfully connected to MongoDB.')
  })
  .catch((e) => {
    console.log('Connection error', e.message)
  })

const db = mongoose.connection

module.exports = db
