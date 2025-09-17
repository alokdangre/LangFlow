import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || process.env.HOOKS_SERVER_URL || 'https://langflow-production-45ba.up.railway.app'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${BACKEND_URL}/actions/send-gmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Send Gmail error:', error)
    return NextResponse.json(
      { error: 'Failed to send Gmail' },
      { status: 500 }
    )
  }
}
