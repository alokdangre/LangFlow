import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Check if data already exists
    const existingTriggers = await prisma.availableTrigger.count()
    const existingActions = await prisma.availableAction.count()

    if (existingTriggers > 0 && existingActions > 0) {
      return NextResponse.json({ 
        message: 'Database already initialized',
        triggers: existingTriggers,
        actions: existingActions
      })
    }

    // Create available triggers
    const webhookTrigger = await prisma.availableTrigger.upsert({
      where: { name: 'Webhook' },
      update: {},
      create: {
        name: 'Webhook',
        image: '/icons/webhook.svg'
      }
    })

    const emailTrigger = await prisma.availableTrigger.upsert({
      where: { name: 'Email' },
      update: {},
      create: {
        name: 'Email',
        image: '/icons/email.svg'
      }
    })

    const scheduleTrigger = await prisma.availableTrigger.upsert({
      where: { name: 'Schedule' },
      update: {},
      create: {
        name: 'Schedule',
        image: '/icons/schedule.svg'
      }
    })

    // Create available actions
    const sendEmailAction = await prisma.availableAction.upsert({
      where: { name: 'Send Email' },
      update: {},
      create: {
        name: 'Send Email',
        image: '/icons/send-email.svg'
      }
    })

    const webhookAction = await prisma.availableAction.upsert({
      where: { name: 'Webhook' },
      update: {},
      create: {
        name: 'Webhook',
        image: '/icons/webhook.svg'
      }
    })

    const conditionalAction = await prisma.availableAction.upsert({
      where: { name: 'Conditional' },
      update: {},
      create: {
        name: 'Conditional',
        image: '/icons/conditional.svg'
      }
    })

    const llmAction = await prisma.availableAction.upsert({
      where: { name: 'LLM' },
      update: {},
      create: {
        name: 'LLM',
        image: '/icons/llm.svg'
      }
    })

    return NextResponse.json({
      message: 'Database initialized successfully',
      data: {
        triggers: [webhookTrigger, emailTrigger, scheduleTrigger],
        actions: [sendEmailAction, webhookAction, conditionalAction, llmAction]
      }
    })

  } catch (error) {
    console.error('Error initializing database:', error)
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    )
  }
}
