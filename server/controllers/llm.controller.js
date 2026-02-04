import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function callAPI(userData) {
  const uniqueDays = new Set(userData.map((item) => item.date)).size;
  const prompt = `
You are an AI assistant analyzing a user's CO2 emission data. The input is an array of objects, each containing: type, subType, co2, consumption, userId, date, createdAt, updatedAt.

Return ONLY a JSON object in this format:
{
  "suggestions": [],
  "complements": [],
  "comparison": {
    $key: {
      public: 0,
      user: 0,
      note: '',
    },
    total: {
      public: 0,
      user: 0,
      note: ''
    } 
  },
  "impact": []
}

Instructions:
1. Identify top CO2 contributors from the input.
2. Suggest mitigation strategies in "suggestions".
3. Highlight positive behaviors in "complements".
4. In "comparison", show category-wise CO2 consumption between user and general public over a duration of ${uniqueDays} days.
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
