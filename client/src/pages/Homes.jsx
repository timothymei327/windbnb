import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import HomesForm from './HomesForm'

const Homes = () => {
  const {action} = useParams()

  const initialValues = {
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
      <HomesForm formValues={formValues} setFormValues={setFormValues} handleChange={handleChange} initialValues={initialValues}/>
    </div>
  )
}

export default Homes