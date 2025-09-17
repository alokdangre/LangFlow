'use client'
import React from 'react'
import { useReactFlow } from 'reactflow'
import { ChatBoxIcon, LLMIcon, ModelIcon, ConditionalIcon, WebhookIcon, GmailIcon } from './Nodes/NodeIcons'
import { useWorkspaceStore } from '@/store/workspaceStore'
import WorkflowManager from './WorkflowManager'

const nodeTypes = [
  { id: 'chatBox', label: 'Chat Box', icon: <ChatBoxIcon /> },
  { id: 'llm', label: 'LLM', icon: <LLMIcon /> },
  { id: 'model', label: 'Model', icon: <ModelIcon /> },
  { id: 'condition', label: 'Conditional Route', icon: <ConditionalIcon /> },
  { id: 'webhookTrigger', label: 'Webhook Trigger', icon: <WebhookIcon /> },
  { id: 'sendGmail', label: 'Send Gmail', icon: <GmailIcon /> },
]

interface LeftPanelProps {
  onExpandChange: (expanded: boolean) => void;
}

export default function LeftPanel({ onExpandChange }: LeftPanelProps) {
  const { addNodes } = useReactFlow();
  const [expanded, setExpanded] = React.useState(true);
  const { 
    nodes, 
    edges, 
    workflows,
    currentWorkflow, 
    loadWorkflow, 
    createNewWorkflow, 
    updateWorkflow,
    deleteWorkflow,
    setCurrentWorkflow,
    markAsSaved,
    getWorkflows
  } = useWorkspaceStore();

  React.useEffect(() => {
    getWorkflows();
  }, []);

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
    // Check if trying to add a ChatBox node
    if (type === 'chatBox') {
      // Check if a ChatBox node already exists
      const existingChatBox = nodes.find(node => node.type === 'chatBox');
      if (existingChatBox) {
        alert('Only one Chat Box node is allowed per workspace.');
        return;
      }
    }

    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: 250, y: 250 },
      data: { isConnectable: true, icon: nodeTypes.find(n => n.id === type)?.icon }
    };
    addNodes(newNode);
  };

  return (
    <div className={`fixed left-0 top-15 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${expanded ? 'w-64' : 'w-12'}`}>
      <button
        onClick={handleExpandChange}
        className="absolute right-0 top-4 transform translate-x-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50"
      >
        {expanded ? '←' : '→'}
      </button>
      {expanded && (
        <div className="p-4 h-full overflow-y-auto">
          {/* Workflow Manager */}
          <WorkflowManager
            workflows={workflows}
            currentWorkflow={currentWorkflow}
            onWorkflowSelect={loadWorkflow}
            onWorkflowSave={(workflow) => {
              setCurrentWorkflow(workflow);
              markAsSaved();
            }}
            onWorkflowCreate={createNewWorkflow}
            onWorkflowUpdate={updateWorkflow}
            onWorkflowDelete={deleteWorkflow}
            currentNodes={nodes}
            currentEdges={edges}
          />
          
          <div className="border-t border-gray-200 my-4"></div>
          
          {/* Component Nodes */}
          <h2 className="font-semibold text-gray-700 mb-4">
            Component Nodes
          </h2>
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
