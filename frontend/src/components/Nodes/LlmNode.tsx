'use client'
import React from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import DeleteButton from '../DeleteButton'
import { useWorkspaceStore } from '@/store/workspaceStore'

type LlmNodeData = {
  isConnectable: boolean
  icon: React.ReactNode
  typeOfWork?: string
  systemPrompt?: string
  modelNodeId?: string
}

export default function LlmNode({ id, data }: NodeProps<LlmNodeData>) {
  const isConfigured = data.typeOfWork
  const selectedNode = useWorkspaceStore((state) => state.selectedNode)
  const isSelected = selectedNode?.id === id

  return (
    <div className="relative px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <DeleteButton nodeId={id} isSelected={isSelected} />
      <Handle
        id="llm-input"
        type="target"
        position={Position.Left}
        isConnectable={data.isConnectable}
        className="w-3 h-3"
      />

      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100">
          {data.icon}
        </div>
        <div className="ml-2">
          <div className="text-xs text-gray-500">LLM Node</div>
          {!isConfigured && (
            <div className="text-xs text-red-500 mt-1 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Configuration needed
            </div>
          )}
        </div>
      </div>

      <Handle
        id="out-right"
        type="source"
        position={Position.Right}
        isConnectable={data.isConnectable}
        className="w-3 h-3 absolute"
        style={{
          top: '50%',
          right: -8,
          transform: 'translateY(-50%)',
        }}
      />

      <Handle
        id="input-model"
        type="source"
        position={Position.Bottom}
        isConnectable={data.isConnectable}
        className="w-3 h-3 absolute"
        style={{
          left: '50%',
          bottom: -8,
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  )
}
