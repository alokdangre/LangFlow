// import { NextRequest, NextResponse } from 'next/server'
// import { stripe } from '@/lib/stripe'
// import { prisma } from '@/lib/prisma'
// import Stripe from 'stripe'

// export async function POST(request: NextRequest) {
//   const body = await request.text()
//   const signature = request.headers.get('stripe-signature')

//   if (!signature) {
//     return NextResponse.json(
//       { error: 'No signature provided' },
//       { status: 400 }
//     )
//   }

//   let event: Stripe.Event

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     )
//   } catch (error) {
//     console.error('Webhook signature verification failed:', error)
//     return NextResponse.json(
//       { error: 'Invalid signature' },
//       { status: 400 }
//     )
//   }

//   try {
//     switch (event.type) {
//       case 'checkout.session.completed': {
//         const session = event.data.object as Stripe.Checkout.Session
        
//         if (session.mode === 'subscription') {
//           const subscription = await stripe.subscriptions.retrieve(
//             session.subscription as string
//           )
          
//           await handleSubscriptionCreated(subscription, session)
//         }
//         break
//       }

//       case 'customer.subscription.updated': {
//         const subscription = event.data.object as Stripe.Subscription
//         await handleSubscriptionUpdated(subscription)
//         break
//       }

//       case 'customer.subscription.deleted': {
//         const subscription = event.data.object as Stripe.Subscription
//         await handleSubscriptionDeleted(subscription)
//         break
//       }

//       case 'invoice.payment_succeeded': {
//         const invoice = event.data.object as any
//         await handlePaymentSucceeded(invoice)
//         break
//       }

//       case 'invoice.payment_failed': {
//         const invoice = event.data.object as any
//         await handlePaymentFailed(invoice)
//         break
//       }

//       default:
//         console.log(`Unhandled event type: ${event.type}`)
//     }

//     return NextResponse.json({ received: true })
//   } catch (error) {
//     console.error('Error processing webhook:', error)
//     return NextResponse.json(
//       { error: 'Webhook processing failed' },
//       { status: 500 }
//     )
//   }
// }

// async function handleSubscriptionCreated(
//   subscription: Stripe.Subscription,
//   session: Stripe.Checkout.Session
// ) {
//   const userId = session.metadata?.userId
//   const planName = session.metadata?.planName

//   if (!userId) {
//     console.error('No user ID in session metadata')
//     return
//   }

//   const plan = getPlanFromName(planName)

//   await prisma.user.update({
//     where: { id: userId },
//     data: {
//       subscriptionId: subscription.id,
//       subscriptionStatus: subscription.status,
//       plan,
//       currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
//     },
//   })
// }

// async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
//   const user = await prisma.user.findFirst({
//     where: { subscriptionId: subscription.id },
//   })

//   if (!user) {
//     console.error('User not found for subscription:', subscription.id)
//     return
//   }

//   await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       subscriptionStatus: subscription.status,
//       currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
//     },
//   })
// }

// async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
//   const user = await prisma.user.findFirst({
//     where: { subscriptionId: subscription.id },
//   })

//   if (!user) {
//     console.error('User not found for subscription:', subscription.id)
//     return
//   }

//   await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       subscriptionId: null,
//       subscriptionStatus: null,
//       plan: 'FREE',
//       currentPeriodEnd: null,
//     },
//   })
// }

// async function handlePaymentSucceeded(invoice: any) {
//   if (!invoice.subscription) return
  
//   const subscription = await stripe.subscriptions.retrieve(invoice.subscription)
  
//   const user = await prisma.user.findFirst({
//     where: { subscriptionId: subscription.id },
//   })

//   if (!user) {
//     console.error('User not found for subscription:', subscription.id)
//     return
//   }

//   await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       subscriptionStatus: subscription.status,
//       currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
//     },
//   })
// }

// async function handlePaymentFailed(invoice: any) {
//   if (!invoice.subscription) return
  
//   const subscription = await stripe.subscriptions.retrieve(invoice.subscription)
  
//   const user = await prisma.user.findFirst({
//     where: { subscriptionId: subscription.id },
//   })

//   if (!user) {
//     console.error('User not found for subscription:', subscription.id)
//     return
//   }

//   // You might want to send an email notification here
//   console.log(`Payment failed for user ${user.id}`)
// }

// function getPlanFromName(planName?: string): 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE' {
//   switch (planName?.toLowerCase()) {
//     case 'starter':
//       return 'STARTER'
//     case 'pro':
//       return 'PRO'
//     case 'enterprise':
//       return 'ENTERPRISE'
//     default:
//       return 'FREE'
//   }
// }
