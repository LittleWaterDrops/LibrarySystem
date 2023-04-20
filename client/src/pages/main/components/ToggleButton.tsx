import { useState } from "react"
import "../css/ToggleButton.css"

type TextInputProps = {
  onClicked: (isTrue: boolean) => void
}

function ToggleButton({ onClicked }: TextInputProps) {
  const [isTrue, setIsTrue] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const text = isTrue ? "대출 가능" : "대출 불가"

  const buttonClicked = () => {
    setIsTrue(!isTrue)
    onClicked(!isTrue)
  }
  return (
    <div>
      <h3>대출 가능 여부</h3>
      <div
        className={
          isTrue
            ? isHovered
              ? "proved-text-hovered"
              : "proved-text"
            : isHovered
            ? "unproved-text-hovered"
            : "unproved-text"
        }
        onClick={buttonClicked}
        onMouseEnter={() => {
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
      >
        {text}
      </div>
    </div>
  )
}

export default ToggleButton
