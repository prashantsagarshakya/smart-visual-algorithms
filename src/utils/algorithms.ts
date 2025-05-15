
type ArrayElement = {
  value: number;
  state: "default" | "comparing" | "sorted" | "current";
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
      newArray[index].state = "sorted";
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
