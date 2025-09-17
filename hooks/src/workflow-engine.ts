import { PrismaClient } from '@prisma/client'
import { google } from 'googleapis'

const client = new PrismaClient()

interface WorkflowExecutionContext {
  workflowId: string
  executionId: string
  triggerData: any
  userId: number
}

interface NodeData {
  id: string
  type: string
  data: any
  position: { x: number; y: number }
}

interface EdgeData {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
}

export class WorkflowEngine {
  private oauth2Client: any

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    )
  }

  async executeWorkflow(context: WorkflowExecutionContext): Promise<void> {
    try {
      console.log(`Starting workflow execution: ${context.workflowId}`)
      
      // Get workflow details
      const workflow = await client.workflow.findUnique({
        where: { id: context.workflowId },
        include: {
          trigger: true,
          actions: true
        }
      })

      if (!workflow) {
        throw new Error(`Workflow ${context.workflowId} not found`)
      }

      // Parse nodes and edges from workflow data
      const nodes: NodeData[] = workflow.nodes as unknown as NodeData[]
      const edges: EdgeData[] = workflow.edges as unknown as EdgeData[]

      // Find the webhook trigger node that started this execution
      const triggerNode = nodes.find(node => node.type === 'webhookTrigger')
      if (!triggerNode) {
        throw new Error('No webhook trigger found in workflow')
      }

      // Execute the workflow starting from the trigger
      await this.executeFromNode(triggerNode, nodes, edges, context)

      // Update execution status
      await client.workflowExecution.update({
        where: { id: context.executionId },
        data: {
          status: 'completed',
          completedAt: new Date(),
          output: { success: true, message: 'Workflow completed successfully' }
        }
      })

      console.log(`Workflow execution completed: ${context.executionId}`)
    } catch (error) {
      console.error(`Workflow execution failed: ${context.executionId}`, error)
      
      // Update execution status to failed
      await client.workflowExecution.update({
        where: { id: context.executionId },
        data: {
          status: 'failed',
          completedAt: new Date(),
          output: { 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          }
        }
      })
      
      throw error
    }
  }

  private async executeFromNode(
    currentNode: NodeData,
    allNodes: NodeData[],
    edges: EdgeData[],
    context: WorkflowExecutionContext
  ): Promise<any> {
    console.log(`Executing node: ${currentNode.id} (${currentNode.type})`)

    let nodeOutput: any = null

    // Execute the current node based on its type
    switch (currentNode.type) {
      case 'webhookTrigger':
        nodeOutput = await this.executeWebhookTrigger(currentNode, context)
        break
      
      case 'sendGmail':
        nodeOutput = await this.executeSendGmail(currentNode, context)
        break
      
      case 'condition':
        nodeOutput = await this.executeCondition(currentNode, context)
        break
      
      default:
        console.log(`Skipping unsupported node type: ${currentNode.type}`)
        nodeOutput = { success: true, message: `Skipped ${currentNode.type}` }
    }

    // Find connected nodes
    const connectedEdges = edges.filter(edge => edge.source === currentNode.id)
    
    // Execute connected nodes
    for (const edge of connectedEdges) {
      const nextNode = allNodes.find(node => node.id === edge.target)
      if (nextNode) {
        // Pass the current node's output to the next node
        const updatedContext = {
          ...context,
          triggerData: {
            ...context.triggerData,
            previousNodeOutput: nodeOutput
          }
        }
        await this.executeFromNode(nextNode, allNodes, edges, updatedContext)
      }
    }

    return nodeOutput
  }

  private async executeWebhookTrigger(node: NodeData, context: WorkflowExecutionContext): Promise<any> {
    // Webhook trigger just passes through the trigger data
    return {
      success: true,
      data: context.triggerData,
      message: 'Webhook trigger executed'
    }
  }

  private async executeSendGmail(node: NodeData, context: WorkflowExecutionContext): Promise<any> {
    try {
      const { to, subject, body, html } = node.data

      // Get user's Gmail tokens
      const user = await client.user.findUnique({
        where: { id: context.userId }
      })

      if (!user || !user.gmailAccessToken) {
        throw new Error('Gmail not authorized for this user')
      }

      // Set up OAuth2 client with user's tokens
      this.oauth2Client.setCredentials({
        access_token: user.gmailAccessToken,
        refresh_token: user.gmailRefreshToken,
      })

      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client })

      // Process template variables in email content
      const processedTo = this.processTemplate(to, context.triggerData)
      const processedSubject = this.processTemplate(subject, context.triggerData)
      const processedBody = this.processTemplate(body || html, context.triggerData)

      // Construct email
      const emailLines = [
        `To: ${processedTo}`,
        `Subject: ${processedSubject}`,
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        '',
        processedBody
      ]

      const email = emailLines.join('\n')
      const encodedEmail = Buffer.from(email)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')

      // Send email
      const result = await gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw: encodedEmail },
      })

      return {
        success: true,
        messageId: result.data.id,
        to: processedTo,
        subject: processedSubject,
        message: 'Email sent successfully'
      }
    } catch (error) {
      console.error('Gmail send error:', error)
      throw new Error(`Failed to send Gmail: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async executeCondition(node: NodeData, context: WorkflowExecutionContext): Promise<any> {
    // Basic condition evaluation - can be extended
    const { condition } = node.data
    
    // Simple condition evaluation (can be made more sophisticated)
    const result = this.evaluateCondition(condition, context.triggerData)
    
    return {
      success: true,
      conditionResult: result,
      message: `Condition evaluated to: ${result}`
    }
  }

  private processTemplate(template: string, data: any): string {
    if (!template) return ''
    
    // Simple template processing - replace {{variable}} with data values
    return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      const keys = key.trim().split('.')
      let value = data
      
      for (const k of keys) {
        value = value?.[k]
      }
      
      return value !== undefined ? String(value) : match
    })
  }

  private evaluateCondition(condition: string, data: any): boolean {
    // Basic condition evaluation - can be extended with a proper expression parser
    try {
      // For now, just return true - implement proper condition logic as needed
      return true
    } catch (error) {
      console.error('Condition evaluation error:', error)
      return false
    }
  }
}

export const workflowEngine = new WorkflowEngine()
