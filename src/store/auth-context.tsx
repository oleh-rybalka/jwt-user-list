import axios from 'axios'
import React, { FC, useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'

export interface ContextProps {
  token: string | null
  isLoggedIn: boolean | null
  login: (token: string) => void
  logout: () => void
}
const AuthContext = React.createContext<ContextProps>({
  token: '',
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
})

export const AuthContextProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean | null>(null)
  const loginHandler = (token: string) => {
    setToken(token)
    token && setUserIsLoggedIn(true)
  }
  const logoutHandler = () => {
    setToken(null)
    setUserIsLoggedIn(false)
    localStorage.removeItem('refreshToken')
  }
  const contextValue: ContextProps = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }
  const refresh = useCallback(async () => {
    if (!localStorage.getItem('refreshToken')) {
      setUserIsLoggedIn(false)
      return
    } else {
      const config = {
        headers: {
          'refresh-token': `${localStorage.getItem('refreshToken')}`,
        },
      }
      const response = await axios.post(
        'http://localhost:3001/auth/refresh',
        {},
        config
      )
      setToken(response.data['access-token'])
      setUserIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <React.Fragment>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </React.Fragment>
  )
}
export default AuthContext
