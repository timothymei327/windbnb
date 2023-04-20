import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AccountNav from '../components/AccountNav'

const Listings = () => {
  const [houses, setHouses] = useState([])

  useEffect(() => {
    axios.get('/account/listings').then(({data}) => {
      setHouses(data)
    })
  }, [])

  return (
    <div className='px-5 pb-8 w-screen sm:w-full'>
      <AccountNav />
        <div className='text-center'>
          <Link to={'/account/listings/new'} className='inline-flex gap-1 bg-primary text-white py-2 px-5 rounded-full' >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
            Add new Windbnb</Link>
        </div>
        <div className='mt-10'>
        {houses.length > 0 && houses.map(house => (
          <Link to={'/account/listings/' + house._id} key={house._id}>
            <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden sm:max-w-2xl mt-5">
              <div className="sm:flex">
                <div className="sm:shrink-0">
                  <img className="h-48 w-full object-cover sm:h-full sm:w-48" src={axios.defaults.baseURL + '/uploads/' + house.photos[0]} alt="house" />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-primary font-semibold">{house.title}</div>
                  <p className="mt-2 text-slate-600">{house.description.length > 200 ? house.description.substring(0,200) + '...' : house.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        </div>
    </div>
  )
}

export default Listings