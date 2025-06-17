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
    id: '4',
    type: 'condition',
    position: { x: 250, y: 550 },
    data: { isConnectable: true, icon: <ConditionalIcon /> }
  }
];
const initialEdges = [
  { id: 'e1-2', source: '1', sourceHandle: 'chat-input',targetHandle: 'llm-input',target: '2' },
  { id: 'e2-3', source: '2',sourceHandle: 'out-bottom',targetHandle:'model-input', target: '3' },
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
    ({ source, sourceHandle, target, targetHandle }: Connection) => {

        console.log(source)
        console.log(sourceHandle)
        console.log(target)
        console.log(targetHandle)
      // 1. No self-links
      if (source === target) {
        return false;
      }

      console.log("2. Prevent duplicate source-handle connections")
      const sourceUsed = edges.some(
        (e) => e.source === source && e.sourceHandle === sourceHandle
            // console.log(e)
            // console.log(e.source === source)
            // console.log(e.sourceHandle === sourceHandle)
        
      );
      console.log(sourceUsed)

      console.log("3. Prevent duplicate target-handle connections")
      const targetUsed = edges.some(
        (e) => e.target === target && e.targetHandle === targetHandle
        //     console.log(e)
        //     console.log(e.target === target)
        //     console.log(e.targetHandle === targetHandle)
        // }
      );

      return !sourceUsed && !targetUsed;
    },
    [edges]
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
