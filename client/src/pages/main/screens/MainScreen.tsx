import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getSumPaidAmount, getUsageList } from "../api/API"
import Button from "../components/Button"
import DropDown from "../components/DropDown"
import styles from "../css/MainScreen.module.css"

function MainScreen() {
  const [addDataHovered, setAddDataHovered] = useState(false)
  const [manageHovered, setManageHovered] = useState(false)
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
            {currentUsage === "전체" ? "이번 달은 현재까지" : `${currentUsage}는(은) 현재까지`}
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
              {"원 사용했어요!"}
            </div>
          </div>
          <Link to="/addData" style={{ textDecoration: "none" }}>
            <Button
              text={"📋 데이터 추가 페이지"}
              className={
                isInit
                  ? addDataHovered
                    ? styles.linkTextHovered
                    : styles.linkText
                  : styles.nonInitContainer
              }
              onClicked={() => {}}
              onHovered={(isHovered: boolean) => {
                setAddDataHovered(isHovered)
              }}
            />
          </Link>
          <Link to="/manage" style={{ textDecoration: "none" }}>
            <Button
              text={"📁 데이터 관리 페이지"}
              className={
                isInit
                  ? manageHovered
                    ? styles.linkTextHovered
                    : styles.linkText
                  : styles.nonInitContainer
              }
              onClicked={() => {}}
              onHovered={(isHovered: boolean) => {
                setManageHovered(isHovered)
              }}
            />
          </Link>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.copywriteText}>copywrite by Sang, Dangamsoft. 2022.02.</div>
      </div>
    </div>
  )
}

export default MainScreen
