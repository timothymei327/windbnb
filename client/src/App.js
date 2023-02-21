import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './components/UserContext'
import Layout from './components/Layout'
import Index from './pages/Index'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'

axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account/:subpage?" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
