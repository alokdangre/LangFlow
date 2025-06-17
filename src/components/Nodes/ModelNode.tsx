'use client'
import { Handle, Position, NodeProps } from 'reactflow'

type ModelNodeData = {
    isConnectable: boolean,
    icon: React.ReactNode
}

export default function ModelNode({ data }: NodeProps<ModelNodeData>) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <Handle type="target" position={Position.Top} className="w-3 h-3" isConnectable={data.isConnectable} />
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100">
          {data.icon}
        </div>
        <div className="ml-2">
          <div className="text-xs text-gray-500">Model Node</div>
        </div>
      </div>
    </div>
  )
}