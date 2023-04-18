import { useState } from "react"
import ReactPopup from "reactjs-popup"
import "../css/ChipSelector.css"
import Button from "./Button"
import TextInput from "./TextInput"
import SERVER_CONFIG from "../../../config"
import styles from "../css/Popup.module.css"

type PopupProps = {
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element) | undefined
  title?: string | undefined
  content?: string | undefined
  // 참일경우 버튼 2개, 거짓일 경우 1개
  twoButton: boolean
  buttonFunction: () => void
}

function Popup({ trigger, title, content, twoButton, buttonFunction }: PopupProps) {
  const [passwordVaild, setPasswordVaild] = useState(false)
  const [yesButtonHovered, setYesButtonHovered] = useState(false)
  const [noButtonHovered, setNoButtonHovered] = useState(false)
  return (
    <ReactPopup trigger={trigger} position="center center" modal contentStyle={{ width: "400px" }}>
      {/* {(close: () => void) => (
        <div className={styles.popup}>
          {title && <h2>{title}</h2>}
          {content && <h4>{content}</h4>}
          {twoButton && (
            <TextInput
              title={"비밀번호를 입력해주세요."}
              initialText={""}
              inputType={"password"}
              returnValue={function (text: string | undefined): void {
                text === SERVER_CONFIG.USER_PASSWORD
                  ? setPasswordVaild(true)
                  : setPasswordVaild(false)
              }}
            />
          )}
          <div className={styles.buttonField}>
            <Button
              text={"확인"}
              className={yesButtonHovered ? styles.buttonHovered : styles.button}
              onClicked={() => {
                if (twoButton && passwordVaild) {
                  buttonFunction()
                  alert("완료되었습니다.")
                  close()
                } else if (twoButton && !passwordVaild) {
                  alert("비밀번호를 다시 확인해주세요.")
                } else {
                  close()
                }
              }}
              onHovered={function (isHovered: boolean): void {
                setYesButtonHovered(isHovered)
              }}
            />
            {twoButton && (
              <Button
                text={"취소"}
                className={noButtonHovered ? styles.buttonHovered : styles.button}
                onClicked={() => {
                  close()
                }}
                onHovered={function (isHovered: boolean): void {
                  setNoButtonHovered(isHovered)
                }}
              />
            )}
          </div>
        </div>
      )} */}
    </ReactPopup>
  )
}

export default Popup
