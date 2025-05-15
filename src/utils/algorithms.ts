// Define common types
export type ElementState = "default" | "current" | "comparing" | "sorted" | "active" | "new" | "removing" | "found";

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
  head: LinkedListNode | null;
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
  root: TreeNode | null;
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
}

export interface HeapStep {
  elements: ArrayElement[];
  currentIndex?: number;
  swapIndices?: [number, number];
  heapified?: boolean[];
}

// Array sorting algorithms
export const bubbleSort = (arr: number[]): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  const n = arr.length;

  // Initial state
  const initialElements: ArrayElement[] = arr.map(value => ({ value, state: "default" }));
  steps.push([...initialElements]);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing state
      const comparingElements: ArrayElement[] = arr.map((value, index) => ({
        value,
        state: index === j || index === j + 1 ? "comparing" : "default"
      }));
      steps.push([...comparingElements]);

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        // Swapped state
        const swappedElements: ArrayElement[] = arr.map((value, index) => ({
          value,
          state: index === j || index === j + 1 ? "current" : "default"
        }));
        steps.push([...swappedElements]);
      }
    }

    // Sorted state after each pass
    const sortedElements: ArrayElement[] = arr.map((value, index) => ({
      value,
      state: index >= n - i - 1 ? "sorted" : "default"
    }));
    steps.push([...sortedElements]);
  }

  // Final sorted state
  const finalElements: ArrayElement[] = arr.map(value => ({ value, state: "sorted" }));
  steps.push([...finalElements]);

  return steps;
};

export const selectionSort = (arr: number[]): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  const n = arr.length;

  // Initial state
  const initialElements: ArrayElement[] = arr.map(value => ({ value, state: "default" }));
  steps.push([...initialElements]);

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Current state
    const currentElements: ArrayElement[] = arr.map((value, index) => ({
      value,
      state: index === i ? "current" : "default"
    }));
    steps.push([...currentElements]);

    for (let j = i + 1; j < n; j++) {
      // Comparing state
      const comparingElements: ArrayElement[] = arr.map((value, index) => ({
        value,
        state: index === j || index === minIdx ? "comparing" : "default"
      }));
      steps.push([...comparingElements]);

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Swap the found minimum element with first element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      // Swapped state
      const swappedElements: ArrayElement[] = arr.map((value, index) => ({
        value,
        state: index === i || index === minIdx ? "current" : "default"
      }));
      steps.push([...swappedElements]);
    }

    // Sorted state after each pass
    const sortedElements: ArrayElement[] = arr.map((value, index) => ({
      value,
      state: index <= i ? "sorted" : "default"
    }));
    steps.push([...sortedElements]);
  }

  // Final sorted state
  const finalElements: ArrayElement[] = arr.map(value => ({ value, state: "sorted" }));
  steps.push([...finalElements]);

  return steps;
};

export const insertionSort = (arr: number[]): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  const n = arr.length;

  // Initial state
  const initialElements: ArrayElement[] = arr.map(value => ({ value, state: "default" }));
  steps.push([...initialElements]);

  for (let i = 1; i < n; i++) {
    let current = arr[i];
    let j = i - 1;

    // Current state
    const currentElements: ArrayElement[] = arr.map((value, index) => ({
      value,
      state: index === i ? "current" : index <= i ? "default" : "default"
    }));
    steps.push([...currentElements]);

    // Move elements greater than current to one position ahead
    while (j >= 0 && arr[j] > current) {
      // Comparing state
      const comparingElements: ArrayElement[] = arr.map((value, index) => ({
        value,
        state: index === j || index === j + 1 ? "comparing" : index === i ? "current" : "default"
      }));
      steps.push([...comparingElements]);

      arr[j + 1] = arr[j];
      j--;

      // Shifted state
      const shiftedElements: ArrayElement[] = arr.map((value, index) => ({
        value,
        state: index === j + 1 ? "current" : index === i ? "current" : "default"
      }));
      steps.push([...shiftedElements]);
    }

    arr[j + 1] = current;

    // Inserted state
    const insertedElements: ArrayElement[] = arr.map((value, index) => ({
      value,
      state: index === j + 1 ? "current" : index <= i ? "default" : "default"
    }));
    steps.push([...insertedElements]);

    // Sorted state after each pass
    const sortedElements: ArrayElement[] = arr.map((value, index) => ({
      value,
      state: index <= i ? "sorted" : "default"
    }));
    steps.push([...sortedElements]);
  }

  // Final sorted state
  const finalElements: ArrayElement[] = arr.map(value => ({ value, state: "sorted" }));
  steps.push([...finalElements]);

  return steps;
};

// Linked List algorithms
export const createLinkedList = (values: number[]): LinkedListStep => {
  let head: LinkedListNode | null = null;
  let current: LinkedListNode | null = null;

  for (const value of values) {
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
  }

  return { head: head };
};

export const traverseLinkedList = (values: number[]): LinkedListStep[] => {
  const steps: LinkedListStep[] = [];
  let head: LinkedListNode | null = null;
  let current: LinkedListNode | null = null;

  // Create initial linked list
  for (const value of values) {
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
  }

  steps.push({ head: head });

  // Traverse the linked list
  current = head;
  while (current !== null) {
    // Set current node to "current" state
    let stepHead: LinkedListNode | null = head;
    while (stepHead !== null) {
      stepHead.state = stepHead === current ? "current" : "default";
      stepHead = stepHead.next;
    }
    steps.push({ head: head });

    current = current.next;
  }

  // Reset all nodes to "default" state
  let stepHead: LinkedListNode | null = head;
  while (stepHead !== null) {
    stepHead.state = "default";
    stepHead = stepHead.next;
  }
  steps.push({ head: head });

  return steps;
};

export const insertAtBeginning = (values: number[], newValue: number): LinkedListStep[] => {
  const steps: LinkedListStep[] = [];
  let head: LinkedListNode | null = null;
  let current: LinkedListNode | null = null;

  // Create initial linked list
  for (const value of values) {
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
  }

  steps.push({ head: head });

  // Insert new node at the beginning
  const newNode: LinkedListNode = { value: newValue, next: head, state: "new" };
  head = newNode;

  steps.push({ head: head, action: "insert", newValue: newValue });

  return steps;
};

export const deleteNode = (values: number[], deleteIndex: number): LinkedListStep[] => {
  const steps: LinkedListStep[] = [];
  let head: LinkedListNode | null = null;
  let current: LinkedListNode | null = null;
  let prev: LinkedListNode | null = null;

  // Create initial linked list
  for (const value of values) {
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
  }

  steps.push({ head: head });

  // If head contains value to delete
  if (head !== null && values[0] === deleteIndex) {
    head = head.next;
    steps.push({ head: head, action: "delete", deleteIndex: deleteIndex });
    return steps;
  }

  current = head;
  let index = 0;

  // Search for the node to delete
  while (current !== null && index !== deleteIndex) {
    prev = current;
    current = current.next;
    index++;
  }

  // If node not found
  if (current === null) {
    return steps;
  }

  // Remove the node
  if (prev !== null) {
    prev.next = current.next;
  }

  steps.push({ head: head, action: "delete", deleteIndex: deleteIndex });

  return steps;
};

// Stack algorithms
export const push = (stack: number[], value: number, type: "stack" | "queue"): StackQueueStep[] => {
  const steps: StackQueueStep[] = [];

  // Initial state
  const initialElements: ArrayElement[] = stack.map(value => ({ value, state: "default" }));
  steps.push({ elements: initialElements });

  // Add element to top of stack
  stack.push(value);

  // Pushed state
  const pushedElements: ArrayElement[] = stack.map((value, index) => ({
    value,
    state: index === stack.length - 1 ? "new" : "default"
  }));
  steps.push({ elements: pushedElements, action: "push", value: value });

  return steps;
};

export const pop = (stack: number[], type: "stack" | "queue"): StackQueueStep[] => {
  const steps: StackQueueStep[] = [];

  // Initial state
  const initialElements: ArrayElement[] = stack.map(value => ({ value, state: "default" }));
  steps.push({ elements: initialElements });

  // Check if stack is empty
  if (stack.length === 0) {
    return steps;
  }

  // Remove and return top element
  const poppedValue = stack.pop();

  // Popped state
  const poppedElements: ArrayElement[] = stack.map(value => ({ value, state: "default" }));
  steps.push({ elements: poppedElements, action: "pop", value: poppedValue });

  return steps;
};

export const peek = (stack: number[], type: "stack" | "queue"): StackQueueStep[] => {
  const steps: StackQueueStep[] = [];

  // Initial state
  const initialElements: ArrayElement[] = stack.map(value => ({ value, state: "default" }));
  steps.push({ elements: initialElements });

  // Check if stack is empty
  if (stack.length === 0) {
    return steps;
  }

  // Return top element without removing
  const peekedValue = stack[stack.length - 1];

  // Peeked state
  const peekedElements: ArrayElement[] = stack.map((value, index) => ({
    value,
    state: index === stack.length - 1 ? "current" : "default"
  }));
  steps.push({ elements: peekedElements, action: "peek", value: peekedValue });

  return steps;
};

// Tree traversal algorithms
export const createBinaryTree = (values: number[]): TreeStep => {
  if (!values || values.length === 0) {
    return { root: null };
  }

  // Create nodes
  const nodes: TreeNode[] = values.map(value => ({
    value: value,
    left: null,
    right: null,
    x: 0,
    y: 0,
    state: "default"
  }));

  // Build tree
  for (let i = 0; i < values.length; i++) {
    const leftChildIndex = 2 * i + 1;
    const rightChildIndex = 2 * i + 2;

    if (leftChildIndex < values.length) {
      nodes[i].left = nodes[leftChildIndex];
    }
    if (rightChildIndex < values.length) {
      nodes[i].right = nodes[rightChildIndex];
    }
  }

  // Set coordinates for visualization
  setTreeCoordinates(nodes[0], 0, 50, 300);

  return { root: nodes[0] };
};

const setTreeCoordinates = (node: TreeNode | null, level: number, xPos: number, xOffset: number) => {
  if (!node) return;

  node.x = xPos;
  node.y = level * 70 + 50; // Adjust vertical spacing

  setTreeCoordinates(node.left, level + 1, xPos - xOffset / 2, xOffset / 2);
  setTreeCoordinates(node.right, level + 1, xPos + xOffset / 2, xOffset / 2);
};

export const inOrderTraversal = (values: number[]): TreeStep[] => {
  const steps: TreeStep[] = [];
  const tree = createBinaryTree(values);
  const traversalOrder: number[] = [];

  function traverse(node: TreeNode | null) {
    if (node === null) return;

    traverse(node.left);
    traversalOrder.push(node.value);
    steps.push({ root: tree.root, traversalOrder: [...traversalOrder] });
    traverse(node.right);
  }

  traverse(tree.root);
  return steps;
};

export const preOrderTraversal = (values: number[]): TreeStep[] => {
  const steps: TreeStep[] = [];
  const tree = createBinaryTree(values);
  const traversalOrder: number[] = [];

  function traverse(node: TreeNode | null) {
    if (node === null) return;

    traversalOrder.push(node.value);
    steps.push({ root: tree.root, traversalOrder: [...traversalOrder] });
    traverse(node.left);
    traverse(node.right);
  }

  traverse(tree.root);
  return steps;
};

export const postOrderTraversal = (values: number[]): TreeStep[] => {
  const steps: TreeStep[] = [];
  const tree = createBinaryTree(values);
  const traversalOrder: number[] = [];

  function traverse(node: TreeNode | null) {
    if (node === null) return;

    traverse(node.left);
    traverse(node.right);
    traversalOrder.push(node.value);
    steps.push({ root: tree.root, traversalOrder: [...traversalOrder] });
  }

  traverse(tree.root);
  return steps;
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

export const bfs = (startNodeId: number, rawGraphData: {
  nodes: { id: number; value: string | number; x: number; y: number }[];
  edges: { from: number; to: number; weight?: number }[];
}): GraphStep[] => {
  const steps: GraphStep[] = [];
  const { nodes, edges } = rawGraphData;

  // Initialize graph
  const initialGraph = createGraph(nodes, edges);
  steps.push(initialGraph);

  const graphNodes: GraphNode[] = initialGraph.nodes;
  const graphEdges: GraphEdge[] = initialGraph.edges;

  const queue: number[] = [startNodeId];
  const visited: number[] = [startNodeId];

  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;

    // Mark current node as visited
    const currentNodes = graphNodes.map(node => ({
      ...node,
      state: node.id === currentNodeId ? "current" : node.state
    }));

    steps.push({ nodes: currentNodes, edges: graphEdges, visited: [...visited], current: currentNodeId });

    // Find neighbors
    const neighbors = edges
      .filter(edge => edge.from === currentNodeId)
      .map(edge => edge.to);

    for (const neighborId of neighbors) {
      if (!visited.includes(neighborId)) {
        queue.push(neighborId);
        visited.push(neighborId);

        // Mark neighbor as visited
        const visitedNodes = graphNodes.map(node => ({
          ...node,
          state: visited.includes(node.id) ? "active" : node.state
        }));

        steps.push({ nodes: visitedNodes, edges: graphEdges, visited: [...visited], current: currentNodeId });
      }
    }
  }

  return steps;
};

export const dfs = (startNodeId: number, rawGraphData: {
  nodes: { id: number; value: string | number; x: number; y: number }[];
  edges: { from: number; to: number; weight?: number }[]
}): GraphStep[] => {
  const steps: GraphStep[] = [];
  const { nodes, edges } = rawGraphData;

  // Initialize graph
  const initialGraph = createGraph(nodes, edges);
  steps.push(initialGraph);

  const graphNodes: GraphNode[] = initialGraph.nodes;
  const graphEdges: GraphEdge[] = initialGraph.edges;

  const stack: number[] = [startNodeId];
  const visited: number[] = [];

  while (stack.length > 0) {
    const currentNodeId = stack.pop()!;

    if (!visited.includes(currentNodeId)) {
      visited.push(currentNodeId);

      // Mark current node as visited
      const currentNodes = graphNodes.map(node => ({
        ...node,
        state: node.id === currentNodeId ? "current" : node.state
      }));

      steps.push({ nodes: currentNodes, edges: graphEdges, visited: [...visited], current: currentNodeId });

      // Find neighbors
      const neighbors = edges
        .filter(edge => edge.from === currentNodeId)
        .map(edge => edge.to);

      for (const neighborId of neighbors) {
        if (!visited.includes(neighborId)) {
          stack.push(neighborId);

          // Mark neighbor as visited
          const visitedNodes = graphNodes.map(node => ({
            ...node,
            state: visited.includes(node.id) ? "active" : node.state
          }));

          steps.push({ nodes: visitedNodes, edges: graphEdges, visited: [...visited], current: currentNodeId });
        }
      }
    }
  }

  return steps;
};

// Heap algorithms
export const buildHeap = (arr: number[]): HeapStep[] => {
  const steps: HeapStep[] = [];
  const n = arr.length;

  // Convert array to ArrayElement[]
  const elements: ArrayElement[] = arr.map(value => ({ value, state: "default" }));

  // Initial state
  steps.push({ elements: [...elements] });

  // Heapify down function
  const heapifyDown = (arr: ArrayElement[], i: number, n: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left].value > arr[largest].value) {
      largest = left;
    }

    if (right < n && arr[right].value > arr[largest].value) {
      largest = right;
    }

    if (largest !== i) {
      // Highlight the elements being swapped
      const swapElements = arr.map((el, idx) => ({
        ...el,
        state: idx === i || idx === largest ? "comparing" : el.state
      }));
      steps.push({ elements: [...swapElements], swapIndices: [i, largest] });

      // Swap elements
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      // Show the swapped state
      const swappedElements = arr.map((el, idx) => ({
        ...el,
        state: idx === i || idx === largest ? "current" : el.state
      }));
      steps.push({ elements: [...swappedElements], swapIndices: [i, largest] });

      heapifyDown(arr, largest, n);
    }
  };

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyDown(elements, i, n);
  }

  // Final state
  steps.push({ elements: [...elements] });

  return steps;
};

export const heapSort = (arr: number[]): HeapStep[] => {
  const steps: HeapStep[] = [];
  const n = arr.length;

  // Convert array to ArrayElement[]
  const elements: ArrayElement[] = arr.map(value => ({ value, state: "default" }));

  // Initial state
  steps.push({ elements: [...elements] });

  // Heapify function
  const heapify = (arr: ArrayElement[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left].value > arr[largest].value) {
      largest = left;
    }

    if (right < n && arr[right].value > arr[largest].value) {
      largest = right;
    }

    if (largest !== i) {
      // Highlight the elements being swapped
      const swapElements = arr.map((el, idx) => ({
        ...el,
        state: idx === i || idx === largest ? "comparing" : el.state
      }));
      steps.push({ elements: [...swapElements], swapIndices: [i, largest] });

      // Swap elements
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      // Show the swapped state
      const swappedElements = arr.map((el, idx) => ({
        ...el,
        state: idx === i || idx === largest ? "current" : el.state
      }));
      steps.push({ elements: [...swappedElements], swapIndices: [i, largest] });

      heapify(arr, n, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(elements, n, i);
  }

  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [elements[0], elements[i]] = [elements[i], elements[0]];

    // Call heapify on reduced heap
    heapify(elements, i, 0);
  }

  // Final state
  steps.push({ elements: [...elements] });

  return steps;
};
