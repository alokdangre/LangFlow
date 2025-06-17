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
} from 'reactflow';

import 'reactflow/dist/style.css';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [leftPanelExpanded, setLeftPanelExpanded] = useState(true);
  const [rightPanelExpanded, setRightPanelExpanded] = useState(true);
  const { fitView } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
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
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      <RightPanel onExpandChange={setRightPanelExpanded} />
    </div>
  );
}
