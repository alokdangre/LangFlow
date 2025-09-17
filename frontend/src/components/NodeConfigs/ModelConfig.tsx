import React, { useState, useEffect } from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';

interface ModelConfigProps {
  onConfigChange?: (config: ModelConfigData) => void;
}

export interface ModelConfigData {
  modelType: string;
  apiKey: string;
  modelVersion?: string;
}

const modelTypes = [
  { 
    id: 'openai', 
    label: 'OpenAI (ChatGPT)', 
    versions: ['gpt-4', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k'],
    placeholder: 'sk-...'
  },
  { 
    id: 'claude', 
    label: 'Claude', 
    versions: ['claude-3-opus', 'claude-3-sonnet', 'claude-2.1'],
    placeholder: 'sk-...'
  },
  { 
    id: 'gemini', 
    label: 'Gemini', 
    versions: ['gemini-2.0-flash' ,'gemini-pro', 'gemini-pro-vision'],
    placeholder: 'AIza...'
  }
];

export default function ModelConfig({ onConfigChange }: ModelConfigProps) {
  const selectedNode = useWorkspaceStore((state) => state.selectedNode);
  const [config, setConfig] = useState<ModelConfigData>({
    modelType: '',
    apiKey: '',
    modelVersion: ''
  });

  useEffect(() => {
    if (selectedNode) {
      setConfig({
        modelType: selectedNode.data.modelType || '',
        apiKey: selectedNode.data.apiKey || '',
        modelVersion: selectedNode.data.modelVersion || ''
      });
    }
  }, [selectedNode]);

  const handleModelTypeChange = (type: string) => {
    const newConfig = { ...config, modelType: type, modelVersion: '' };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  const handleApiKeyChange = (key: string) => {
    const newConfig = { ...config, apiKey: key };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  const handleVersionChange = (version: string) => {
    const newConfig = { ...config, modelVersion: version };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  const selectedModel = modelTypes.find(m => m.id === config.modelType);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Model Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 gap-2">
          {modelTypes.map((model) => (
            <button
              key={model.id}
              onClick={() => handleModelTypeChange(model.id)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center
                ${config.modelType === model.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <span className="flex-1 text-left">{model.label}</span>
              {config.modelType === model.id && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {selectedModel && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Version <span className="text-red-500">*</span>
            </label>
            <select
              value={config.modelVersion}
              onChange={(e) => handleVersionChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a version</option>
              {selectedModel.versions.map((version) => (
                <option key={version} value={version}>
                  {version}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={config.apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder={selectedModel.placeholder}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>
        </>
      )}
    </div>
  );
} 