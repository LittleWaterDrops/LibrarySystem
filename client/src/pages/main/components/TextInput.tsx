import React, { useEffect, useState } from "react"

type TextInputProps = {
  title: string
  initialText: string
  inputType?: React.HTMLInputTypeAttribute | "serial" | undefined
  returnValue: (text: string) => void
}

function TextInput({ title, initialText, inputType, returnValue }: TextInputProps) {
  const [text, setText] = useState(initialText)
  const inputRef = React.createRef<HTMLInputElement>()

  // 드롭다운에서 텍스트가 입력되었을 시 초기화
  useEffect(() => {
    setText(initialText)
  }, [initialText])

  // 숫자를 입력받을 때 맨 앞 0을 제거한 숫자만 입력받도록 함
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputType === "number"
      ? setText(e.target.value.replace(/^0+/, "").replace(/\D/, ""))
      : setText(e.target.value)
  }

  // 블러 처리됐을 때 값을 넣어줌
  const handleBlur = () => {
    returnValue(text)
  }

  // 엔터키가 입력되면 블러처리
  const checkEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      inputRef.current?.blur()
    }
  }

  const inputValue = (text: string) => {
    let result = text

    if (inputType === "number") {
      // 금액에 콤마 표기
      result = text.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else if (inputType === "serial") {
      // 금액에 콤마 표기
      result = text
        .replace(/[^0-9]/g, "")
        .replace(
          /([0-9]{3})([0-9]{2})([0-9]{5})([0-9]{2})([0-9]{1})([0-9]{5})/g,
          "$1-$2-$3-$4-$5 $6"
        )
    }
    return result
  }

  return (
    <div>
      <h3>{title}</h3>
      {inputType === "serial" && <td>*IBSN 표기에 맞는 18자리 숫자를 기입하시오.</td>}
      <input
        maxLength={inputType === "serial" ? 18 : undefined}
        type={inputType === "password" ? "password" : ""}
        ref={inputRef}
        value={inputValue(text)}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyDown={checkEnterPressed}
      />
    </div>
  )
}

export default TextInput
