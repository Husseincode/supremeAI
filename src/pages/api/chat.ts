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

  // if (!process.env.OPENAI_API_KEY) {
  //   console.error('Missing OpenAI API Key');
  //   return res
  //     .status(500)
  //     .json({ error: 'Internal server configuration error' });
  // }

  // if (!Array.isArray(history)) {
  //   return res.status(400).json({ error: 'Invalid history format' });
  // }

  const jarvisAcknowledgment = (userMessage: string) => {
    if (userMessage.toLowerCase().includes('who created you')) {
      return "I was created by Akanji Abayomi, a skilled web developer based in Nigeria. I'm here to assist you with anything you need!";
    }
    return null;
  };

  const acknowledgment = jarvisAcknowledgment(message);

  if (acknowledgment) {
    return res.status(200).json({ response: acknowledgment });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Use the appropriate model
      messages: [
        {
          role: 'system',
          content:
            'You are Jarvis, an AI assistant created by Akanji Abayomi. You are friendly, intelligent, and eager to assist users with any questions or tasks.',
        },
        // ...(Array.isArray(history) ? history : []),
        { role: 'user', content: message },
      ],
    });

    const content = response.choices[0]?.message?.content || 'No response';
    //console.log(response);

    return res.status(200).json({ response: content });
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
