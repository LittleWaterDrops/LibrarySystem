import { SetStateAction, useEffect, useState } from "react"
import { Link, To } from "react-router-dom"
import { getSumPaidAmount, getUsageList } from "../api/API"
import Button from "../components/Button"
import DropDown from "../components/DropDown"
import styles from "../css/MainScreen.module.css"

interface LinkButtonProps {
  linkTo: To
  title: string
  isInit: boolean
}

function MainScreen() {
  const [addDataHovered, setAddDataHovered] = useState(false)
  const [manageHovered, setManageHovered] = useState(false)
  const [checkAndReturnHovered, setCheckAndReturnHovered] = useState(false)
  const [sumPaidAmount, setSumPaidAmount] = useState("")
  const [usage, setUsage] = useState([""])
  const [currentUsage, setCurrentUsage] = useState("전체")
  const [isInit, setIsInit] = useState(false)

  useEffect(() => {
    // // 비고 리스트 초기화
    // getUsageList().then((usageList) => {
    //   let usageArray: string[] = []
    //   for (const index in usageList) {
    //     usageArray.push(usageList[index].usage)
    //   }
    //   setUsage(usageArray)
    // })
    // getSumPaidAmount(currentUsage).then((sumPaidAmount: number) => {
    //   // 원화로 변환
    //   const maskedAmount = sumPaidAmount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    //   setSumPaidAmount(maskedAmount)
    setIsInit(true)
    // })
  }, [])

  useEffect(() => {
    getSumPaidAmount(currentUsage).then((sumPaidAmount: number) => {
      // 원화로 변환
      const maskedAmount = sumPaidAmount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      setSumPaidAmount(maskedAmount)
    })
  }, [currentUsage])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.subContainer} />
        <div className={styles.mainContainer}>
          <div className={isInit ? styles.welcomeText : styles.nonInitContainer}>환영합니다!</div>
          <div className={isInit ? styles.informationText : styles.nonInitContainer}>
            {currentUsage === "전체" ? "감귤 도서관에는" : `${currentUsage}는(은) 현재까지`}
            <DropDown
              title="구분"
              initialText={""}
              memberList={["전체", ...usage]}
              returnValue={(parameter) => setCurrentUsage(parameter[0])}
              nonTextField
            />
          </div>

          <div className={isInit ? styles.textField : styles.nonInitContainer}>
            <div className={isInit ? styles.paidAmountText : styles.nonInitContainer}>
              {sumPaidAmount}
            </div>
            <div className={isInit ? styles.informationText : styles.nonInitContainer}>
              {"개의 도서가 있어요!"}
            </div>
          </div>
          <LinkButton linkTo={"/addData"} title={"📘 도서 추가"} isInit={isInit} />
          <LinkButton linkTo={"/manage"} title={"📚 도서 목록 조회"} isInit={isInit} />
          <LinkButton linkTo={"/addData"} title={"🗳 도서 대출 및 반납"} isInit={isInit} />
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
