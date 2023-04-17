import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import GuestDropdown from "./GuestDropdown"

const ListingMobileFooter = ({FRONTENDURL, listing, bookingValues, setBookingValues, numberOfNights}) => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'checkInDate':
        setBookingValues({
          ...bookingValues,
          checkInDate: value,
          checkOutDate: bookingValues.checkOutDate < value ? '' : bookingValues.checkOutDate,
          totalPrice: listing.price * numberOfNights
        });
        break;
      case 'checkOutDate':
        setBookingValues({
          ...bookingValues,
          checkOutDate: value,
          checkInDate: bookingValues.checkInDate > value ? '' : bookingValues.checkInDate,
          totalPrice: listing.price * numberOfNights
        });
        break;
      default:
        break;
    }
  };

  if (currentLocation.includes(FRONTENDURL + '/listing') && screenSize < 640) {
    return (
      <div className="flex sm:hidden fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="p-4 flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <p><span className="text-black font-bold">${listing && listing.price}</span> night</p>
            <GuestDropdown optionsCount={listing.maxGuests} bookingValues={bookingValues} setBookingValues={setBookingValues}/>
            <div className='flex gap-2 text-sm'>
            <input type='date' className='underline underline-offset-2 w-2/5' name="checkInDate" value={bookingValues.checkInDate} onChange={handleChange}/>
            -
            <input type='date' className='underline underline-offset-2 w-2/5' name="checkOutDate" value={bookingValues.checkOutDate} onChange={handleChange}/>
            </div>
          </div>
          <div className="flex flex-col text-center gap-1">
            <span className="font-semibold">${bookingValues.totalPrice} total</span>
            <button className='border border-primary bg-primary text-white px-5 py-2 rounded-lg'>Reserve</button>
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