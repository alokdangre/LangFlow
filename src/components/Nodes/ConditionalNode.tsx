'use client'
import React from 'react';
import { Handle, Position, NodeProps, useReactFlow, Edge } from 'reactflow';

type ConditionalNodeData = {
  icon: React.ReactNode;
};

export default function ConditionalNode({
  id,
  data,
}: NodeProps<ConditionalNodeData>) {
  const { getEdges } = useReactFlow();

  const trueUsed = getEdges().some(
    (e: Edge) => e.source === id && e.sourceHandle === 'true'
  );
  const falseUsed = getEdges().some(
    (e: Edge) => e.source === id && e.sourceHandle === 'false'
  );

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 relative">
      <Handle
        id="cond-input"
        type="target"
        position={Position.Left}
        className="w-3 h-3"
        isConnectable={!getEdges().some(
          (e: Edge) => e.target === id && e.targetHandle === 'input'
        )}
      />

      {/* your node content */}
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100">
          {data.icon}
        </div>
        <div className="ml-2 text-xs text-gray-500">Conditional Node</div>
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