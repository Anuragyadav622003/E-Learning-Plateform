import React from "react";
import YouTube from "react-youtube";

const FullWidthVideo = ({url}) => {
  const videoId = url; // Replace this with your desired YouTube video ID

  const handlePlayerReady = (event) => {
    console.log("Player is ready!", event.target);
  };

  const handlePlayerStateChange = (event) => {
    console.log("Player state changed!", event.data);
  };

  return (
    <div className="relative w-full pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
      <YouTube
        videoId={videoId}
        opts={{
          height: "100%",
          width: "100%",
          playerVars: {
            autoplay: 0, // Disable autoplay
            controls: 1, // Enable controls
          },
        }}
        onReady={handlePlayerReady}
        onStateChange={handlePlayerStateChange}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default FullWidthVideo;
