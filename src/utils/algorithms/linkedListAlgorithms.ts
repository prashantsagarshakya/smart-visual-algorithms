
type LinkedListNode = {
  value: number;
  state: "default" | "comparing" | "visited" | "current" | "head" | "tail";
  next: number | null; // Index of the next node or null if none
};

type LinkedListStep = {
  nodes: LinkedListNode[];
  pointers: { [key: string]: number | null }; // For keeping track of pointers like current, prev, etc.
};

// Helper to create a deep copy of the linked list state
const createLinkedListSnapshot = (step: LinkedListStep): LinkedListStep => {
  return {
    nodes: step.nodes.map(node => ({ ...node })),
    pointers: { ...step.pointers }
  };
};

// Create a linked list from an array
export const createLinkedList = (values: number[]): LinkedListStep => {
  const nodes: LinkedListNode[] = values.map((value, index) => ({
    value,
    state: index === 0 ? "head" : (index === values.length - 1 ? "tail" : "default"),
    next: index < values.length - 1 ? index + 1 : null
  }));

  return {
    nodes,
    pointers: { head: 0, current: null, prev: null }
  };
};

// Traversal algorithm
export const traverseLinkedList = (values: number[]): LinkedListStep[] => {
  const steps: LinkedListStep[] = [];
  const initialList = createLinkedList(values);
  
  steps.push(createLinkedListSnapshot(initialList));
  
  let currentList = createLinkedListSnapshot(initialList);
  let currentNodeIndex = 0;
  
  while (currentNodeIndex !== null) {
    // Mark current node
    currentList.pointers.current = currentNodeIndex;
    currentList.nodes[currentNodeIndex].state = "current";
    steps.push(createLinkedListSnapshot(currentList));
    
    // Move to next node
    const nextNodeIndex = currentList.nodes[currentNodeIndex].next;
    if (currentNodeIndex !== 0 && currentNodeIndex !== currentList.nodes.length - 1) {
      currentList.nodes[currentNodeIndex].state = "visited";
    }
    
    currentNodeIndex = nextNodeIndex;
    steps.push(createLinkedListSnapshot(currentList));
  }
  
  // Reset states for the final step
  currentList.pointers.current = null;
  currentList.nodes = currentList.nodes.map((node, index) => ({
    ...node,
    state: index === 0 ? "head" : (index === currentList.nodes.length - 1 ? "tail" : "default")
  }));
  steps.push(createLinkedListSnapshot(currentList));
  
  return steps;
};

// Insert at beginning
export const insertAtBeginning = (values: number[], newValue: number): LinkedListStep[] => {
  const steps: LinkedListStep[] = [];
  const initialList = createLinkedList(values);
  
  steps.push(createLinkedListSnapshot(initialList));
  
  let currentList = createLinkedListSnapshot(initialList);
  
  // Create new node
  const newNode: LinkedListNode = {
    value: newValue,
    state: "current",
    next: 0
  };
  
  // Update existing nodes
  currentList.nodes = currentList.nodes.map(node => ({ ...node }));
  currentList.nodes[0].state = "default";
  
  // Insert new node at beginning
  currentList.nodes = [newNode, ...currentList.nodes];
  currentList.pointers.head = 0;
  steps.push(createLinkedListSnapshot(currentList));
  
  // Update states for the final step
  currentList.nodes[0].state = "head";
  steps.push(createLinkedListSnapshot(currentList));
  
  return steps;
};

// Delete node
export const deleteNode = (values: number[], indexToDelete: number): LinkedListStep[] => {
  const steps: LinkedListStep[] = [];
  const initialList = createLinkedList(values);
  
  steps.push(createLinkedListSnapshot(initialList));
  
  let currentList = createLinkedListSnapshot(initialList);
  
  // Mark node to delete
  currentList.nodes[indexToDelete].state = "current";
  steps.push(createLinkedListSnapshot(currentList));
  
  // If deleting head
  if (indexToDelete === 0) {
    // Make the next node the new head
    if (currentList.nodes.length > 1) {
      currentList.nodes = currentList.nodes.slice(1);
      currentList.nodes[0].state = "head";
      currentList.pointers.head = 0;
    } else {
      currentList.nodes = [];
      currentList.pointers.head = null;
    }
  } else {
    // Find previous node
    let prevIndex = 0;
    while (prevIndex !== null && currentList.nodes[prevIndex].next !== indexToDelete) {
      prevIndex = currentList.nodes[prevIndex].next;
    }
    
    // Update previous node's next pointer
    if (prevIndex !== null) {
      currentList.nodes[prevIndex].next = currentList.nodes[indexToDelete].next;
      currentList.nodes[prevIndex].state = "comparing";
      steps.push(createLinkedListSnapshot(currentList));
    }
    
    // Remove node
    currentList.nodes = currentList.nodes.filter((_, index) => index !== indexToDelete);
    
    // Update indices in next pointers
    currentList.nodes = currentList.nodes.map(node => ({
      ...node,
      next: node.next === null ? null : (node.next > indexToDelete ? node.next - 1 : node.next)
    }));
  }
  
  steps.push(createLinkedListSnapshot(currentList));
  
  // Reset states for the final step
  const lastIndex = currentList.nodes.length - 1;
  currentList.nodes = currentList.nodes.map((node, index) => ({
    ...node,
    state: index === 0 ? "head" : (index === lastIndex ? "tail" : "default")
  }));
  steps.push(createLinkedListSnapshot(currentList));
  
  return steps;
};

export type { LinkedListNode, LinkedListStep };
