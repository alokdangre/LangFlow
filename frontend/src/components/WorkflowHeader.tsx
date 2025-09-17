'use client'
import React, { useState } from 'react'
import { useWorkspaceStore } from '@/store/workspaceStore'
import { EditIcon, CheckIcon, XIcon, SaveIcon } from 'lucide-react'
import { useToast } from './Toast'

export default function WorkflowHeader() {
  const { 
    currentWorkflow, 
    hasUnsavedChanges, 
    setCurrentWorkflow,
    markAsSaved 
  } = useWorkspaceStore()
  
  const { success, error } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState('')

  const handleStartEdit = () => {
    if (currentWorkflow) {
      setEditName(currentWorkflow.name)
      setIsEditing(true)
    }
  }

  const handleSaveName = async () => {
    if (!currentWorkflow || !editName.trim()) return

    try {
      const response = await fetch(`/api/workflows/${currentWorkflow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName }),
      })

      if (response.ok) {
        const updatedWorkflow = await response.json()
        setCurrentWorkflow(updatedWorkflow)
        setIsEditing(false)
        success('Workflow Renamed', `Workflow renamed to "${updatedWorkflow.name}"`)
      } else {
        error('Failed to Rename', 'Could not rename the workflow')
      }
    } catch (err) {
      console.error('Error updating workflow name:', err)
      error('Error', 'An error occurred while renaming the workflow')
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditName('')
  }

  const handleSaveWorkflow = async () => {
    if (!currentWorkflow) return

    const { nodes, edges } = useWorkspaceStore.getState()
    
    try {
      const response = await fetch(`/api/workflows/${currentWorkflow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges
        }),
      })

      if (response.ok) {
        const updatedWorkflow = await response.json()
        setCurrentWorkflow(updatedWorkflow)
        markAsSaved()
        success('Workflow Saved', `"${updatedWorkflow.name}" has been saved successfully`)
      } else {
        error('Failed to Save', 'Could not save the workflow')
      }
    } catch (err) {
      console.error('Error saving workflow:', err)
      error('Error', 'An error occurred while saving the workflow')
    }
  }

  if (!currentWorkflow) {
    return (
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200 z-10">
        <span className="text-gray-600 text-sm">New Workflow</span>
      </div>
    )
  }

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200 z-10">
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSaveName()
                } else if (e.key === 'Escape') {
                  handleCancelEdit()
                }
              }}
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleSaveName}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
            >
              <CheckIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-1 text-gray-600 hover:bg-gray-50 rounded"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-800 font-medium">{currentWorkflow.name}</span>
            <button
              onClick={handleStartEdit}
              className="p-1 text-gray-600 hover:bg-gray-50 rounded"
              title="Rename workflow"
            >
              <EditIcon className="w-4 h-4" />
            </button>
            {hasUnsavedChanges && (
              <>
                <span className="text-orange-600 text-xs">•</span>
                <button
                  onClick={handleSaveWorkflow}
                  className="p-1 text-green-600 hover:bg-green-50 rounded"
                  title="Save workflow"
                >
                  <SaveIcon className="w-4 h-4" />
                </button>
              </>
            )}
          </>
        )}
      </div>
      {currentWorkflow.description && !isEditing && (
        <p className="text-xs text-gray-500 mt-1 max-w-xs truncate">
          {currentWorkflow.description}
        </p>
      )}
    </div>
  )
}
