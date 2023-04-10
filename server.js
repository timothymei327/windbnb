const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('./db')
const PORT = process.env.PORT || 3001
const { User, Home, Booking } = require('./models')
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

app.delete('/photos', (req, res) => {
  fs.unlink(__dirname + '/uploads/' + req.body.fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Could not delete the file. ' + err
      })
    }
    res.status(200).send({
      message: 'File is deleted.'
    })
  })
})

app.post('/homes', (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { token } = req.cookies
  const {
    title,
    address,
    photos,
    description,
    perks,
    thingsToKnow,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err
    const createHome = await Home.create({
      owner: userData.id,
      title,
      address,
      photos,
      description,
      perks,
      thingsToKnow,
      checkIn,
      checkOut,
      maxGuests,
      price
    })
    res.json(createHome)
  })
})

app.get('/homes', (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    const { id } = userData
    res.json(await Home.find({ owner: id }))
  })
})

app.get('/homes/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Home.findById(id))
})

app.put('/homes', async (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err
    const modifyHome = await Home.findByIdAndUpdate(
      req.body.id,
      req.body.formValues
    )
    res.json(modifyHome)
  })
})

app.get('/listings', async (req, res) => {
  res.json(await Home.find())
})

app.get('/listings/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Home.findById(id))
})

app.post('/bookings', (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { token } = req.cookies
  const { checkInDate, checkOutDate, guests, totalPrice } = req.body
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err
    const createBooking = await Booking.create({
      tenant: userData.id,
      listing,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice
    })
    res.json(createBooking)
  })
})

app.listen(PORT, () => {
  console.log('Running at PORT: ', PORT)
})
