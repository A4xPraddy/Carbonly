import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function callAPI() {
  const userData = [
    {
      _id: "6981f000eae568a6644358f1",
      type: "transport",
      subType: "car",
      co2: 1.2,
      consumption: 10,
      userId: "69818b3596733ff2a55d9dbc",
      date: "2026-02-03T00:00:00.000Z",
      createdAt: "2026-02-03T12:54:24.611Z",
      updatedAt: "2026-02-03T12:54:24.611Z",
      __v: 0,
    },
  ];
  const prompt = `
You are an AI assistant analyzing a user's CO2 emission data. The input is an array of objects, each containing: type, subType, co2, consumption, userId, date, createdAt, updatedAt.

Return ONLY a JSON object in this format:
{
  "suggestions": [],
  "complements": [],
  "comparison": {},
  "impact": []
}

Instructions:
1. Identify top CO2 contributors from the input.
2. Suggest mitigation strategies in "suggestions".
3. Highlight positive behaviors in "complements".
4. In "comparison", show category-wise CO2 consumption between user and general public.
5. Populate "impact" with 5 meaningful CO2 equivalence examples.
6. Return ONLY JSON, no extra text.

Input data: ${JSON.stringify(userData)}
`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response;
}
