import { useParams } from "react-router-dom"

const BookingDetails = () => {
  const {id} = useParams()

  return (
    <div>booking details {id}</div>
  )
}

export default BookingDetails