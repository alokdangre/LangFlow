'use client'
import React from 'react'
import { useWorkspaceStore } from '@/store/workspaceStore'

interface DeleteButtonProps {
  nodeId: string;
  isSelected: boolean;
}

export default function DeleteButton({ nodeId, isSelected }: DeleteButtonProps) {
  const deleteNode = useWorkspaceStore((state) => state.deleteNode)

  if (!isSelected) return null

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        deleteNode(nodeId)
      }}
      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
      title="Delete node"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  )
} 