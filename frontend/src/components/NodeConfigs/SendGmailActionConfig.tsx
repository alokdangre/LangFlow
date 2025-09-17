'use client'
import React, { useState, useEffect } from 'react'
import { useWorkspaceStore } from '@/store/workspaceStore'
import { useSession } from 'next-auth/react'

interface SendGmailActionConfigProps {
  nodeId: string
}

export default function SendGmailActionConfig({ nodeId }: SendGmailActionConfigProps) {
  const { nodes, updateNodeData } = useWorkspaceStore()
  const { data: session } = useSession()
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [gmailAuthorized, setGmailAuthorized] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isAuthorizing, setIsAuthorizing] = useState(false)

  const node = nodes.find(n => n.id === nodeId)

  useEffect(() => {
    if (node?.data) {
      setTo(node.data.to || '')
      setSubject(node.data.subject || '')
      setBody(node.data.body || '')
    }
  }, [node])

  useEffect(() => {
    checkGmailAuth()
  }, [session])

  const checkGmailAuth = async () => {
    if (!session?.user) return

    setIsCheckingAuth(true)
    try {
      const response = await fetch(`/api/auth/gmail/status/${session.user.id}`)
      if (response.ok) {
        const data = await response.json()
        setGmailAuthorized(data.authorized)
        updateNodeData(nodeId, { gmailAuthorized: data.authorized, userId: session.user.id })
      }
    } catch (error) {
      console.error('Error checking Gmail auth:', error)
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const authorizeGmail = async () => {
    if (!session?.user) return

    setIsAuthorizing(true)
    try {
      const response = await fetch(`/api/auth/gmail?userId=${session.user.id}`)
      if (response.ok) {
        const data = await response.json()
        window.open(data.authUrl, '_blank', 'width=500,height=600')
        
        // Poll for authorization completion
        const pollAuth = setInterval(async () => {
          const authResponse = await fetch(`/api/auth/gmail/status/${session.user.id}`)
          if (authResponse.ok) {
            const authData = await authResponse.json()
            if (authData.authorized) {
              setGmailAuthorized(true)
              updateNodeData(nodeId, { gmailAuthorized: true })
              clearInterval(pollAuth)
              setIsAuthorizing(false)
            }
          }
        }, 2000)

        // Stop polling after 2 minutes
        setTimeout(() => {
          clearInterval(pollAuth)
          setIsAuthorizing(false)
        }, 120000)
      }
    } catch (error) {
      console.error('Error authorizing Gmail:', error)
      setIsAuthorizing(false)
    }
  }

  const handleSave = () => {
    updateNodeData(nodeId, {
      to,
      subject,
      body,
      gmailAuthorized,
      userId: session?.user?.id
    })
  }

  const testEmail = async () => {
    if (!gmailAuthorized || !to || !subject || !body) {
      alert('Please configure all fields and authorize Gmail first')
      return
    }

    try {
      const response = await fetch('/api/actions/send-gmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id,
          to,
          subject,
          body
        })
      })

      if (response.ok) {
        alert('Test email sent successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to send email: ${error.error}`)
      }
    } catch (error) {
      console.error('Error sending test email:', error)
      alert('Failed to send test email')
    }
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Send Gmail Configuration</h3>
      
      {/* Gmail Authorization */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Gmail Authorization
        </label>
        
        {isCheckingAuth ? (
          <div className="text-sm text-gray-500">Checking authorization...</div>
        ) : gmailAuthorized ? (
          <div className="flex items-center space-x-2 text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">Gmail authorized</span>
          </div>
        ) : (
          <button
            onClick={authorizeGmail}
            disabled={isAuthorizing}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
          >
            {isAuthorizing ? 'Authorizing...' : 'Authorize Gmail'}
          </button>
        )}
      </div>

      {/* Email Configuration */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Email Address
          </label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Body
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Email content..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Configuration
        </button>
        
        {gmailAuthorized && to && subject && body && (
          <button
            onClick={testEmail}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Send Test Email
          </button>
        )}
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 p-3 rounded-md">
        <h4 className="font-medium text-blue-900 mb-2">Usage:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• First authorize Gmail access using the button above</li>
          <li>• Configure the recipient, subject, and body</li>
          <li>• Connect this node to a webhook trigger or other nodes</li>
          <li>• When the workflow runs, the email will be sent automatically</li>
          <li>• Use the test button to verify your configuration</li>
        </ul>
      </div>
    </div>
  )
}
