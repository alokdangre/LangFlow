import { createWithEqualityFn } from 'zustand/traditional';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Node, Edge, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges } from 'reactflow';

interface NodeData {
  label: string;
  typeOfWork?: string;
  systemPrompt?: string;
  [key: string]: any;
}

interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: Node<NodeData>[];
  edges: Edge[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface RFState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNode: Node<NodeData> | null;
  isRunning: boolean;
  nodeStatuses: Record<string, 'not running' | 'pending' | 'success' | 'error'>;
  currentWorkflow: Workflow | null;
  hasUnsavedChanges: boolean;
  autoSave: boolean;
  setNodeStatus: (nodeId: string, status: 'not running' | 'pending' | 'success' | 'error') => void;
  resetAllNodeStatuses: () => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  setSelectedNode: (node: Node<NodeData> | null) => void;
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void;
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  deleteNode: (nodeId: string) => void;
  setIsRunning: (isRunning: boolean) => void;
  loadWorkflow: (workflow: Workflow) => void;
  createNewWorkflow: () => void;
  setCurrentWorkflow: (workflow: Workflow | null) => void;
  markAsUnsaved: () => void;
  markAsSaved: () => void;
  setAutoSave: (enabled: boolean) => void;
  saveCurrentWorkflow: () => Promise<void>;
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
      isRunning: false,
      nodeStatuses: {},
      currentWorkflow: null,
      hasUnsavedChanges: false,
      autoSave: false,
      setNodeStatus: (nodeId, status) => {
        set((state) => ({
          nodeStatuses: {
            ...state.nodeStatuses,
            [nodeId]: status,
          },
        }))
      },
      resetAllNodeStatuses: () => {
        set((state) => {
          const resetStatuses: Record<string, 'not running'> = {};
          state.nodes.forEach((node) => {
            resetStatuses[node.id] = 'not running';
          });
          return { nodeStatuses: resetStatuses };
        })
      },
      onNodesChange: (changes: NodeChange[]) => {
        set((state) => ({
          nodes: applyNodeChanges(changes, state.nodes),
          hasUnsavedChanges: true,
        }));
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set((state) => ({
          edges: applyEdgeChanges(changes, state.edges),
          hasUnsavedChanges: true,
        }));
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
          hasUnsavedChanges: true,
        });
      },
      setNodes: (nodes: Node<NodeData>[]) => set({ nodes, hasUnsavedChanges: true }),
      setEdges: (edges: Edge[]) => set({ edges, hasUnsavedChanges: true }),
      deleteNode: (nodeId: string) => {
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== nodeId),
          edges: state.edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId
          ),
          selectedNode: null,
          hasUnsavedChanges: true,
        }));
      },
      setIsRunning: (isRunning: boolean) => set({ isRunning }),
      loadWorkflow: (workflow: Workflow) => {
        console.log(workflow)
        set({
          nodes: workflow.nodes || [],
          edges: workflow.edges || [],
          currentWorkflow: workflow,
          selectedNode: null,
          hasUnsavedChanges: false,
        });
      },
      createNewWorkflow: () => {
        set({
          nodes: [],
          edges: [],
          currentWorkflow: null,
          selectedNode: null,
          hasUnsavedChanges: false,
        });
      },
      setCurrentWorkflow: (workflow: Workflow | null) => {
        console.log(workflow)
        set({ currentWorkflow: workflow });
      },
      markAsUnsaved: () => {
        set({ hasUnsavedChanges: true });
      },
      markAsSaved: () => {
        set({ hasUnsavedChanges: false });
      },
      setAutoSave: (enabled: boolean) => {
        set({ autoSave: enabled });
      },
      saveCurrentWorkflow: async () => {
        const state = get();
        if (!state.currentWorkflow) return;

        try {
          const response = await fetch(`/api/workflows/${state.currentWorkflow.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nodes: state.nodes,
              edges: state.edges
            }),
          });

          if (response.ok) {
            const updatedWorkflow = await response.json();
            set({ 
              currentWorkflow: updatedWorkflow,
              hasUnsavedChanges: false 
            });
          }
        } catch (error) {
          console.error('Error saving workflow:', error);
        }
      },
    }),
    {
      name: 'workspace-storage',
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        nodes: state.nodes.map((node: Node<NodeData>) => ({
          ...node,
          data: {
            ...node.data,
            icon: undefined
          }
        })),
        edges: state.edges,
      }),
    }
  )
);

// Export the store instance for use outside React
export const workspaceStore = useWorkspaceStore;
