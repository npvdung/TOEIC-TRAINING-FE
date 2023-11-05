import { Modal, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { notificationWarning } from '../../../utils/Notification'
import { getExamDetails } from '../../../services/resultService'
import './history-details.scss'
import HistoryContent from './HistoryContent'
import { getUserInfo } from '../../../utils/storage'

const HistoryDetails = (props) => {
  const { show, onClose, selectedExam } = props
  const [exam, setExam] = useState({})
  const [loading, setLoading] = useState(false)
  const [userAnswer, setUserAnswer] = useState([])
  const user = getUserInfo()

  // console.log(user)
  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ' min ' + (seconds < 10 ? '0' : '') + seconds + ' sec'
  }

  useEffect(() => {
    if (selectedExam?.examId) {
      setLoading(true)
      setUserAnswer(JSON.parse(selectedExam.answer))
      getExamDetails(
        selectedExam?.examId,
        (res) => {
          setExam(res.data)
          setLoading(false)
        },
        () => {
          notificationWarning('Can not get history')
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExam])
  // console.log(selectedExam)

  return (
    <Modal
      title="History"
      centered
      open={show}
      onCancel={onClose}
      onOk={onClose}
      width={1200}
      className="history-details"
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Spin spinning={loading}>
        <div className="history-details-content">
          <div className="hvx-contentTitle center">{exam?.examName}</div>
          <div className="exam-info">
            <div className="number-of-correct">
              {`${selectedExam?.numberOfCorrect}/${selectedExam?.totalRecords} questions`}
            </div>
            <div className="info-content">
              <div className="item">
                <div className="title">Full name: </div>
                <div className="content">{`${user.firstName} ${user.lastName}`}</div>
              </div>
              <div className="item">
                <div className="title">Exactly:</div>
                <div className="content">{`${(
                  (selectedExam?.numberOfCorrect / selectedExam?.totalRecords) *
                  100
                ).toFixed(0)}%`}</div>
              </div>
              <div className="item">
                <div className="title">Total time:</div>
                <div className="content">
                  {millisToMinutesAndSeconds(selectedExam?.totalTime)}
                </div>
              </div>
              <div className="item">
                <div className="title"></div>
                <div className="content"></div>
              </div>
            </div>
          </div>
          <HistoryContent
            examName={exam?.examName}
            listQuestion={exam?.data}
            readingList={exam?.readingList}
            userAnswer={userAnswer}
          />
        </div>
      </Spin>
    </Modal>
  )
}

export default HistoryDetails
