import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Index = () => {
  const [listings, setListings] = useState([])
  useEffect(() => {
    axios.get('/listings').then(res => {
      setListings(res.data)
    })
  }, [])
  return(
        <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7'>
        {listings.length > 0 && listings.map(listing => (
          <Link to={'/listings/' + listing._id} key={listing._id}>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-xl h-80">
              <img className="w-full h-40 object-cover" src={axios.defaults.baseURL + '/uploads/' + listing.photos[0]} alt="listing" />
              <div className="p-4">
                <div className="font-semibold text-lg mb-2">{listing.title}</div>
                <p className="text-gray-700 text-base">
                  {listing.address}
                </p>
              </div>
            </div>
          </Link>
        ))}
        </div>
    )
}

export default Index