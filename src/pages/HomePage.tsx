import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const UsersPageContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`
const HomePage = () => {
  const history = useHistory()
  return (
    <UsersPageContainer>
      <h1>Hello, please, log in or sign up!</h1>
      <ButtonContainer>
        <Button
          onClick={() => history.push('/login')}
          variant='outlined'
          color='secondary'
        >
          Log In
        </Button>
        <Button
          onClick={() => history.push('/register')}
          variant='outlined'
          color='secondary'
        >
          Register
        </Button>
      </ButtonContainer>
    </UsersPageContainer>
  )
}
export default HomePage
