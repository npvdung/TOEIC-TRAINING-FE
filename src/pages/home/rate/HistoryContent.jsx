import React from 'react'
import './history-content.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { renderHTMLtoWord } from '../../../constants/dashboardConstants'
import { fetchCategories } from '../../../services/categoriesService'
import HistoryQuestion from './HistoryQuestion'

const RenderReading = (props) => {
  const { reading } = props
  return (
    <div>
      <div className="title-reading">{renderHTMLtoWord(reading?.title)}</div>
      <div className="paragraph-reading">
        {renderHTMLtoWord(reading?.paragraph)}
      </div>
      <div className="translate-reading">
        {renderHTMLtoWord(reading?.translate)}
      </div>
    </div>
  )
}

const HistoryContent = (props) => {
  const [categoriesList, setCategoriesList] = useState([])
  const { listQuestion, readingList, userAnswer } = props

  useEffect(() => {
    fetchCategories((res) => {
      setCategoriesList(res.data.data)
    })
  }, [])
  return (
    <div className="hvx-contentGame ">
      <div className="hvx-mainContent">
        <div className="listItem">
          {categoriesList?.map((category, index) => {
            const checkCategory = listQuestion?.findIndex(
              (quest) => quest.questionCategory === category.id
            )
            if (checkCategory !== -1) {
              return (
                <div key={index}>
                  <div className="question-request">
                    {category.questionRequest}
                  </div>
                  {readingList?.map((reading, index) => {
                    if (reading.categoryId === category.id) {
                      return (
                        <>
                          <RenderReading key={index} reading={reading} />
                          {listQuestion?.map((question, index) => {
                            if (
                              question.questionCategory === category.id &&
                              question.readingId === reading.id
                            ) {
                              return (
                                <HistoryQuestion
                                  key={index}
                                  question={question}
                                  stt={index + 1}
                                  userAnswer={userAnswer}
                                />
                              )
                            }
                            return true
                          })}
                        </>
                      )
                    }
                    return true
                  })}
                  {listQuestion?.map((question, index) => {
                    if (
                      question.questionCategory === category.id &&
                      question.readingId == null
                    ) {
                      return (
                        <HistoryQuestion
                          key={index}
                          question={question}
                          stt={index + 1}
                          userAnswer={userAnswer}
                        />
                      )
                    }
                    return true
                  })}
                </div>
              )
            }
            return true
          })}
        </div>
      </div>
    </div>
  )
}

export default HistoryContent
