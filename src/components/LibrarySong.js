import React from 'react'

const LibrarySong = ({song, songs, setCurrentSong, audioRef, isPlaying, setSongs, imgRef}) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);

        imgRef.current.classList.add('song-new');

        setTimeout(() => {
            if (isPlaying) {
                audioRef.current.play();
                imgRef.current.classList.remove('song-new');
            }
        }, 500);

        const newSongs = songs.map((songEl) => {
            if(songEl.id === song.id) {
                return {
                    ...songEl,
                    active: true
                }
            } else {
                return {
                    ...songEl,
                    active: false
                }
            }
        })

        setSongs(newSongs);

        if (isPlaying) audioRef.current.play();
        
    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img src={song.cover} alt={`${song.name} Cover`} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong
