import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const ListingDetails = () => {
  const {id} = useParams()
  const [listing, setListing] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!id) {return}
    axios.get(`/listings/${id}`).then(res => {
      setListing(res.data)
    })
  }, [id])

  if (!listing) return 'Loading...'

  if (showAllPhotos) {
    return (
      <div>
        <button onClick={() => setShowAllPhotos(false)} className="fixed z-50 border-2 border-black bg-white rounded-full p-1 mx-auto left-5 top-28">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        </button>
        <div className="absolute top-0 md:top-7 left-1/2 transform -translate-x-1/2 py-[23%] sm:py-[6%] w-full max-w-3xl grid grid-cols-2 gap-2">
          {listing?.photos.length > 0 && listing.photos.map(photo => (
            <img 
            key={photo}
            className={`grid-item aspect-video object-cover ${listing.photos.indexOf(photo) % 3 === 1 || listing.photos.indexOf(photo) % 3 === 2 ? "col-span-1" : "col-span-2"}`}
            src={axios.defaults.baseURL + '/uploads/' + photo} 
            alt={photo} />
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-screen max-w-6xl p-5">
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
            <button onClick={() => setShowAllPhotos(true) } className="flex items-center col-start-2 row-start-2 justify-center gap-1 border border-black rounded-md justify-self-end self-end m-3 p-1 text-xs font-black bg-white sm:max-w-sm:px-1 sm:max-w-sm:py-0.5 sm:max-w-sm:text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:max-w-sm:w-3 sm:max-w-sm:h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="hidden sm:inline-block">Show all photos</span>
            </button>
          </div>
        </div>
        <div className="w-full sm:w-2/3 ">
          <p className="font-thin text-sm text-justify py-4 border-b border-gray-300">
            {expanded ? listing.description : listing.description.substring(0, 300) + '... '}
            <span
              className="font-black text-md underline underline-offset-2 flex items-start gap-1 pt-3 cursor-pointer"
              onClick={toggleExpanded}
            >
              {expanded ? 'Show less' : 'Show more'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className={`w-6 h-6 transform ${expanded ? 'rotate-[270deg]' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </p>
        </div>
      </div>
  )
}

export default ListingDetails