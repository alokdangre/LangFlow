'use client'
import React from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import DeleteButton from '../DeleteButton'
import { useWorkspaceStore } from '@/store/workspaceStore'

type WebhookTriggerNodeData = {
  isConnectable: boolean
  icon: React.ReactNode
  webhookUrl?: string
  userId?: string
  workflowId?: string
}

export default function WebhookTriggerNode({ id, data }: NodeProps<WebhookTriggerNodeData>) {
  const isConfigured = data.webhookUrl
  const selectedNode = useWorkspaceStore((state) => state.selectedNode)
  const isSelected = selectedNode?.id === id

  const copyWebhookUrl = () => {
    if (data.webhookUrl) {
      navigator.clipboard.writeText(data.webhookUrl)
      // You might want to show a toast notification here
      alert('Webhook URL copied to clipboard!')
    }
  }

  return (
    <div className="relative px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 min-w-[200px]">
      <DeleteButton nodeId={id} isSelected={isSelected} />
      
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-blue-100">
          {data.icon}
        </div>
        <div className="ml-2">
          <div className="text-xs text-gray-500">Webhook Trigger</div>
          {!isConfigured && (
            <div className="text-xs text-red-500 mt-1 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Configuration needed
            </div>
          )}
          {isConfigured && (
            <div className="text-xs text-green-500 mt-1 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Configured
            </div>
          )}
        </div>
      </div>

      {isConfigured && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
          <div className="text-gray-600 mb-1">Webhook URL:</div>
          <div className="flex items-center justify-between">
            <code className="text-blue-600 truncate flex-1 mr-2">
              {data.webhookUrl}
            </code>
            <button
              onClick={copyWebhookUrl}
              className="text-blue-500 hover:text-blue-700"
              title="Copy URL"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Handle
        id="webhook-output"
        type="source"
        position={Position.Right}
        isConnectable={data.isConnectable}
        className="w-3 h-3"
      />
    </div>
  )
}
