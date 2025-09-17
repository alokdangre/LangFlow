'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  PlusIcon, 
  PlayIcon, 
  ClockIcon,
  UsersIcon,
  ChevronRightIcon,
  LogOutIcon,
  SettingsIcon,
  TrendingUpIcon,
  ZapIcon
} from 'lucide-react'

interface Workflow {
  id: string
  name: string
  description?: string
  isActive: boolean
  updatedAt: string
  createdAt: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      const workflowsRes = await fetch('/api/workflows')

      if (workflowsRes.ok) {
        const workflowsData = await workflowsRes.json()
        setWorkflows(workflowsData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

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
          <div className="flex items-center gap-6">
            <Link href="/workspace" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              Workspace
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              Pricing
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{session.user.name}</p>
                <p className="text-gray-400 text-xs">{session.user.email}</p>
              </div>
              <button
                onClick={() => signOut()}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
                title="Sign Out"
              >
                <LogOutIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
              Welcome back, {session.user.name?.split(' ')[0]}!
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Manage your AI workflows and automations from your personalized dashboard
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ZapIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-400 mb-1">Total Workflows</p>
                  <p className="text-3xl font-bold text-white">{workflows.length}</p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PlayIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-400 mb-1">Active Workflows</p>
                  <p className="text-3xl font-bold text-white">
                    {workflows.filter(w => w.isActive).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUpIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-400 mb-1">Current Plan</p>
                  <p className="text-3xl font-bold text-white capitalize">{session.user.plan || 'Free'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Link
              href="/workspace"
              className="group bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:from-cyan-600/30 hover:via-purple-600/30 hover:to-pink-600/30 transition-all duration-500 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Create New Workflow</h3>
                  <p className="text-gray-300">Build your next AI automation with our visual editor</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <PlusIcon className="w-8 h-8 text-white" />
                </div>
              </div>
            </Link>

            <Link
              href="/pricing"
              className="group bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:from-purple-600/30 hover:via-pink-600/30 hover:to-orange-600/30 transition-all duration-500 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Upgrade Your Plan</h3>
                  <p className="text-gray-300">Unlock more features and higher limits</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <TrendingUpIcon className="w-8 h-8 text-white" />
                </div>
              </div>
            </Link>
          </div>

          {/* Workflows */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Your Workflows</h2>
                <Link
                  href="/workspace"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                >
                  Create New
                </Link>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {workflows.length === 0 ? (
                <div className="px-8 py-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ZapIcon className="w-10 h-10 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No workflows yet</h3>
                  <p className="text-gray-400 mb-6">Start building your first AI workflow to automate your tasks</p>
                  <Link
                    href="/workspace"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Create your first workflow
                  </Link>
                </div>
              ) : (
                workflows.map((workflow) => (
                  <div key={workflow.id} className="px-8 py-6 hover:bg-white/5 transition-colors duration-300 group">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <Link
                          href={`/workspace?workflow=${workflow.id}`}
                          className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors duration-300 group-hover:text-cyan-400"
                        >
                          {workflow.name}
                        </Link>
                        {workflow.description && (
                          <p className="text-gray-400 mt-1">
                            {workflow.description}
                          </p>
                        )}
                        <div className="flex items-center mt-3 text-sm text-gray-500 space-x-4">
                          <span>
                            Created {new Date(workflow.createdAt).toLocaleDateString()}
                          </span>
                          <span>
                            Updated {new Date(workflow.updatedAt).toLocaleDateString()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            workflow.isActive 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}>
                            {workflow.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
