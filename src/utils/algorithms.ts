type ArrayElement = {
  value: number;
  state: "default" | "comparing" | "sorted" | "current";
};

// Types for different data structure visualizations
export type LinkedListNode = {
  value: number;
  next: number | null;
  state: "default" | "head" | "tail" | "current" | "visited" | "comparing";
};

export type LinkedListStep = {
  nodes: LinkedListNode[];
  pointers?: {
    current: number;
    prev?: number;
    next?: number;
  };
};

export type StackQueueStep = {
  elements: ArrayElement[];
  pointer?: number;
  operation?: "push" | "pop" | "peek";
};

export type TreeNode = {
  value: number;
  left: number | null;
  right: number | null;
  state: "default" | "current" | "visited" | "comparing";
};

export type TreeStep = {
  nodes: TreeNode[];
  currentNode?: number;
  visitOrder?: number[];
};

export type GraphNode = {
  id: number;
  value: string | number;
  x: number;
  y: number;
  state: "default" | "current" | "visited" | "comparing";
};

export type GraphEdge = {
  from: number;
  to: number;
  weight?: number;
  state: "default" | "traversing" | "visited";
};

export type GraphStep = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  queue?: number[];
  stack?: number[];
  visitOrder?: number[];
};

// Helper to create a deep copy of the array state
const createArraySnapshot = (arr: ArrayElement[]): ArrayElement[] => {
  return arr.map(element => ({ ...element }));
};

// Helper to update array elements with visual states
const createNewStep = (
  arr: ArrayElement[], 
  indices: number[] = [], 
  state: "default" | "comparing" | "sorted" | "current" = "default"
): ArrayElement[] => {
  const newArray = createArraySnapshot(arr);
  
  indices.forEach(index => {
    if (index >= 0 && index < newArray.length) {
      newArray[index].state = state;
    }
  });
  
  return newArray;
};

// Reset all elements to default state
const resetArrayState = (arr: ArrayElement[], sortedIndices: number[] = []): ArrayElement[] => {
  const newArray = arr.map(element => ({
    ...element,
    state: "default" as const
  }));
  
  sortedIndices.forEach(index => {
    if (index >= 0 && index < newArray.length) {
      newArray[index].state = "sorted" as const;
    }
  });
  
  return newArray;
};

// Bubble sort algorithm with visualization steps
export const bubbleSort = (array: number[]): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  const n = array.length;
  
  // Initialize array with default states
  let currentArray: ArrayElement[] = array.map(value => ({
    value,
    state: "default" as const
  }));
  
  steps.push(createArraySnapshot(currentArray));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing elements
      currentArray = resetArrayState(currentArray, Array.from({ length: n - i }, (_, k) => n - 1 - k));
      currentArray = createNewStep(currentArray, [j, j + 1], "comparing");
      steps.push(createArraySnapshot(currentArray));
      
      if (currentArray[j].value > currentArray[j + 1].value) {
        // Swap elements if they are in wrong order
        const temp = { ...currentArray[j] };
        currentArray[j] = { ...currentArray[j + 1], state: "comparing" };
        currentArray[j + 1] = { ...temp, state: "comparing" };
        steps.push(createArraySnapshot(currentArray));
      }
    }
    
    // Mark the largest element as sorted after this pass
    currentArray = resetArrayState(currentArray, Array.from({ length: i + 1 }, (_, k) => n - 1 - k));
    steps.push(createArraySnapshot(currentArray));
  }
  
  // Mark all elements as sorted in the final step
  currentArray = currentArray.map(element => ({
    ...element,
    state: "sorted" as const
  }));
  steps.push(createArraySnapshot(currentArray));
  
  return steps;
};

// Selection sort algorithm with visualization steps
export const selectionSort = (array: number[]): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  const n = array.length;
  
  // Initialize array with default states
  let currentArray: ArrayElement[] = array.map(value => ({
    value,
    state: "default" as const
  }));
  
  steps.push(createArraySnapshot(currentArray));
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Mark current position
    currentArray = resetArrayState(currentArray, Array.from({ length: i }, (_, k) => k));
    currentArray = createNewStep(currentArray, [i], "current");
    steps.push(createArraySnapshot(currentArray));
    
    for (let j = i + 1; j < n; j++) {
      // Comparing with current minimum
      currentArray = resetArrayState(currentArray, Array.from({ length: i }, (_, k) => k));
      currentArray[i].state = "current";
      currentArray = createNewStep(currentArray, [minIndex !== i ? minIndex : -1], "comparing");
      currentArray = createNewStep(currentArray, [j], "comparing");
      steps.push(createArraySnapshot(currentArray));
      
      if (currentArray[j].value < currentArray[minIndex].value) {
        if (minIndex !== i) {
          currentArray[minIndex].state = "default";
        }
        minIndex = j;
      } else {
        currentArray[j].state = "default";
      }
    }
    
    if (minIndex !== i) {
      // Swap the found minimum element with the first element
      currentArray = resetArrayState(currentArray, Array.from({ length: i }, (_, k) => k));
      currentArray = createNewStep(currentArray, [i, minIndex], "comparing");
      steps.push(createArraySnapshot(currentArray));
      
      const temp = { ...currentArray[i] };
      currentArray[i] = { ...currentArray[minIndex], state: "comparing" };
      currentArray[minIndex] = { ...temp, state: "comparing" };
      steps.push(createArraySnapshot(currentArray));
    }
    
    // Mark element as sorted
    currentArray = resetArrayState(currentArray, Array.from({ length: i + 1 }, (_, k) => k));
    steps.push(createArraySnapshot(currentArray));
  }
  
  // Mark all elements as sorted in the final step
  currentArray = currentArray.map(element => ({
    ...element,
    state: "sorted" as const
  }));
  steps.push(createArraySnapshot(currentArray));
  
  return steps;
};

// Insertion sort algorithm with visualization steps
export const insertionSort = (array: number[]): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  const n = array.length;
  
  // Initialize array with default states
  let currentArray: ArrayElement[] = array.map(value => ({
    value,
    state: "default" as const
  }));
  
  steps.push(createArraySnapshot(currentArray));
  
  // Mark first element as sorted
  currentArray[0].state = "sorted";
  steps.push(createArraySnapshot(currentArray));
  
  for (let i = 1; i < n; i++) {
    // Current element to be inserted
    let currentVal = currentArray[i].value;
    let j = i - 1;
    
    // Mark current element
    currentArray = resetArrayState(currentArray, Array.from({ length: i }, (_, k) => k));
    currentArray = createNewStep(currentArray, [i], "current");
    steps.push(createArraySnapshot(currentArray));
    
    while (j >= 0 && currentArray[j].value > currentVal) {
      // Compare with sorted elements
      currentArray = resetArrayState(currentArray, Array.from({ length: i }, (_, k) => k < j ? k : -1));
      currentArray = createNewStep(currentArray, [j, j + 1], "comparing");
      steps.push(createArraySnapshot(currentArray));
      
      // Shift elements
      currentArray[j + 1] = { ...currentArray[j], state: "comparing" };
      steps.push(createArraySnapshot(currentArray));
      
      j--;
    }
    
    // Insert the current element in its correct position
    currentArray[j + 1] = {
      value: currentVal,
      state: "comparing" as const
    };
    steps.push(createArraySnapshot(currentArray));
    
    // Mark elements as sorted
    currentArray = resetArrayState(currentArray, Array.from({ length: i + 1 }, (_, k) => k));
    steps.push(createArraySnapshot(currentArray));
  }
  
  // Mark all elements as sorted in the final step
  currentArray = currentArray.map(element => ({
    ...element,
    state: "sorted" as const
  }));
  steps.push(createArraySnapshot(currentArray));
  
  return steps;
};

// Linked List helpers
export const createLinkedList = (values: number[]): LinkedListStep => {
  const nodes = values.map((value, index) => ({
    value,
    next: index < values.length - 1 ? index + 1 : null,
    state: index === 0 ? "head" as const : index === values.length - 1 ? "tail" as const : "default" as const
  }));
  
  return { nodes };
};

export const traverseLinkedList = (values: number[]): LinkedListStep[] => {
  const steps: LinkedListStep[] = [];
  const initialList = createLinkedList(values);
  steps.push(initialList);
  
  for (let i = 0; i < values.length; i++) {
    const step = JSON.parse(JSON.stringify(initialList)) as LinkedListStep;
    for (let j = 0; j <= i; j++) {
      step.nodes[j].state = "visited";
    }
    step.nodes[i].state = "current";
    step.pointers = { current: i };
    steps.push(step);
  }
  
  return steps;
};

export const insertAtBeginning = (values: number[], newValue: number): LinkedListStep[] => {
  const steps: LinkedListStep[] = [];
  const initialList = createLinkedList(values);
  steps.push(initialList);
  
  // Create new list with inserted node
  const newNodes = [
    { value: newValue, next: 0, state: "head" as const },
    ...initialList.nodes.map((node, index) => ({
      ...node,
      state: index === 0 ? "default" as const : node.state === "tail" ? "tail" as const : "default" as const
    }))
  ];
  
  // Update next pointers
  for (let i = 0; i < newNodes.length; i++) {
    if (newNodes[i].next !== null) {
      newNodes[i].next = newNodes[i].next! + 1;
    }
  }
  
  const newStep = { nodes: newNodes, pointers: { current: 0 } };
  steps.push(newStep);
  
  // Show after adding
  const finalStep = JSON.parse(JSON.stringify(newStep)) as LinkedListStep;
  finalStep.nodes[0].state = "visited";
  steps.push(finalStep);
  
  return steps;
};

export const deleteNode = (values: number[], index: number): LinkedListStep[] => {
  const steps: LinkedListStep[] = [];
  const initialList = createLinkedList(values);
  steps.push(initialList);
  
  // Mark node to delete
  const markStep = JSON.parse(JSON.stringify(initialList)) as LinkedListStep;
  markStep.nodes[index].state = "comparing";
  markStep.pointers = { current: index };
  steps.push(markStep);
  
  // Create list without deleted node
  const newNodes = initialList.nodes.filter((_, i) => i !== index);
  
  // Update next pointers and states
  for (let i = 0; i < newNodes.length; i++) {
    if (newNodes[i].next !== null && newNodes[i].next > index) {
      newNodes[i].next = newNodes[i].next! - 1;
    } else if (newNodes[i].next === index) {
      newNodes[i].next = i < newNodes.length - 1 ? i + 1 : null;
    }
    
    newNodes[i].state = i === 0 ? "head" : i === newNodes.length - 1 ? "tail" : "default";
  }
  
  steps.push({ nodes: newNodes });
  
  return steps;
};

// Stack and Queue operations
export const push = (values: number[], newValue: number, type: "stack" | "queue"): StackQueueStep[] => {
  const steps: StackQueueStep[] = [];
  
  // Initial state
  const elements = values.map(value => ({
    value,
    state: "default" as const
  }));
  
  steps.push({ elements });
  
  // Adding new element
  const newElement = { value: newValue, state: "comparing" as const };
  
  if (type === "stack") {
    // For stack, add to end (top)
    steps.push({
      elements: [...elements, newElement],
      operation: "push"
    });
  } else {
    // For queue, add to end
    steps.push({
      elements: [...elements, newElement],
      operation: "push"
    });
  }
  
  // Final state with element added
  const finalElements = [...elements, { ...newElement, state: "default" as const }];
  steps.push({ elements: finalElements });
  
  return steps;
};

export const pop = (values: number[], type: "stack" | "queue"): StackQueueStep[] => {
  if (values.length === 0) return [{ elements: [] }];
  
  const steps: StackQueueStep[] = [];
  
  // Initial state
  const elements = values.map(value => ({
    value,
    state: "default" as const
  }));
  
  steps.push({ elements });
  
  // Mark element to be removed
  const markElements = [...elements];
  const removeIndex = type === "stack" ? elements.length - 1 : 0; // Remove from end for stack, beginning for queue
  markElements[removeIndex].state = "comparing";
  
  steps.push({
    elements: markElements,
    pointer: removeIndex,
    operation: "pop"
  });
  
  // Remove element
  const newElements = markElements.filter((_, i) => i !== removeIndex);
  steps.push({ elements: newElements });
  
  return steps;
};

export const peek = (values: number[], type: "stack" | "queue"): StackQueueStep[] => {
  if (values.length === 0) return [{ elements: [] }];
  
  const steps: StackQueueStep[] = [];
  
  // Initial state
  const elements = values.map(value => ({
    value,
    state: "default" as const
  }));
  
  steps.push({ elements });
  
  // Mark element to peek
  const markElements = [...elements.map(el => ({ ...el }))];
  const peekIndex = type === "stack" ? elements.length - 1 : 0; // Peek at end for stack, beginning for queue
  markElements[peekIndex].state = "comparing";
  
  steps.push({
    elements: markElements,
    pointer: peekIndex,
    operation: "peek"
  });
  
  return steps;
};

// Tree algorithms
export const createBinaryTree = (values: number[]): TreeStep => {
  const nodes: TreeNode[] = values.map(value => ({
    value,
    left: null,
    right: null,
    state: "default"
  }));
  
  // Build binary tree connections (parent i has children at 2i+1 and 2i+2)
  for (let i = 0; i < nodes.length; i++) {
    const leftIndex = 2 * i + 1;
    const rightIndex = 2 * i + 2;
    
    if (leftIndex < nodes.length) {
      nodes[i].left = leftIndex;
    }
    
    if (rightIndex < nodes.length) {
      nodes[i].right = rightIndex;
    }
  }
  
  return { nodes };
};

export const inOrderTraversal = (values: number[]): TreeStep[] => {
  const steps: TreeStep[] = [];
  const tree = createBinaryTree(values);
  
  steps.push(tree);
  
  const visitOrder: number[] = [];
  const inOrder = (index: number): void => {
    if (index >= tree.nodes.length) return;
    
    const node = tree.nodes[index];
    
    // Traverse left
    if (node.left !== null) {
      const step = JSON.parse(JSON.stringify(tree)) as TreeStep;
      step.currentNode = index;
      step.nodes[index].state = "current";
      steps.push(step);
      
      inOrder(node.left);
    }
    
    // Visit node
    visitOrder.push(index);
    const visitStep = JSON.parse(JSON.stringify(tree)) as TreeStep;
    visitStep.currentNode = index;
    visitStep.nodes[index].state = "visited";
    visitStep.visitOrder = [...visitOrder];
    steps.push(visitStep);
    
    // Traverse right
    if (node.right !== null) {
      const step = JSON.parse(JSON.stringify(tree)) as TreeStep;
      step.currentNode = index;
      step.nodes[index].state = "current";
      steps.push(step);
      
      inOrder(node.right);
    }
  };
  
  inOrder(0);
  
  return steps;
};

export const preOrderTraversal = (values: number[]): TreeStep[] => {
  const steps: TreeStep[] = [];
  const tree = createBinaryTree(values);
  
  steps.push(tree);
  
  const visitOrder: number[] = [];
  const preOrder = (index: number): void => {
    if (index >= tree.nodes.length) return;
    
    const node = tree.nodes[index];
    
    // Visit node first
    visitOrder.push(index);
    const visitStep = JSON.parse(JSON.stringify(tree)) as TreeStep;
    visitStep.currentNode = index;
    visitStep.nodes[index].state = "visited";
    visitStep.visitOrder = [...visitOrder];
    steps.push(visitStep);
    
    // Traverse left
    if (node.left !== null) {
      const step = JSON.parse(JSON.stringify(tree)) as TreeStep;
      step.currentNode = index;
      step.nodes[index].state = "current";
      steps.push(step);
      
      preOrder(node.left);
    }
    
    // Traverse right
    if (node.right !== null) {
      const step = JSON.parse(JSON.stringify(tree)) as TreeStep;
      step.currentNode = index;
      step.nodes[index].state = "current";
      steps.push(step);
      
      preOrder(node.right);
    }
  };
  
  preOrder(0);
  
  return steps;
};

export const postOrderTraversal = (values: number[]): TreeStep[] => {
  const steps: TreeStep[] = [];
  const tree = createBinaryTree(values);
  
  steps.push(tree);
  
  const visitOrder: number[] = [];
  const postOrder = (index: number): void => {
    if (index >= tree.nodes.length) return;
    
    const node = tree.nodes[index];
    
    // Traverse left
    if (node.left !== null) {
      const step = JSON.parse(JSON.stringify(tree)) as TreeStep;
      step.currentNode = index;
      step.nodes[index].state = "current";
      steps.push(step);
      
      postOrder(node.left);
    }
    
    // Traverse right
    if (node.right !== null) {
      const step = JSON.parse(JSON.stringify(tree)) as TreeStep;
      step.currentNode = index;
      step.nodes[index].state = "current";
      steps.push(step);
      
      postOrder(node.right);
    }
    
    // Visit node last
    visitOrder.push(index);
    const visitStep = JSON.parse(JSON.stringify(tree)) as TreeStep;
    visitStep.currentNode = index;
    visitStep.nodes[index].state = "visited";
    visitStep.visitOrder = [...visitOrder];
    steps.push(visitStep);
  };
  
  postOrder(0);
  
  return steps;
};

// Graph algorithms
export const createGraph = (
  nodes: { id: number; value: string | number; x: number; y: number }[],
  edges: { from: number; to: number; weight?: number }[]
): GraphStep => {
  const graphNodes = nodes.map(node => ({
    ...node,
    state: "default" as const
  }));
  
  const graphEdges = edges.map(edge => ({
    ...edge,
    state: "default" as const
  }));
  
  return { nodes: graphNodes, edges: graphEdges };
};

export const bfs = (startNodeId: number, graph: { nodes: any[], edges: any[] }): GraphStep[] => {
  const steps: GraphStep[] = [];
  
  // Create initial graph state
  const initialGraph = createGraph(graph.nodes, graph.edges);
  steps.push(JSON.parse(JSON.stringify(initialGraph)));
  
  // BFS implementation
  const visited: boolean[] = Array(graph.nodes.length).fill(false);
  const queue: number[] = [startNodeId];
  const visitOrder: number[] = [];
  
  visited[startNodeId] = true;
  
  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    visitOrder.push(nodeId);
    
    // Mark current node as visited
    const currentStep = JSON.parse(JSON.stringify(initialGraph)) as GraphStep;
    currentStep.nodes[nodeId].state = "visited";
    visitOrder.forEach((id, index) => {
      if (index < visitOrder.length - 1) {
        currentStep.nodes[id].state = "visited";
      }
    });
    currentStep.queue = [...queue];
    currentStep.visitOrder = [...visitOrder];
    steps.push(currentStep);
    
    // Find all adjacent vertices
    const adjacentEdges = graph.edges.filter(edge => edge.from === nodeId);
    
    for (const edge of adjacentEdges) {
      if (!visited[edge.to]) {
        visited[edge.to] = true;
        queue.push(edge.to);
        
        // Show exploring edge and adjacent node
        const exploreStep = JSON.parse(JSON.stringify(currentStep)) as GraphStep;
        exploreStep.nodes[edge.to].state = "comparing";
        exploreStep.edges.find(e => e.from === edge.from && e.to === edge.to)!.state = "traversing";
        exploreStep.queue = [...queue];
        steps.push(exploreStep);
      }
    }
  }
  
  return steps;
};

export const dfs = (startNodeId: number, graph: { nodes: any[], edges: any[] }): GraphStep[] => {
  const steps: GraphStep[] = [];
  
  // Create initial graph state
  const initialGraph = createGraph(graph.nodes, graph.edges);
  steps.push(JSON.parse(JSON.stringify(initialGraph)));
  
  // DFS implementation
  const visited: boolean[] = Array(graph.nodes.length).fill(false);
  const visitOrder: number[] = [];
  
  const dfsUtil = (nodeId: number, stack: number[]) => {
    visited[nodeId] = true;
    visitOrder.push(nodeId);
    
    // Mark current node as visited
    const currentStep = JSON.parse(JSON.stringify(initialGraph)) as GraphStep;
    currentStep.nodes[nodeId].state = "current";
    visitOrder.forEach((id, index) => {
      if (index < visitOrder.length - 1) {
        currentStep.nodes[id].state = "visited";
      }
    });
    currentStep.stack = [...stack];
    currentStep.visitOrder = [...visitOrder];
    steps.push(currentStep);
    
    // Find all adjacent vertices
    const adjacentEdges = graph.edges.filter(edge => edge.from === nodeId);
    
    for (const edge of adjacentEdges) {
      if (!visited[edge.to]) {
        // Show exploring edge and adjacent node
        const exploreStep = JSON.parse(JSON.stringify(currentStep)) as GraphStep;
        exploreStep.nodes[edge.to].state = "comparing";
        exploreStep.edges.find(e => e.from === edge.from && e.to === edge.to)!.state = "traversing";
        steps.push(exploreStep);
        
        dfsUtil(edge.to, [...stack, edge.to]);
      }
    }
    
    // Mark node as fully visited
    const completeStep = JSON.parse(JSON.stringify(initialGraph)) as GraphStep;
    completeStep.nodes[nodeId].state = "visited";
    visitOrder.forEach(id => {
      completeStep.nodes[id].state = "visited";
    });
    completeStep.visitOrder = [...visitOrder];
    steps.push(completeStep);
  };
  
  dfsUtil(startNodeId, [startNodeId]);
  
  return steps;
};
