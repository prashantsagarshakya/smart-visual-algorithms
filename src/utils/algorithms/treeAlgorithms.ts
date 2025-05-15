
type TreeNode = {
  value: number;
  state: "default" | "visited" | "current" | "comparing" | "found";
  left: number | null;  // Index of left child or null
  right: number | null; // Index of right child or null
};

type TreeStep = {
  nodes: TreeNode[];
  root: number | null;
  currentNode: number | null;
  traversalOrder: number[]; // To track traversal sequence
};

// Helper to create a deep copy of the tree state
const createTreeSnapshot = (step: TreeStep): TreeStep => {
  return {
    nodes: step.nodes.map(node => ({ ...node })),
    root: step.root,
    currentNode: step.currentNode,
    traversalOrder: [...step.traversalOrder]
  };
};

// Create a binary tree from array representation
export const createBinaryTree = (values: number[]): TreeStep => {
  if (values.length === 0) {
    return { nodes: [], root: null, currentNode: null, traversalOrder: [] };
  }
  
  const nodes: TreeNode[] = values.map((value, index) => {
    const leftChildIndex = 2 * index + 1 < values.length ? 2 * index + 1 : null;
    const rightChildIndex = 2 * index + 2 < values.length ? 2 * index + 2 : null;
    
    return {
      value,
      state: "default",
      left: leftChildIndex,
      right: rightChildIndex
    };
  });
  
  return {
    nodes,
    root: 0,
    currentNode: null,
    traversalOrder: []
  };
};

// In-order traversal algorithm
export const inOrderTraversal = (values: number[]): TreeStep[] => {
  const steps: TreeStep[] = [];
  const initialTree = createBinaryTree(values);
  
  steps.push(createTreeSnapshot(initialTree));
  
  let currentTree = createTreeSnapshot(initialTree);
  const traversalOrder: number[] = [];
  
  // Function to perform in-order traversal recursively
  const inOrder = (nodeIndex: number | null, tree: TreeStep, depth: number = 0): void => {
    if (nodeIndex === null) return;
    
    // Visit left subtree
    tree.currentNode = nodeIndex;
    tree.nodes[nodeIndex].state = "current";
    steps.push(createTreeSnapshot(tree));
    
    if (tree.nodes[nodeIndex].left !== null) {
      inOrder(tree.nodes[nodeIndex].left, tree, depth + 1);
    }
    
    // Visit node
    tree.nodes[nodeIndex].state = "visited";
    traversalOrder.push(nodeIndex);
    tree.traversalOrder = [...traversalOrder];
    steps.push(createTreeSnapshot(tree));
    
    // Visit right subtree
    if (tree.nodes[nodeIndex].right !== null) {
      inOrder(tree.nodes[nodeIndex].right, tree, depth + 1);
    }
  };
  
  if (currentTree.root !== null) {
    inOrder(currentTree.root, currentTree);
  }
  
  // Reset states for final step
  currentTree.nodes = currentTree.nodes.map(node => ({
    ...node,
    state: "default"
  }));
  currentTree.currentNode = null;
  steps.push(createTreeSnapshot(currentTree));
  
  return steps;
};

// Pre-order traversal algorithm
export const preOrderTraversal = (values: number[]): TreeStep[] => {
  const steps: TreeStep[] = [];
  const initialTree = createBinaryTree(values);
  
  steps.push(createTreeSnapshot(initialTree));
  
  let currentTree = createTreeSnapshot(initialTree);
  const traversalOrder: number[] = [];
  
  // Function to perform pre-order traversal recursively
  const preOrder = (nodeIndex: number | null, tree: TreeStep, depth: number = 0): void => {
    if (nodeIndex === null) return;
    
    // Visit node first
    tree.currentNode = nodeIndex;
    tree.nodes[nodeIndex].state = "current";
    steps.push(createTreeSnapshot(tree));
    
    tree.nodes[nodeIndex].state = "visited";
    traversalOrder.push(nodeIndex);
    tree.traversalOrder = [...traversalOrder];
    steps.push(createTreeSnapshot(tree));
    
    // Then visit left subtree
    if (tree.nodes[nodeIndex].left !== null) {
      preOrder(tree.nodes[nodeIndex].left, tree, depth + 1);
    }
    
    // Then visit right subtree
    if (tree.nodes[nodeIndex].right !== null) {
      preOrder(tree.nodes[nodeIndex].right, tree, depth + 1);
    }
  };
  
  if (currentTree.root !== null) {
    preOrder(currentTree.root, currentTree);
  }
  
  // Reset states for final step
  currentTree.nodes = currentTree.nodes.map(node => ({
    ...node,
    state: "default"
  }));
  currentTree.currentNode = null;
  steps.push(createTreeSnapshot(currentTree));
  
  return steps;
};

// Post-order traversal algorithm
export const postOrderTraversal = (values: number[]): TreeStep[] => {
  const steps: TreeStep[] = [];
  const initialTree = createBinaryTree(values);
  
  steps.push(createTreeSnapshot(initialTree));
  
  let currentTree = createTreeSnapshot(initialTree);
  const traversalOrder: number[] = [];
  
  // Function to perform post-order traversal recursively
  const postOrder = (nodeIndex: number | null, tree: TreeStep, depth: number = 0): void => {
    if (nodeIndex === null) return;
    
    // First visit left subtree
    tree.currentNode = nodeIndex;
    tree.nodes[nodeIndex].state = "current";
    steps.push(createTreeSnapshot(tree));
    
    if (tree.nodes[nodeIndex].left !== null) {
      postOrder(tree.nodes[nodeIndex].left, tree, depth + 1);
    }
    
    // Then visit right subtree
    if (tree.nodes[nodeIndex].right !== null) {
      postOrder(tree.nodes[nodeIndex].right, tree, depth + 1);
    }
    
    // Finally, visit node
    tree.nodes[nodeIndex].state = "visited";
    traversalOrder.push(nodeIndex);
    tree.traversalOrder = [...traversalOrder];
    steps.push(createTreeSnapshot(tree));
  };
  
  if (currentTree.root !== null) {
    postOrder(currentTree.root, currentTree);
  }
  
  // Reset states for final step
  currentTree.nodes = currentTree.nodes.map(node => ({
    ...node,
    state: "default"
  }));
  currentTree.currentNode = null;
  steps.push(createTreeSnapshot(currentTree));
  
  return steps;
};

export type { TreeNode, TreeStep };
