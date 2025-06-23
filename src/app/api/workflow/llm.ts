import { OpenAI } from 'openai'

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