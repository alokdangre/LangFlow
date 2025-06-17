'use client'
import React from 'react'
import { useReactFlow } from 'reactflow'
import { ChatBoxIcon, LLMIcon, ModelIcon, ConditionalIcon } from './Nodes/NodeIcons'

const nodeTypes = [
  { id: 'chatBox', label: 'Chat Box', icon: <ChatBoxIcon /> },
  { id: 'llm', label: 'LLM', icon: <LLMIcon /> },
  { id: 'model', label: 'Model', icon: <ModelIcon /> },
  { id: 'condition', label: 'Conditional Route', icon: <ConditionalIcon /> },
]

interface LeftPanelProps {
  onExpandChange: (expanded: boolean) => void;
}

export default function LeftPanel({ onExpandChange }: LeftPanelProps) {
  const { addNodes } = useReactFlow();
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandChange = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onExpandChange(newExpanded);
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const addNode = (type: string) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: 250, y: 250 },
      data: { isConnectable: true, icon: nodeTypes.find(n => n.id === type)?.icon }
    };
    addNodes(newNode);
  };

  return (
    <div className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${expanded ? 'w-64' : 'w-12'}`}>
      <button
        onClick={handleExpandChange}
        className="absolute right-0 top-4 transform translate-x-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50"
      >
        {expanded ? '←' : '→'}
      </button>
      {expanded && (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Nodes</h2>
          <div className="space-y-2">
            {nodeTypes.map((node) => (
              <div
                key={node.id}
                className="flex items-center p-2 border border-gray-200 rounded-md cursor-move hover:bg-gray-50"
                draggable
                onDragStart={(e) => onDragStart(e, node.id)}
                onClick={() => addNode(node.id)}
              >
                <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-full mr-2">
                  {node.icon}
                </div>
                <span className="text-sm">{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 