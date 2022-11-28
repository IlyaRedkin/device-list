import React from 'react'
import { IColumn, ITable } from './_types'
import StyledTable from './components/StyledTable'
import StyledHeader from './components/StyledHeader'
import StyledTableBody from './components/StyledTableBody'
import StyledTableRow from './components/StyledTableRow'
import StyledTableCell from './components/StyledTableCell'

export const Table = <T, C extends {}>(props: ITable<T, C>): React.ReactElement => {
  const {
    columns, data, onRowClick, getItemKey, onCellClick, context
  } = props

  return (
    <StyledTable>
      <StyledHeader>
        <StyledTableRow>
          {columns.map((
            column: IColumn<T, C>
          ) => <StyledTableCell key={column.key}>{column.title}</StyledTableCell>)}
        </StyledTableRow>
      </StyledHeader>
      <StyledTableBody>
        {data.length === 0
          ? (
            <StyledTableRow>
              <td colSpan={columns.length}>No Items</td>
            </StyledTableRow>
          )
          : data.map((item: T) => (
            <StyledTableRow
              key={getItemKey(item)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column: IColumn<T, C>) => (
                <StyledTableCell
                  key={`${column.key}_${getItemKey(item)}`}
                  width={column.width}
                  style={column.getCellStyle?.(item) ?? {}}
                  onClick={() => onCellClick?.(item, column.key)}
                >
                  {column.field
                    ? (item as any)[column.field]
                    : column?.renderer && column.renderer({ item, context })
                  }
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
      </StyledTableBody>
    </StyledTable>
  )
}
