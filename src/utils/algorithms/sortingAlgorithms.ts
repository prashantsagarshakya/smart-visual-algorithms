import { ArrayElement } from "../algorithms";

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
      state: index <= i ? "sorted" as const : "default"
    }));
    steps.push([...sortedElements]);
  }

  // Final sorted state
  const finalElements: ArrayElement[] = arr.map(value => ({ value, state: "sorted" as const }));
  steps.push([...finalElements]);

  return steps;
};
