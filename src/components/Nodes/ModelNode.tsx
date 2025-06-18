'use client'
import { Handle, Position, NodeProps } from 'reactflow'
import { ModelIcon } from './NodeIcons'

type ModelNodeData = {
    isConnectable: boolean,
    icon: React.ReactNode,
    modelType?: string,
    apiKey?: string,
    modelVersion?: string
}

export default function ModelNode({ data }: NodeProps<ModelNodeData>) {
  const isConfigured = data.modelType && data.apiKey && data.modelVersion

  return (
    <div className="relative px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <Handle id='model-input' type="target" position={Position.Top} className="w-3 h-3" isConnectable={data.isConnectable} />
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100">
          {data.icon}
        </div>
        <div className="ml-2">
          <div className="text-xs text-gray-500">Model Node</div>
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
    </div>
  )
}