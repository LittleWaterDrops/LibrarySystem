import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "../css/Header.module.css"
import Button from "./Button"

type RoutesPathProps = {
  pathName: string
  pathText: string
}
type HeaderComponentProps = {
  pathText: string
}

const headerRoutesPath: RoutesPathProps[] = [
  { pathName: "/", pathText: "홈" },
  { pathName: "/addData", pathText: "데이터 추가" },
  { pathName: "/manage", pathText: "데이터 관리" },
]
const HeaderComponent = ({ pathText }: HeaderComponentProps) => {
  const [textHovered, setTextHovered] = useState(false)
  return (
    <Button
      text={pathText}
      className={textHovered ? styles.linkTextHovered : styles.linkText}
      onClicked={() => {}}
      onHovered={(isHovered: boolean) => {
        setTextHovered(isHovered)
      }}
    />
  )
}

function Header() {
  const currentLocation = useLocation().pathname

  // 페이지에 들어오면 최상단으로 스크롤
  window.scrollTo(0, 0)

  return currentLocation !== "/" ? (
    <div className={styles.container}>
      {headerRoutesPath.map((routes) => {
        const linkPathName = routes.pathName
        const linkpathText = routes.pathText

        return (
          <Link
            style={{ textDecoration: "none" }}
            to={linkPathName}
            key={linkPathName}
            onClick={() => {
              // 현재와 같은 라우터로 링크 시 리로드 실행
              if (linkPathName === currentLocation) {
                window.location.reload()
              }
            }}
          >
            <HeaderComponent pathText={linkpathText} />
          </Link>
        )
      })}
    </div>
  ) : (
    <></>
  )
}

export default Header
