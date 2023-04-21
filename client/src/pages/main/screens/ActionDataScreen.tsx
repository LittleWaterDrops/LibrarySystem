import { useState } from "react"
import Button from "../components/Button"
import TextInput from "../components/TextInput"
import "react-calendar/dist/Calendar.css"
import { borrowBook, checkBorrowState } from "../api/API"
import styles from "../css/ActionDataScreen.module.css"
import { BookModel } from "../models/BookModel"
import { SERIAL_NUMBER_LENGTH } from "./AddDataScreen"

const initialData: BookModel = {
  serialNumber: "",
  title: "",
  author: "",
  publisher: "",
  canBorrow: true,
  whoBorrow: "",
} as BookModel

type ActionTypes = "대출" | "반납"

interface ActionButtonProps {
  title: ActionTypes
  bookData: BookModel
}

function ActionDataScreen() {
  const [bookData, setBookData] = useState(initialData)

  return (
    <div>
      <>
        <TextInput
          title="일련번호"
          initialText={""}
          inputType={"serial"}
          returnValue={(parameter) => {
            setBookData({ ...bookData, serialNumber: parameter })
          }}
        />
        <TextInput
          title="대출인"
          initialText={""}
          returnValue={(parameter) => setBookData({ ...bookData, whoBorrow: parameter })}
        />
        <ActionButton title={"대출"} bookData={bookData} />
        <ActionButton title={"반납"} bookData={bookData} />
      </>
    </div>
  )
}

const ActionButton = (props: ActionButtonProps) => {
  const { title, bookData } = props

  return (
    <Button
      text={title}
      onClicked={() => {
        SubmitData(bookData, title)
      }}
      onHovered={function (isHovered: boolean): void {}}
      className={styles.submitButton}
    />
  )
}

function SubmitData(dataToSubmit: BookModel, actionType: ActionTypes) {
  if (dataToSubmit.serialNumber.length === SERIAL_NUMBER_LENGTH && dataToSubmit.whoBorrow !== "") {
    checkBorrowState(dataToSubmit.serialNumber).then((data) => {
      const borrowAction = () => {
        borrowBook(false, dataToSubmit.whoBorrow, dataToSubmit.serialNumber)
        alert("대출이 완료되었습니다 :)")
      }

      const returnAction = () => {
        borrowBook(true, "", dataToSubmit.serialNumber)
        alert("반납이 완료되었습니다 :)")
      }

      switch (actionType) {
        case "대출":
          const borrowCondition = data[0].대출가능여부
          borrowCondition
            ? borrowAction()
            : alert("대출이 불가능합니다. 기입한 데이터를 다시 확인해주세요.")
          return true

        case "반납":
          const retrunCondition = !data[0].대출가능여부 && data[0].대출인 === dataToSubmit.whoBorrow
          retrunCondition
            ? returnAction()
            : alert("반납이 불가능합니다. 기입한 데이터를 다시 확인해주세요.")
          return true
      }
    })
  } else {
    alert("데이터가 유효하지 않습니다.\n미기입한 데이터가 있는지 확인이 필요합니다.")
  }
  return false
}

export default ActionDataScreen
