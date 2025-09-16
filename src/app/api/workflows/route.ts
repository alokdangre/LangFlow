import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const workflows = await prisma.workflow.findMany({
      where: {
        userId: parseInt(session.user.id)
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(workflows)
  } catch (error) {
    console.error('Error fetching workflows:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let { name, description, nodes = [], edges = [] } = await request.json()

    if (!name) {
      const userWorkflows = await prisma.workflow.findMany({
        where: { userId: parseInt(session.user.id) },
        select: { name: true }
      })
      const untitledWorkflows = userWorkflows.filter(w => w.name.startsWith('untitled'))
      name = `untitled${untitledWorkflows.length + 1}`
    }

    // Create a default webhook trigger first
    const defaultTrigger = await prisma.availableTrigger.findFirst({
      where: { name: "Webhook" }
    })

    if (!defaultTrigger) {
      throw new Error("Default webhook trigger not found")
    }

    const workflow = await prisma.workflow.create({
      data: {
        name,
        description,
        userId: parseInt(session.user.id),
        triggerId: defaultTrigger.id,
        nodes,
        edges
      }
    })

    return NextResponse.json(workflow, { status: 201 })
  } catch (error) {
    console.error('Error creating workflow:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
