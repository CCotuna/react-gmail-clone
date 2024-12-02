import React from "react";

import tempBg9 from "../../assets/images/backgrounds/tempBg9.jpg";
import tempBg10 from "../../assets/images/backgrounds/tempBg10.jpg";
import tempBg11 from "../../assets/images/backgrounds/tempBg11.jpg";
import { saveBackground } from "./backgroundFunctions";

const BackgroundChanger = ({ setWallpaper }) => {
  const wallpaperOptions = [tempBg9, tempBg10, tempBg11];

  const handleBackgroundChange = (bg) => {
    setWallpaper(bg);
    saveBackground(bg);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-opacity-70 backdrop-blur-sm rounded-lg">
      {wallpaperOptions.map((bg, index) => (
        <button
          key={index}
          className="w-16 h-16 rounded-md shadow-md border-2 border-transparent hover:border-white focus:outline-none"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => handleBackgroundChange(bg)}
        ></button>
      ))}
    </div>
  );
};

export default BackgroundChanger;
