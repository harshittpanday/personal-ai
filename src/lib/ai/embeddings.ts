import { GoogleGenAI } from "@google/genai";

import { env } from "@/lib/env";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function generateEmbedding(
  text: string
): Promise<number[]> {
  if (!text.trim()) {
    throw new Error("Cannot generate embedding for empty text.");
  }

  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  const embedding = response.embeddings?.[0]?.values;

  if (!embedding) {
    throw new Error("Gemini returned no embedding.");
  }

  return embedding;
}

export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  return Promise.all(texts.map(generateEmbedding));
}