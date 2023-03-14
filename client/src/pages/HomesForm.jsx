import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import PhotosUploader from "../components/PhotosUploader"
import Perks from "../components/Perks"

const HomesForm = ({formValues, setFormValues, handleChange, initialValues}) => {
  const {action} = useParams()
  let navigate = useNavigate()
  
  const addNewHome = async (e) => {
    e.preventDefault()
    await axios.post('/homes', formValues)
    setFormValues(initialValues)
    navigate('/account/homes')
  }

  const handleInvalid = (e) => {
      e.target.className = 'placeholder-red-400 border border-red-500'
  }


  return (
    <div>
      {action === 'new' && (
        <div>
          <form className='sm:max-w-xl max-w-[80%] mx-auto py-5' onSubmit={addNewHome}>
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
            placeholder='Description of your home' 
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
            <div className='flex px-1 my-2'>
              <div className='px-2 gap-1'>
                <label>Check-in</label>
                <input
                name="checkin"
                type="time"
  
                value={formValues.checkin}
                onChange={handleChange}
                onInvalid={handleInvalid}
                required
                />
              </div>
              <div className='px-2 gap-1'>
                <label>Check-out</label>
                <input
                name="checkout"
                type="time"
  
                value={formValues.checkout}
                onChange={handleChange}
                onInvalid={handleInvalid}
                required
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
                onInvalid={handleInvalid}
                required
                />
              </div>
            </div>
            <button className='primary' type='submit'>Save</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default HomesForm