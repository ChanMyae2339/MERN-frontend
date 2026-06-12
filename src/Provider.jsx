import React,{createContext} from 'react'

export const AppContext = createContext()

const Provider = ({children}) => {
    const [accessUser,setAccessUser] = React.useState(false)
    console.log("accessUser", accessUser);
  return (
    <AppContext.Provider value={{accessUser,setAccessUser}}>
      {children}
    </AppContext.Provider>
  )
}

export default Provider
