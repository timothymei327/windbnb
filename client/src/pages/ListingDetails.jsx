import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const ListingDetails = ({listing, setListing, showAllPhotos, setShowAllPhotos}) => {
  const {id} = useParams()
  const [expanded, setExpanded] = useState({
    description: false,
    thingsToKnow: false
  });

  const toggleExpanded = (e) => {
    switch(e.target.name) {
      case 'description':
        setExpanded({...expanded, description: !expanded.description});
        break
      case 'thingsToKnow':
        setExpanded({...expanded, thingsToKnow: !expanded.thingsToKnow});
        break
    }
  }

  const convertTime = (time) => {
    const [hour, minute] = time.split(':');
    const convertedHour = (hour > 12) ? hour - 12 : hour;
    const amPm = (hour >= 12) ? 'PM' : 'AM';
    return `${convertedHour}:${minute} ${amPm}`;
  }  

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
    <h2 className="text-4xl pb-3 font-medium">
        {listing.title}
        </h2>
        <p className="text-sm font-medium pb-5">{listing.address}</p>
        <div className="grid grid-cols-2 gap-2 border border-hidden rounded-xl overflow-hidden mb-10">
          <div>
            <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + listing?.photos[0]} alt="listing1" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + listing?.photos[1]} alt="listing2" />
            <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + listing?.photos[2]} alt="listing3" />
            <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + listing?.photos[3]} alt="listing4" />
            <img className="aspect-square object-cover col-start-2 row-start-2" src={axios.defaults.baseURL + '/uploads/' + listing?.photos[4]} alt="listing 5" />
            <button onClick={() => setShowAllPhotos(true) } className="flex items-center col-start-2 row-start-2 justify-center gap-1 border border-black rounded-md justify-self-end self-end m-3 p-1 text-xs font-medium bg-white sm:max-w-sm:px-1 sm:max-w-sm:py-0.5 sm:max-w-sm:text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:max-w-sm:w-3 sm:max-w-sm:h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="hidden sm:inline-block">Show all photos</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[3fr_2fr]">
          <div className="col-span-2 sm:col-span-1">
            <h2 className="font-medium text-xl pb-3">Description</h2>
            <p className="font-light text-gray-600 text-sm text-justify pb-8 border-b border-gray-300">
              { listing.description.length > 300 ? (expanded.description ? listing.description : listing.description.substring(0, 300) + '... ') : listing.description }
            { listing.description.length > 300 &&
              <button
                className="font-semibold text-black w-fit text-md underline underline-offset-2 flex items-start pt-3 cursor-pointer"
                name='description'
                onClick={toggleExpanded}
              >
                {expanded.description ? 'Show less' : 'Show more'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 22 28"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-6 h-6 transform ${expanded.description ? 'rotate-[270deg]' : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 row-start-2 py-8">
          <h2 className="font-medium text-xl pb-3">Things to Know</h2>
            <p className="font-light text-gray-600 text-sm text-justify border-b pb-8 gap-1 border-gray-300">
              { listing.thingsToKnow.length > 300 ? (expanded.thingsToKnow ? listing.thingsToKnow : listing.thingsToKnow.substring(0, 300) + '... ') : listing.thingsToKnow }
            { listing.thingsToKnow.length > 300 &&
              <button
                className="font-semibold text-black w-fit text-md underline underline-offset-2 flex items-start pt-3 cursor-pointer"
                name='thingsToKnow'
                onClick={toggleExpanded}
              >
                {expanded.thingsToKnow ? 'Show less' : 'Show more'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 22 28"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-6 h-6 transform ${expanded.thingsToKnow ? 'rotate-[270deg]' : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 row-start-3 border-b border-gray-300 pb-8 font-light text-sm text-gray-600 flex flex-wrap justify-between gap-3">
            <h3 className="font-medium text-xl text-black w-full">House Rules</h3>
            <p>Check-in after {convertTime(listing.checkIn)}</p>
            <p>Checkout before {convertTime(listing.checkOut)}</p>
            <p>{listing.maxGuests} guests maximum</p>
          </div>
          <div className="row-span-2 h-fit bg-white shadow-xl border border-gray-300 p-4 rounded-2xl w-4/5 mx-auto font-light text-xs hidden sm:inline-block mx-auto">
            <p className="text-lg"><span className="font-semibold">${listing.price}</span> night</p>
            <form className="border border-gray-400 rounded-2xl my-4">
              <div className="flex">
                <div className="py-3 px-4 w-1/2 overflow-hidden">
                  <label className="font-semibold">CHECK-IN</label>
                  <input className="w-full" type="date"/>
                </div>
                <div className="py-3 px-4 border-l border-gray-400 w-1/2 overflow-hidden">
                  <label className="font-semibold whitespace-nowrap">CHECK-OUT</label>
                  <input className="w-full" type="date"/>
                </div>
              </div>
              <div className="py-3 px-4 border-t border-gray-400">
                <label className="font-semibold">GUESTS</label>
                <input className="border-gray-400" type="number" min="1" max={listing.maxGuests} placeholder="1 guest"/>
              </div>
            </form>
            <button className="primary text-lg font-semisbold">Reserve</button>
          </div>
        </div>
    </div>
  )
}

export default ListingDetails