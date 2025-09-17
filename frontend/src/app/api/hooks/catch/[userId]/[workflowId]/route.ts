import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; workflowId: string }> }
) {
  try {
    const { userId, workflowId } = await params
    const body = await request.json()
    
    const response = await fetch(`${BACKEND_URL}/hooks/catch/${userId}/${workflowId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Webhook catch error:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; workflowId: string }> }
) {
  try {
    const { userId, workflowId } = await params
    
    const response = await fetch(`${BACKEND_URL}/hooks/catch/${userId}/${workflowId}`)
    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Webhook info error:', error)
    return NextResponse.json(
      { error: 'Failed to get webhook info' },
      { status: 500 }
    )
  }
}
