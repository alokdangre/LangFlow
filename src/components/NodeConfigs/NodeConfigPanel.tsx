'use client'
import React from 'react'
import { useWorkspaceStore } from '@/store/workspaceStore'
import LLMConfig from './LLMConfig'
import ModelConfig from './ModelConfig'
import ConditionalConfig from './ConditionalConfig'
import WebhookTriggerConfig from './WebhookTriggerConfig'
import SendGmailActionConfig from './SendGmailActionConfig'
import NoConfig from './NoConfig'

export default function NodeConfigPanel() {
  const selectedNode = useWorkspaceStore((state) => state.selectedNode)
  const updateNodeData = useWorkspaceStore((state) => state.updateNodeData)

  const handleConfigChange = (config: any) => {
    if (selectedNode) {
      updateNodeData(selectedNode.id, config)
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
      )
    }

    switch (selectedNode.type) {
      case 'llm':
        return <LLMConfig onConfigChange={handleConfigChange} />
      case 'model':
        return <ModelConfig onConfigChange={handleConfigChange} />
      case 'condition':
        return <ConditionalConfig onConfigChange={handleConfigChange} />
      case 'webhookTrigger':
        return <WebhookTriggerConfig nodeId={selectedNode.id} />
      case 'sendGmail':
        return <SendGmailActionConfig nodeId={selectedNode.id} />
      case 'chatBox':
        return <NoConfig />
      default:
        return <NoConfig />
    }
  }

  return (
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
  )
} 