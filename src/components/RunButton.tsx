'use client'
import React, { useState } from 'react'
import { useWorkspaceStore } from '@/store/workspaceStore'

export default function RunButton() {
  const [isRunning, setIsRunning] = useState(false)
  const nodes = useWorkspaceStore((state) => state.nodes)
  const edges = useWorkspaceStore((state) => state.edges)

  const handleRun = async () => {
    if (isRunning) return

    setIsRunning(true)
    try {
      // TODO: Implement actual run logic here
      console.log('Running workflow with nodes:', nodes)
      console.log('And edges:', edges)
      
      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error('Error running workflow:', error)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
      <button
        onClick={handleRun}
        disabled={isRunning}
        className={`
          px-4 py-2 rounded-lg shadow-md
          flex items-center space-x-2
          transition-all duration-200
          ${isRunning 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:scale-105'
          }
          text-white font-medium text-sm
        `}
      >
        {isRunning ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Running...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Run Workflow</span>
          </>
        )}
      </button>
    </div>
  )
} 