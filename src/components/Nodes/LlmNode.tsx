'use client'
import React from 'react'
import { Handle, Position } from 'reactflow'

type LLMNodeProps = {
    isConnectable: boolean,
    icon: React.ReactNode
}

export default function LLMNode(data : LLMNodeProps) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <Handle type="target" position={Position.Left} className="w-3 h-3" isConnectable = {data.isConnectable} />
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100">
          {data.icon}
        </div>
        <div className="ml-2">
          <div className="text-xs text-gray-500">LLM Node</div>
        </div>
        <Handle type="source" position={Position.Right} className="w-3 h-3" isConnectable = {data.isConnectable} />
        <Handle type="source" position={Position.Bottom} className="w-3 h-3" isConnectable = {data.isConnectable} />
      </div>
    </div>
  )
}