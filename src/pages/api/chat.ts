/** @format */

import { OpenAI } from 'openai';
import 'dotenv/config'; // To load environment variables from .env

// Create an OpenAI instance with your API key
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true,
});

/**
 *
 * @param message / Function to get chat response
 * @returns
 */
export const getChatResponse = async (message: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
    });

    return response.choices[0].message?.content || 'Error: No response';
  } catch (error) {
    console.error('Error fetching response:', error);
    return 'Error: Something went wrong';
  }
};
