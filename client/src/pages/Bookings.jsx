import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AccountNav from '../components/AccountNav'

const Bookings = () => {
  const [bookings, setBookings] = useState('')
  useEffect(() => {
    axios.get('/bookings').then(res => {
    setBookings(res.data)
    })
  }, [])

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <div>
            <Link to={'/account/bookings/' + booking.id} key={booking.id}>
              <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden sm:max-w-2xl mt-5">
                <div className="sm:flex">
                  <div className="sm:shrink-0">
                    <img className="h-48 w-full object-cover sm:h-full sm:w-48" src={axios.defaults.baseURL + '/uploads/' + booking.listing.photos[0]} alt="house" />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-primary font-semibold">{booking.listing.title}</div>
                    <ul className="mt-2 text-slate-600 w-screen">
                      <li>Guests: {booking.guests}</li>
                      <li>Check-in: {booking.checkInDate}</li>
                      <li>Check-out: {booking.checkOutDate}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bookings