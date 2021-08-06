import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './store/auth-context'
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const AppContainer = styled.div`
  position: relative;
  height: 100vh;
`

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <AppContainer>
      <Switch>
        {authCtx.isLoggedIn === null && <Route path='*'></Route>}
        <Route exact path='/'>
          {authCtx.isLoggedIn ? (
            <Redirect to='/users' />
          ) : (
            <Redirect to='/home' />
          )}
        </Route>

        <Route exact path='/home'>
          <HomePage />
        </Route>
        <Route exact path='/login'>
          {authCtx.isLoggedIn && <Redirect to='/users' />}
          <LoginForm />
        </Route>
        <Route exact path='/register'>
          {authCtx.isLoggedIn && <Redirect to='/users' />}
          <RegisterForm />
        </Route>
        {authCtx.isLoggedIn ? (
          <Route exact path='/users'>
            <UsersPage />
          </Route>
        ) : (
          <Redirect to='/home' />
        )}
      </Switch>
    </AppContainer>
  )
}

export default App
