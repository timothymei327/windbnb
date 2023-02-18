const express = require('express')
const cors = require('cors')
const db = require('./db')
const PORT = process.env.PORT || 3001

const app = express()

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

app.listen(PORT, () => {
  console.log('Running at PORT: ', PORT)
})
