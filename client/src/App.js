import axios from 'axios'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './components/UserContext'
import Layout from './components/Layout'
import Index from './pages/Index'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Listings from './pages/Listings'
import ListingsForm from './pages/ListingsForm'
import ListingDetails from './pages/ListingDetails'
import Bookings from './pages/Bookings'
import BookingDetails from './pages/BookingDetails'

axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.withCredentials = true

function App() {
  const FRONTENDURL = 'http://localhost:3000'
  const [listing, setListing] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  return (
    <UserContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              FRONTENDURL={FRONTENDURL}
              listing={listing}
              setListing={setListing}
              showAllPhotos={showAllPhotos}
              setShowAllPhotos={setShowAllPhotos}
            />
          }
        >
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/listings" element={<Listings />} />
          <Route path="/account/listings/new" element={<ListingsForm />} />
          <Route path="/account/listings/:id" element={<ListingsForm />} />
          <Route
            path="/listing/:id"
            element={
              <ListingDetails
                FRONTENDURL={FRONTENDURL}
                listing={listing}
                setListing={setListing}
                showAllPhotos={showAllPhotos}
                setShowAllPhotos={setShowAllPhotos}
              />
            }
          />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route
            path="/account/bookings/:id"
            element={
              <BookingDetails
                showAllPhotos={showAllPhotos}
                setShowAllPhotos={setShowAllPhotos}
              />
            }
          />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
