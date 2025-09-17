'use client'
import React from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import DeleteButton from '../DeleteButton'
import { useWorkspaceStore } from '@/store/workspaceStore'

type SendGmailActionNodeData = {
  isConnectable: boolean
  icon: React.ReactNode
  to?: string
  subject?: string
  body?: string
  gmailAuthorized?: boolean
  userId?: string
}

export default function SendGmailActionNode({ id, data }: NodeProps<SendGmailActionNodeData>) {
  const isConfigured = data.to && data.subject && data.body && data.gmailAuthorized
  const selectedNode = useWorkspaceStore((state) => state.selectedNode)
  const isSelected = selectedNode?.id === id

  return (
    <div className="relative px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 min-w-[200px]">
      <DeleteButton nodeId={id} isSelected={isSelected} />
      
      <Handle
        id="gmail-input"
        type="target"
        position={Position.Left}
        isConnectable={data.isConnectable}
        className="w-3 h-3"
      />

      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-red-100">
          {data.icon}
        </div>
        <div className="ml-2">
          <div className="text-xs text-gray-500">Send Gmail</div>
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
              Ready to send
            </div>
          )}
        </div>
      </div>

      {isConfigured && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
          <div className="text-gray-600 mb-1">Email Details:</div>
          <div className="space-y-1">
            <div><span className="font-medium">To:</span> {data.to}</div>
            <div><span className="font-medium">Subject:</span> {data.subject}</div>
            <div><span className="font-medium">Body:</span> {data.body?.substring(0, 30)}...</div>
          </div>
        </div>
      )}

      {!data.gmailAuthorized && (
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
          <div className="text-yellow-800 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Gmail authorization required
          </div>
        </div>
      )}

      <Handle
        id="gmail-output"
        type="source"
        position={Position.Right}
        isConnectable={data.isConnectable}
        className="w-3 h-3"
      />
    </div>
  )
}
