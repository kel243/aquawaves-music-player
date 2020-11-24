import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, imgRef}) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map((song) => {
                        return (
                            <LibrarySong imgRef={imgRef} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} song={song} setCurrentSong={setCurrentSong} key={song.id}/>
                        )
                    })
                }
            </div>
            
        </div>
    )
}

export default Library
