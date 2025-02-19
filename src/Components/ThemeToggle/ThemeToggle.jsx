import { useContext, useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { ThemeContext } from "../../../ThemeProvider/ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-[#6B7280] bg-[#E3E3E3] dark:bg-gray-700 dark:text-yellow-300"
    >
      {theme === "light" ? <IoMoonOutline /> : <MdOutlineLightMode />}
    </button>
  );
};

export default ThemeToggle;
