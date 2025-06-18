import { createWithEqualityFn } from 'zustand/traditional';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Node, Edge, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges } from 'reactflow';

interface NodeData {
  label: string;
  typeOfWork?: string;
  systemPrompt?: string;
  [key: string]: any;
}

interface RFState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNode: Node<NodeData> | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  setSelectedNode: (node: Node<NodeData> | null) => void;
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void;
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
}

const storage = {
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
};

export const useWorkspaceStore = createWithEqualityFn<RFState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedNode: null,

      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },

      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },

      setSelectedNode: (node: Node<NodeData> | null) => {
        set({ selectedNode: node });
      },

      updateNodeData: (nodeId: string, data: Partial<NodeData>) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return {
                ...node,
                data: {
                  ...node.data,
                  ...data,
                },
              };
            }
            return node;
          }),
        });
      },

      setNodes: (nodes: Node<NodeData>[]) => {
        set({ nodes });
      },

      setEdges: (edges: Edge[]) => {
        set({ edges });
      },
    }),
    {
      name: 'workspace-storage',
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        nodes: state.nodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            icon: undefined // Exclude icon from persistence
          }
        })),
        edges: state.edges,
      }),
    }
  )
); 