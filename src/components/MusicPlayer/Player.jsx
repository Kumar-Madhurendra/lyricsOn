import React, { useRef, useEffect } from 'react';

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const ref = useRef(null);

  // ✅ Try all known sources
  const audioSrc =
    activeSong?.hub?.actions?.find((a) => a?.type === 'uri')?.uri || // ShazamCore
    activeSong?.hub?.options?.[0]?.actions?.[0]?.uri ||              // Fallback
    activeSong?.attributes?.previews?.[0]?.url ||                    // Apple preview
    "https://samplelib.com/lib/preview/mp3/sample-3s.mp3";           // Local fallback (for testing)

  // 🔍 Debug logs
  console.log("🔊 audioSrc:", audioSrc);
  console.log("🎶 activeSong:", activeSong);
  console.log("✅ Song Preview URL:", activeSong?.attributes?.previews?.[0]?.url);

  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play().catch((err) =>
          console.warn("⚠️ Playback error:", err)
        );
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current && seekTime !== undefined) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={audioSrc}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
