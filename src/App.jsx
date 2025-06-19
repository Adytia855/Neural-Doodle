import { useEffect, useState } from "react";
import { getTheme, setTheme } from "./utils/theme";
import ImageGenerator from './components/ImageGenerator'
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  const [theme, setLocalTheme] = useState(getTheme());
  useEffect(() => setTheme(theme), [theme]);
  const toggleTheme = () =>
    setLocalTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <>
    <main className="min-h-screen  px-4 py-10 flex flex-col items-center">
      <div className="flex justify-end w-full max-w-5xl px-4 mb-4">
        <button
          onClick={toggleTheme}
          className={`rounded-full px-4 py-2 text-sm font-semibold backdrop-blur
            hover:scale-105 active:scale-95 transition
            text-[var(--text-main)] cursor-pointer
            ${theme === "dark" ? "bg-white/20" : "bg-black/10"}`}>
          
          {theme === "dark" ? "🌙 Dark" : "🌞 Light"}
        </button>
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center drop-shadow-md">
      🧠 NeuralDoodle 
      </h1>
      <p className="text-sm font-[Space Grotesk] sm:text-base mb-8 /70 max-w-xl text-center">
      AI Image Playground
      </p>
      <ImageGenerator />
    </main>
    <Footer />
    </>

  );
};

export default App;
