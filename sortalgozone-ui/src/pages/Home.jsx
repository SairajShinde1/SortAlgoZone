import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const Home = () => {
  // const theme = localStorage.getItem("")
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#1c1c1c";
      document.body.style.color = "white";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "#1c1c1c";
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
      <Card darkMode={darkMode} />
    </div>
  );
};

export default Home;
