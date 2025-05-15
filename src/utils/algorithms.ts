
// Define common types
export type ElementState = "default" | "current" | "comparing" | "sorted" | "active" | "new" | "removing" | "found" | "head" | "tail" | "visited";

export interface ArrayElement {
  value: number;
  state: ElementState;
}

export interface LinkedListNode {
  value: number;
  next: LinkedListNode | null;
  state: ElementState;
}

export interface LinkedListStep {
  nodes: { 
    value: number;
    state: ElementState;
    next: number | null; 
  }[];
  pointers?: { [key: string]: number | null };
  head?: LinkedListNode | null;
  action?: string;
  newValue?: number;
  deleteIndex?: number;
}

export interface StackQueueStep {
  elements: ArrayElement[];
  action?: string;
  value?: number;
}

export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
  state: ElementState;
}

export interface TreeStep {
  nodes: {
    value: number;
    state: ElementState;
    left: number | null;
    right: number | null;
  }[];
  root?: TreeNode | null;
  currentNode?: number | null;
  traversalOrder?: number[]; 
  currentIndex?: number;
}

export interface GraphNode {
  id: number;
  value: string | number;
  x: number;
  y: number;
  state: ElementState;
}

export interface GraphEdge {
  from: number;
  to: number;
  weight?: number;
  state: ElementState;
}

export interface GraphStep {
  nodes: GraphNode[];
  edges: GraphEdge[];
  visited?: number[];
  current?: number;
  queue?: number[]; // For BFS
  stack?: number[]; // For DFS
}

export interface HeapStep {
  elements: ArrayElement[];
  currentIndex?: number;
  swapIndices?: [number, number];
  heapified?: boolean[];
}

// Export from fundamentalAlgorithms.ts
export { gcd, fibonacci, sieveOfEratosthenes, binaryExponentiation, primalityTest } from './algorithms/fundamentalAlgorithms';

// Linked List algorithms
export const createLinkedList = (values: number[]): LinkedListStep => {
  let head: LinkedListNode | null = null;
  let current: LinkedListNode | null = null;
  const nodes: { value: number; state: ElementState; next: number | null }[] = [];

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    // Create node for the linked list representation
    const newNode: LinkedListNode = { value: value, next: null, state: "default" };
    
    if (!head) {
      head = newNode;
      current = newNode;
    } else {
      if (current) {
        current.next = newNode;
        current = newNode;
      }
    }
    
    // Create node for visualization
    nodes.push({
      value: value,
      state: "default",
      next: i < values.length - 1 ? i + 1 : null
    });
  }

  return { nodes, head };
};

// Tree traversal algorithms
export const createBinaryTree = (values: number[]): TreeStep => {
  if (!values || values.length === 0) {
    return { nodes: [], root: null };
  }

  // Create TreeNode objects
  const treeNodes: TreeNode[] = values.map(value => ({
    value: value,
    left: null,
    right: null,
    x: 0,
    y: 0,
    state: "default"
  }));

  // Create nodes for visualization
  const nodes: { value: number; state: ElementState; left: number | null; right: number | null }[] = 
    values.map((value, i) => ({
      value: value,
      state: "default",
      left: 2 * i + 1 < values.length ? 2 * i + 1 : null,
      right: 2 * i + 2 < values.length ? 2 * i + 2 : null
    }));

  // Build tree
  for (let i = 0; i < values.length; i++) {
    const leftChildIndex = 2 * i + 1;
    const rightChildIndex = 2 * i + 2;

    if (leftChildIndex < values.length) {
      treeNodes[i].left = treeNodes[leftChildIndex];
    }
    if (rightChildIndex < values.length) {
      treeNodes[i].right = treeNodes[rightChildIndex];
    }
  }

  // Set coordinates for visualization
  setTreeCoordinates(treeNodes[0], 0, 50, 300);

  return { nodes, root: treeNodes[0] };
};

const setTreeCoordinates = (node: TreeNode | null, level: number, xPos: number, xOffset: number) => {
  if (!node) return;

  node.x = xPos;
  node.y = level * 70 + 50; // Adjust vertical spacing

  setTreeCoordinates(node.left, level + 1, xPos - xOffset / 2, xOffset / 2);
  setTreeCoordinates(node.right, level + 1, xPos + xOffset / 2, xOffset / 2);
};

// Graph algorithms
export const createGraph = (
  nodes: { id: number; value: string | number; x: number; y: number }[],
  edges: { from: number; to: number; weight?: number }[]
): GraphStep => {
  const graphNodes: GraphNode[] = nodes.map(node => ({ ...node, state: "default" }));
  const graphEdges: GraphEdge[] = edges.map(edge => ({ ...edge, state: "default" }));

  return { nodes: graphNodes, edges: graphEdges };
};

// Export all other algorithms from their respective files
export * from './algorithms/sortingAlgorithms';
export * from './algorithms/linkedListAlgorithms';
export * from './algorithms/stackQueueAlgorithms';
export * from './algorithms/treeAlgorithms';
export * from './algorithms/graphAlgorithms';
export * from './algorithms/heapAlgorithms';

// Re-export types from index
export type { AlgorithmCategory, AlgorithmType } from './algorithms/index';
export { algorithms, categorizedAlgorithms } from './algorithms/index';
