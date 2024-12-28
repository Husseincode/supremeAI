/** @format */

import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

// Create an OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string, // Use a secure server-side variable
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Use the appropriate model
      messages: [{ role: 'user', content: message }],
    });

    const content = response.choices[0]?.message?.content || 'No response';

    return res.status(200).json({ response: content });
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
