import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Error, Loader } from '../components';
import { Link } from 'react-router-dom';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading Top Artists..." />;
  if (error) return <Error />;

  const uniqueArtists = Array.from(
    new Map(
      data?.map((song) => [song?.artists?.[0]?.adamid, song?.artists?.[0]])
    ).values()
  );

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-8">
      {uniqueArtists.map((artist) => (
        <Link
          to={`/artists/${artist?.adamid}`}
          key={artist?.adamid}
          className="w-40 flex flex-col items-center"
        >
          <img
            src={artist?.avatar || 'https://via.placeholder.com/150'}
            alt={artist?.alias}
            className="w-32 h-32 rounded-full object-cover shadow-lg"
          />
          <p className="mt-2 text-white font-semibold text-center">
            {artist?.alias}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default TopArtists;
