import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { useEffect } from 'react'
import UserForm from '../UserForm'
import { TableData } from '../../core/types'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../../store/auth-context'
import Pagination from '@material-ui/lab/Pagination'
import { useCallback } from 'react'
import { StyledListContainer, StyledPaper } from './styled'
import ExpandableTableRow from '../ExpandableTableRow'
import { useMemo } from 'react'
import { StyledTableCell } from './styled'

enum IdentityStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
}
enum DatapointType {
  START_DATE = 'START_DATE',
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
  COMPANY = 'COMPANY',
  NATIONALITY = 'NATIONALITY',
  COUNTRY = 'COUNTRY',
}
interface Identity {
  id: string
  status: IdentityStatus
  datapoints: Datapoint[]
}

interface Datapoint {
  id: string
  type: DatapointType
  value: string
}

function createData(
  name: string,
  surname: string,
  company: string,
  country: string,
  nationality: string,
  id: string
) {
  return { name, surname, company, country, nationality, id }
}

const IdentitiesList = () => {
  const [page, setPage] = React.useState(1)
  const [data, setData] = useState<Identity[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const authCtx = useContext(AuthContext)

  const users = useMemo(() => {
    return data?.slice(page * 10, page * 10 + 10).map((row) => {
      let name: string = '',
        surname: string = '',
        company: string = '',
        country: string = '',
        nationality: string = ''

      row.datapoints.forEach((cell) => {
        switch (cell.type) {
          case DatapointType.FIRST_NAME:
            name = cell.value
            break
          case DatapointType.LAST_NAME:
            surname = cell.value
            break
          case DatapointType.COMPANY:
            company = cell.value
            break
          case DatapointType.COUNTRY:
            country = cell.value
            break
          case DatapointType.NATIONALITY:
            nationality = cell.value
            break
        }
      })

      return createData(name, surname, company, country, nationality, row.id)
    })
  }, [data, page])

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    const config = {
      headers: {
        'access-token': `${authCtx.token}`,
      },
    }
    let fetchedUsers = await axios.get<Identity[]>(
      `http://localhost:3001/identities`,
      config
    )

    setData(fetchedUsers.data)
    setIsLoading(false)
  }, [authCtx])

  const handleChangePage = useCallback((event: any, page: number) => {
    setPage(page)
  }, [])

  const updateLocalData = useCallback((user, userIndex, updatedUser) => {
    if (user && user.datapoints) {
      user.datapoints = user.datapoints.map((datapoint: any) => {
        switch (datapoint.type) {
          case DatapointType.FIRST_NAME:
            if (datapoint.value !== updatedUser.name) {
              return {
                ...datapoint,
                value: updatedUser.name,
              }
            }
            break
          case DatapointType.LAST_NAME:
            if (datapoint.value !== updatedUser.surname) {
              return {
                ...datapoint,
                value: updatedUser.surname,
              }
            }
            break
          case DatapointType.COMPANY:
            if (datapoint.value !== updatedUser.company) {
              return {
                ...datapoint,
                value: updatedUser.company,
              }
            }
            break
          case DatapointType.COUNTRY:
            if (datapoint.value !== updatedUser.country) {
              return {
                ...datapoint,
                value: updatedUser.country,
              }
            }
            break
          case DatapointType.NATIONALITY:
            if (datapoint.value !== updatedUser.nationality) {
              return {
                ...datapoint,
                value: updatedUser.nationality,
              }
            }
            break
        }

        return datapoint
      })

      setData((prev) => [
        ...prev.slice(0, userIndex),
        user as Identity,
        ...prev.slice(userIndex + 1),
      ])
    }
  }, [])

  const updateHandler = useCallback(
    async (id: string, updatedUser: TableData) => {
      const config = {
        headers: {
          'access-token': `${authCtx.token}`,
        },
      }
      const identities = data.find((identities) => identities.id === id)

      if (identities) {
        identities.datapoints.map(async (datapoint) => {
          switch (datapoint.type) {
            case DatapointType.FIRST_NAME:
              if (datapoint.value !== updatedUser.name) {
                return await axios.patch(
                  `http://localhost:3001/datapoints/${datapoint.id}`,
                  { value: updatedUser.name },
                  config
                )
              }
              break
            case DatapointType.LAST_NAME:
              if (datapoint.value !== updatedUser.surname) {
                return await axios.patch(
                  `http://localhost:3001/datapoints/${datapoint.id}`,
                  { value: updatedUser.surname },
                  config
                )
              }
              break
            case DatapointType.COMPANY:
              if (datapoint.value !== updatedUser.company) {
                return await axios.patch(
                  `http://localhost:3001/datapoints/${datapoint.id}`,
                  { value: updatedUser.company },
                  config
                )
              }
              break
            case DatapointType.COUNTRY:
              if (datapoint.value !== updatedUser.country) {
                return await axios.patch(
                  `http://localhost:3001/datapoints/${datapoint.id}`,
                  { value: updatedUser.country },
                  config
                )
              }
              break
            case DatapointType.NATIONALITY:
              if (datapoint.value !== updatedUser.nationality) {
                return await axios.patch(
                  `http://localhost:3001/datapoints/${datapoint.id}`,
                  { value: updatedUser.nationality },
                  config
                )
              }
              break
          }
        })
      }

      const user = data.find((identity) => identity.id === id)
      const userIndex = data.findIndex((identity) => identity.id === id)
      updateLocalData(user, userIndex, updatedUser)
    },

    [authCtx.token, data, updateLocalData]
  )
  const deleteHandler = useCallback(
    async (id: string) => {
      const config = {
        headers: {
          'access-token': `${authCtx.token}`,
        },
      }
      await axios.delete(`http://localhost:3001/identities/${id}`, config)

      setData(data.filter((identity) => identity.id !== id))
    },
    [authCtx.token, data]
  )
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <React.Fragment>
      {!isLoading && (
        <StyledListContainer>
          <StyledPaper>
            <Pagination
              count={parseInt((data.length / 10 - 1).toFixed())}
              page={page}
              onChange={handleChangePage}
              color='secondary'
            />

            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell padding='checkbox' />
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Surname</StyledTableCell>
                  <StyledTableCell>Company</StyledTableCell>
                  <StyledTableCell>Country</StyledTableCell>
                  <StyledTableCell>Nationality</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => (
                  <ExpandableTableRow
                    key={user.id}
                    data={user}
                    expandComponent={(data) => (
                      <UserForm
                        data={data}
                        id={user.id}
                        updateHandler={updateHandler}
                        deleteHandler={deleteHandler}
                      />
                    )}
                  >
                    <StyledTableCell component='th' scope='row'>
                      {user.name}
                    </StyledTableCell>
                    <StyledTableCell>{user.surname}</StyledTableCell>
                    <StyledTableCell>{user.company}</StyledTableCell>
                    <StyledTableCell>{user.country}</StyledTableCell>
                    <StyledTableCell>{user.nationality}</StyledTableCell>
                  </ExpandableTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledPaper>
        </StyledListContainer>
      )}
    </React.Fragment>
  )
}
export default IdentitiesList
