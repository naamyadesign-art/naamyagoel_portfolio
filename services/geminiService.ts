
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGhostResponse = async (userMessage: string) => {
  try {
    // You must use ai.models.generateContent to query GenAI with both the model name and prompt.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: "You are the 'Digital Ghost' of a funky, creative software engineer. Your personality is eccentric, helpful, and highly tech-savvy. You love retro games, neon colors, and building cool stuff. Keep responses concise (under 3 sentences) and use a bit of gamer slang like 'pog', 'glitch', or 'buff'.",
        temperature: 0.9,
      }
    });
    // Directly returns the string output using the .text property.
    return response.text || "The digital mist is too thick right now. Try again, human!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The connection to the Oracle is glitching... Check your settings!";
  }
};