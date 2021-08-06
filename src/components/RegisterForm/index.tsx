import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { useFormik } from 'formik'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { useState } from 'react'
import { AuthContainer, StyledGrid, StyledGridContainer } from './styled'
import { useHistory } from 'react-router-dom'

interface RegStatusProps {
  text: string
  status: 'success' | 'error' | 'undefined'
}

const RegisterForm = () => {
  const history = useHistory()
  const [regStatus, setRegStatus] = useState<RegStatusProps>({
    text: '',
    status: 'undefined',
  })
  let status = 'undefined'
  if (regStatus.status === 'success') {
    status = 'success'
  } else {
    status = 'error'
  }
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:3001/users', {
          username: values.login,
          password: values.password,
        })
        setRegStatus({
          text: 'Your account was successfully created!',
          status: 'success',
        })
      } catch (e) {
        setRegStatus({
          text: 'Something went wrong with server!',
          status: 'error',
        })
      }
    },
  })

  return (
    <AuthContainer>
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
              <p className={status}>{regStatus.text}</p>
              <Button variant='contained' color='primary' type='submit'>
                Register
              </Button>
            </StyledGrid>
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
    </AuthContainer>
  )
}
export default RegisterForm
