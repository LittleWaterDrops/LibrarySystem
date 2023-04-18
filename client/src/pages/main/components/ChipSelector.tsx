import { useEffect, useState } from "react"
import "../css/ChipSelector.css"
import Chip, { ChipProps } from "./Chip"
type ChipSelectorProps = {
  title: string
  initialSelectedMember: string[]
  memberList: string[]
  setMember: (member: string[]) => void
}

function ChipSelector({ title, initialSelectedMember, memberList, setMember }: ChipSelectorProps) {
  const [currentChips, setCurrentChips] = useState<ChipProps[]>([])
  const [selectedMember, setSelectedMember] = useState([""])

  // 수정 화면에서 넘어온 초기 맴버 값 처리
  useEffect(() => {
    if (initialSelectedMember.length !== 0) {
      setSelectedMember(initialSelectedMember)
    }
  }, [initialSelectedMember])

  // 칩 리스트 초기화
  useEffect(() => {
    if (memberList[0] !== "") {
      const chipInitList = memberList.map((item, index) => {
        return {
          index: index,
          isSelected: selectedMember.some((memberName) => memberName === item),
          name: item,
          itemClicked: () => null,
        }
      })
      setCurrentChips(chipInitList)
    }
  }, [memberList])

  // 선택된 칩들 데이터에 전달
  useEffect(() => {
    let chipsNameArray = []
    for (const index in currentChips) {
      currentChips[index].isSelected && chipsNameArray.push(currentChips[index].name)
    }

    setMember(chipsNameArray)
  }, [currentChips])

  // 선택된 칩 상태 변경
  const itemSelectStateToggle = (index: number) => {
    let chipsArray = [...currentChips]
    chipsArray[index].isSelected = !chipsArray[index].isSelected

    setCurrentChips(chipsArray)
  }

  const selectedChips = currentChips.filter((item) => item.isSelected === true)

  return (
    <div className="menu-container">
      <div className="title-container">
        <h3>{title}</h3>
        <h3>{"총 인원 : " + selectedChips.length + " 명"}</h3>
      </div>
      <div className={selectedChips.length === 0 ? "sub-text" : "sub-text-selected"}>
        {selectedChips.length === 0
          ? "참석자를 모두 선택해주세요."
          : "참석자 : " + selectedChips.flatMap((item) => item.name).join()}
      </div>
      <div className={"chip-container"}>
        {currentChips &&
          currentChips.map((item) => {
            return (
              <Chip
                index={item.index}
                key={item.index}
                isSelected={item.isSelected}
                name={item.name}
                itemClicked={() => itemSelectStateToggle(item.index)}
              />
            )
          })}
      </div>
    </div>
  )
}

export default ChipSelector
