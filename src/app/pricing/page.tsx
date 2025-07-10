'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: 0,
    priceId: null,
    description: 'Perfect for getting started',
    features: [
      '5 workflows',
      '100 executions/month',
      'Basic nodes',
      'Community support',
      '1 workspace'
    ],
    limitations: [
      'No advanced nodes',
      'No team collaboration',
      'No priority support'
    ]
  },
  {
    name: 'Starter',
    price: 19,
    priceId: 'price_starter_monthly',
    description: 'Great for small teams',
    features: [
      '50 workflows',
      '10,000 executions/month',
      'All nodes included',
      'Email support',
      '3 workspaces',
      'Team collaboration',
      'Webhook triggers',
      'API access'
    ],
    popular: true
  },
  {
    name: 'Pro',
    price: 49,
    priceId: 'price_pro_monthly',
    description: 'For growing businesses',
    features: [
      'Unlimited workflows',
      '100,000 executions/month',
      'All nodes included',
      'Priority support',
      'Unlimited workspaces',
      'Advanced team features',
      'Custom integrations',
      'Analytics & monitoring',
      'SLA guarantee'
    ]
  },
  {
    name: 'Enterprise',
    price: 199,
    priceId: 'price_enterprise_monthly',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Unlimited executions',
      'Dedicated support',
      'Custom deployment',
      'SSO integration',
      'Advanced security',
      'Custom SLA',
      'Training & onboarding'
    ]
  }
]

export default function Pricing() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (!session) {
      window.location.href = '/auth/signin'
      return
    }

    setIsLoading(priceId)

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          planName
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your workflow automation needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${
                plan.popular
                  ? 'border-blue-500 shadow-xl scale-105'
                  : 'border-gray-200 shadow-lg'
              } bg-white p-8`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.limitations && (
                <ul className="mt-4 space-y-2">
                  {plan.limitations.map((limitation) => (
                    <li key={limitation} className="flex items-start">
                      <span className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0">×</span>
                      <span className="text-gray-500 text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8">
                {plan.price === 0 ? (
                  <Link
                    href="/auth/signup"
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center block"
                  >
                    Get Started Free
                  </Link>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.priceId!, plan.name)}
                    disabled={isLoading === plan.priceId}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    } disabled:opacity-50`}
                  >
                    {isLoading === plan.priceId ? 'Loading...' : `Subscribe to ${plan.name}`}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I exceed my limits?
              </h3>
              <p className="text-gray-600">
                We'll notify you when you're approaching your limits. You can upgrade or purchase additional executions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Our Free plan is available forever. Paid plans come with a 14-day money-back guarantee.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer custom enterprise solutions?
              </h3>
              <p className="text-gray-600">
                Yes, we offer custom solutions for large enterprises. Contact our sales team for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
