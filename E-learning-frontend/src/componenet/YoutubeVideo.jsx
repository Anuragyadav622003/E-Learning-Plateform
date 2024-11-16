import React from "react";
import YouTube from "react-youtube";

const VideoGallery = () => {
  const videoIds = [
    "FxAG_11PzCk", // Replace these with your YouTube video IDs
    "BNfAf4To73c",
   
    "ZVG5u3_o93U",
    "FNpV3DQWUf8",
    "HtvwcJLqxE0"
  ];

  const handlePlayerReady = (event) => {
    console.log("Player is ready!", event.target);
  };

  const handlePlayerStateChange = (event) => {
    console.log("Player state changed!", event.data);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {videoIds.map((id, index) => (
        <div key={index} style={{ width: "300px", height: "200px" }}>
          <YouTube
            videoId={id}
            opts={{
              height: "200",
              width: "300",
              playerVars: {
                autoplay: 0, // Disable autoplay
                controls: 1, // Enable controls
              },
            }}
            onReady={handlePlayerReady}
            onStateChange={handlePlayerStateChange}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
