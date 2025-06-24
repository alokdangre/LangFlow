import React, { useState, useEffect } from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';

interface LLMConfigProps {
  onConfigChange?: (config: LLMConfigData) => void;
}

export interface LLMConfigData {
  typeOfWork: string;
  systemPrompt?: string;
  modelNodeId?: string;
}

const workTypes = [
  { id: 'analyze', label: 'Analyze' },
  { id: 'think', label: 'Think' },
  { id: 'validate', label: 'Validate' },
  { id: 'generate', label: 'Generate' },
  { id: 'summarize', label: 'Summarize' },
  { id: 'translate', label: 'Translate' },
  { id: 'classify', label: 'Classify' },
  { id: 'extract', label: 'Extract' }
];

export default function LLMConfig({ onConfigChange }: LLMConfigProps) {
  const selectedNode = useWorkspaceStore((state) => state.selectedNode);
  const [config, setConfig] = useState<LLMConfigData>({
    typeOfWork: '',
    systemPrompt: '',
    modelNodeId: ''
  });

  // Initialize config with node data when selected node changes
  useEffect(() => {
    if (selectedNode) {
      setConfig({
        typeOfWork: selectedNode.data.typeOfWork || '',
        systemPrompt: selectedNode.data.systemPrompt || '',
        modelNodeId: selectedNode.data.modelNodeId || '',
      });
    }
  }, [selectedNode]);

  const handleTypeChange = (type: string) => {
    const newConfig = { ...config, typeOfWork: type };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  const handlePromptChange = (prompt: string) => {
    const newConfig = { ...config, systemPrompt: prompt };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type of Work <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {workTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${config.typeOfWork === type.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          System Prompt (Optional)
        </label>
        <textarea
          value={config.systemPrompt}
          onChange={(e) => handlePromptChange(e.target.value)}
          placeholder="Enter system prompt..."
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[100px] resize-y"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Connected Model Node <span className="text-red-500">*</span>
        </label>
        {config.modelNodeId ? (
          <div className="px-3 py-2 rounded-lg bg-green-100 text-green-800">
            Model Node ID: <span className="font-mono">{config.modelNodeId}</span>
          </div>
        ) : (
          <div className="px-3 py-2 rounded-lg bg-red-100 text-red-800">
            No model node connected. Please connect a model node to the LLM node's <b>input-model</b> handle.
          </div>
        )}
      </div>
    </div>
  );
} 