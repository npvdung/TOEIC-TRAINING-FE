import React, { useEffect, useState } from 'react'
import { Radio } from 'antd'
import './style.scss'
// import RenderDescription from './renderItem/RenderDescription'
import { checkArrIncludesQuest } from '../../../../../utils/CheckData'
import { renderHTMLtoWord } from '../../../../../constants/dashboardConstants'

const ChooseOneOfFour = ({
  data,
  stt,
  handleActiveQuestion,
  listQuestionChoose1Of4,
  setListQuestionChoose1Of4,
}) => {
  const [value, setValue] = useState()
  const [objAnswer, setObjAnswer] = useState([])

  useEffect(() => {
    const getAnswer = () => {
      if (data) {
        let ObjAnswer = data?.questionContent.split('|')
        setObjAnswer(ObjAnswer)
      }
    }
    getAnswer()
  }, [data])

  const handleChooseAnswer = (e) => {
    setValue(e.target.value)

    // active quest on board
    handleActiveQuestion(data.id)

    // get answer
    if (checkArrIncludesQuest(listQuestionChoose1Of4, data.id)) {
      let newListQuest = listQuestionChoose1Of4.filter((value) => {
        return value.id !== data.id
      })
      setListQuestionChoose1Of4([
        ...newListQuest,
        {
          id: data.id,
          questionAnswer: e.target.value,
        },
      ])
    } else {
      setListQuestionChoose1Of4([
        ...listQuestionChoose1Of4,
        {
          id: data.id,
          questionAnswer: e.target.value,
        },
      ])
    }
  }

  return (
    <div className="hvx-questionItem itemChoose1of4" id={`quest${data?.id}`}>
      <p className="hvx-textTitleItem">
        <span style={{ fontWeight: '600', minWidth: 'max-content' }}>
          Question {stt}.
        </span>
        <span>{renderHTMLtoWord(data.questionTitle)}</span>
      </p>
      {/* <div className="hvx-descriptionItem">
        <RenderDescription data={data.questionDescription} />
      </div> */}
      <Radio.Group
        onChange={handleChooseAnswer}
        value={value}
        className="hvx-itemOption ml-3"
      >
        <Radio className="col-md-6 option" value={objAnswer[0]}>
          <div
            className="d-flex"
            style={{ gap: '4px' }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "A.  ${objAnswer[0]}"}`).html,
            }}
          />
        </Radio>
        <Radio className="col-md-6 option" value={objAnswer[1]}>
          <div
            className="d-flex"
            style={{ gap: '4px' }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "B.  ${objAnswer[1]}"}`).html,
            }}
          />
        </Radio>
        <Radio className="col-md-6 option" value={objAnswer[2]}>
          <div
            className="d-flex"
            style={{ gap: '4px' }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "C.  ${objAnswer[2]}"}`).html,
            }}
          />
        </Radio>
        <Radio className="col-md-6 option" value={objAnswer[3]}>
          <div
            className="d-flex"
            style={{ gap: '4px' }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "D.  ${objAnswer[3]}"}`).html,
            }}
          />
        </Radio>
      </Radio.Group>
    </div>
  )
}

export default ChooseOneOfFour
