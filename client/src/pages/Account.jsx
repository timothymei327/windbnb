import { useContext } from "react"
import { UserContext } from "../components/UserContext"
import { Navigate } from "react-router-dom"

const Account = () => {
  const {user, ready} = useContext(UserContext)

  if (!ready) {
    return 'Loading...'
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />
  }

  return(
    <div>account page for {user.name}</div>
  )
}

export default Account