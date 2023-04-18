import { CardUseDataModel } from "../models/CardUseDataModel"
import { useTable } from "react-table"
import { useMemo, useState } from "react"
import "../css/Table.css"
import MaUTable from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

type TableProps = {
  items: CardUseDataModel[]
  getSelectedNumber: (selectedNumber: number) => void
}

// 테이블 헤더 정의
const COLUMNS = [
  {
    Header: "No",
    accessor: "No",
  },
  {
    Header: "일자",
    accessor: "일자",
  },
  {
    Header: "구분",
    accessor: "구분",
  },
  {
    Header: "사용처",
    accessor: "사용처",
  },
  {
    Header: "내용",
    accessor: "내용",
  },
  {
    Header: "금액",
    accessor: "금액",
  },
  {
    Header: "사용자",
    accessor: "사용자",
  },
  {
    Header: "비고",
    accessor: "비고",
  },
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
