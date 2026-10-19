import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Gemini API configuration
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY is missing from your .env file.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Test backend
app.get("/", (req, res) => {
  res.send("StudyVerse AI backend is running!");
});

// AI Tutor endpoint
app.post("/api/tutor", async (req, res) => {
  try {
    const { question } = req.body ?? {};

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        error: "Please enter a study question."
      });
    }

    console.log("AI Tutor question received.");

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `You are the StudyVerse AI Tutor.
Explain the topic in simple, student-friendly language.

Include:
1. A clear explanation
2. A practical example
3. One practice question
4. A short study tip

Student's question: ${question.trim()}`
    });

    const answer = response.text;

    if (!answer || !answer.trim()) {
      console.error("Gemini returned an empty answer.");

      return res.status(502).json({
        error: "The AI returned an empty answer. Please try again."
      });
    }

    console.log("AI Tutor answer generated successfully.");

    return res.json({ answer });

  } catch (error) {
    console.error("Gemini API error:", error);

    const status = Number(error?.status) || 500;
    const details = String(error?.message || "Unknown error");

    let message = "The AI Tutor could not generate an answer.";

    if (status === 400) {
      message = "The request was invalid. Please check the question and API configuration.";
    } else if (status === 401 || status === 403) {
      message = "Gemini authentication failed. Check your API key and permissions.";
    } else if (status === 404) {
      message = "The configured Gemini model is unavailable. Check the model name supported by your API key.";
    } else if (status === 429) {
      message = "Gemini rate limit or quota reached. Check your API usage.";
    }

    return res.status(status >= 400 && status <= 599 ? status : 500).json({
      error: message,
      details
    });
  }
});

// Start backend
app.listen(PORT, () => {
  console.log(`StudyVerse backend running at http://localhost:${PORT}`);
});
