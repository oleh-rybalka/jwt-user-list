import React from 'react'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthButton from '../components/AuthButton'
import IdentitiesList from '../components/IdentitiesList'
import AuthContext from '../store/auth-context'

const UsersPage = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext)
  return (
    <React.Fragment>
      <AuthButton
        logout={() => {
          history.push('/home')
          authCtx.logout()
        }}
        color='secondary'
      >
        Logout
      </AuthButton>
      <IdentitiesList />
    </React.Fragment>
  )
}
export default UsersPage
