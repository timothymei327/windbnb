import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import NumberDropdown from "./GuestDropdown"

const ListingMobileFooter = ({FRONTENDURL, listing, bookingValues, setBookingValues}) => {
  const location = useLocation()
  const [currentLocation, setCurrentLocation] = useState('')
  const [screenSize, setScreenSize] = useState('')

  useEffect(() => {
    setCurrentLocation(window.location.href)

    const handleResize = () => {
      setScreenSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [location])

  const handleChange = (e) => {
    setBookingValues({ ...bookingValues, [e.target.name]: e.target.value })
  }

  if (currentLocation.includes(FRONTENDURL + '/listing') && screenSize < 640) {
    return (
      <div className="flex sm:hidden fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="py-6 px-4 flex w-full items-center justify-between">
          <div className="text-left">
            <span className="text-black font-bold">${listing && listing.price}</span> night
            <span>(total)</span>
            <NumberDropdown optionsCount={listing.maxGuests} bookingValues={bookingValues} setBookingValues={setBookingValues}/>
            <div className='flex gap-2 text-sm'>
            <input type='date' className='underline underline-offset-2 w-2/5' />
            -
            <input type='date' className='underline underline-offset-2 w-2/5' />
            </div>
          </div>
          <div>
            <button className='border border-primary bg-primary text-white px-4 py-2 rounded-lg'>Reserve</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}
export default ListingMobileFooter