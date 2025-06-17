'use client'
import { Handle, Position } from 'reactflow'

type ChatBoxNodeProps = {
    isConnectable: boolean,
}

export default function ChatBoxNode(data: ChatBoxNodeProps) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100">
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <div className="ml-2">
          <div className="text-xs text-gray-500">Chat Box</div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3" isConnectable = {data.isConnectable} />
    </div>
  )
}