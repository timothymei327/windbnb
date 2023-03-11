const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('./db')
const PORT = process.env.PORT || 3001
const { User, Home } = require('./models')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')

const app = express()
const bcryptSalt = bcrypt.genSaltSync(10)
const photosMiddleware = multer({ dest: 'uploads' })

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
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

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const userDoc = await User.findOne({ email })
  if (!userDoc) {
    return res.status(404).json({ message: 'User not found' })
  }
  const checkPassword = await bcrypt.compare(password, userDoc.password)
  if (!checkPassword) {
    return res.status(401).json({ message: 'Incorrect password' })
  }
  const token = jwt.sign(
    { email: userDoc.email, id: userDoc._id },
    process.env.JWT_SECRET
  )
  res.cookie('token', token).json(userDoc)
})

app.get('/account', (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, _id } = await User.findById(userData.id)
      res.json({ name, email, _id })
    })
  } else {
    res.json(null)
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName
  })
  res.json(newName)
})

app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
  const uploadedFiles = []
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype } = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    // const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(newPath.replace('uploads/', ''))
  }
  res.json(uploadedFiles)
})

app.post('/homes', (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { token } = req.cookies
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    thingsToKnow,
    checkin,
    checkout,
    maxGuests
  } = req.body
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err
    const homesDoc = await Home.create({
      owner: userData.id,
      price,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      thingsToKnow,
      checkin,
      checkout,
      maxGuests
    })
    res.json(homesDoc)
  })
})

app.listen(PORT, () => {
  console.log('Running at PORT: ', PORT)
})
