'use client'
import React from 'react'
import { Handle, Position, NodeProps } from 'reactflow'

type LlmNodeData = {
  isConnectable: boolean
  icon: React.ReactNode
}

export default function LlmNode({ id, data }: NodeProps<LlmNodeData>) {
  return (
    <div className="relative px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <Handle
        id="input"
        type="target"
        position={Position.Left}
        isConnectable={data.isConnectable}
        className="w-3 h-3"
      />

      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100">
          {data.icon}
        </div>
        <div className="ml-2 text-xs text-gray-500">LLM Node</div>
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
        id="out-bottom"
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
