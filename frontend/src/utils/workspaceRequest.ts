import { useWorkspaceStore } from '@/store/workspaceStore'
import axios from 'axios'
import { Node, Edge } from 'reactflow'

export type NodeStatus = 'pending' | 'success' | 'not running' | 'error'

export interface WorkspaceNode extends Node {
  status?: NodeStatus
}

// Helper to get child nodes
function getChildNodes(nodeId: string, nodes: WorkspaceNode[], edges: Edge[]): WorkspaceNode[] {
  const outgoingEdges = edges.filter(edge => edge.source === nodeId)
  return outgoingEdges.map(edge => nodes.find(node => node.id === edge.target)).filter((n): n is WorkspaceNode => !!n)
}

// Helper to get parent node
function getParentNode(nodeId: string, nodes: WorkspaceNode[], edges: Edge[]): WorkspaceNode | undefined {
  const incomingEdge = edges.find(edge => edge.target === nodeId)
  if (!incomingEdge) return undefined
  return nodes.find(node => node.id === incomingEdge.source)
}

// Helper to get child nodes for a specific sourceHandle
function getChildNodesByHandle(nodeId: string, nodes: WorkspaceNode[], edges: Edge[], handle: string): WorkspaceNode[] {
  const outgoingEdges = edges.filter(edge => edge.source === nodeId && edge.sourceHandle === handle)
  return outgoingEdges.map(edge => nodes.find(node => node.id === edge.target)).filter((n): n is WorkspaceNode => !!n)
}

// Main traversal and backend request function
export async function traverseAndRequestBackend({
  query,
  nodes,
  edges,
  setNodeStatus,
}: {
  query: string,
  nodes: WorkspaceNode[],
  edges: Edge[],
  setNodeStatus: (nodeId: string, status: NodeStatus) => void,
}) {

  // Find root (chatBox) node
  const chatBoxNode = nodes.find(node => node.type === 'chatBox')
  if (!chatBoxNode) throw new Error('No ChatBox node found')

  // Recursive traversal
  async function traverse(node: WorkspaceNode): Promise<any> {
    // Mark as pending
    setNodeStatus(node.id, 'pending')
    try {
      let response;
      if (node.type === 'chatBox') {
        setNodeStatus(node.id, 'success')
        // Traverse children and return the last child's result
        const children = getChildNodes(node.id, nodes, edges)
        let lastResult;
        for (const child of children) {
          lastResult = await traverse(child)
        }
        return lastResult;
      } else if (node.type === 'condition') {
        console.log('condition')
        response = await axios.post('/api/workflow/conditional', {
          isTrueCondition: node.data?.condition,
          query,
        })
        console.log('response hai')
        console.log(response)
        setNodeStatus(node.id, 'success')
        // Branch based on result
        const result = response.data?.result ?? response.data
        const branch = result === true || result === 'true' ? 'true' : 'false'
        const branchChildren = getChildNodesByHandle(node.id, nodes, edges, branch)
        let lastResult = result;
        for (const child of branchChildren) {
          lastResult = await traverse(child)
        }
        return lastResult;
      } else if (node.type === 'llm') {
        console.log('llm');
        // For llm, find associated model node by handle id 'input-model' and send both configs
        const modelEdge = edges.find(edge => edge.source === node.id && edge.sourceHandle === 'input-model');
        const modelNode = modelEdge ? nodes.find(n => n.id === modelEdge.target && n.type === 'model') : undefined;
        if (!modelNode) {
          setNodeStatus(node.id, 'error')
          throw new Error('No associated model node found for LLM node')
        }
        response = await axios.post('/api/workflow/llm', {
          llmConfig: node.data,
          modelConfig: modelNode.data,
          query,
        })
        console.log("model hai");
        console.log(response)
        setNodeStatus(node.id, 'success')
        return response.data.result;
      } else {
        // For other nodes, call backend with node config
        console.log(node)
        setNodeStatus(node.id, 'success')
      }
      // Traverse children (for non-conditional nodes)
      const children = getChildNodes(node.id, nodes, edges)
      let lastResult;
      for (const child of children) {
        lastResult = await traverse(child)
      }
      return lastResult;
    } catch (err) {
      setNodeStatus(node.id, 'error')
      console.error(`Error processing node ${node.id}:`, err)
      throw err;
    }
  }

  return await traverse(chatBoxNode)
} 