import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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

  console.log('Seed data created successfully!')
  console.log({ webhookTrigger, emailTrigger, scheduleTrigger, sendEmailAction, webhookAction, conditionalAction, llmAction })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
