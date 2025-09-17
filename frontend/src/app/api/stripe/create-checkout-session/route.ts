import { NextRequest, NextResponse } from 'next/server'

// Billing is disabled in this project. This endpoint is intentionally stubbed.
export async function POST(_request: NextRequest) {
  return NextResponse.json(
    { error: 'Billing is disabled' },
    { status: 501 }
  )
}
