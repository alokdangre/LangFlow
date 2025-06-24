import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'

interface LLMConfig {
  typeOfWork: string
  systemPrompt?: string
  model: string
  modelType: 'openai' | 'gemini' | string
  apiKey: string
  modelVersion: string,
  query: string
}

export async function runLLM(config: LLMConfig): Promise<string> {
  const { typeOfWork, systemPrompt, model, modelType, apiKey, modelVersion, query } = config

  if (modelType === 'openai') {
    const openai = new OpenAI({ apiKey })
    const response = await openai.chat.completions.create({
      model: modelVersion || model,
      messages: [
        { role: 'system', content: `You are an intelligent model. You are also my assistant to perfrom the task. Your task is this ${typeOfWork}. You have to give a appropriate answer according to the given task. You are also given the some instructions. Your instructions are this --> ${systemPrompt}. The instructions can be null as well and some times might be unrelated to the query given by user, so in such case answer to the query by user according to the given task only.` },
        { role: 'user', content: query }
      ]
    })
    return response.choices[0]?.message?.content?.trim() || ''
  }

  if (modelType === 'gemini') {
    const openai = new OpenAI({
      apiKey,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
    })
    const response = await openai.chat.completions.create({
      model: modelVersion || model,
      messages: [
        { role: 'system', content: `You are an intelligent model. You are also my assistant to perfrom the task. Your task is this ${typeOfWork}. You have to give a appropriate answer according to the given task. You are also given the some instructions. Your instructions are this --> ${systemPrompt}. The instructions can be null as well and some times might be unrelated to the query given by user, so in such case answer to the query by user according to the given task only.` },
        { role: 'user', content: query }
      ]
    })
    return response.choices[0]?.message?.content?.trim() || ''
  }

  if (modelType === 'cluade') {
    const openai = new OpenAI({
      apiKey,
      baseURL: 'https://api.anthropic.com/v1/'
    })
    
    const response = await openai.chat.completions.create({
      model: modelVersion || model,
      messages: [
        { role: 'system', content: `You are an intelligent model. You are also my assistant to perfrom the task. Your task is this ${typeOfWork}. You have to give a appropriate answer according to the given task. You are also given the some instructions. Your instructions are this --> ${systemPrompt}. The instructions can be null as well and some times might be unrelated to the query given by user, so in such case answer to the query by user according to the given task only.` },
        { role: 'user', content: query }
      ]
    })
    return response.choices[0]?.message?.content?.trim() || ''
  }

  throw new Error(`Unsupported model type: ${modelType}`)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { llmConfig, modelConfig, query } = body;
    // Merge configs, modelConfig takes precedence for model fields
    const mergedConfig = { ...llmConfig, ...modelConfig, query };
    const result = await runLLM(mergedConfig);
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
