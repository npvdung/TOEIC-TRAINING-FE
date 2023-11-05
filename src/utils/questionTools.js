export const getContentABCD = (answer) => {
  if (answer.optionA) {
    return (
      answer.optionA.trim() +
      '|' +
      answer.optionB.trim() +
      '|' +
      answer.optionC.trim() +
      '|' +
      answer.optionD.trim()
    )
  }
  return ''
}

export const renderContent = (text, length) => {
  if (!text) return
  if (!length) length = 70
  if (text?.length >= length) {
    const stringRender = text.slice(0, length)
    return `${stringRender}...`
  }
  return text
}

export const flatDataTable = (data, callback) => {
  if (data && data.length) {
    const newData = data.map((item) => {
      return { ...item, key: item.id }
    })
    callback(newData)
  }
}

export const renderHTMLtoWord = (text) => {
  if (!text) return
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: JSON.parse(`{"html": "${text}"}`).html,
      }}
    ></div>
  )
}
