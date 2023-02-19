import axios from "axios";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext({})

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!user) {
      const res = axios.get('/profile').then(() => {
        setUser(res.data)
      })
    }
  }, [])

  return(
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }