import { useState } from "react"
import "../css/DropDown.css"
import TextInput from "./TextInput"
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai"
type DropDownProps = {
  title: string
  initialText: string
  memberList: string[]
  returnValue: (member: string[]) => void
  nonTextField?: boolean
}

type MenuItemProps = {
  itemName: string
}

function DropDown({ title, initialText, memberList, returnValue, nonTextField }: DropDownProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentName, setCurrentName] = useState(initialText)

  // 드롭다운 활성 상태 토글
  const dropDownToggle = () => {
    setIsActive(!isActive)
  }

  // 아이템이 클릭됨을 감지
  const itemClick = (item: string) => {
    setCurrentName(item)
    setIsActive(!isActive)
    returnValue([item])
  }

  const MenuItem = ({ itemName }: MenuItemProps) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <div className={isHovered ? "menu-item-hovered" : "menu-item"}>
        <div
          onClick={() => itemClick(itemName)}
          onMouseEnter={() => {
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
          }}
        >
          {itemName}
        </div>
      </div>
    )
  }

  return (
    <div className="menu-container">
      <div className="text-icon-field">
        {!nonTextField && (
          <TextInput
            title={title}
            initialText={currentName}
            returnValue={(parameter) => returnValue([parameter])}
          />
        )}
        <button onClick={dropDownToggle}>
          {isActive ? <AiFillCaretDown /> : <AiFillCaretRight />}
        </button>
      </div>
      <div
        className={
          !nonTextField
            ? `menu${isActive ? "-active" : ""}`
            : `menuNonTextField${isActive ? "-active" : ""}`
        }
      >
        {memberList.map((item) => (
          <MenuItem itemName={item} key={item} />
        ))}
      </div>
    </div>
  )
}

export default DropDown
