import axios from "axios";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext({})

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!user) {
      const res = axios.get('/account').then(() => {
        setUser(res.data)
        setReady(true)
      })
    }
  }, [])

  return(
    <UserContext.Provider value={{user, setUser, ready}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }