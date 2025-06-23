import { Node, Edge } from 'reactflow'

interface WorkspaceState {
  nodes: Node[]
  edges: Edge[]
}

// Find the root ChatBox node
const findChatBoxNode = (nodes: Node[]): Node | undefined => {
  return nodes.find(node => node.type === 'chatBox')
}

// Get child nodes of a given node
const getChildNodes = (nodeId: string, nodes: Node[], edges: Edge[]): Node[] => {
  const outgoingEdges = edges.filter(edge => edge.source === nodeId)
  return outgoingEdges.map(edge => 
    nodes.find(node => node.id === edge.target)
  ).filter((node): node is Node => node !== undefined)
}

// Traverse the tree starting from root node
const traverseTree = (rootNode: Node, nodes: Node[], edges: Edge[], depth: number = 0): void => {
  const indent = '  '.repeat(depth)
  console.log(`${indent}Node: ${rootNode.type} (ID: ${rootNode.id})`)
  
  // Get and traverse child nodes
  const children = getChildNodes(rootNode.id, nodes, edges)
  children.forEach(child => {
    traverseTree(child, nodes, edges, depth + 1)
  })
}

// Main function to get workspace state and traverse
export const getWorkspaceTree = (nodes: Node[], edges: Edge[]): void => {
  const chatBoxNode = findChatBoxNode(nodes)
  
  if (!chatBoxNode) {
    console.warn('No ChatBox node found in the workspace')
    return
  }

  console.log('Workspace Tree Structure:')
  traverseTree(chatBoxNode, nodes, edges)
} 