import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: artistData,
    isFetching,
    error,
  } = useGetArtistDetailsQuery(artistId);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: artistData?.data, i }));
    dispatch(playPause(true));
  };

  if (isFetching) return <Loader title="Loading Artist Details..." />;
  if (error) return <Error />;

  const artist = artistData?.data[0]?.attributes;
  const songs = artistData?.data[0]?.views?.['top-songs']?.data || [];

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col items-center justify-center text-center my-10">
        <img
          src={artist?.artwork?.url?.replace('{w}', '400')?.replace('{h}', '400')}
          alt="artist"
          className="w-40 h-40 rounded-full object-cover"
        />
        <h2 className="text-white font-bold text-3xl mt-4">{artist?.name}</h2>
        <p className="text-gray-300 text-sm mt-2">{artist?.genreNames?.join(', ')}</p>
      </div>

      <h3 className="text-white text-2xl font-semibold mb-6 px-2">Top Songs</h3>

      <div className="flex flex-wrap gap-6 px-2">
        {songs.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            i={i}
            data={songs}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistDetails;
