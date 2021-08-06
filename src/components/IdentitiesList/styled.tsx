import { TableCell } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'

export const StyledUl = styled.ul`
  list-style: none;
`
export const StyledLi = styled.li``

export const StyledListContainer = styled.div`
  display: flex;

  justify-content: center;

  width: 100%;
  table {
    max-width: 500px;
    overflow: scroll;
  }
  .MuiPaper-elevation1 {
    box-shadow: initial!;
  }
  .MuiTableCell-head {
    font-weight: 700;
  }
  .MuiPagination-ul {
    display: flex;
  }
`
export const StyledPaper = styled(Paper)`
  ul {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
`
export const StyledLoading = styled.p`
  text-align: center;
`

export const StyledTableCell = styled(TableCell)`
  min-width: 150px;
`
