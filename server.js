const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const db = require('./db')
const PORT = process.env.PORT || 3001
const { User } = require('./models')

const app = express()

const bcryptSalt = bcrypt.genSaltSync(10)

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
)

//test route
app.get('/', (req, res) => {
  res.send('This is the root route')
})

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(newUser)
  } catch (err) {
    if (err.code === 11000) {
      res.status(422).json({ error: 'Email already exists' })
    } else {
      res.status(500).json({ error: 'Server error' })
    }
  }
})

app.listen(PORT, () => {
  console.log('Running at PORT: ', PORT)
})
