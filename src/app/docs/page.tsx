'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const docSections = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'workflow-builder', title: 'Workflow Builder', icon: '🔧' },
    { id: 'nodes', title: 'Node Types', icon: '⚡' },
    { id: 'api', title: 'API Reference', icon: '📚' },
    { id: 'integrations', title: 'Integrations', icon: '🔗' },
    { id: 'deployment', title: 'Deployment', icon: '🚀' },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: '🛠️' }
  ];

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
            <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              About
            </Link>
            <Link href="/docs" className="text-cyan-400">
              Docs
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
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 leading-tight">
              Documentation
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to build, deploy, and scale your AI workflows
            </p>
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Documentation</h3>
                <nav className="space-y-2">
                  {docSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                {activeSection === 'getting-started' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-4">Getting Started</h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Welcome to LangFlow! This guide will help you get up and running with your first AI workflow in minutes.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl">
                        <h3 className="text-2xl font-bold text-white mb-3">📝 Step 1: Create Your Account</h3>
                        <p className="text-gray-300 mb-4">
                          Sign up for a free LangFlow account to access the visual workflow builder and start creating your AI workflows.
                        </p>
                        <Link href="/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                          Create Account
                        </Link>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
                        <h3 className="text-2xl font-bold text-white mb-3">🎨 Step 2: Design Your Workflow</h3>
                        <p className="text-gray-300 mb-4">
                          Use our intuitive drag-and-drop interface to connect AI nodes and create powerful workflows without writing code.
                        </p>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            Drag nodes from the sidebar
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            Connect nodes with data flows
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            Configure node parameters
                          </li>
                        </ul>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl">
                        <h3 className="text-2xl font-bold text-white mb-3">🚀 Step 3: Deploy and Run</h3>
                        <p className="text-gray-300 mb-4">
                          Once your workflow is ready, deploy it to our cloud infrastructure and start processing data in real-time.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div className="p-4 bg-black/20 rounded-xl">
                            <h4 className="text-white font-semibold mb-2">Test Mode</h4>
                            <p className="text-gray-400 text-sm">Run your workflow with sample data</p>
                          </div>
                          <div className="p-4 bg-black/20 rounded-xl">
                            <h4 className="text-white font-semibold mb-2">Production Mode</h4>
                            <p className="text-gray-400 text-sm">Deploy for real-world usage</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'workflow-builder' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-4">Workflow Builder</h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Learn how to use the visual workflow builder to create sophisticated AI workflows.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Interface Overview</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="p-4 bg-gradient-to-b from-white/10 to-white/0 rounded-xl border border-white/10">
                            <h4 className="text-lg font-semibold text-cyan-400 mb-2">Node Palette</h4>
                            <p className="text-gray-300 text-sm">Drag nodes from here to build your workflow</p>
                          </div>
                          <div className="p-4 bg-gradient-to-b from-white/10 to-white/0 rounded-xl border border-white/10">
                            <h4 className="text-lg font-semibold text-purple-400 mb-2">Canvas</h4>
                            <p className="text-gray-300 text-sm">Visual workspace for designing workflows</p>
                          </div>
                          <div className="p-4 bg-gradient-to-b from-white/10 to-white/0 rounded-xl border border-white/10">
                            <h4 className="text-lg font-semibold text-green-400 mb-2">Properties</h4>
                            <p className="text-gray-300 text-sm">Configure selected node settings</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Building Workflows</h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-black/20 rounded-xl">
                            <h4 className="text-lg font-semibold text-white mb-2">1. Add Input Node</h4>
                            <p className="text-gray-300">Start with an input node to define data sources</p>
                          </div>
                          <div className="p-4 bg-black/20 rounded-xl">
                            <h4 className="text-lg font-semibold text-white mb-2">2. Connect Processing Nodes</h4>
                            <p className="text-gray-300">Add AI models and processing logic</p>
                          </div>
                          <div className="p-4 bg-black/20 rounded-xl">
                            <h4 className="text-lg font-semibold text-white mb-2">3. Define Outputs</h4>
                            <p className="text-gray-300">Specify how results are delivered</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'nodes' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-4">Node Types</h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Explore the different types of nodes available in LangFlow.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl">
                        <h3 className="text-2xl font-bold text-cyan-400 mb-4">LLM Nodes</h3>
                        <p className="text-gray-300 mb-4">Connect to various language models</p>
                        <ul className="text-gray-300 space-y-2">
                          <li>• OpenAI GPT Models</li>
                          <li>• Anthropic Claude</li>
                          <li>• Google Gemini</li>
                          <li>• Custom Models</li>
                        </ul>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
                        <h3 className="text-2xl font-bold text-purple-400 mb-4">Processing Nodes</h3>
                        <p className="text-gray-300 mb-4">Transform and manipulate data</p>
                        <ul className="text-gray-300 space-y-2">
                          <li>• Text Processing</li>
                          <li>• Data Transformation</li>
                          <li>• Conditional Logic</li>
                          <li>• Custom Functions</li>
                        </ul>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">Input/Output Nodes</h3>
                        <p className="text-gray-300 mb-4">Handle data sources and destinations</p>
                        <ul className="text-gray-300 space-y-2">
                          <li>• File Input/Output</li>
                          <li>• API Endpoints</li>
                          <li>• Database Connections</li>
                          <li>• Webhooks</li>
                        </ul>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl">
                        <h3 className="text-2xl font-bold text-orange-400 mb-4">Utility Nodes</h3>
                        <p className="text-gray-300 mb-4">Helper nodes for workflow optimization</p>
                        <ul className="text-gray-300 space-y-2">
                          <li>• Debugging Tools</li>
                          <li>• Performance Monitors</li>
                          <li>• Error Handlers</li>
                          <li>• Flow Controls</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'api' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-4">API Reference</h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Complete API documentation for integrating with LangFlow programmatically.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-4">Authentication</h3>
                        <p className="text-gray-300 mb-4">All API requests require authentication using API keys.</p>
                        <div className="bg-black/50 p-4 rounded-lg border border-white/10">
                          <code className="text-cyan-300 text-sm">
                            curl -H "Authorization: Bearer YOUR_API_KEY" \<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;https://api.langflow.ai/v1/workflows
                          </code>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10">
                          <h4 className="text-lg font-semibold text-cyan-400 mb-3">Workflows API</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li><span className="text-green-400">GET</span> /v1/workflows</li>
                            <li><span className="text-blue-400">POST</span> /v1/workflows</li>
                            <li><span className="text-yellow-400">PUT</span> /v1/workflows/:id</li>
                            <li><span className="text-red-400">DELETE</span> /v1/workflows/:id</li>
                          </ul>
                        </div>

                        <div className="p-6 bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10">
                          <h4 className="text-lg font-semibold text-purple-400 mb-3">Execution API</h4>
                          <ul className="text-gray-300 space-y-2 text-sm">
                            <li><span className="text-blue-400">POST</span> /v1/execute</li>
                            <li><span className="text-green-400">GET</span> /v1/executions/:id</li>
                            <li><span className="text-green-400">GET</span> /v1/executions</li>
                            <li><span className="text-yellow-400">PUT</span> /v1/executions/:id/stop</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other sections would follow similar patterns... */}
                {activeSection === 'integrations' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-4">Integrations</h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Connect LangFlow with your favorite tools and services.
                      </p>
                    </div>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔗</div>
                      <p className="text-gray-400">Integration documentation coming soon...</p>
                    </div>
                  </div>
                )}

                {activeSection === 'deployment' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-4">Deployment</h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Deploy your workflows to production environments.
                      </p>
                    </div>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🚀</div>
                      <p className="text-gray-400">Deployment documentation coming soon...</p>
                    </div>
                  </div>
                )}

                {activeSection === 'troubleshooting' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-4">Troubleshooting</h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Common issues and their solutions.
                      </p>
                    </div>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🛠️</div>
                      <p className="text-gray-400">Troubleshooting guide coming soon...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Create your first AI workflow in minutes with our visual builder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/signup" 
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
              >
                Get Started Free
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Contact Support
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
