import axios from "axios"
import { useEffect, useState } from "react"
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
            Check-in: {booking.checkInDate} Check-out: {booking.checkOutDate}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bookings