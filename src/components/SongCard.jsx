import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, data }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const isCurrentSong = activeSong?.attributes?.name === song.attributes?.name;

  return (
    <div className="flex flex-col w-[145px] p-1 bg-white/5 bg-opacity-80 animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-50 group">
        <div
          className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 
            ${isCurrentSong ? "opacity-100" : "opacity-0"} 
            group-hover:opacity-100 transition-opacity duration-300`}
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        <img
          alt="song_img"
          src={
            song.attributes?.artwork?.url
              ? song.attributes.artwork.url
                  .replace("{w}", "250")
                  .replace("{h}", "250")
              : "https://via.placeholder.com/250x250?text=No+Image"
          }
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.attributes?.name}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={`/top-artists`}>{song.attributes?.artistName}</Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
