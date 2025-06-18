export const generateImageFromPrompt = async (prompt, apiKey) => {
  if (!prompt) throw new Error("Prompt kosong");
  if (!apiKey) throw new Error("API key tidak tersedia");

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent";

  const res = await fetch(`${endpoint}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData);

  if (!imagePart) throw new Error("Tidak ada gambar dalam respons API");

  return `data:image/png;base64,${imagePart.inlineData.data}`;
};
