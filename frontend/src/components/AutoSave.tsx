'use client'
import React, { useEffect, useRef } from 'react'
import { useWorkspaceStore } from '@/store/workspaceStore'
import { useToast } from './Toast'

export default function AutoSave() {
  const { 
    autoSave, 
    setAutoSave, 
    hasUnsavedChanges, 
    currentWorkflow,
    saveCurrentWorkflow 
  } = useWorkspaceStore()
  
  const { success, error, info } = useToast()
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasShownAutoSaveEnabledRef = useRef(false)

  // Show notification when auto-save is enabled
  useEffect(() => {
    if (autoSave && !hasShownAutoSaveEnabledRef.current) {
      info('Auto-save Enabled', 'Your workflow will be automatically saved after changes')
      hasShownAutoSaveEnabledRef.current = true
    } else if (!autoSave) {
      hasShownAutoSaveEnabledRef.current = false
    }
  }, [autoSave, info])

  // Auto-save effect
  useEffect(() => {
    if (!autoSave || !hasUnsavedChanges || !currentWorkflow) {
      return
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // Set new timeout for auto-save (3 seconds after last change)
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveCurrentWorkflow()
        // No notification for auto-save - silent save
      } catch (err) {
        error('Auto-save Failed', 'Could not automatically save the workflow')
      }
    }, 3000)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [autoSave, hasUnsavedChanges, currentWorkflow, saveCurrentWorkflow, error])

  return (
    <div className="flex items-center space-x-2 text-sm">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={autoSave}
          onChange={(e) => setAutoSave(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <span className="text-gray-700">Auto-save</span>
      </label>
      {autoSave && hasUnsavedChanges && (
        <span className="text-xs text-orange-600">Saving in 3s...</span>
      )}
    </div>
  )
}
