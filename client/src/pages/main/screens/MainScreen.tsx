import { useEffect, useState } from "react"
import { Link, To } from "react-router-dom"
import { getSumBookAmount } from "../api/API"
import Button from "../components/Button"
import styles from "../css/MainScreen.module.css"

interface LinkButtonProps {
  linkTo: To
  title: string
  isInit: boolean
}

function MainScreen() {
  const [sumBookAmount, setSumBookAmount] = useState("")
  const [isInit, setIsInit] = useState(false)

  useEffect(() => {
    getSumBookAmount().then((sumBookAmount: number) => {
      setSumBookAmount(JSON.stringify(sumBookAmount))
      setIsInit(true)
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.subContainer} />
        <div className={styles.mainContainer}>
          <div className={isInit ? styles.welcomeText : styles.nonInitContainer}>환영합니다!</div>
          <div className={isInit ? styles.informationText : styles.nonInitContainer}>
            {"감귤 도서관에는"}
          </div>
          <div className={isInit ? styles.textField : styles.nonInitContainer}>
            <div className={isInit ? styles.paidAmountText : styles.nonInitContainer}>
              {sumBookAmount}
            </div>
            <div className={isInit ? styles.informationText : styles.nonInitContainer}>
              {"개의 도서가 있어요!"}
            </div>
          </div>
          <LinkButton linkTo={"/addData"} title={"📘 도서 추가"} isInit={isInit} />
          <LinkButton linkTo={"/manage"} title={"📚 도서 목록 조회"} isInit={isInit} />
          <LinkButton linkTo={"/actionData"} title={"🗳 도서 대출 및 반납"} isInit={isInit} />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.copywriteText}>copywrite by Sang, ZICOBA. 2023.04.</div>
      </div>
    </div>
  )
}

// 링크 버튼
const LinkButton = (props: LinkButtonProps) => {
  const { linkTo, title, isInit } = props

  const [isHovered, setIsHovered] = useState(false)
  return (
    <Link to={linkTo} style={{ textDecoration: "none" }}>
      <Button
        text={title}
        className={
          isInit ? (isHovered ? styles.linkTextHovered : styles.linkText) : styles.nonInitContainer
        }
        onClicked={() => {}}
        onHovered={(isHovered: boolean) => {
          setIsHovered(isHovered)
        }}
      />
    </Link>
  )
}

export default MainScreen
