import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

/**
 * Evaluates a condition using Gemini (mocked for now).
 * @param isTrueCondition - The condition string to evaluate.
 * @returns Promise<boolean> - true if the condition is true, false otherwise.
 */
export async function evaluateCondition (isTrueCondition: string, query: string): Promise<boolean> {
  const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
  });
  const response = await openai.chat.completions.create({
    model: 'gemini-2.0-flash',
    messages: [
      { role: 'system', content: `You are the assistant which  will be given the statement by the user. Just tell if it is true or false based on true condition.The condition for true is ---> ${isTrueCondition}. Now only output 'true' if true else 'false'.` },
      { role: 'user', content: query }
    ]
  })
  const answer = response.choices[0]?.message?.content?.trim().toLowerCase() ?? 'false'
  return answer === 'true'
}
