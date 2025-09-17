import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || process.env.HOOKS_SERVER_URL || 'https://langflow-production-45ba.up.railway.app'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const response = await fetch(`${BACKEND_URL}/auth/gmail?userId=${userId}`)
    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Gmail auth error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate Gmail authorization' },
      { status: 500 }
    )
  }
}
