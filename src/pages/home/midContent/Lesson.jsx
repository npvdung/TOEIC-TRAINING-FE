import { Button } from 'antd'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { HvxContext } from '../../../contexts'

const Lesson = ({ id, title, totalTime, totalPoint }) => {
  const history = useHistory()

  const { setExam } = useContext(HvxContext)

  const handleClickStart = () => {
    setExam({
      examId: id,
      totalTime: totalTime,
      totalPoint: totalPoint,
    })
    history.push(`/exam`)
  }
  return (
    <div className="col-md-6">
      <div className="item">
        <p className="item-title text-bold">{title || 'Không có tiêu đề'}</p>
        <p>
          Total point: <span className="text-bold">{totalPoint || 0}</span>{' '}
        </p>
        <p>
          Total time:{' '}
          <span className="text-bold">{totalTime || 0} minutes</span>
        </p>
        <div className="best-score">
          <span>{totalPoint}</span>
        </div>
        <Button className="hvx-btn-item" onClick={handleClickStart}>
          Start
        </Button>
      </div>
    </div>
  )
}

export default Lesson
