import { useContext } from "react"
import { UserContext } from "../components/UserContext"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Homes from "./Homes"
import AccountNav from "../components/AccountNav"

const Account = () => {
  const {user, setUser, ready} = useContext(UserContext)
  let navigate = useNavigate()
  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'account'
  }

  if (!ready) {
    return 'Loading...'
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />
  }

  const logout = async () => {
    await axios.post('/logout')
    navigate('/login')
    setUser(null)
  }


  return(
    <div>
      <AccountNav />
      {subpage === 'account' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'homes' && (<Homes />)}
    </div>
  )
}

export default Account