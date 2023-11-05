import React, { useEffect, useState } from 'react'
import { Radio } from 'antd'
import './history-question.scss'
import { renderHTMLtoWord } from '../../../constants/dashboardConstants'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const HistoryQuestion = ({ question, stt, userAnswer }) => {
  const [value, setValue] = useState()
  const [objAnswer, setObjAnswer] = useState([])
  const [userOption, setUserOption] = useState(null)
  const [trueOption, setTrueOption] = useState(null)

  useEffect(() => {
    const getAnswer = () => {
      if (question) {
        let ObjAnswer = question?.questionContent.split('|')
        setObjAnswer(ObjAnswer)
        setTrueOption(question.questionAnswer)
      }
    }
    getAnswer()
  }, [question])

  useEffect(() => {
    if (!userAnswer || !question) return
    userAnswer.forEach((answer) => {
      if (question.id === answer.id) {
        setUserOption(answer.questionAnswer)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])

  useEffect(() => {
    setValue(userOption)
  }, [userOption])

  return (
    <div
      className="hvx-questionItem itemChoose1of4"
      id={`quest${question?.id}`}
    >
      <p className="hvx-textTitleItem">
        <span style={{ fontWeight: '600', minWidth: 'max-content' }}>
          {!userOption && (
            <CloseCircleOutlined
              style={{ color: '#ff0000', paddingRight: '5px' }}
            />
          )}
          Question {stt}.
        </span>
        <span>{renderHTMLtoWord(question.questionTitle)}</span>
      </p>
      <Radio.Group value={value} className="hvx-itemOption ml-3">
        <Radio className="col-md-6 option" value={objAnswer[0]}>
          <div
            className="d-flex"
            style={{ gap: '4px' }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "A.  ${objAnswer[0]}"}`).html,
            }}
          />
          {objAnswer[0] === trueOption && (
            <CheckCircleOutlined style={{ color: '#669900' }} />
          )}
          {userOption &&
            objAnswer[0] !== trueOption &&
            objAnswer[0] === userOption && (
              <CloseCircleOutlined style={{ color: '#ff0000' }} />
            )}
        </Radio>
        <Radio className="col-md-6 option" value={objAnswer[1]}>
          <div
            className="d-flex"
            style={{ gap: '4px' }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "B.  ${objAnswer[1]}"}`).html,
            }}
          />
          {objAnswer[1] === trueOption && (
            <CheckCircleOutlined style={{ color: '#669900' }} />
          )}
          {userOption &&
            objAnswer[1] !== trueOption &&
            objAnswer[1] === userOption && (
              <CloseCircleOutlined style={{ color: '#ff0000' }} />
            )}
        </Radio>
        <Radio className="col-md-6 option" value={objAnswer[2]}>
          <div
            className="d-flex"
            style={{ gap: '4px' }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "B.  ${objAnswer[2]}"}`).html,
            }}
          />
          {objAnswer[2] === trueOption && (
            <CheckCircleOutlined style={{ color: '#669900' }} />
          )}
          {userOption &&
            objAnswer[2] !== trueOption &&
            objAnswer[2] === userOption && (
              <CloseCircleOutlined style={{ color: '#ff0000' }} />
            )}
        </Radio>
        <Radio className="col-md-6 option" value={objAnswer[3]}>
          <div
            className="d-flex"
            style={{ gap: '4px' }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "B.  ${objAnswer[3]}"}`).html,
            }}
          />
          {objAnswer[3] === trueOption && (
            <CheckCircleOutlined style={{ color: '#669900' }} />
          )}
          {userOption &&
            objAnswer[3] !== trueOption &&
            objAnswer[3] === userOption && (
              <CloseCircleOutlined style={{ color: '#ff0000' }} />
            )}
        </Radio>
      </Radio.Group>
      <div className="hvx-textTitleItem question-explanation">
        {renderHTMLtoWord(question?.explanation)}
      </div>
    </div>
  )
}

export default HistoryQuestion
