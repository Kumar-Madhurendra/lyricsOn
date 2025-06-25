import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import {  useGetSongsByGenreQuery} from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

// Add this inside Discover component
const handlePauseClick = () => {
  dispatch(playPause(false));
};

const handlePlayClick = (song, i) => {
  dispatch(setActiveSong({ song, data, i }));
  dispatch(playPause(true));
};



const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // ✅ 1. ADD selectedGenre state
  const [selectedGenre, setSelectedGenre] = useState("POP");

  // ✅ 2. FETCH top charts (static for now — can later filter based on genre)
 const { data, isFetching, error } = useGetSongsByGenreQuery(selectedGenre);


  // ✅ 3. Map genre title from constant
  const genreTitle =
    genres.find((g) => g.value === selectedGenre)?.title || "Pop";

  // ✅ 4. Handle dropdown change
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    // In future, you can use this value to fetch genre-specific songs
  };

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col  ">
      {/* Header + Genre Dropdown */}
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>

        {/* ✅ 5. Genre Select Dropdown */}
        <select
          onChange={handleGenreChange}
          value={selectedGenre}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ 6. Song Cards Grid (keep your new layout) */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-0 gap-y-6">
        {data?.slice(0, 50).map((song, i) => (
          <SongCard
  key={song.key || `${song.title}-${i}`}
  song={song}
  i={i}
  data={data}
  isPlaying={isPlaying}
  activeSong={activeSong}
  handlePlayClick={handlePlayClick}
  handlePauseClick={handlePauseClick}
/>
        ))}
      </div>
    </div>
  );
};

export default Discover;
