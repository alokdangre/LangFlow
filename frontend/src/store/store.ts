import { applyEdgeChanges, applyNodeChanges, Edge, EdgeChange, Node, NodeChange, OnEdgesChange, OnNodesChange } from "reactflow";
import { createWithEqualityFn } from "zustand/traditional";

export type NodeState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
};

const useStore = createWithEqualityFn<NodeState>((set, get) => ({
    nodes: [
      {
        id: 'root',
        type: 'mindmap',
        data: { label: 'React Flow Mind Map' },
        position: { x: 0, y: 0 },
      },
    ],
    edges: [],
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
  }));

export default useStore;