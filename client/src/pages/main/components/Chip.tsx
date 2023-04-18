import { useState } from "react"
import "../css/Chip.css"
export type ChipProps = {
  index: number
  isSelected: boolean
  name: string
  itemClicked: () => void
}

function Chip({ isSelected, name, itemClicked }: ChipProps) {
  const [isHovered, setIsHovered] = useState(false)

  const buttonClicked = () => {
    itemClicked()
  }
  return (
    <div
      className={
        isSelected
          ? isHovered
            ? "selected-hovered"
            : "selected"
          : isHovered
          ? "unselected-hovered"
          : "unselected"
      }
      onClick={buttonClicked}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      {name}
    </div>
  )
}

export default Chip
