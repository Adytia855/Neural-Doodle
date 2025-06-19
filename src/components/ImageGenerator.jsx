import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateImageFromPrompt } from "../utils/generateImage";
import Loader from "./Loader";

const STYLE_OPTIONS = [
  "Realistic",
  "Anime",
  "Cyberpunk",
  "Cartoon",
  "Pixel Art",
  "Fantasy",
  "Surreal",
  "Photorealistic",
];

const ImageGenerator = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [gallery, setGallery] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");

    const finalPrompt = selectedStyle
      ? `${prompt}, in ${selectedStyle} style`
      : prompt;

    try {
      const image = await generateImageFromPrompt(
        finalPrompt,
        import.meta.env.VITE_GEMINI_API_KEY
      );
      setGallery((prev) => [
        { prompt, style: selectedStyle, image },
        ...prev,
      ]);
      setPrompt("");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat memuat gambar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (idx) => {
    setGallery((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDownload = (image, promptText) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = promptText.replaceAll(" ", "_").slice(0, 50) + ".png";
    link.click();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/10"
    >
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {STYLE_OPTIONS.map((style) => (
          <motion.button
            key={style}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setSelectedStyle(style)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition cursor-pointer 
              ${""}
              ${
                selectedStyle === style
                  ? "bg-cyan-500 text-white border-cyan-500"
                  : "bg-white/10 text-[var(--text-main)] border-white/20"
                } dark:hover:bg-cyan-500`}
          >
            {style}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center">
        <motion.input
          type="text"
          whileFocus={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex-1 bg-white/10 dark:bg-black/20 rounded-xl px-4 py-2 outline-none
                      text-[var(--text-main)] placeholder:text-[color:var(--text-main)/0.6]
                      focus:ring-2 focus:ring-cyan-400 transition-all"
          placeholder="Describe your dream image..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleGenerate}
          disabled={loading}
          className="bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold px-5 py-2 rounded-xl transition-all duration-300 shadow-md disabled:opacity-40 cursor-pointer"
        >
          {loading ? "Generating..." : "Generate"}
        </motion.button>
      </div>

      {error && <p className="text-red-400 mb-3">{error}</p>}
      {loading && <Loader />}

      <AnimatePresence>
        {gallery.length > 0 && (
          <motion.div
            layout
            className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {gallery.map(({ prompt: p, style, image }, idx) => (
              <motion.figure
                key={image}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex flex-col gap-2 group relative rounded-xl overflow-hidden shadow-lg bg-white/10 p-2 backdrop-blur-xl"
              >
                <motion.img
                  src={image}
                  alt={p}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-full rounded-lg shadow-lg"
                />
                <figcaption className="text-xs text-[color:var(--text-main)/0.6] text-center truncate">
                  {p}
                  {style && (
                    <span className="block italic text-[10px] mt-1">{style}</span>
                  )}
                </figcaption>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute top-2 right-2 flex gap-2"
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDownload(image, p)}
                    title="Download"
                    className="bg-white text-gray-800 px-2 py-1 text-xs rounded-full shadow hover:bg-cyan-100 transition-all"
                  >
                    ⬇️
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(idx)}
                    title="Delete"
                    className="bg-white text-white px-2 py-1 text-xs rounded-full shadow hover:bg-amber-200 transition-all"
                  >
                    🗑️
                  </motion.button>
                </motion.div>
              </motion.figure>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ImageGenerator;
