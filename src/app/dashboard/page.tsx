'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  PlusIcon, 
  FolderIcon, 
  PlayIcon, 
  ClockIcon,
  UsersIcon,
  SettingsIcon,
  ChevronRightIcon
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {session.user.name}!
              </h1>
              <p className="text-gray-600">
                Manage your AI workflows and automations
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/workspace"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                New Workflow
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <PlayIcon className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                <p className="text-2xl font-bold text-gray-900">{workflows.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ClockIcon className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workflows.filter(w => w.isActive).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UsersIcon className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Plan</p>
                <p className="text-2xl font-bold text-gray-900">{session.user.plan}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Workflows */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Your Workflows</h2>
              <Link
                href="/workspace"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Create New
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {workflows.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <PlayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No workflows yet</p>
                <Link
                  href="/workspace"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Create your first workflow
                </Link>
              </div>
            ) : (
              workflows.map((workflow) => (
                <div key={workflow.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <Link
                        href={`/workspace?workflow=${workflow.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600"
                      >
                        {workflow.name}
                      </Link>
                      {workflow.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {workflow.description}
                        </p>
                      )}
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span>
                          Created {new Date(workflow.createdAt).toLocaleDateString()}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          Updated {new Date(workflow.updatedAt).toLocaleDateString()}
                        </span>
                        <span className="mx-2">•</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          workflow.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {workflow.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
