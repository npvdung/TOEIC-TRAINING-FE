import { CloseCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { renderQuestionLevel } from '../../../../constants/dashboardConstants'
import {
  renderContent,
  renderHTMLtoWord,
} from '../../../../utils/questionTools'

const QuestionItem = ({ data, handleRemoveQuestionSelected }) => {
  return (
    <div className="col-lg-12">
      <div className="question-selected-list">
        {data?.length > 0 &&
          data.map((item, index) => (
            <div className="question-selected-item" key={item.id}>
              <div className="item-cpn col-md-7">
                <span className="item-title" style={{ display: 'flex', gap: '5px' }}>
                  Question {index + 1}:{' '}
                  {renderHTMLtoWord(renderContent(item.questionTitle, 100))}
                </span>
              </div>
              <div className="item-cpn col-md-2">
                <span className="item-point">Point: {item.questionPoint}</span>
              </div>
              <div className="item-cpn col-md-3">
                <span className="item-point">
                  Level: {renderQuestionLevel(item.questionLevel)}
                </span>
              </div>
              <div className="item-cpn ">
                <CloseCircleOutlined
                  className="close-icon"
                  onClick={() => handleRemoveQuestionSelected(item.id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default QuestionItem
