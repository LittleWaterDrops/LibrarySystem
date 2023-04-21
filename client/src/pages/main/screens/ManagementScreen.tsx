import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteBookDataWithNumber, getBookListData, getFilteredBookListData } from "../api/API"
import Button from "../components/Button"
import Table from "../components/Table"
import Popup from "../components/Popup"
import "reactjs-popup/dist/index.css"
import styles from "../css/ManagementScreen.module.css"
import { BookListModel } from "../models/BookListModel"
import FilterField from "../components/FilterField"
import { BookModel } from "../models/BookModel"

const DATA_PER_PAGE = 10

const initialData: BookListModel = {} as BookListModel

// 오브젝트가 비어있음을 확인
export const isEmpty = (object: any) => {
  return !Object.keys(object).length
}

function ManagementScreen() {
  const [cardUseData, setCardUseData] = useState([initialData])
  const [page, setPage] = useState(1)
  const [selectedNumber, setSelectedNumber] = useState(Number)
  const [isInit, setIsInit] = useState(false)

  const minimumPage = 1
  const maximumPage =
    Math.ceil(cardUseData.length / DATA_PER_PAGE) > 1
      ? Math.ceil(cardUseData.length / DATA_PER_PAGE)
      : 1

  // selectedNumber 초기화
  useEffect(() => {
    setSelectedNumber(cardUseData[0]?.No)
    setPage(1)
  }, [cardUseData])

  // 카드 사용 내역 데이터 호출
  useEffect(() => {
    getBookListData().then((cardUseData) => {
      setCardUseData(cardUseData)
      setIsInit(true)
    })
  }, [isInit])

  // 데이터 삭제 함수
  const dataDelete = () => {
    deleteBookDataWithNumber(selectedNumber)
    setIsInit(false)
  }

  return (
    <div>
      <FilterField
        submitFilterButton={(parameter: BookModel) => {
          getFilteredBookListData(parameter).then((result) => {
            setCardUseData(result)
          })
        }}
      />
      {isInit && (
        <>
          <button
            onClick={() => {
              setPage(page - 1 < minimumPage ? minimumPage : page - 1)
            }}
          >
            {"<"}
          </button>
          <>{`  ${page}  `}</>
          <button
            onClick={() => {
              setPage(page + 1 > maximumPage ? maximumPage : page + 1)
            }}
          >
            {">"}
          </button>
          <Table
            items={cardUseData.slice((page - 1) * DATA_PER_PAGE, page * DATA_PER_PAGE)}
            getSelectedNumber={(parameter: number) => setSelectedNumber(parameter)}
          />
          <div>
            <Link to={`/addData/${selectedNumber}`} style={{ textDecoration: "none" }}>
              <Button
                text={"수정"}
                className={styles.button}
                onClicked={() => {}}
                onHovered={function (isHovered: boolean): void {}}
              />
            </Link>
            <Popup
              trigger={
                <Link to={`/manage`} style={{ textDecoration: "none" }}>
                  <Button
                    text={"삭제"}
                    className={styles.button}
                    onClicked={() => {}}
                    onHovered={function (isHovered: boolean): void {}}
                  />
                </Link>
              }
              title={"삭제 경고"}
              content={"정말 삭제하시겠습니까?"}
              twoButton={true}
              buttonFunction={function (): void {
                dataDelete()
                window.location.reload()
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ManagementScreen
