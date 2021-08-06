import Button from '@material-ui/core/Button'
import React, { FC } from 'react'
import styled from 'styled-components'
const StyledAuthButton = styled(Button)``
const AuthButtonContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
`
interface AuthButtonProps {
  color: 'default' | 'inherit' | 'primary' | 'secondary'
  logout: () => void
}

const AuthButton: FC<AuthButtonProps> = ({ children, color, logout }) => {
  return (
    <AuthButtonContainer>
      <StyledAuthButton onClick={logout} variant='outlined' color={color}>
        {children}
      </StyledAuthButton>
    </AuthButtonContainer>
  )
}

export default AuthButton
