'use client'
import React, { useState, useEffect } from 'react'
import { useWorkspaceStore } from '@/store/workspaceStore'

interface WebhookTriggerConfigProps {
  nodeId: string
}

export default function WebhookTriggerConfig({ nodeId }: WebhookTriggerConfigProps) {
  const { nodes, updateNodeData, currentWorkflow } = useWorkspaceStore()
  const [webhookUrl, setWebhookUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const node = nodes.find(n => n.id === nodeId)

  useEffect(() => {
    if (node?.data?.webhookUrl) {
      setWebhookUrl(node.data.webhookUrl)
    }
  }, [node])

  const generateWebhookUrl = async () => {
    if (!currentWorkflow) {
      alert('Please save the workflow first')
      return
    }

    setIsGenerating(true)
    try {
      // Get the current workflow details
      const response = await fetch(`/api/workflows/${currentWorkflow.id}`)
      if (response.ok) {
        const workflow = await response.json()
        // Generate webhook URL using the workflow ID and user ID from session
        const generatedUrl = `${window.location.origin}/api/hooks/catch/${workflow.userId}/${workflow.id}`
        
        setWebhookUrl(generatedUrl)
        updateNodeData(nodeId, { 
          webhookUrl: generatedUrl,
          workflowId: workflow.id,
          userId: workflow.userId
        })
      } else {
        throw new Error('Failed to fetch workflow details')
      }
    } catch (error) {
      console.error('Error generating webhook URL:', error)
      alert('Failed to generate webhook URL')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl)
    alert('Webhook URL copied to clipboard!')
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Webhook Trigger Configuration</h3>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Webhook URL
        </label>
        
        {!webhookUrl ? (
          <button
            onClick={generateWebhookUrl}
            disabled={isGenerating}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate Webhook URL'}
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={webhookUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Use this URL in external services to trigger your workflow
            </p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-3 rounded-md">
        <h4 className="font-medium text-blue-900 mb-2">How to use:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Copy the webhook URL above</li>
          <li>• Configure it in your external service (Stripe, GitHub, etc.)</li>
          <li>• When the external service sends data, your workflow will trigger</li>
          <li>• The webhook data will be available to subsequent nodes</li>
        </ul>
      </div>
    </div>
  )
}
