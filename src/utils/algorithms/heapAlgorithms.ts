
import { ArrayElement, ElementState, HeapStep } from "../algorithms";

// Create a max heap from an array
export const buildHeap = (arr: number[]): HeapStep[] => {
  const steps: HeapStep[] = [];
  const n = arr.length;
  const heapArray: ArrayElement[] = arr.map(value => ({ value, state: "default" as ElementState }));
  const heapified: boolean[] = new Array(n).fill(false);
  
  // Initial state
  steps.push({ 
    elements: [...heapArray],
    heapified: [...heapified]
  });
  
  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    // Current node being heapified state
    const currentElements = heapArray.map((el, index) => ({
      value: el.value,
      state: index === i ? "current" as ElementState : el.state
    }));
    
    steps.push({
      elements: [...currentElements],
      currentIndex: i,
      heapified: [...heapified]
    });
    
    // Heapify down
    heapifyDown(heapArray, i, n, steps, heapified);
  }

  // Mark all as heapified/sorted
  for (let i = 0; i < n; i++) {
    heapified[i] = true;
  }
  
  const finalElements = heapArray.map(el => ({
    value: el.value,
    state: "sorted" as ElementState
  }));
  
  steps.push({
    elements: [...finalElements],
    heapified: [...heapified]
  });
  
  return steps;
};

// Perform heapify down operation
const heapifyDown = (
  arr: ArrayElement[],
  i: number,
  n: number,
  steps: HeapStep[],
  heapified: boolean[]
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  // Compare with children
  if (left < n) {
    const comparingElements = arr.map((el, index) => ({
      value: el.value,
      state: index === i || index === left ? "comparing" as ElementState : el.state
    }));
    
    steps.push({
      elements: [...comparingElements],
      currentIndex: i,
      heapified: [...heapified]
    });
    
    if (arr[left].value > arr[largest].value) {
      largest = left;
    }
  }
  
  if (right < n) {
    const comparingElements = arr.map((el, index) => ({
      value: el.value,
      state: index === largest || index === right ? "comparing" as ElementState : el.state
    }));
    
    steps.push({
      elements: [...comparingElements],
      currentIndex: i,
      heapified: [...heapified]
    });
    
    if (arr[right].value > arr[largest].value) {
      largest = right;
    }
  }
  
  // Swap and continue heapifying if needed
  if (largest !== i) {
    // Swap visualization
    const swappingElements = arr.map((el, index) => ({
      value: el.value,
      state: index === i || index === largest ? "current" as ElementState : el.state
    }));
    
    steps.push({
      elements: [...swappingElements],
      swapIndices: [i, largest] as [number, number],
      currentIndex: i,
      heapified: [...heapified]
    });
    
    // Perform the actual swap
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // After swap state
    const afterSwapElements = arr.map((el, index) => ({
      value: el.value,
      state: "default" as ElementState
    }));
    
    steps.push({
      elements: [...afterSwapElements],
      currentIndex: largest,
      heapified: [...heapified]
    });
    
    // Recursively heapify the affected subtree
    heapifyDown(arr, largest, n, steps, heapified);
  } else {
    // Mark current node as heapified
    heapified[i] = true;
    
    // Show heapified state
    const heapifiedElements = arr.map((el, index) => ({
      value: el.value,
      state: heapified[index] ? "sorted" as ElementState : "default" as ElementState
    }));
    
    steps.push({
      elements: [...heapifiedElements],
      heapified: [...heapified]
    });
  }
};

// Perform heap sort
export const heapSort = (arr: number[]): HeapStep[] => {
  const steps: HeapStep[] = [];
  const n = arr.length;
  const heapArray: ArrayElement[] = arr.map(value => ({ value, state: "default" as ElementState }));
  const heapified: boolean[] = new Array(n).fill(false);
  
  // Initial state
  steps.push({
    elements: [...heapArray],
    heapified: [...heapified]
  });
  
  // Build heap (max heap)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyDown(heapArray, i, n, steps, heapified);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Current state (root is the max element)
    const currentElements = heapArray.map((el, index) => ({
      value: el.value,
      state: index === 0 || index === i ? "comparing" as ElementState : el.state
    }));
    
    steps.push({
      elements: [...currentElements],
      heapified: [...heapified]
    });
    
    // Swap root (max element) with the end
    [heapArray[0], heapArray[i]] = [heapArray[i], heapArray[0]];
    
    // Show swap
    const swappedElements = heapArray.map((el, index) => ({
      value: el.value,
      state: index === 0 || index === i ? "current" as ElementState : el.state
    }));
    
    steps.push({
      elements: [...swappedElements],
      swapIndices: [0, i] as [number, number],
      heapified: [...heapified]
    });
    
    // Mark current position as sorted
    heapified[i] = true;
    
    // Update visualization with the sorted element
    const sortingElements = heapArray.map((el, index) => ({
      value: el.value,
      state: heapified[index] ? "sorted" as ElementState : "default" as ElementState
    }));
    
    steps.push({
      elements: [...sortingElements],
      heapified: [...heapified]
    });
    
    // Call heapify on reduced heap
    heapifySubtree(heapArray, 0, i, steps, heapified);
  }
  
  // Mark the first element as sorted too
  heapified[0] = true;
  
  // Final state with all elements sorted
  const finalElements = heapArray.map(el => ({
    value: el.value,
    state: "sorted" as ElementState
  }));
  
  steps.push({
    elements: [...finalElements],
    heapified: [...heapified]
  });
  
  return steps;
};

// Helper function for heap sort (similar to heapifyDown but with different naming)
const heapifySubtree = (
  arr: ArrayElement[],
  i: number,
  n: number,
  steps: HeapStep[],
  heapified: boolean[]
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  // Compare with children
  if (left < n) {
    const comparingElements = arr.map((el, index) => ({
      value: el.value,
      state: index === i || index === left ? "comparing" as ElementState : 
             heapified[index] ? "sorted" as ElementState : "default" as ElementState
    }));
    
    steps.push({
      elements: [...comparingElements],
      currentIndex: i,
      heapified: [...heapified]
    });
    
    if (arr[left].value > arr[largest].value) {
      largest = left;
    }
  }
  
  if (right < n) {
    const comparingElements = arr.map((el, index) => ({
      value: el.value,
      state: index === largest || index === right ? "comparing" as ElementState : 
             heapified[index] ? "sorted" as ElementState : "default" as ElementState
    }));
    
    steps.push({
      elements: [...comparingElements],
      currentIndex: i,
      heapified: [...heapified]
    });
    
    if (arr[right].value > arr[largest].value) {
      largest = right;
    }
  }
  
  // Swap and continue heapifying if needed
  if (largest !== i) {
    // Swap visualization
    const swappingElements = arr.map((el, index) => ({
      value: el.value,
      state: index === i || index === largest ? "current" as ElementState : 
             heapified[index] ? "sorted" as ElementState : "default" as ElementState
    }));
    
    steps.push({
      elements: [...swappingElements],
      swapIndices: [i, largest] as [number, number],
      currentIndex: i,
      heapified: [...heapified]
    });
    
    // Perform the actual swap
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // After swap state
    const afterSwapElements = arr.map((el, index) => ({
      value: el.value,
      state: heapified[index] ? "sorted" as ElementState : "default" as ElementState
    }));
    
    steps.push({
      elements: [...afterSwapElements],
      currentIndex: largest,
      heapified: [...heapified]
    });
    
    // Recursively heapify the affected subtree
    heapifySubtree(arr, largest, n, steps, heapified);
  }
};
