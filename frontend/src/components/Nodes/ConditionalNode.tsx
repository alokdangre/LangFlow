'use client'
import React from 'react';
import { Handle, Position, NodeProps, useReactFlow, Edge } from 'reactflow';
import { ConditionalIcon } from './NodeIcons';
import DeleteButton from '../DeleteButton';
import { useWorkspaceStore } from '@/store/workspaceStore';

type ConditionalNodeData = {
  isConnectable: boolean;
  icon: React.ReactNode;
  condition?: string;
  trueLabel?: string;
  falseLabel?: string;
};

export default function ConditionalNode({
  id,
  data,
}: NodeProps<ConditionalNodeData>) {
  const { getEdges } = useReactFlow();
  const selectedNode = useWorkspaceStore((state) => state.selectedNode);
  const isSelected = selectedNode?.id === id;

  const trueUsed = getEdges().some(
    (e: Edge) => e.source === id && e.sourceHandle === 'true'
  );
  const falseUsed = getEdges().some(
    (e: Edge) => e.source === id && e.sourceHandle === 'false'
  );
  const isConfigured = data.condition;

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 relative">
      <DeleteButton nodeId={id} isSelected={isSelected} />
      <Handle
        id="condition-input"
        type="target"
        position={Position.Left}
        className="w-3 h-3"
        isConnectable={!getEdges().some(
          (e: Edge) => e.target === id && e.targetHandle === 'input'
        )}
      />

      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100">
          {data.icon}
        </div>
        <div className="ml-2">
          <div className="text-xs text-gray-500">Conditional Node</div>
          {!isConfigured && (
            <div className="text-xs text-red-500 mt-1 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Configuration
            </div>
          )}
        </div>
      </div>

      {/* TWO output handles, with different positions */}
      <div
        className="absolute text-xs text-green-600"
        style={{ top: 12, right: -32 }}
      >
        True
      </div>
      <Handle
        id="true"
        type="source"
        position={Position.Right}
        className="w-3 h-3 absolute"
        style={{ top: 12, right: -8 }}
        isConnectable={!trueUsed}
      />
      <div
        className="absolute text-xs text-red-600"
        style={{ top: 30, right: -34 }}
      >
        False
      </div>
      <Handle
        id="false"
        type="source"
        position={Position.Right}
        className="w-3 h-3 absolute"
        style={{ top: 30, right: -8 }}
        isConnectable={!falseUsed}
      />
    </div>
  );
}