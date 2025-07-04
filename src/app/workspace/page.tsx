'use client'
import React, { useCallback, useState, useEffect, useMemo } from 'react';
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
  Edge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import RunButton from '@/components/RunButton';
import ChatBoxNode from '@/components/Nodes/ChatBoxNode';
import LLMNode from '@/components/Nodes/LlmNode';
import ModelNode from '@/components/Nodes/ModelNode';
import ConditionalNode from '@/components/Nodes/ConditionalNode';
import { ConditionalIcon, LLMIcon, ModelIcon } from '@/components/Nodes/NodeIcons';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { nodeTypes } from '@/components/Nodes';

export default function App() {
  const {
    nodes: persistedNodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setSelectedNode,
    setNodes,
    setEdges
  } = useWorkspaceStore()

  // Add icons to nodes at render time
  const nodes = useMemo(() => {
    return persistedNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        icon: node.type === 'llm' ? <LLMIcon /> :
              node.type === 'model' ? <ModelIcon /> :
              node.type === 'condition' ? <ConditionalIcon /> : undefined
      }
    }))
  }, [persistedNodes])

  const [leftPanelExpanded, setLeftPanelExpanded] = useState(true);
  const [rightPanelExpanded, setRightPanelExpanded] = useState(true);
  const { fitView, getNode } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = addEdge(params, edges);
      setEdges(newEdge);
    },
    [edges, setEdges],
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
        data: { 
          isConnectable: true,
          label: type.charAt(0).toUpperCase() + type.slice(1)
        }
      };
      setNodes([...nodes, newNode]);
      setSelectedNode(newNode);
      setRightPanelExpanded(true);
    },
    [nodes, setNodes, setRightPanelExpanded]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const isValidConnection = useCallback(
    ({ source, sourceHandle, target, targetHandle }: Connection) => {
      // 1. No self-links
      if (source === target) {
        return false;
      }

      // Get source and target node types
      const sourceNode = nodes.find(n => n.id === source);
      const targetNode = nodes.find(n => n.id === target);

      // Enforce: model nodes can only connect to LLM nodes via 'input-model' handle
      if (sourceNode?.type === 'model' && targetNode?.type === 'llm') {
        if ((targetHandle !== 'input-model' && sourceHandle !== 'model-input') || (targetHandle !== 'model-input' && sourceHandle !== 'input-model')) return false;
      }
      // Optionally, prevent model nodes from connecting to anything else
      if (sourceNode?.type === 'model' && targetNode?.type !== 'llm') {
        return false;
      }
      // Optionally, prevent LLM nodes from accepting model connections on any handle except 'input-model'
      if (targetNode?.type === 'llm' && sourceNode?.type !== 'model' && targetHandle === 'input-model') {
        return false;
      }

      const sourceUsed = edges.some(
        (e) => e.source === source && e.sourceHandle === sourceHandle
      );
      const targetUsed = edges.some(
        (e) => e.target === target && e.targetHandle === targetHandle
      );

      return !sourceUsed && !targetUsed;
    },
    [edges, nodes]
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
        <RunButton />
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
          onNodeClick={(_, node) => setSelectedNode(node)}
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
