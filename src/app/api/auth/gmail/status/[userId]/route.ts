import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    
    const response = await fetch(`${BACKEND_URL}/auth/gmail/status/${userId}`)
    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Gmail status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check Gmail authorization status' },
      { status: 500 }
    )
  }
}
