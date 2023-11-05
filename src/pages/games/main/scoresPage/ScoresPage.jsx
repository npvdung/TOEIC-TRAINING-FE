import React from 'react';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons'
import './style.scss'

const ScoresPage = ({ scores , totalScores }) => {

    return (
        <div className="hvx-mainGame center">
            <div className="hvx-scoresContainer">
                {scores / totalScores >= 0.7
                    ?
                    <div className="center scoreBox animate__animated animate__bounceInDown">
                        <SmileOutlined className="hvx-finishScoresIcon iconSuccess" />
                        <span className="hvx-scorePoint ">Your score: <span className="scoreSuccess">{scores}/{totalScores}</span></span>
                        <span className="hvx-scoresMessage">
                            You do very well !
                        </span>
                    </div>
                    :
                    <div className="center scoreBox animate__animated animate__bounceInDown">
                        <FrownOutlined className="hvx-finishScoresIcon iconFail" />
                        <span className="hvx-scorePoint">Your score: <span className="scoreFail">{scores}/{totalScores}</span></span>
                        <span className="hvx-scoresMessage">
                            The score is quite low. You need to try harder !
                        </span>
                    </div>
                }
            </div>
        </div>
    );
}

export default ScoresPage;
