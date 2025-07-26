'use client';

import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-xl border-b border-white/10 z-[100]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            LangFlow
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              Pricing
            </Link>
            <Link href="/about" className="text-cyan-400">
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
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 leading-tight">
              About LangFlow
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're building the future of AI workflow automation, making powerful AI accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                At LangFlow, we believe that AI should be accessible to everyone, not just technical experts. 
                Our mission is to democratize AI by providing an intuitive, visual platform that allows anyone 
                to build sophisticated AI workflows without writing a single line of code.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We're passionate about empowering businesses, developers, and creators to harness the power 
                of artificial intelligence to solve real-world problems and create innovative solutions.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Democratizing AI</h3>
                  <p className="text-gray-300">Making AI accessible to everyone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Simplicity</h3>
              <p className="text-gray-300 leading-relaxed">
                We believe complex problems should have simple solutions. Our platform makes AI accessible through intuitive design.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community</h3>
              <p className="text-gray-300 leading-relaxed">
                We foster a vibrant community of builders, creators, and innovators who support each other's success.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Trust</h3>
              <p className="text-gray-300 leading-relaxed">
                Security and reliability are at our core. We protect your data and ensure your workflows run flawlessly.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-gray-300 leading-relaxed">
                We continuously push boundaries, exploring new ways to make AI more powerful and accessible.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Excellence</h3>
              <p className="text-gray-300 leading-relaxed">
                We strive for excellence in everything we do, from product quality to customer experience.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Impact</h3>
              <p className="text-gray-300 leading-relaxed">
                We aim to create positive global impact by democratizing access to AI technology worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate individuals working to make AI accessible to everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-white mb-2">Alex Chen</h3>
              <p className="text-cyan-400 mb-4">CEO & Co-Founder</p>
              <p className="text-gray-300 text-sm">
                Former AI researcher at Stanford with 10+ years in machine learning and product development.
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-white mb-2">Sarah Kim</h3>
              <p className="text-purple-400 mb-4">CTO & Co-Founder</p>
              <p className="text-gray-300 text-sm">
                Engineering leader with expertise in distributed systems and AI infrastructure at scale.
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-white mb-2">Michael Torres</h3>
              <p className="text-green-400 mb-4">Head of Design</p>
              <p className="text-gray-300 text-sm">
                Design veteran focused on creating intuitive experiences for complex AI and ML workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of the AI revolution and help us democratize artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/signup" 
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
              >
                Get Started Free
              </Link>
              <Link 
                href="/careers" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Join Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10">
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
                <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-cyan-400 transition-colors">Help Center</Link></li>
                <li><Link href="/community" className="hover:text-cyan-400 transition-colors">Community</Link></li>
                <li><Link href="/status" className="hover:text-cyan-400 transition-colors">Status</Link></li>
                <li><Link href="/security" className="hover:text-cyan-400 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 LangFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms</Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
