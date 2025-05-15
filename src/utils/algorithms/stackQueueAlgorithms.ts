
type StackQueueElement = {
  value: number;
  state: "default" | "active" | "new" | "removing";
};

// Common interface for stack and queue steps
type StackQueueStep = {
  elements: StackQueueElement[];
  type: "stack" | "queue";
  action: "initial" | "push" | "pop" | "peek" | "none";
};

// Helper to create a deep copy of the stack/queue state
const createStackQueueSnapshot = (step: StackQueueStep): StackQueueStep => {
  return {
    elements: step.elements.map(element => ({ ...element })),
    type: step.type,
    action: step.action
  };
};

// Create initial stack/queue
export const createStackQueue = (values: number[], type: "stack" | "queue"): StackQueueStep => {
  return {
    elements: values.map(value => ({
      value,
      state: "default"
    })),
    type,
    action: "initial"
  };
};

// Push operation
export const push = (values: number[], newValue: number, type: "stack" | "queue"): StackQueueStep[] => {
  const steps: StackQueueStep[] = [];
  const initialState = createStackQueue(values, type);
  
  steps.push(createStackQueueSnapshot(initialState));
  
  let currentState = createStackQueueSnapshot(initialState);
  currentState.action = "push";
  
  // Add new element
  const newElement: StackQueueElement = {
    value: newValue,
    state: "new"
  };
  
  currentState.elements = [...currentState.elements, newElement];
  steps.push(createStackQueueSnapshot(currentState));
  
  // Reset state for final step
  currentState.elements = currentState.elements.map(element => ({
    ...element,
    state: "default"
  }));
  currentState.action = "none";
  steps.push(createStackQueueSnapshot(currentState));
  
  return steps;
};

// Pop operation - different for stack and queue
export const pop = (values: number[], type: "stack" | "queue"): StackQueueStep[] => {
  const steps: StackQueueStep[] = [];
  const initialState = createStackQueue(values, type);
  
  steps.push(createStackQueueSnapshot(initialState));
  
  if (values.length === 0) {
    return steps;
  }
  
  let currentState = createStackQueueSnapshot(initialState);
  currentState.action = "pop";
  
  // Mark the element to be removed
  if (type === "stack") {
    // For stack, remove from the end (LIFO)
    const lastIndex = currentState.elements.length - 1;
    currentState.elements[lastIndex].state = "removing";
  } else {
    // For queue, remove from the beginning (FIFO)
    currentState.elements[0].state = "removing";
  }
  
  steps.push(createStackQueueSnapshot(currentState));
  
  // Remove the element
  if (type === "stack") {
    currentState.elements.pop();
  } else {
    currentState.elements.shift();
  }
  
  steps.push(createStackQueueSnapshot(currentState));
  
  // Reset state for final step
  currentState.elements = currentState.elements.map(element => ({
    ...element,
    state: "default"
  }));
  currentState.action = "none";
  steps.push(createStackQueueSnapshot(currentState));
  
  return steps;
};

// Peek operation - view top/front without removing
export const peek = (values: number[], type: "stack" | "queue"): StackQueueStep[] => {
  const steps: StackQueueStep[] = [];
  const initialState = createStackQueue(values, type);
  
  steps.push(createStackQueueSnapshot(initialState));
  
  if (values.length === 0) {
    return steps;
  }
  
  let currentState = createStackQueueSnapshot(initialState);
  currentState.action = "peek";
  
  // Mark the element to peek at
  if (type === "stack") {
    // For stack, peek at the end
    const lastIndex = currentState.elements.length - 1;
    currentState.elements[lastIndex].state = "active";
  } else {
    // For queue, peek at the beginning
    currentState.elements[0].state = "active";
  }
  
  steps.push(createStackQueueSnapshot(currentState));
  
  // Reset state for final step
  currentState.elements = currentState.elements.map(element => ({
    ...element,
    state: "default"
  }));
  currentState.action = "none";
  steps.push(createStackQueueSnapshot(currentState));
  
  return steps;
};

export type { StackQueueElement, StackQueueStep };
