'use client'

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
    ],
    gradient: 'from-gray-500 to-gray-600'
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
    popular: true,
    gradient: 'from-cyan-500 to-purple-500'
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
    ],
    gradient: 'from-purple-500 to-pink-500'
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
    ],
    gradient: 'from-green-500 to-emerald-500'
  }
]

export default function Pricing() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400/40 rounded-full animate-float delay-500"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-green-400/30 rounded-full animate-float delay-1500"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            LangFlow
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              Features
            </Link>
            <Link href="/pricing" className="text-cyan-400">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              About
            </Link>
            <Link href="/auth/signin" className="text-gray-300 hover:text-white transition-colors duration-300">
              Sign In
            </Link>
            <Link href="/auth/signup" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 leading-tight">
              Simple Pricing
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your AI workflow automation needs
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 hover:transform hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-cyan-500/50 shadow-cyan-500/25' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-block p-3 bg-gradient-to-r ${plan.gradient}/20 rounded-full mb-4`}>
                    <div className={`w-12 h-12 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                        {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                        {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
                        {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations && (
                  <ul className="space-y-2 mb-8">
                    {plan.limitations.map((limitation) => (
                      <li key={limitation} className="flex items-center gap-3 text-gray-500">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-xs">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8">
                  {plan.price === 0 ? (
                    <Link
                      href="/auth/signup"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 text-center block"
                    >
                      Get Started Free
                    </Link>
                  ) : (
                    <Link
                      href="/contact"
                      className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-cyan-500/25`
                          : `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg`
                      } text-center block`}
                    >
                      Contact Sales
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 relative z-10 bg-black/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-3">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated automatically.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-3">
                What happens if I exceed my limits?
              </h3>
              <p className="text-gray-300">
                We'll notify you when you're approaching your limits. You can upgrade or purchase additional executions.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-300">
                Our Free plan is available forever. Paid plans come with a 14-day money-back guarantee.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-3">
                Do you offer custom enterprise solutions?
              </h3>
              <p className="text-gray-300">
                Yes, we offer custom solutions for large enterprises. Contact our sales team for personalized pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers building the future with LangFlow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/signup" 
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                LangFlow
              </div>
              <p className="text-gray-400">
                The most powerful AI workflow platform for modern developers.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#features" className="hover:text-cyan-400 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-cyan-400 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">API Reference</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Community</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Status</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 LangFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms</Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
