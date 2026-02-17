
import { GoogleGenAI } from "@google/genai";

// Defensive check for the API key to prevent the app from crashing during initialization
const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    console.warn("API_KEY not found in process.env");
    return "";
  }
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getGhostResponse = async (userMessage: string) => {
  if (!ai) return "The digital link to the Oracle is currently offline.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: "You are the 'Digital Ghost' of a funky, creative software engineer. Your personality is eccentric, helpful, and highly tech-savvy. You love retro games, neon colors, and building cool stuff. Keep responses concise (under 3 sentences) and use a bit of gamer slang like 'pog', 'glitch', or 'buff'.",
        temperature: 0.9,
      }
    });
    return response.text || "The digital mist is too thick right now. Try again, human!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The connection to the Oracle is glitching... Check your settings!";
  }
};
