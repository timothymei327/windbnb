import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import PhotosUploader from "../components/PhotosUploader"
import Perks from "../components/Perks"
import AccountNav from '../components/AccountNav'

const ListingsForm = () => {
  let navigate = useNavigate()
  const {id} = useParams()

  const initialValues = {
    title: '',
    address: '',
    photos: [],
    photoLink: '',
    description: '',
    perks: [],
    thingsToKnow: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 1,
    price: 100,
  }

  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (e.target.type === 'checkbox') {
      const updatedPerks = checked 
        ? [...formValues.perks, value]
        : formValues.perks.filter(perk => perk !== value)
      setFormValues({ ...formValues, [name]: updatedPerks })
    } else {
      if (e.target.className === 'placeholder-red-400 border border-red-500' && e.target.value.length > 0){
        e.target.className = ''
      }
      setFormValues({ ...formValues, [name]: value })
    }
  }

  const saveListing = async (e) => {
    e.preventDefault()
    if (id) {
      await axios.put('/listings', {id, formValues})
      setFormValues(initialValues)
      navigate('/account/listings')
    } else {
      await axios.post('/listings', formValues)
      setFormValues(initialValues)
      navigate('/account/listings')
    }
  }
  
  const deletePhotos = async () => {
    try {
      let fileNames = formValues.photos
      await axios.delete('/allPhotos', {data: {fileNames}})
      console.log('Photos deleted successfully')
    } catch (error) {
      console.log('Error deleting photos:', error.message)
    }
  }
  
  const deleteListing = async () => {
    try {
      const res = await axios.delete(`/listings/${id}`)
      navigate('/index')
      console.log('Listing deleted successfully')
      return res.data
    } catch (error) {
      console.log('Error deleting listing:', error.message)
      throw error
    }
  }

  const deleteBookings = async () => {
    try {
      await axios.delete(`/listings/bookings/${id}`)
      console.log('Bookings deleted successfully')
    } catch (error) {
      console.log('Error deleting bookings:', error.message)
    }
  }
  
  const handleDeleteButtonClick = async () => {
    try {
      await Promise.all([deletePhotos(), deleteBookings(), deleteListing()])
      console.log('Deletion process completed successfully')
      navigate('/index')
    } catch (error) {
      console.log('Error deleting files:', error.message)
    }
  }  

  const handleInvalid = (e) => {
      e.target.className = 'placeholder-red-400 border border-red-500'
  }

  useEffect(() => {
    if (!id){
      return
    }
    axios.get('/listings/' + id).then(res => {
      const {data} = res
      setFormValues({
        title: data.title,
        address: data.address,
        photos: data.photos,
        photoLink: '',
        description: data.description,
        perks: [...data.perks],
        thingsToKnow: data.thingsToKnow,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        maxGuests: data.maxGuests,
        price: data.price
      })
    })
  }, [id])

  return (
    <div>
      <AccountNav />
        <div>
          <form className='sm:max-w-xl max-w-[80%] mx-auto py-5' onSubmit={saveListing}>
            <label className='text-xl px-1 font-medium'>Title</label>
            <input
              name="title"
              type="text"
              value={formValues.title}
              placeholder='Stylish and Spacious Downtown Apartment'
              onChange={handleChange}
              onInvalid={handleInvalid}
              required
            />
            <label className='text-xl px-1 font-medium'>Address</label>
            <input
            name="address"
            type="text"
            value={formValues.address}
            placeholder='123 Main St, Anytown, USA'
            onChange={handleChange}
            onInvalid={handleInvalid}
            required
            />
            <PhotosUploader formValues={formValues} setFormValues={setFormValues} handleChange={handleChange}/>
            <label className='text-xl px-1 font-medium'>Description</label>
            <textarea
            name="description"
            type="text"
            value={formValues.description}
            rows="5"
            placeholder='Description of your listing' 
            onChange={handleChange}
            onInvalid={handleInvalid}
            required
            />
            <Perks name="perks" perks={formValues.perks} handleChange={handleChange}/>
            <label className='text-xl px-1 font-medium'>Things to Know</label>
            <textarea
            name="thingsToKnow"
            value={formValues.thingsToKnow}
            rows="5"
            placeholder='House rules, etc...'
            onChange={handleChange}
            onInvalid={handleInvalid}
            required
            />
            <label className='text-xl px-1 font-medium'>Check-in & Check-out Times</label>
            <div className='flex flex-wrap px-1 my-2'>
              <div className='px-2 gap-1 w-60'>
                <label>Check-in</label>
                <input
                name="checkIn"
                type="time"
                value={formValues.checkIn}
                onChange={handleChange}
                onInvalid={handleInvalid}
                required
                />
              </div>
              <div className='px-2 gap-1 w-60'>
                <label>Check-out</label>
                <input
                name="checkOut"
                type="time"
                value={formValues.checkOut}
                onChange={handleChange}
                onInvalid={handleInvalid}
                required
                />
              </div>
              <div className='px-2 gap-1 w-60'>
                <label>Max Guests</label>
                <input
                name="maxGuests"
                type="number"
                value={formValues.maxGuests}
                placeholder='1'
                onChange={handleChange}
                required
                />
              </div>
              <div className='px-2 gap-1 w-60'>
                <label>Price Per Night ($)</label>
                <input
                name="price"
                type="number"
                value={formValues.price}
                placeholder='100'
                onChange={handleChange}
                required
                />
              </div>
            </div>
            {id && <button className='bg-[#FC642D] text-white text-opacity-80 my-1 p-3 w-full rounded-lg' onClick={handleDeleteButtonClick}>Delete</button>}
            <button className='primary' type='submit'>Save</button>
          </form>
        </div>
    </div>
  )
}

export default ListingsForm