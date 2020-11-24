import React, { useState, useRef } from 'react';
import './styles/app.scss';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
import Volume from './components/Volume';
import data from './data';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
      animationPercentage: 0
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const audioRef = useRef(null);
  const imgRef = useRef(null);

  const timeUpdateHandler = (e) => {
      const current = e.target.currentTime;
      const duration = e.target.duration;
      const animationPercentage = current / duration * 100;
      setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animationPercentage});
  }

  const songEndHandler = async () => {
    let index = songs.findIndex((song) => song.id === currentSong.id);
    index = index + 1;

    if(index > songs.length - 1) index = 0;
    
    await setCurrentSong(songs[index]);

    imgRef.current.classList.add('song-new');

    setTimeout(() => {
      if (isPlaying) {
        audioRef.current.play();
        imgRef.current.classList.remove('song-new');
      }
    }, 500)

    songs.map((item) => {
        return songs[index].id !== item.id
            ? (item.active = false)
            : (item.active = true);
    });

  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song imgRef={imgRef} currentSong={currentSong} isPlaying={isPlaying}/>
      <Player imgRef={imgRef} currentSong={currentSong} songs={songs} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong}/>
      <Library imgRef={imgRef} libraryStatus={libraryStatus} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler}></audio>
    </div>
  );
}

export default App;
