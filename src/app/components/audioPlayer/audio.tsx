import React, { useRef, useState } from 'react';
import { FaPause } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import "./audio.css"

type AudioPlayerProps = {
  src: string;
  title?: string;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      {title && <h3>{title}</h3>}
      <audio ref={audioRef} src={src} />
      <button className='playmusic' onClick={togglePlayPause}>
        {isPlaying ? <FaPause/> : <FaPlay/>}
      </button>
    </div>
  );
};

export default AudioPlayer;
