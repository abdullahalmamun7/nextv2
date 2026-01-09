import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const resetChat = () => {
  chatSession = null;
  initializeChat();
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const result = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};
