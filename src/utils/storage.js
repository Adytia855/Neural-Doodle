const STORAGE_KEY = "lastImage";

export const saveLastImage = (prompt, imageDataUri) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ prompt, image: imageDataUri })
    );
  } catch (err) {
    console.error("[storage] Failed to save image:", err);
  }
};

export const loadLastImage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("[storage] Corrupted cache, clearing…");
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const clearLastImage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
