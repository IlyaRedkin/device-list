import React from 'react'

export interface ITableRenderer<T, C> {
  item: T
  context?: C
}
export interface IColumn<T, C> extends IColumnData<T, C> {
  key: string
}
export interface IColumnData<T, C> extends React.CSSProperties {
  title: string
  renderer?: (props: ITableRenderer<T, C>) => React.ReactNode
  field?: keyof T
  getCellStyle?: (item: T) => React.CSSProperties
}

export interface ITable<T, C> extends Pick<ITableRenderer<T, C>, 'context'> {
  columns: Array<IColumn<T, C>>
  data: T[]
  onRowClick?: (item: T) => void
  onCellClick?: (item: T, colKey: string) => void
  getItemKey: (item: T) => string
}
