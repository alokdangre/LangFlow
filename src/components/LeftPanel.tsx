'use client'
import { useState } from 'react'

const nodeTypes = [
  { id: 'text', label: 'Text Input', icon: '📝' },
  { id: 'llm', label: 'LLM', icon: '🤖' },
  { id: 'prompt', label: 'Prompt', icon: '💭' },
  { id: 'output', label: 'Output', icon: '📤' },
]

interface LeftPanelProps {
  onExpandChange?: (expanded: boolean) => void;
}

export default function LeftPanel({ onExpandChange }: LeftPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleExpandChange = (expanded: boolean) => {
    setIsExpanded(expanded)
    onExpandChange?.(expanded)
  }

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ${
      isExpanded ? 'w-64' : 'w-12'
    }`}>
      <button
        onClick={() => handleExpandChange(!isExpanded)}
        className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
      >
        <svg
          className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <div className="p-4">
        <h2 className={`font-semibold text-gray-700 mb-4 ${!isExpanded && 'hidden'}`}>
          Components
        </h2>
        <div className="space-y-2">
          {nodeTypes.map((node) => (
            <div
              key={node.id}
              className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                !isExpanded && 'justify-center'
              }`}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow', node.id)
                e.dataTransfer.effectAllowed = 'move'
              }}
            >
              <span className="text-xl">{node.icon}</span>
              {isExpanded && (
                <span className="ml-2 text-sm text-gray-600">{node.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 