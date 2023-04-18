import moment from "moment"
import { useEffect, useState } from "react"
import ReactCalendar from "react-calendar"
import "../css/Calendar.css"

type CalendarProps = {
  initialText: string | Date
  returnValue: (date: string) => void
}

function Calendar({ initialText, returnValue }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState("")

  // 수정 화면에서 넘어온 날짜 정의
  useEffect(() => {
    if (initialText) {
      setSelectedDate(moment(initialText).format("YYYY-MM-DD"))
    }
  }, [initialText])

  // 날짜가 클릭되었을 시 선택된 날짜 설정 및 값 리턴
  const onChange = (selectedDate: Date) => {
    setSelectedDate(moment(selectedDate).format("YYYY-MM-DD"))
    returnValue(moment(selectedDate).format("YYYY-MM-DD"))
  }

  return (
    <>
      <h3>{"날짜를 선택해주세요."}</h3>
      <ReactCalendar
        className="react-calendar"
        value={selectedDate ? new Date(selectedDate) : null}
        onChange={(parameter: Date) => onChange(parameter)}
      />
      <h3>{"선택된 날짜: " + selectedDate}</h3>
    </>
  )
}

export default Calendar
