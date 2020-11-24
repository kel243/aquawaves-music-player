import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const Volume = ({audioRef}) => {
    const [volume, setVolume] = useState(50);

    const changeHandler = (e) => {
        setVolume(e.target.value / 100);
        if(volume <= 1) {
            audioRef.current.volume = volume;
        }
        
    }

    const trackAnim = {
        transform: `translateX(${volume / 1.0 * 100}%)`
    }

    return (
        <div className="volume-control"> 
            <FontAwesomeIcon className="skip-back" icon={faVolumeDown}/>
            <div className="track track-volume">
                <input type="range" min="1" max="100"
                    value="50" className="volume-slider" onChange={changeHandler} /> 
                <div style={trackAnim} className="animate-track"></div>
            </div>
            
            <FontAwesomeIcon className="skip-back" icon={faVolumeUp}/>
        </div> 
    )
}

export default Volume
