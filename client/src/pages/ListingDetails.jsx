import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { differenceInCalendarDays, parse, isAfter } from "date-fns";
import axios from "axios"
import ListingMobileFooter from "../components/ListingMobileFooter"

const ListingDetails = ({FRONTENDURL, listing, setListing, showAllPhotos, setShowAllPhotos}) => {
  const {id} = useParams()
  let navigate = useNavigate()
  const [bookingValues, setBookingValues] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    numberOfNights: 0,
    totalPrice: 0
  })
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
      default:
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
  }, [id, setListing])

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newCheckInDate = bookingValues.checkInDate;
    let newCheckOutDate = bookingValues.checkOutDate;
    let newNumberOfNights = bookingValues.numberOfNights;
    let newTotalPrice = bookingValues.totalPrice;
  
    switch (name) {
      case 'checkInDate':
        newCheckInDate = value;
        if (bookingValues.checkOutDate && isAfter(parse(value, 'yyyy-MM-dd', new Date()), parse(bookingValues.checkOutDate, 'yyyy-MM-dd', new Date()))) {
          newCheckOutDate = '';
        }
        break;
      case 'checkOutDate':
        newCheckOutDate = value;
        if (bookingValues.checkInDate && isAfter(parse(bookingValues.checkInDate, 'yyyy-MM-dd', new Date()), parse(value, 'yyyy-MM-dd', new Date()))) {
          newCheckInDate = '';
        }
        break;
      case 'guests':
        setBookingValues({
          ...bookingValues,
          guests: value
        });
        return;
      default:
        break;
    }
  
    if (newCheckInDate && newCheckOutDate) {
      newNumberOfNights = differenceInCalendarDays(parse(newCheckOutDate, 'yyyy-MM-dd', new Date()), parse(newCheckInDate, 'yyyy-MM-dd', new Date()));
      newTotalPrice = listing.price * newNumberOfNights;
    } else {
      newNumberOfNights = 0;
      newTotalPrice = 0;
    }
  
    setBookingValues({
      ...bookingValues,
      checkInDate: newCheckInDate,
      checkOutDate: newCheckOutDate,
      numberOfNights: newNumberOfNights,
      totalPrice: newTotalPrice
    });
  };
  
  const createBooking = async () => {
    const res = await axios.post('/bookings', {...bookingValues, listing: listing._id})
    const bookingId = res.data._id
    navigate(`/account/bookings/${bookingId}`)
  }

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
    <div>
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
                <span className="hidden sm:inline-block whitespace-nowrap">Show all photos</span>
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
            <div className="col-span-2 sm:col-span-1 row-start-3 border-b border-gray-300 pb-8 font-light text-sm text-gray-600 flex flex-col gap-3">
              <h3 className="font-medium text-xl text-black w-full">House Rules</h3>
              <p>Check-in after {convertTime(listing.checkIn)}</p>
              <p>Checkout before {convertTime(listing.checkOut)}</p>
              <p>{listing.maxGuests} guests maximum</p>
            </div>
            <div className="row-span-2 h-fit bg-white shadow-xl border border-gray-300 p-4 rounded-2xl w-4/5 mx-auto font-light text-xs hidden sm:inline-block mx-auto">
              <p className="text-lg"><span className="font-semibold text-xl">${listing.price}</span> night</p>
              <form className="border border-gray-400 rounded-2xl my-4">
                <div className="flex">
                  <div className="py-3 px-4 w-1/2 overflow-hidden">
                    <label className="font-semibold">CHECK-IN</label>
                    <input className="w-full" type="date" name="checkInDate" value={bookingValues.checkInDate} onChange={handleChange}/>
                  </div>
                  <div className="py-3 px-4 border-l border-gray-400 w-1/2 overflow-hidden">
                    <label className="font-semibold whitespace-nowrap">CHECK-OUT</label>
                    <input className="w-full" type="date" name="checkOutDate" value={bookingValues.checkOutDate} onChange={handleChange}/>
                  </div>
                </div>
                <div className="py-3 px-4 border-t border-gray-400">
                  <label className="font-semibold">GUESTS</label>
                  <input className="border-gray-400" type="number" name="guests" value={bookingValues.guests} onChange={handleChange} min="1" max={listing.maxGuests} placeholder="1 guest"/>
                </div>
              </form>
              <div className="flex justify-between text-lg py-3">
                <span className="underline decoration-1">${listing.price} X {bookingValues.numberOfNights} nights</span>
                <span>${bookingValues.totalPrice}</span>
              </div>
              <button className="primary text-lg font-semisbold" onClick={createBooking}>Reserve</button>
              <div className="text-xl px-2 mt-3 pt-3 flex justify-between border-t border-gray-400 font-medium">Total <span>${bookingValues.totalPrice}</span></div>
            </div>
          </div>
      </div>
        <ListingMobileFooter FRONTENDURL={FRONTENDURL} listing={listing} bookingValues={bookingValues} setBookingValues={setBookingValues} handleChange={handleChange} createBooking={createBooking}/>
    </div>
  )
}

export default ListingDetails