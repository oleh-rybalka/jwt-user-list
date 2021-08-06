import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { FC, ReactNode } from 'react'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { TableData } from '../core/types'

interface ExpandableTableRowProps {
  expandComponent: (data: TableData) => ReactNode
  data: TableData
}
const ExpandableTableRow: FC<ExpandableTableRowProps> = ({
  children,
  expandComponent,
  data,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  return (
    <>
      <TableRow>
        <TableCell padding='checkbox'>
          <IconButton
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding='checkbox' />
          {expandComponent(data)}
        </TableRow>
      )}
    </>
  )
}
export default ExpandableTableRow
