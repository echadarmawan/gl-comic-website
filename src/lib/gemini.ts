import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,// Untuk SDK @google/genai versi 2.x, konfigurasi apiVersion berada di dalam httpOptions
  httpOptions: {
    apiVersion: "v1",
  },
});