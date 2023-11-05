import React, { useContext, useEffect, useState } from 'react'
import RightContent from './rightContent/RightContent'
import Sidebar from './sidebar/Sidebar'
import './style.scss'
import { Spin } from 'antd'
import Swal from 'sweetalert2'
import ScoresPage from './scoresPage/ScoresPage'
import {
  finishGameRequest,
  listQuestionRequest,
} from '../../../services/gameService'
import { notificationErr } from '../../../utils/Notification'
import { HvxContext } from '../../../contexts'
import { useHistory } from 'react-router'
import { ROUTER_CONST } from '../../../config/paramsConst/RouterConst'
import useUnload from '../../../hooks/useBeforeUnload'
import { getUserInfo } from '../../../utils/storage'

const Main = () => {
  const [listQuestion, setListQuestion] = useState([])
  const [exam, setExam] = useState()
  const [activeQuestionList, setActiveListQuestion] = useState([])
  const [listQuestionChoose1Of4, setListQuestionChoose1Of4] = useState([])
  const [readingList, setReadingList] = useState([])
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [finishData, setFinishData] = useState()

  const [startTime, setStartTime] = useState()

  const examInfo = useContext(HvxContext).exam
  const history = useHistory()
  const currentUser = getUserInfo()

  useUnload((e) => {
    e.preventDefault()
    e.returnValue = 'Oppp'
  })

  useEffect(() => {
    const test = setInterval(() => console.log(examInfo?.totalTime - 1), 1000)
    if (examInfo?.totalTime) {
      console.log(test)
    }
    return () => clearInterval(test)
  }, [examInfo?.totalTime])

  useEffect(() => {
    if (
      !examInfo ||
      (examInfo.examId === 0 && examInfo.examId === 0 && examInfo.examId === 0)
    ) {
      history.push(ROUTER_CONST.home)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examInfo])

  useEffect(() => {
    fetchQuestionList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchQuestionList = async () => {
    const params = {
      examId: examInfo?.examId,
      userId: currentUser?.id,
    }

    listQuestionRequest(params, getListQuestionResponse, getError)
  }

  const getListQuestionResponse = (response) => {
    const res = response.data
    setListQuestion(res.data)
    setReadingList(res.readingList)
    setExam(response)
    setStartTime(new Date().getTime())
  }

  const getError = (error) => {
    console.log(error.response)
    notificationErr('Ooop! Some thing went wrong!')
  }

  const handleFinishGame = async () => {
    let finalAnswer = listQuestionChoose1Of4

    await Swal.fire({
      title: 'Are you sure finish ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingSubmit(true)
        finishGameRequest(
          {
            userId: currentUser?.id,
            examId: examInfo.examId,
            totalTime: new Date().getTime() - startTime,
            listAnswer: finalAnswer,
          },
          getResponseFinishGame,
          getError
        )
      }
    })
  }

  const getResponseFinishGame = (response) => {
    const res = response.data
    console.log(res)
    setLoadingSubmit(false)
    setFinishData(res)
  }

  const handleActiveQuestion = (item) => {
    if (!activeQuestionList.includes(item)) {
      let temp = [...activeQuestionList, item]
      setActiveListQuestion(temp)
    }
  }

  const handleUnActiveQuestion = (id) => {
    let currentListQuestActive = activeQuestionList.filter((item) => {
      return item !== id
    })
    setActiveListQuestion(currentListQuestActive)
  }

  return (
    <div className="hvx-gamePage">
      <Spin spinning={loadingSubmit}>
        <div className="container">
          {finishData ? (
            <ScoresPage
              totalScores={examInfo?.totalPoint}
              scores={finishData?.scores}
            />
          ) : (
            <Spin
              spinning={listQuestion && listQuestion.length > 0 ? false : true}
            >
              <div className="hvx-mainGame">
                <div className="row ml-0 mr-0">
                  <div className="col-md-3 breakCol">
                    <Sidebar
                      totalTime={examInfo?.totalTime}
                      activeQuestionList={activeQuestionList}
                      listQuestion={listQuestion}
                      handleFinishGame={handleFinishGame}
                    />
                  </div>
                  <div className="col-md-9">
                    <RightContent
                      listQuestion={listQuestion}
                      activeQuestionList={activeQuestionList}
                      examName={exam?.examName}
                      handleActiveQuestion={handleActiveQuestion}
                      handleUnActiveQuestion={handleUnActiveQuestion}
                      listQuestionChoose1Of4={listQuestionChoose1Of4}
                      setListQuestionChoose1Of4={setListQuestionChoose1Of4}
                      readingList={readingList}
                      setReadingList={setReadingList}
                    />
                  </div>
                </div>
              </div>
            </Spin>
          )}
        </div>
      </Spin>
    </div>
  )
}

export default Main
