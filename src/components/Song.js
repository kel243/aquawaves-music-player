import React from 'react'

const Song = ({currentSong, isPlaying, imgRef}) => {
    return (
        <div className="song-container">
            <img ref={imgRef} src={currentSong.cover} alt={`${currentSong.name} Cover`} className={`song-img ${isPlaying ? 'song-active' : ''}`}/>
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    )
}

export default Song
