import React from 'react'
import ChooseOneOfFour from './questionItem/ChooseOneOfFour'
import './style.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchCategories } from '../../../../services/categoriesService'
import { renderHTMLtoWord } from '../../../../constants/dashboardConstants'

const RenderReading = (props) => {
  const { reading } = props
  return (
    <div>
      <div className="title-reading">{renderHTMLtoWord(reading?.title)}</div>
      <div className="paragraph-reading">
        {renderHTMLtoWord(reading?.paragraph)}
      </div>
    </div>
  )
}

const RightContent = (props) => {
  const [categoriesList, setCategoriesList] = useState([])
  const {
    examName,
    listQuestion,
    setListQuestionChoose1Of4,
    listQuestionChoose1Of4,
    handleActiveQuestion,
    activeQuestionList,
    readingList,
  } = props

  useEffect(() => {
    fetchCategories((res) => {
      setCategoriesList(res.data.data)
    })
  }, [])
  return (
    <div className="hvx-contentGame ">
      <div className="hvx-contentTitle center">{examName}</div>
      <div className="hvx-mainContent">
        <div className="listItem">
          {categoriesList?.map((category) => {
            const checkCategory = listQuestion?.findIndex(
              (quest) => quest.questionCategory === category.id
            )
            if (checkCategory !== -1) {
              return (
                <>
                  <div className="question-request">
                    {category.questionRequest}
                  </div>
                  {readingList?.map((reading) => {
                    if (
                      reading.categoryId === category.id &&
                      reading.level === 1
                    ) {
                      return (
                        <>
                          <RenderReading reading={reading} />
                          {listQuestion?.map((question, index) => {
                            if (
                              question.questionCategory === category.id &&
                              question.readingId === reading.id
                            ) {
                              return (
                                <ChooseOneOfFour
                                  key={index}
                                  data={question}
                                  stt={index + 1}
                                  activeQuestionList={activeQuestionList}
                                  handleActiveQuestion={handleActiveQuestion}
                                  listQuestionChoose1Of4={
                                    listQuestionChoose1Of4
                                  }
                                  setListQuestionChoose1Of4={
                                    setListQuestionChoose1Of4
                                  }
                                />
                              )
                            }
                            return true
                          })}
                        </>
                      )
                    } else if (
                      reading.categoryId === category.id &&
                      reading.level === 2
                    ) {
                      return (
                        <>
                          <RenderReading reading={reading} />
                          {listQuestion?.map((question, index) => {
                            if (
                              question.questionCategory === category.id &&
                              question.readingId === reading.id
                            ) {
                              return (
                                <ChooseOneOfFour
                                  key={index}
                                  data={question}
                                  stt={index + 1}
                                  activeQuestionList={activeQuestionList}
                                  handleActiveQuestion={handleActiveQuestion}
                                  listQuestionChoose1Of4={
                                    listQuestionChoose1Of4
                                  }
                                  setListQuestionChoose1Of4={
                                    setListQuestionChoose1Of4
                                  }
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
                        <ChooseOneOfFour
                          key={index}
                          data={question}
                          stt={index + 1}
                          activeQuestionList={activeQuestionList}
                          handleActiveQuestion={handleActiveQuestion}
                          listQuestionChoose1Of4={listQuestionChoose1Of4}
                          setListQuestionChoose1Of4={setListQuestionChoose1Of4}
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
        </div>
      </div>
    </div>
  )
}

export default RightContent
