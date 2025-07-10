import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import {evaluateCondition} from './help.ts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { isTrueCondition, query } = body;
    const result = await evaluateCondition(isTrueCondition, query);
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
} 
