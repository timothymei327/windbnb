import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const BookingDetails = ({showAllPhotos, setShowAllPhotos}) => {
  const {id} = useParams()
  let navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  const deleteBooking = async () => {
    try {
      const res = await axios.delete(`/bookings/${id}`)
      navigate('/index')
      return res.data
    } catch (error) {
      throw error
    }
  }

  if (!booking) {
    return 'Loading...';
  }

  if (showAllPhotos) {
    return (
      <div>
        <div className="absolute top-0 md:top-7 left-1/2 transform -translate-x-1/2 py-[23%] sm:py-[6%] w-full max-w-3xl grid grid-cols-2 gap-2">
          {booking.listing?.photos.length > 0 && booking.listing.photos.map(photo => (
            <img 
            key={photo}
            className={`grid-item aspect-video object-cover ${booking.listing.photos.indexOf(photo) % 3 === 1 || booking.listing.photos.indexOf(photo) % 3 === 2 ? "col-span-1" : "col-span-2"}`}
            src={axios.defaults.baseURL + '/uploads/' + photo} 
            alt={photo} />
            ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="w-screen max-w-6xl p-5">
      <h2 className="text-4xl pb-3 font-medium">
          {booking.listing.title}
          </h2>
          <p className="text-sm font-medium pb-5">{booking.listing.address}</p>
          <div className="border border-gray-300 p-3 mb-5 rounded-xl bg-gray-300">
            <h3 className="text-lg font-medium">Booking Information</h3>
            <ul className="flex flex-col gap-1 mt-2 text-slate-700">
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                {booking.numberOfNights} nights
              </li>
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                {booking.checkInDate}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                {booking.checkOutDate}
              </li>
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                {booking.guests} guests
              </li>
              <li className="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              ${booking.totalPrice}
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-2 border border-hidden rounded-xl overflow-hidden mb-10">
            <div>
              <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + booking.listing?.photos[0]} alt="booking.listing1" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + booking.listing?.photos[1]} alt="booking.listing2" />
              <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + booking.listing?.photos[2]} alt="booking.listing3" />
              <img className="aspect-square object-cover" src={axios.defaults.baseURL + '/uploads/' + booking.listing?.photos[3]} alt="booking.listing4" />
              <img className="aspect-square object-cover col-start-2 row-start-2" src={axios.defaults.baseURL + '/uploads/' + booking.listing?.photos[4]} alt="booking.listing 5" />
              <button onClick={() => setShowAllPhotos(true) } className="flex items-center col-start-2 row-start-2 justify-center gap-1 border border-black rounded-md justify-self-end self-end m-3 p-1 text-xs font-medium bg-white sm:max-w-sm:px-1 sm:max-w-sm:py-0.5 sm:max-w-sm:text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:max-w-sm:w-3 sm:max-w-sm:h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span className="hidden sm:inline-block whitespace-nowrap">Show all photos</span>
              </button>
            </div>
          </div>
          <div className="flex justify-around">
            <button className="bg-[#00A699] text-white text-opacity-80 border rounded-md p-3" onClick={() => navigate(`/listing/${booking.listing._id}`)}>View Full Listing</button>
            <button className="bg-[#FC642D] text-white text-opacity-80 border rounded-md p-3" onClick={deleteBooking}>Cancel Booking</button>
          </div>
      </div>
    </div>
  )
}

export default BookingDetails