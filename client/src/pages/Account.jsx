import { useContext } from "react"
import { UserContext } from "../components/UserContext"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import axios from "axios"

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

  const linkClasses = (type = null) => {
    let classes = 'py-2 px-6 '
    if (type === subpage) {
      classes += 'bg-primary text-white rounded-full'
    }
    return classes
  }

  const logout = async () => {
    await axios.post('/logout')
    navigate('/')
    setUser(null)
  }


  return(
    <div>
      <nav className="w-full flex justify-center my-8 gap-2">
        <Link className={linkClasses('account')} to={'/account'}>My Account</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
        <Link className={linkClasses('accommodations')} to={'/account/accommodations'}>My Accommodations</Link>
      </nav>
      {subpage === 'account' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
    </div>
  )
}

export default Account