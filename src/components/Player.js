import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCaretLeft, faCaretRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({audioRef, songInfo, currentSong, setSongInfo, isPlaying, setIsPlaying, songs, setCurrentSong, imgRef}) => {

    const playSongHandler = () => {
        if(!isPlaying) {
            imgRef.current.classList.remove('song-new');
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
       
    }

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

    const skipTrackHandler = async (direction) => {
        let index = songs.findIndex((song) => song.id === currentSong.id);
        index = index + direction;

        if(index > songs.length - 1) index = 0;

        if(index < 0) index = songs.length - 1;
        
        await setCurrentSong(songs[index]);

        imgRef.current.classList.add('song-new');

        setTimeout(() => {
            if (isPlaying) {
                audioRef.current.play();
                imgRef.current.classList.remove('song-new');
            }
        }, 500);

        songs.map((item) => {
            return songs[index].id !== item.id
                ? (item.active = false)
                : (item.active = true);
        });

    }

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track">
                    <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type='range' />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler(-1)} className="skip-back" size="2x" icon={faCaretLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play"  size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler(1)} className="skip-forward"  size="2x" icon={faCaretRight}/>
            </div>
        </div>
    )
}

export default Player
