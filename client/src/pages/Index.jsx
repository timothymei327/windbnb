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
        <div className='my-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-7 w-screen justify-items-center'>
        {listings.length > 0 && listings.map(listing => (
          <Link to={'/listing/' + listing._id} key={listing._id}>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-xl h-84">
              <img className="w-full h-64 object-cover" src={axios.defaults.baseURL + '/uploads/' + listing.photos[0]} alt="listing" />
              <div className="p-4 font-light">
                <div className="font-semibold text-lg mb-1 truncate">{listing.title}</div>
                <p className="text-gray-500 text-base truncate">
                  {listing.address}
                </p>
                <p className="text-gray-800 mt-1 text-base">
                  <span className="font-semibold text-black">${listing.price}</span> per night
                </p>
              </div>
            </div>
          </Link>
        ))}
        </div>
    )
}

export default Index