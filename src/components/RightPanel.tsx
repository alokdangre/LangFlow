'use client'
import { useState } from 'react'

interface RightPanelProps {
  onExpandChange?: (expanded: boolean) => void;
}
 
export default function RightPanel({ onExpandChange }: RightPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleExpandChange = (expanded: boolean) => {
    setIsExpanded(expanded)
    onExpandChange?.(expanded)
  }

  return (
    <div className={`fixed right-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ${
      isExpanded ? 'w-80' : 'w-12'
    }`}>
      <button
        onClick={() => handleExpandChange(!isExpanded)}
        className="absolute -left-3 top-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
      >
        <svg
          className={`w-4 h-4 transform transition-transform ${!isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className={`p-4 ${!isExpanded && 'hidden'}`}>
        <h2 className="font-semibold text-gray-700 mb-4">Properties</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Node Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter node name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Text Input</option>
              <option>LLM</option>
              <option>Prompt</option>
              <option>Output</option>
            </select>
          </div>

          <div className="pt-4">
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 