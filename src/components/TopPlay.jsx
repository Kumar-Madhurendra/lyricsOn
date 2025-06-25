/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery, useGetArtistDetailsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

// Inline Artist Image Fetcher
const ArtistImageInline = ({ artistId }) => {
  const { data, isFetching, error } = useGetArtistDetailsQuery(artistId);

  if (isFetching || error || !data?.data?.[0]?.attributes?.artwork?.url) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-purple-600 text-white font-bold text-xl rounded-full">
        ?
      </div>
    );
  }

  const imageUrl = data.data[0].attributes.artwork.url.replace("{w}", "250").replace("{h}", "250");

  return (
    <img
      src={imageUrl}
      alt="artist"
      className="rounded-full w-full h-full object-cover"
    />
  );
};

// Song Card Component
const TopChartCard = ({ song, i, isPlaying, activeSong, handlePlayClick, handlePauseClick }) => {
  const { name, artistName, artwork } = song.attributes;

  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-14 h-14 rounded-lg"
          src={artwork?.url?.replace("{w}x{h}", "125x125")}
          alt={name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <p className="text-xl font-bold text-white truncate">{name || "No Title"}</p>
          <p className="text-base text-gray-300 mt-1 truncate">{artistName || "No Artist"}</p>
        </div>
      </div>
      <PlayPause
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

// Main Component
const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();
  const topPlays = (data?.slice?.(0, 20) || []).filter((song) =>
  song?.hub?.actions?.find((a) => a.type === 'uri')?.uri ||
  song?.hub?.options?.[0]?.actions?.[0]?.uri ||
  song?.attributes?.previews?.[0]?.url
);


  const divRef = useRef(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    const formattedSong = {
      key: song.id,
      title: song.attributes.name,
      subtitle: song.attributes.artistName,
      images: {
        coverart: song.attributes.artwork?.url?.replace("{w}x{h}", "500x500"),
      },
    };

    dispatch(setActiveSong({ song: formattedSong, data, i }));
    dispatch(playPause(true));
  };

  if (isFetching) return <p className="text-white">Loading Top Charts...</p>;
  if (error || !topPlays.length) return <p className="text-red-500">Failed to fetch top charts</p>;

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays.map((song, i) => (
            <TopChartCard
              key={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePlayClick={handlePlayClick}
              handlePauseClick={handlePauseClick}
            />
          ))}
        </div>
      </div>

      {/* Top Artists Carousel */}
      <div className="w-full mt-8">
        <h2 className="text-white font-bold text-2xl mb-4">Top Artists</h2>
        <Swiper
  slidesPerView="auto"
  spaceBetween={15}
  freeMode
  centeredSlides
  centeredSlidesBounds
  modules={[FreeMode]}
  className="mt-4"
>
  {topPlays.map((song) => {
    const artistId = song.relationships?.artists?.data?.[0]?.id;
    const imgUrl = song.attributes?.artwork?.url?.replace("{w}x{h}", "250x250");

    return (
      <SwiperSlide
        key={song.id}
        style={{ width: "25%", height: "auto" }}
        className="shadow-lg rounded-full animate-slideright"
      >
        <Link to={`/artists/${artistId}`}>
          <img
            src={imgUrl}
            alt={song.attributes?.artistName}
            className="rounded-full w-full h-full object-cover"
          />
        </Link>
      </SwiperSlide>
    );
  })}
</Swiper>

      </div>
    </div>
  );
};

export default TopPlay;
