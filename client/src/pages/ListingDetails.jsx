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
    <div className="mt-8 w-[84vw] grid grid-cols-[60%,40%]">
      <h2 className="text-3xl text-left mb-3">
      {listing.title}
      </h2>
      <br />
      <p className="text-sm font-bold">{listing.address}</p>
    </div>
  )
}

export default ListingDetails