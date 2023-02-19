import { createContext } from "react";

const UserContext = createContext({})

const UserContextProvider = () => {
  return({
    children
  })
}

export default { UserContext, UserContextProvider }