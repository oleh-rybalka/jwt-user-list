import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { useFormik } from 'formik'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import AuthContext from '../../store/auth-context'
import { LoginContainer, StyledGrid, StyledGridContainer } from './styled'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext)
  const [errorState, setErrorState] = useState('')
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3001/auth/login', {
          username: values.login,
          password: values.password,
        })
        setErrorState('')
        authCtx.login(response.data['access-token'])
        localStorage.setItem('refreshToken', response.data['refresh-token'])
      } catch (e) {
        setErrorState('Autentication failed!')
      }
    },
  })

  return (
    <LoginContainer>
      <StyledGridContainer>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='login'
                name='login'
                label='Login'
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.login}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='password'
                name='password'
                label='Password'
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Grid>
            <StyledGrid item xs={12} sm={12} style={{ textAlign: 'center' }}>
              <Button variant='contained' color='primary' type='submit'>
                Login
              </Button>
            </StyledGrid>
            {errorState && (
              <StyledGrid item xs={12} sm={12} style={{ textAlign: 'center' }}>
                <p style={{ color: 'red' }}>{errorState}</p>
              </StyledGrid>
            )}
            <StyledGrid item xs={12} sm={12} style={{ textAlign: 'center' }}>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => history.goBack()}
              >
                Back
              </Button>
            </StyledGrid>
          </Grid>
        </form>
      </StyledGridContainer>
    </LoginContainer>
  )
}
export default LoginForm
