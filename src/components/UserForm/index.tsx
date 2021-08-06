import React, { FC } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useFormik } from 'formik'
import { TableData } from '../../core/types'
import { useState } from 'react'
import { StyledGrid, StyledTableCell } from './styled'

interface UserFormProps {
  data: TableData
  updateHandler: (id: string, newData: TableData) => void
  deleteHandler: (id: string) => void
  id: string
}

const UserForm: FC<UserFormProps> = ({
  data,
  id,
  updateHandler,
  deleteHandler,
}) => {
  const formik = useFormik({
    initialValues: data,
    onSubmit: (values) => {
      if (submitType === 'update') {
        updateHandler(id, values)
      } else {
        deleteHandler(id)
      }
    },
  })
  const [submitType, setSubmitType] = useState('')
  return (
    <StyledTableCell colSpan={5}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant='h6' gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='name'
              name='name'
              label='First name'
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='surname'
              name='surname'
              label='Last name'
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.surname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='company'
              name='company'
              label='Company'
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.company}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='country'
              name='country'
              label='Country'
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.country}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id='nationality'
              name='nationality'
              label='Nationality'
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.nationality}
            />
          </Grid>
          <StyledGrid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <Button
              onClick={() => setSubmitType('update')}
              variant='contained'
              color='primary'
              type='submit'
            >
              Update
            </Button>
          </StyledGrid>
          <StyledGrid item xs={12} sm={6}>
            <Button
              onClick={() => setSubmitType('delete')}
              variant='contained'
              color='secondary'
              type='submit'
            >
              Delete
            </Button>
          </StyledGrid>
        </Grid>
      </form>
    </StyledTableCell>
  )
}
export default UserForm
