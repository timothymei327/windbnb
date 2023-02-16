const express = require('express')
const PORT = process.env.PORT || 3001

const app = express()

//test route
app.get('/', (req, res) => {
  res.send('This is the root route')
})

app.listen(PORT, () => {
  console.log('Running at PORT: ', PORT)
})
