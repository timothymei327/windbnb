import axios from 'axios'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './components/UserContext'
import Layout from './components/Layout'
import Index from './pages/Index'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Homes from './pages/Homes'
import HomesForm from './pages/HomesForm'
import ListingDetails from './pages/ListingDetails'

axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.withCredentials = true

function App() {
  const FRONTENDURL = 'http://localhost:3000'
  const [listing, setListing] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [bookingValues, setBookingValues] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    totalPrice: 0
  })

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
              bookingValues={bookingValues}
              setBookingValues={setBookingValues}
            />
          }
        >
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/homes" element={<Homes />} />
          <Route path="/account/homes/new" element={<HomesForm />} />
          <Route path="/account/homes/:id" element={<HomesForm />} />
          <Route
            path="/listing/:id"
            element={
              <ListingDetails
                FRONTENDURL={FRONTENDURL}
                listing={listing}
                setListing={setListing}
                showAllPhotos={showAllPhotos}
                setShowAllPhotos={setShowAllPhotos}
                bookingValues={bookingValues}
                setBookingValues={setBookingValues}
              />
            }
          />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
