'use client'
import React, { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  SaveIcon, 
  FolderIcon, 
  TrashIcon, 
  EditIcon,
  CheckIcon,
  XIcon
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from './Toast'
import AutoSave from './AutoSave'

interface Workflow {
  id: string
  name: string
  description?: string
  nodes: any[]
  edges: any[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface WorkflowManagerProps {
  currentWorkflow: Workflow | null
  onWorkflowSelect: (workflow: Workflow) => void
  onWorkflowSave: (workflow: Workflow) => void
  onWorkflowCreate: () => void
  currentNodes: any[]
  currentEdges: any[]
}

export default function WorkflowManager({
  currentWorkflow,
  onWorkflowSelect,
  onWorkflowSave,
  onWorkflowCreate,
  currentNodes,
  currentEdges
}: WorkflowManagerProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { success, error: showError } = useToast()
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newWorkflowName, setNewWorkflowName] = useState('')
  const [newWorkflowDescription, setNewWorkflowDescription] = useState('')

  useEffect(() => {
    if (session?.user) {
      fetchWorkflows()
    }
  }, [session])

  const fetchWorkflows = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/workflows')
      if (response.ok) {
        const data = await response.json()
        setWorkflows(data)
      }
    } catch (error) {
      console.error('Error fetching workflows:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateWorkflow = async () => {
    if (!newWorkflowName.trim()) return

    try {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newWorkflowName,
          description: newWorkflowDescription,
          nodes: [],
          edges: []
        }),
      })

      if (response.ok) {
        const newWorkflow = await response.json()
        setWorkflows([newWorkflow, ...workflows])
        setShowCreateForm(false)
        setNewWorkflowName('')
        setNewWorkflowDescription('')
        onWorkflowSelect(newWorkflow)
        success('Workflow Created', `"${newWorkflow.name}" has been created successfully`)
      } else {
        showError('Failed to Create', 'Could not create the workflow')
      }
    } catch (error) {
      console.error('Error creating workflow:', error)
      showError('Error', 'An error occurred while creating the workflow')
    }
  }

  const handleSaveCurrentWorkflow = async () => {
    if (!currentWorkflow) return

    const updatedWorkflow = {
      ...currentWorkflow,
      nodes: currentNodes,
      edges: currentEdges
    }

    try {
      const response = await fetch(`/api/workflows/${currentWorkflow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWorkflow),
      })

      if (response.ok) {
        const savedWorkflow = await response.json()
        setWorkflows(workflows.map(w => w.id === savedWorkflow.id ? savedWorkflow : w))
        onWorkflowSave(savedWorkflow)
        success('Workflow Saved', `"${savedWorkflow.name}" has been saved successfully`)
      } else {
        showError('Failed to Save', 'Could not save the workflow')
      }
    } catch (error) {
      console.error('Error saving workflow:', error)
      showError('Error', 'An error occurred while saving the workflow')
    }
  }

  const handleRenameWorkflow = async (workflowId: string, newName: string) => {
    if (!newName.trim()) return

    try {
      const response = await fetch(`/api/workflows/${workflowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      })

      if (response.ok) {
        const updatedWorkflow = await response.json()
        setWorkflows(workflows.map(w => w.id === workflowId ? updatedWorkflow : w))
        setEditingId(null)
        setEditingName('')
      }
    } catch (error) {
      console.error('Error renaming workflow:', error)
    }
  }

  const handleDeleteWorkflow = async (workflowId: string) => {
    if (!confirm('Are you sure you want to delete this workflow?')) return

    try {
      const response = await fetch(`/api/workflows/${workflowId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setWorkflows(workflows.filter(w => w.id !== workflowId))
        if (currentWorkflow?.id === workflowId) {
          onWorkflowCreate() // Reset to new workflow
        }
      }
    } catch (error) {
      console.error('Error deleting workflow:', error)
    }
  }

  const startEditing = (workflow: Workflow) => {
    setEditingId(workflow.id)
    setEditingName(workflow.name)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingName('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">Workflows</h3>
        <div className="flex space-x-1">
          {currentWorkflow && (
            <button
              onClick={handleSaveCurrentWorkflow}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
              title="Save current workflow"
            >
              <SaveIcon className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setShowCreateForm(true)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            title="Create new workflow"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
          <input
            type="text"
            placeholder="Workflow name"
            value={newWorkflowName}
            onChange={(e) => setNewWorkflowName(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded mb-2"
            autoFocus
          />
          <textarea
            placeholder="Description (optional)"
            value={newWorkflowDescription}
            onChange={(e) => setNewWorkflowDescription(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded mb-2 h-16 resize-none"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleCreateWorkflow}
              className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false)
                setNewWorkflowName('')
                setNewWorkflowDescription('')
              }}
              className="flex-1 bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Auto-save checkbox */}
      <AutoSave />

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {loading ? (
          <div className="text-sm text-gray-500">Loading workflows...</div>
        ) : workflows.length === 0 ? (
          <div className="text-sm text-gray-500">No workflows yet</div>
        ) : (
          workflows.map((workflow) => (
            <div
              key={workflow.id}
              className={`p-2 border rounded-md transition-colors ${
                currentWorkflow?.id === workflow.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center space-x-2 flex-1 cursor-pointer"
                  onClick={() => {
                    if (editingId !== workflow.id) {
                      router.push(`/workspace?workflow=${workflow.id}`)
                      onWorkflowSelect(workflow)
                    }
                  }}
                >
                  <FolderIcon className="w-4 h-4 text-gray-500" />
                  {editingId === workflow.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleRenameWorkflow(workflow.id, editingName)
                        } else if (e.key === 'Escape') {
                          cancelEditing()
                        }
                      }}
                      className="flex-1 p-1 text-sm border border-gray-300 rounded"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="flex-1 text-sm font-medium truncate">
                      {workflow.name}
                    </span>
                  )}
                </div>
                <div className="flex space-x-1">
                  {editingId === workflow.id ? (
                    <>
                      <button
                        onClick={() => handleRenameWorkflow(workflow.id, editingName)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <CheckIcon className="w-3 h-3" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(workflow)}
                        className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                      >
                        <EditIcon className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteWorkflow(workflow.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <TrashIcon className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              {workflow.description && (
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {workflow.description}
                </p>
              )}
              <div className="text-xs text-gray-400 mt-1">
                Updated {new Date(workflow.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
