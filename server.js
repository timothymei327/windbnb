const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('./db')
const PORT = process.env.PORT || 3001
const { User, Listing, Booking } = require('./models')
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

app.delete('/allPhotos', (req, res) => {
  const { fileNames } = req.body
  if (!Array.isArray(fileNames)) {
    return res.status(400).json({ message: 'Invalid fileNames parameter' })
  }
  const errors = []
  fileNames.forEach((fileName) => {
    fs.unlink(__dirname + '/uploads/' + fileName, (err) => {
      if (err) {
        errors.push({ fileName, message: 'Could not delete the file. ' + err })
      }
    })
  })
  if (errors.length) {
    return res.status(500).json({ errors })
  }
  res.status(200).json({ message: 'Files are deleted.' })
})

app.post('/listings', (req, res) => {
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
    const createListing = await Listing.create({
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
    res.json(createListing)
  })
})

app.get('/listings', (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    const { id } = userData
    res.json(await Listing.find({ owner: id }))
  })
})

app.get('/listings/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Listing.findById(id))
})

app.put('/listings', async (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err
    const modifyListing = await Listing.findByIdAndUpdate(
      req.body.id,
      req.body.formValues
    )
    res.json(modifyListing)
  })
})

app.delete('/listings/:id', (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err
    const deletedListing = await Listing.findOneAndDelete({
      _id: req.params.id,
      owner: userData.id
    })
    if (!deletedListing) {
      res.status(404).json({
        message: 'Listing not found or you are not authorized to delete it'
      })
    } else {
      res.json(deletedListing)
    }
  })
})

app.get('/listings', async (req, res) => {
  res.json(await Listing.find())
})

app.get('/listings/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Listing.findById(id))
})

app.post('/bookings', async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL)
    const userData = await new Promise((resolve, reject) => {
      jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET,
        {},
        (err, userData) => {
          if (err) reject(err)
          resolve(userData)
        }
      )
    })
    const {
      checkInDate,
      checkOutDate,
      guests,
      numberOfNights,
      totalPrice,
      listing
    } = req.body
    const createBooking = await Booking.create({
      tenant: userData.id,
      listing,
      checkInDate,
      checkOutDate,
      guests,
      numberOfNights,
      totalPrice
    })
    res.json(createBooking)
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

app.get('/bookings', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      {},
      async (err, userData) => {
        if (err) throw err
        resolve(userData)
      }
    )
  }).then(async (userData) => {
    res.json(await Booking.find({ tenant: userData.id }).populate('listing'))
  })
})

app.delete('/bookings/:id', async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL)
    const userData = await new Promise((resolve, reject) => {
      jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET,
        {},
        (err, userData) => {
          if (err) reject(err)
          resolve(userData)
        }
      )
    })
    await Booking.deleteOne({ _id: req.params.id, tenant: userData.id })
    res.sendStatus(204) // send success response with no content
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

app.delete('/listings/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await Booking.deleteMany({ listing: id })
    res.send(`${result.deletedCount} bookings deleted successfully.`)
  } catch (error) {
    console.log(`Error deleting bookings: ${error.message}`)
    res.status(500).send('An error occurred while deleting bookings.')
  }
})

app.listen(PORT, () => {
  console.log('Running at PORT: ', PORT)
})
