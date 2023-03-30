import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const ListingDetails = () => {
  const {id} = useParams()
  const [listing, setListing] = useState(null)

  useEffect(() => {
    if (!id) {return}
    axios.get(`/listings/${id}`).then(res => {
      setListing(res.data)
    })
  }, [id])

  if (!listing) return 'Loading...'

  return (
    <div className="w-screen p-5">
    <h2 className="text-3xl pb-3 font-extrabold">
        {listing.title}
        </h2>
        <p className="text-sm font-bold pb-5">{listing.address}</p>
        <div className="grid grid-cols-2 gap-2 border border-hidden rounded-xl overflow-hidden">
          <div>
            <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + listing?.photos[0]} alt="listing1" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + listing?.photos[1]} alt="listing2" />
            <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + listing?.photos[2]} alt="listing3" />
            <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + listing?.photos[3]} alt="listing4" />
            <img className="aspect-square object-cover col-start-2 row-start-2" src={axios.defaults.baseURL + '/uploads/' + listing?.photos[4]} alt="listing 5" />
            <button className="flex items-center col-start-2 row-start-2 justify-center gap-1 border border-black rounded-md w-[80%] h-[25%] justify-self-end self-end m-2 p-1 text-xs font-black bg-white sm:max-w-sm:px-1 sm:max-w-sm:py-0.5 sm:max-w-sm:text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:max-w-sm:w-3 sm:max-w-sm:h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="hidden sm:inline-block">Show all photos</span>
            </button>
          </div>
        </div>
      </div>
  )
}

export default ListingDetails