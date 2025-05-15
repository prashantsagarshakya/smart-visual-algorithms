
import { ArrayElement } from "../algorithms";

export type HeapStep = {
  elements: ArrayElement[];
  currentIndex?: number;
  swapIndices?: [number, number];
  heapified?: boolean[];
};

// Helper function to convert array indices to heap indices (for visualization)
const getParentIndex = (i: number) => Math.floor((i - 1) / 2);
const getLeftChildIndex = (i: number) => 2 * i + 1;
const getRightChildIndex = (i: number) => 2 * i + 2;

export const createHeap = (values: number[]): HeapStep => {
  const elements = values.map(value => ({
    value,
    state: "default" as const
  }));
  
  return { elements };
};

export const heapify = (values: number[]): HeapStep[] => {
  const steps: HeapStep[] = [];
  const elements = values.map(value => ({
    value,
    state: "default" as const
  }));
  
  steps.push({ elements });
  
  const n = elements.length;
  const heapified = Array(n).fill(false);
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyDown(elements, i, n, steps, heapified);
  }
  
  // Mark all as heapified in final step
  const finalElements = elements.map(el => ({ 
    ...el, 
    state: "sorted" as const 
  }));
  
  steps.push({ 
    elements: finalElements,
    heapified: Array(n).fill(true)
  });
  
  return steps;
};

const heapifyDown = (
  elements: ArrayElement[],
  i: number,
  heapSize: number,
  steps: HeapStep[],
  heapified: boolean[]
) => {
  const currentStep = elements.map(el => ({ ...el }));
  currentStep[i].state = "current";
  
  steps.push({ 
    elements: currentStep,
    currentIndex: i,
    heapified: [...heapified]
  });
  
  let largest = i;
  const left = getLeftChildIndex(i);
  const right = getRightChildIndex(i);
  
  // Compare with left child
  if (left < heapSize) {
    const compareStep = elements.map(el => ({ ...el }));
    compareStep[i].state = "current";
    compareStep[left].state = "comparing";
    
    steps.push({ 
      elements: compareStep,
      currentIndex: i,
      heapified: [...heapified]
    });
    
    if (elements[left].value > elements[largest].value) {
      largest = left;
    }
  }
  
  // Compare with right child
  if (right < heapSize) {
    const compareStep = elements.map(el => ({ ...el }));
    compareStep[i].state = "current";
    compareStep[right].state = "comparing";
    if (largest !== i) {
      compareStep[largest].state = "comparing";
    }
    
    steps.push({ 
      elements: compareStep,
      currentIndex: i,
      heapified: [...heapified]
    });
    
    if (elements[right].value > elements[largest].value) {
      largest = right;
    }
  }
  
  // Swap if needed
  if (largest !== i) {
    const swapStep = elements.map(el => ({ ...el }));
    swapStep[i].state = "comparing";
    swapStep[largest].state = "comparing";
    
    steps.push({ 
      elements: swapStep,
      swapIndices: [i, largest],
      heapified: [...heapified]
    });
    
    // Perform swap
    const temp = elements[i];
    elements[i] = elements[largest];
    elements[largest] = temp;
    
    // Show after swap
    const afterSwapStep = elements.map(el => ({ ...el }));
    afterSwapStep[i].state = "comparing";
    afterSwapStep[largest].state = "current";
    
    steps.push({ 
      elements: afterSwapStep,
      currentIndex: largest,
      heapified: [...heapified]
    });
    
    // Continue heapifying
    heapifyDown(elements, largest, heapSize, steps, heapified);
  }
  
  // Mark as heapified
  heapified[i] = true;
  const heapifiedStep = elements.map(el => ({ ...el }));
  heapifiedStep[i].state = "sorted";
  
  steps.push({ 
    elements: heapifiedStep,
    heapified: [...heapified]
  });
};

export const heapSort = (values: number[]): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  const n = values.length;
  
  // Initial array
  const elements = values.map(value => ({
    value,
    state: "default" as const
  }));
  
  steps.push([...elements]);
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(elements, i, n, steps);
  }
  
  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    // Highlight root and last unsorted element
    const currentArray = elements.map((el, idx) => ({
      ...el,
      state: idx < i + 1 ? (idx === 0 || idx === i ? "comparing" : "default") : "sorted"
    }));
    steps.push([...currentArray]);
    
    // Swap root with last unsorted element
    const temp = elements[0];
    elements[0] = elements[i];
    elements[i] = temp;
    
    // Show after swap
    const afterSwapArray = elements.map((el, idx) => ({
      ...el,
      state: idx < i ? "default" : "sorted"
    }));
    steps.push([...afterSwapArray]);
    
    // Heapify reduced heap
    heapify(elements, 0, i, steps);
    
    // Mark the extracted element as sorted
    elements[i].state = "sorted";
  }
  
  // Mark all as sorted in final step
  elements[0].state = "sorted";
  steps.push([...elements]);
  
  return steps;
};

function heapify(
  elements: ArrayElement[],
  i: number,
  heapSize: number,
  steps: ArrayElement[][]
) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  // Compare with left child
  if (left < heapSize) {
    const compareArray = elements.map((el, idx) => ({
      ...el,
      state: idx === i || idx === left ? "comparing" : el.state
    }));
    steps.push([...compareArray]);
    
    if (elements[left].value > elements[largest].value) {
      largest = left;
    }
  }
  
  // Compare with right child
  if (right < heapSize) {
    const compareArray = elements.map((el, idx) => ({
      ...el,
      state: idx === i || idx === right || idx === largest ? "comparing" : el.state
    }));
    steps.push([...compareArray]);
    
    if (elements[right].value > elements[largest].value) {
      largest = right;
    }
  }
  
  // Swap if needed
  if (largest !== i) {
    const temp = elements[i];
    elements[i] = elements[largest];
    elements[largest] = temp;
    
    const swappedArray = elements.map((el, idx) => ({
      ...el,
      state: idx === i || idx === largest ? "comparing" : el.state
    }));
    steps.push([...swappedArray]);
    
    heapify(elements, largest, heapSize, steps);
  }
}
