import React from 'react';
import { checkTypeData } from '../../../../../../utils/CheckData';
import ReactAudioPlayer from "react-audio-player";

const RenderDescription = ({ data }) => {

    const typeData = checkTypeData(data)

    return (
        <div className="mt-3 mb-2">
            {typeData === "image" ? <img className="hvx-descImg" src={data} alt="description" /> :
                (typeData === "audio" ? <ReactAudioPlayer controls src={data} width="200" /> :
                    (typeData === "video" ?

                        <video className="video-container video-container-overlay" autoPlay={false} >
                            <source type="video/mp4" data-reactid=".0.1.0.0.0" src="mov_bbb.mp4" />
                        </video>

                        : <span className="hvx-descText">{data}</span>))}
        </div>
    );
}

export default RenderDescription;
