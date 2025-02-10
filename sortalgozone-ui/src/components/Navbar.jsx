import React, { useEffect, useState } from "react";

const Navbar = ({ setDarkMode, darkMode }) => {
  return (
    <div className="flex items-center justify-around p-5">
      <div></div>
      <h1 className="text-5xl font-medium">SortAlgoZone</h1>
      <div>
        <div className="flex items-center justify-center mt-1">
          <input
            onChange={() => {
              setDarkMode(!darkMode);
            }}
            className="hidden peer"
            type="checkbox"
            id="dark-mode"
          />
          <label
            className={`absolute w-[60px] sm:w-[120px] h-[30px] sm:h-[52px] rounded-full cursor-pointer transition-colors duration-300 ${
              darkMode ? "bg-gray-200" : "bg-gray-600"
            } `}
            htmlFor="dark-mode"
          >
            <div
              className={`w-[26px] sm:w-[46px] h-[24px] sm:h-[46px] rounded-full top-[3px] absolute left-[3px] ${
                darkMode ? "animate-toggleOn" : "animate-toggleOff"
              } ${darkMode ? "bg-black" : "bg-white"}`}
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
