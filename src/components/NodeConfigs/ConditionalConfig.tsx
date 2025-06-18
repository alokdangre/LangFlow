'use client'
import React, { useState, useEffect } from 'react'
import { useWorkspaceStore } from '@/store/workspaceStore'

interface ConditionalConfigProps {
  onConfigChange: (config: ConditionalConfigData) => void;
}

interface ConditionalConfigData {
  condition: string;
  trueLabel: string;
  falseLabel: string;
}

export default function ConditionalConfig({ onConfigChange }: ConditionalConfigProps) {
  const selectedNode = useWorkspaceStore((state) => state.selectedNode)
  const [config, setConfig] = useState<ConditionalConfigData>({
    condition: '',
    trueLabel: '',
    falseLabel: ''
  })

  useEffect(() => {
    if (selectedNode?.data) {
      setConfig({
        condition: selectedNode.data.condition || '',
        trueLabel: selectedNode.data.trueLabel || 'True',
        falseLabel: selectedNode.data.falseLabel || 'False'
      })
    }
  }, [selectedNode])

  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfig = { ...config, condition: e.target.value }
    setConfig(newConfig)
    onConfigChange(newConfig)
  }

  const handleTrueLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfig = { ...config, trueLabel: e.target.value }
    setConfig(newConfig)
    onConfigChange(newConfig)
  }

  const handleFalseLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfig = { ...config, falseLabel: e.target.value }
    setConfig(newConfig)
    onConfigChange(newConfig)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Condition
        </label>
        <input
          type="text"
          value={config.condition}
          onChange={handleConditionChange}
          placeholder="Enter condition (e.g., x > 5)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-2 text-sm text-gray-500">
          Example conditions:
          <br />• x &gt; 5
          <br />• message.length &gt; 100
          <br />• response.includes("error")
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          True Path Label
        </label>
        <input
          type="text"
          value={config.trueLabel}
          onChange={handleTrueLabelChange}
          placeholder="Enter label for true path"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-2 text-sm text-gray-500">
          This label will be shown on the edge when the condition is true
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          False Path Label
        </label>
        <input
          type="text"
          value={config.falseLabel}
          onChange={handleFalseLabelChange}
          placeholder="Enter label for false path"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-2 text-sm text-gray-500">
          This label will be shown on the edge when the condition is false
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-2">How it works:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• If condition is true: Follow the path labeled "{config.trueLabel}"</li>
          <li>• If condition is false: Follow the path labeled "{config.falseLabel}"</li>
        </ul>
      </div>
    </div>
  )
} 