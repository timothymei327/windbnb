import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Perks from '../components/Perks'

const Homes = () => {
  const {action} = useParams()

  const [formValues, setFormValues] = useState({
    title: '',
    address: '',
    addedPhotos: [],
    photoLink: '',
    description: '',
    perks: [],
    thingsToKnow: '',
    checkin: '',
    checkout: '',
    maxGuests: 1,
  })

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (e.target.type === 'checkbox') {
      const updatedPerks = checked 
        ? [...formValues.perks, value]
        : formValues.perks.filter(perk => perk !== value);
      setFormValues({ ...formValues, [name]: updatedPerks });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  } 

  const addPhotoByLink = async (e) => {
    e.preventDefault()
    const {addedPhotos, photoLink} = formValues
    const {data: filename} = await axios.post('/upload-by-link', {link: photoLink})
    setFormValues({...formValues, addedPhotos: [...addedPhotos, filename], photoLink: ''})
  }

  return (
    <div>
      {action !== 'new' && (
        <div className='text-center'>
          <Link to={'/account/homes/new'} className='inline-flex gap-1 bg-primary text-white py-2 px-5 rounded-full' >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
            Add new Windbnb</Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form className='sm:max-w-xl max-w-[80%] mx-auto py-5'>
            <label className='text-xl px-1 font-medium'>Title</label>
            <input
              name="title"
              type="text"
              value={formValues.title}
              placeholder='Stylish and Spacious Downtown Apartment'
              onChange={handleChange}
            />
            <label className='text-xl px-1 font-medium'>Address</label>
            <input
            name="address"
            type="text"
            value={formValues.address}
            placeholder='123 Main St, Anytown, USA'
            onChange={handleChange}
            />
            <label className='text-xl px-1 font-medium'>Photos</label>
            <div className='flex gap-1'>
              <input
              name="photoLink"
              type="text"
              value={formValues.photoLink}
              placeholder='Add using a link'
              onChange={handleChange}
              />
              <button onClick={addPhotoByLink} className='bg-gray-200 px-2 my-1 rounded-xl font-medium'>Add&nbsp;photo</button>
            </div>
            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6' >
              <button className='flex gap-1 justify-center border border-gray-300 bg-transparent rounded-xl p-8 mb-2 text-lg text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              </button>
            </div>
            <label className='text-xl px-1 font-medium'>Description</label>
            <textarea
            name="description"
            type="text"
            value={formValues.description}
            rows="5"
            placeholder='Description of your home' 
            onChange={handleChange}
            />
            <Perks name="perks" perks={formValues.perks} handleChange={handleChange}/>
            <label className='text-xl px-1 font-medium'>Things to Know</label>
            <textarea
            name="thingsToKnow"
            value={formValues.thingsToKnow}
            rows="5"
            placeholder='House rules, etc...'
            onChange={handleChange}
            />
            <label className='text-xl px-1 font-medium'>Check-in & Check-out Times</label>
            <div className='flex px-1 my-2'>
              <div className='px-2 gap-1'>
                <label>Check-in</label>
                <input
                name="checkin"
                type="time"
                value={formValues.checkin}
                onChange={handleChange}
                />
              </div>
              <div className='px-2 gap-1'>
                <label>Check-out</label>
                <input
                name="checkout"
                type="time"
                value={formValues.checkout}
                onChange={handleChange}
                />
              </div>
              <div className='px-2 gap-1'>
                <label>Max Guests</label>
                <input
                name="maxGuests"
                type="number"
                value={formValues.maxGuests}
                placeholder='5'
                onChange={handleChange}
                />
              </div>
            </div>
            <button className='primary'>Save</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Homes