import { useTable } from "react-table"
import { useMemo, useState } from "react"
import "../css/Table.css"
import MaUTable from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { BookListModel } from "../models/BookListModel"

type TableProps = {
  items: BookListModel[]
  getSelectedNumber: (selectedNumber: number) => void
}

// 테이블 헤더 정의
const COLUMNS = [
  {
    Header: "No",
    accessor: "No",
  },
  // {
  //   Header: "일련번호",
  //   accessor: "일련번호",
  // },
  {
    Header: "도서명",
    accessor: "도서명",
  },
  {
    Header: "저자",
    accessor: "저자",
  },
  {
    Header: "출판사",
    accessor: "출판사",
  },
  {
    Header: "대출가능여부",
    accessor: "대출가능여부",
  },
  // {
  //   Header: "대출인",
  //   accessor: "대출인",
  // },
]

function Table({ items, getSelectedNumber }: TableProps) {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => items, [])

  const [selectedIndex, setSelectedIndex] = useState(Number)

  // 테이블에 필요한 프로퍼티 정의
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    // @ts-ignore
    columns,
    data,
  })

  // 라디오 버튼 및 데이터가 클릭되었을 시 동작
  const rowClicked = (dataIndex: number, dataNumber: number) => {
    setSelectedIndex(dataIndex)
    getSelectedNumber(dataNumber)
  }

  return (
    <MaUTable {...getTableProps()} className="table">
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            <TableCell>선택</TableCell>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>{column.render("Header")}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)

          return (
            <TableRow
              onClick={() => {
                rowClicked(row.index, row.values.No)
              }}
              {...row.getRowProps()}
              className={
                row.index === selectedIndex ? "selectedRow" : row.index % 2 == 0 ? "oddRow" : ""
              }
            >
              <TableCell>
                <input
                  type={"radio"}
                  value={"radio"}
                  onChange={() => {
                    rowClicked(row.index, row.values.No)
                  }}
                  checked={row.index === selectedIndex}
                />
              </TableCell>
              {row.cells.map((cell) => (
                <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

export default Table
