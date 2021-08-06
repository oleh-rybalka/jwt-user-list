import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

export const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .success {
    color: green;
  }
  .error {
    color: red;
  }
`
export const StyledGridContainer = styled.div`
  width: 500px;
`
export const StyledGrid = styled(Grid)`
  text-align: center;
`
