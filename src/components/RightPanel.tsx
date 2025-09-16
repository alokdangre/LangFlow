'use client'
import { useState, useEffect, useRef } from 'react'
import LLMConfig from './NodeConfigs/LLMConfig'
import ModelConfig from './NodeConfigs/ModelConfig'
import ConditionalConfig from './NodeConfigs/ConditionalConfig'
import WebhookTriggerConfig from './NodeConfigs/WebhookTriggerConfig'
import SendGmailActionConfig from './NodeConfigs/SendGmailActionConfig'
import NoConfig from './NodeConfigs/NoConfig'
import { useWorkspaceStore } from '@/store/workspaceStore'
import ChatInterface from './Chat/ChatInterface'

interface RightPanelProps {
  onExpandChange?: (expanded: boolean) => void;
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function RightPanel({ onExpandChange }: RightPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const selectedNode = useWorkspaceStore((state) => state.selectedNode)
  const updateNodeData = useWorkspaceStore((state) => state.updateNodeData)
  const {isRunning} = useWorkspaceStore()
  const nodes = useWorkspaceStore((state) => state.nodes)
  const edges = useWorkspaceStore((state) => state.edges)

  // console.log(selectedNode)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  
  const handleExpandChange = (expanded: boolean) => {
    setIsExpanded(expanded)
    onExpandChange?.(expanded)
  }

  const handleConfigChange = (config: any) => {
    if (selectedNode) {
      updateNodeData(selectedNode.id, config)
    }
  }

  const handleRun = async () => {
    setMessages([])
    setInput('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges,
          userInput: input
        })
      })

      const data = await response.json()
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.result || 'Sorry, I encountered an error processing your request.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const renderNodeConfig = () => {
    if (!selectedNode || !selectedNode.type) {
      return (
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Node Selected</h3>
            <p className="text-gray-500 text-sm">
              Select a node to view and edit its properties
            </p>
          </div>
        </div>
      );
    }

    switch (selectedNode.type) {
      case 'llm':
        return <LLMConfig onConfigChange={handleConfigChange} />;
      case 'model':
        return <ModelConfig onConfigChange={handleConfigChange} />;
      case 'condition':
        return <ConditionalConfig onConfigChange={handleConfigChange} />;
      case 'webhookTrigger':
        return <WebhookTriggerConfig nodeId={selectedNode.id} />;
      case 'sendGmail':
        return <SendGmailActionConfig nodeId={selectedNode.id} />;
      case 'chatBox':
        return <NoConfig />;
      default:
        return <NoConfig />;
    }
  }

  if (!isClient) {
    return (
      <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg w-80">
        <div className="p-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
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

      <div className={`h-full flex flex-col ${!isExpanded && 'hidden'}`}>
        {isRunning ? (
          // Chat Interface
          <ChatInterface />
        ) : (
          // Node Configuration
          <div className="p-4">
            {selectedNode && selectedNode.type && (
              <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100 animate-fade-in">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-semibold text-blue-900">
                      {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)} Node
                    </h2>
                    <p className="text-sm text-blue-600">ID: {selectedNode.id}</p>
                  </div>
                </div>
              </div>
            )}
            
            <h2 className="font-semibold text-gray-700 mb-4">
              {selectedNode && selectedNode.type 
                ? `${selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)} Properties` 
                : 'Properties'}
            </h2>
            
            {renderNodeConfig()}
          </div>
        )}
      </div>
    </div>
  )
} 