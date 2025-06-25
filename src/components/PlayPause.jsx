import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => {
  const activeTitle = activeSong?.attributes?.name || activeSong?.title;
  const currentTitle = song?.attributes?.name || song?.title;
  const isCurrent = isPlaying && activeTitle === currentTitle;

  return (
    <div className="relative flex items-center justify-center">
      {isCurrent ? (
        <>
          <FaPauseCircle
            size={40}
            className="text-green-400 animate-pulse hover:scale-110 transition-transform duration-200"
            onClick={handlePause}
          />
          <span className="absolute bottom-[-20px] text-xs text-green-400 font-semibold">
            Playing
          </span>
        </>
      ) : (
        <FaPlayCircle
          size={40}
          className="text-gray-300 hover:text-white hover:scale-110 transition-transform duration-200"
          onClick={handlePlay}
        />
      )}
    </div>
  );
};

export default PlayPause;
