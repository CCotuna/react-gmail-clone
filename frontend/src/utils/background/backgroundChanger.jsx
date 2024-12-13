import React from "react";

import tempBg5 from "@/assets/images/backgrounds/tempBg5.jpg";
import tempBg6 from "@/assets/images/backgrounds/tempBg6.jpg";
import tempBg7 from "@/assets/images/backgrounds/tempBg7.jpg";
import tempBg8 from "@/assets/images/backgrounds/tempBg8.jpg";
import tempBg9 from "@/assets/images/backgrounds/tempBg9.jpg";
import tempBg10 from "@/assets/images/backgrounds/tempBg10.jpg";
import tempBg11 from "@/assets/images/backgrounds/tempBg11.jpg";
import { saveBackground } from "./backgroundFunctions";

const BackgroundChanger = ({ setWallpaper }) => {
  const wallpaperOptions = [tempBg5, tempBg6, tempBg7, tempBg8, tempBg9, tempBg10, tempBg11];

  const handleBackgroundChange = (bg) => {
    console.log("Background changed:", bg);
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
