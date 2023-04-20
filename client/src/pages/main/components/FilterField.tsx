import { ReactNode, useState } from "react"
import ReactPopup from "reactjs-popup"
import Button from "./Button"
import TextInput from "./TextInput"
import SERVER_CONFIG from "../../../config"
import styles from "../css/FilterField.module.css"
import { BookModel } from "../models/BookModel"
import ToggleButton from "./ToggleButton"

type FilterFieldProps = {
  submitFilterButton: (parameter: BookModel) => void
}

const initialData: BookModel = {
  serialNumber: "",
  title: "",
  author: "",
  publisher: "",
  canBorrow: true,
  whoBorrow: "",
}

function FilterField({ submitFilterButton }: FilterFieldProps) {
  const [bookData, setBookData] = useState(initialData)
  const [buttonHovered, setButtonHovered] = useState(false)

  return (
    <div className={styles.filterField}>
      <div className={styles.headerField}>
        <h3>검색 조건</h3>
        <Button
          text={"검색"}
          className={buttonHovered ? styles.buttonHovered : styles.button}
          onClicked={() => {
            submitFilterButton(bookData)
          }}
          onHovered={function (isHovered: boolean): void {
            setButtonHovered(isHovered)
          }}
        />
      </div>
      <div className={styles.searchField}>
        <TextInput
          title="도서명"
          initialText={""}
          returnValue={(parameter) => setBookData({ ...bookData, title: parameter })}
        />
        <TextInput
          title="저자"
          initialText={""}
          returnValue={(parameter) => setBookData({ ...bookData, author: parameter })}
        />
        <TextInput
          title="출판사"
          initialText={""}
          returnValue={(parameter) => setBookData({ ...bookData, publisher: parameter })}
        />
        <ToggleButton
          onClicked={(isTrue: boolean) => {
            setBookData({ ...bookData, canBorrow: isTrue })
          }}
        />
      </div>
    </div>
  )
}

export default FilterField
