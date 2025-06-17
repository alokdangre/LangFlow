'use client'
import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  useReactFlow,
  Node,
  getConnectedEdges,
} from 'reactflow';

import 'reactflow/dist/style.css';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import ChatBoxNode from '@/components/Nodes/ChatBoxNode';
import LLMNode from '@/components/Nodes/LlmNode';
import ModelNode from '@/components/Nodes/ModelNode';
import ConditionalNode from '@/components/Nodes/ConditionalNode';
import { ConditionalIcon, LLMIcon, ModelIcon } from '@/components/Nodes/NodeIcons';

type CustomNodeData = {
  isConnectable: boolean;
  icon?: React.ReactElement;
}

const nodeTypes = {
  chatBox: ChatBoxNode,
  llm: LLMNode,
  model: ModelNode,
  condition: ConditionalNode
};

const initialNodes: Node<CustomNodeData>[] = [
  { 
    id: '1', 
    type: 'chatBox',
    position: { x: 250, y: 100 }, 
    data: { isConnectable: true }
  },
  {
    id: '2',
    type: 'llm',
    position: { x: 250, y: 250 },
    data: { isConnectable: true, icon: <LLMIcon /> }
  },
  {
    id: '3',
    type: 'model',
    position: { x: 250, y: 400 },
    data: { isConnectable: true, icon: <ModelIcon /> }
  },
  {
    id: '5',
    type: 'model',
    position: { x: 250, y: 400 },
    data: { isConnectable: true, icon: <ModelIcon /> }
  },
  {
    id: '6',
    type: 'model',
    position: { x: 250, y: 400 },
    data: { isConnectable: true, icon: <ModelIcon /> }
  },
  {
    id: '4',
    type: 'condition',
    position: { x: 250, y: 550 },
    data: { isConnectable: true, icon: <ConditionalIcon /> }
  }
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' }
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [leftPanelExpanded, setLeftPanelExpanded] = useState(true);
  const [rightPanelExpanded, setRightPanelExpanded] = useState(true);
  const { fitView, getNode } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 100,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { isConnectable: true }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const isValidConnection = useCallback(
    (connection: Connection) => {
      const targetNode = nodes.find((node) => node.id === connection.target);
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetHandle = connection.targetHandle;
      const sourceHandle = connection.sourceHandle;

      // Get existing edges for the target handle
      const existingEdges = getConnectedEdges([targetNode!], edges);
      const hasExistingConnection = existingEdges.some(
        (edge) => edge.targetHandle === targetHandle && edge.target === connection.target
      );

      // Prevent self-connections
      if (connection.source === connection.target) {
        return false;
      }

      // Prevent multiple connections to the same handle
      if (hasExistingConnection) {
        return false;
      }

      return true;
    },
    [nodes, edges]
  );

  // Update viewport when panels change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 300); // Wait for panel animation to complete

    return () => clearTimeout(timeoutId);
  }, [leftPanelExpanded, rightPanelExpanded, fitView]);

  return (
    <div className="w-screen h-screen">
      <LeftPanel onExpandChange={setLeftPanelExpanded} />
      <div 
        className={`h-[calc(100vh-4rem)] transition-all duration-300 ${
          leftPanelExpanded ? 'ml-64' : 'ml-12'
        } ${rightPanelExpanded ? 'mr-80' : 'mr-12'}`}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          isValidConnection={isValidConnection}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Controls />
          {/* <MiniMap /> */}
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      <RightPanel onExpandChange={setRightPanelExpanded} />
    </div>
  );
}
