import { useEffect, useState } from "react"
import Button from "../components/Button"
import TextInput from "../components/TextInput"
import "react-calendar/dist/Calendar.css"
import {
  getBookListDataByNumber,
  insertBookData,
  updateCardDataProps,
  updateBookDataWithNumber,
} from "../api/API"
import { Link, Params, useParams } from "react-router-dom"
import { isEmpty } from "./ManagementScreen"
import styles from "../css/AddDataScreen.module.css"
import Popup from "../components/Popup"
import { BookListModel } from "../models/BookListModel"
import { BookModel } from "../models/BookModel"

export const SERIAL_NUMBER_LENGTH = 18

const initialData: BookModel = { canBorrow: true, whoBorrow: "" } as BookModel

function AddDataScreen() {
  const [bookData, setBookData] = useState(initialData)
  const [isInit, setIsInit] = useState(false)
  const [validation, setValidation] = useState(false)
  const routerParameter = useParams()

  useEffect(() => {
    //수정 화면에서 변수가 넘어왔을 경우, 화면 컴포넌트의 초깃값 정의
    if (routerParameter.dataNumber && isInit === false) {
      getBookListDataByNumber(routerParameter.dataNumber).then((dataInfo: BookListModel[]) => {
        const dataByNumber = dataInfo[0]

        const data: BookModel = {
          serialNumber: dataByNumber.일련번호,
          title: dataByNumber.도서명,
          author: dataByNumber.저자,
          publisher: dataByNumber.출판사,
          canBorrow: true,
          whoBorrow: "",
        }
        setBookData(data)
        setIsInit(true)
      })
    } else {
      setIsInit(true)
    }
  }, [routerParameter])

  useEffect(() => {
    // 전송 가능한 데이터인지 확인
    DataValidationCheck(bookData)
  }, [bookData])

  return (
    <div>
      {isInit && (
        <>
          <TextInput
            title="일련번호"
            initialText={routerParameter.dataNumber ? JSON.stringify(bookData.serialNumber) : ""}
            inputType={"serial"}
            returnValue={(parameter) => {
              const formatedNumber = parameter
                .replace(/[^0-9]/g, "")
                .replace(
                  /([0-9]{3})([0-9]{2})([0-9]{5})([0-9]{2})([0-9]{1})([0-9]{5})/g,
                  "$1-$2-$3-$4-$5 $6"
                )

              setBookData({ ...bookData, serialNumber: parameter })
            }}
          />
          <TextInput
            title="도서명"
            initialText={routerParameter.dataNumber ? bookData.title : ""}
            returnValue={(parameter) => setBookData({ ...bookData, title: parameter })}
          />
          <TextInput
            title="저자"
            initialText={routerParameter.dataNumber ? bookData.author : ""}
            returnValue={(parameter) => setBookData({ ...bookData, author: parameter })}
          />
          <TextInput
            title="출판사"
            initialText={routerParameter.dataNumber ? bookData.publisher : ""}
            returnValue={(parameter) => setBookData({ ...bookData, publisher: parameter })}
          />
          {validation ? (
            <Popup
              trigger={
                <Link to={routerParameter.dataNumber ? "" : ""} style={{ textDecoration: "none" }}>
                  <Button
                    text="등록"
                    onClicked={() => {}}
                    onHovered={function (isHovered: boolean): void {}}
                    className={styles.submitButton}
                  />
                </Link>
              }
              title={"등록 경고"}
              content={"정말 등록하시겠습니까?"}
              twoButton={true}
              buttonFunction={function (): void {
                SubmitData(bookData, routerParameter)
                window.location.replace("/manage")
              }}
            />
          ) : (
            <Button
              text="등록"
              onClicked={() => {
                alert("데이터가 유효하지 않습니다.\n미기입한 데이터가 있는지 확인이 필요합니다.")
              }}
              onHovered={function (isHovered: boolean): void {}}
              className={styles.submitButton}
            />
          )}
        </>
      )}
    </div>
  )

  function SubmitData(dataToSubmit: BookModel, routerParameter: Readonly<Params<string>>) {
    try {
      // 새로 추가하는 데이터인 경우
      if (isEmpty(routerParameter)) {
        insertBookData(dataToSubmit)
      }
      // // 수정하는 데이터인 경우
      // else {
      //   const resultData: updateCardDataProps = {
      //     submitData: dataToSubmit,
      //     dataNumber: parseInt(JSON.parse(JSON.stringify(routerParameter.dataNumber))),
      //   }
      //   updateCardUseDataWithNumber(resultData)
      // }
    } catch (e: any) {}
  }

  function DataValidationCheck(dataToSubmit: BookModel) {
    try {
      if (
        dataToSubmit.serialNumber.length === SERIAL_NUMBER_LENGTH &&
        dataToSubmit.author !== "" &&
        dataToSubmit.publisher !== "" &&
        dataToSubmit.title !== ""
      ) {
        setValidation(true)
      } else {
        setValidation(false)
      }
    } catch (e: any) {
      setValidation(false)
    }
  }
}

export default AddDataScreen
