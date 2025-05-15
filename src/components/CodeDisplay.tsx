
import React from "react";
import { useVisualizer } from "../contexts/VisualizerContext";

const CodeDisplay: React.FC = () => {
  const { algorithm } = useVisualizer();

  const getAlgorithmCode = () => {
    switch (algorithm) {
      case "bubbleSort":
        return `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j+1]) {
        // Swap if they are in wrong order
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  
  return arr;
}`;

      case "selectionSort":
        return `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap the found minimum element with first element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}`;

      case "insertionSort":
        return `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    // Element to be inserted
    let current = arr[i];
    let j = i - 1;
    
    // Move elements greater than current
    // to one position ahead
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert current at correct position
    arr[j + 1] = current;
  }
  
  return arr;
}`;

      default:
        return "// Select an algorithm to view code";
    }
  };

  return (
    <div className="bg-white dark:bg-algo-background-dark p-4 rounded-md shadow-md">
      <h3 className="text-lg font-medium mb-2 dark:text-white">Algorithm Code</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
        <code className="text-sm text-gray-800 dark:text-gray-200">
          {getAlgorithmCode()}
        </code>
      </pre>
    </div>
  );
};

export default CodeDisplay;
