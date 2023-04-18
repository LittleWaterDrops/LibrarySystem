import React, { useEffect, useState } from "react"

type TextInputProps = {
  title: string
  initialText: string
  inputType?: React.HTMLInputTypeAttribute | undefined
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
    }
    return result
  }

  return (
    <div>
      <h3>{title}</h3>
      <input
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
