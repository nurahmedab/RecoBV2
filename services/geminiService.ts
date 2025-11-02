import { GoogleGenAI, Type } from "@google/genai";
import type { PatientProfile, DietPlan } from '../types';

if (!process.env.API_KEY) {
    // This is a placeholder for environments where the key is not set.
    // The web app assumes process.env.API_KEY is available globally.
    console.warn("API_KEY environment variable not set. Using a placeholder.");
    process.env.API_KEY = "YOUR_API_KEY"; 
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const mealProperties = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        description: { type: Type.STRING },
        calories: { type: Type.NUMBER },
        ingredients: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of key ingredients for this meal." }
    },
    required: ["name", "description", "calories", "ingredients"]
};

const dietPlanSchema = {
    type: Type.OBJECT,
    properties: {
        patientName: { type: Type.STRING },
        preOpPlan: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A brief summary of pre-op dietary goals." },
                dailyPlans: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            day: { type: Type.STRING, description: "e.g., 'Day -7', 'Monday'" },
                            breakfast: mealProperties,
                            lunch: mealProperties,
                            dinner: mealProperties,
                            snacks: {
                                type: Type.ARRAY,
                                items: mealProperties
                            }
                        },
                        required: ["day", "breakfast", "lunch", "dinner", "snacks"]
                    }
                }
            },
            required: ["summary", "dailyPlans"]
        },
        postOpPlan: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    week: { type: Type.NUMBER },
                    summary: { type: Type.STRING, description: "Summary of dietary goals for the week." },
                    dailyPlans: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                day: { type: Type.STRING },
                                breakfast: mealProperties,
                                lunch: mealProperties,
                                dinner: mealProperties,
                                snacks: {
                                    type: Type.ARRAY,
                                    items: mealProperties
                                }
                            },
                            required: ["day", "breakfast", "lunch", "dinner", "snacks"]
                        }
                    }
                },
                required: ["week", "summary", "dailyPlans"]
            }
        }
    },
    required: ["patientName", "preOpPlan", "postOpPlan"]
};

export const generateDietPlan = async (profile: PatientProfile): Promise<DietPlan> => {
    const prompt = `
        You are a professional nutritionist and medical advisor specializing in surgical patient care.
        Create a detailed and safe 7-day pre-operative and a 4-week post-operative diet plan for a patient with the following profile:
        - Name: ${profile.name}
        - Age: ${profile.age}
        - Weight: ${profile.weight} ${profile.weightUnit}
        - Surgery Type: ${profile.surgeryType}
        - Scheduled Surgery Date: ${profile.surgeryDate}
        - Allergies: ${profile.allergies || 'None'}
        - Existing Medical Conditions: ${profile.medicalConditions || 'None'}
        - Dietary Preferences: ${profile.dietaryPreferences || 'None'}

        The plan must be structured to aid recovery, minimize complications, and be easy to follow.
        - The pre-operative phase should start 7 days before the surgery. Days should be labeled 'Day -7', 'Day -6', etc.
        - The post-operative phase should cover the first 4 weeks, broken down by week.
        - For each meal (breakfast, lunch, dinner, snacks), provide a name, a brief description of the food, an estimated calorie count, and a list of key ingredients required for preparation.
        - Post-op Week 1 should focus on liquids and very soft foods, gradually introducing more solid foods in subsequent weeks.
        - The output must be a JSON object that strictly adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: dietPlanSchema
            }
        });

        const jsonText = response.text.trim();
        const plan = JSON.parse(jsonText) as DietPlan;
        return plan;
    } catch (error) {
        console.error("Error generating diet plan:", error);
        throw new Error("Failed to generate diet plan. The AI model may be temporarily unavailable.");
    }
};