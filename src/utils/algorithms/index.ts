
// Re-export all algorithms from their respective files
export * from './sortingAlgorithms';
export * from './linkedListAlgorithms';
export * from './stackQueueAlgorithms';
export * from './treeAlgorithms';
export * from './graphAlgorithms';
export * from './heapAlgorithms';
export * from './fundamentalAlgorithms';

// Export types from the main algorithms file
export type { 
  ElementState,
  ArrayElement,
  LinkedListNode,
  LinkedListStep,
  StackQueueStep,
  TreeNode,
  TreeStep,
  GraphNode,
  GraphEdge,
  GraphStep,
  HeapStep
} from '../algorithms';

// Define algorithm categories and types
export type AlgorithmCategory = 
  "array" | 
  "linkedList" |
  "stack" |
  "queue" |
  "tree" |
  "graph" |
  "heap" |
  "math";

export type AlgorithmType = 
  // Array algorithms
  "bubbleSort" | "selectionSort" | "insertionSort" |
  // Linked List algorithms
  "traverseLinkedList" | "insertAtBeginning" | "deleteNode" |
  // Stack algorithms
  "stackPush" | "stackPop" | "stackPeek" |
  // Queue algorithms
  "queueEnqueue" | "queueDequeue" | "queuePeek" |
  // Tree algorithms
  "inOrderTraversal" | "preOrderTraversal" | "postOrderTraversal" |
  // Graph algorithms
  "bfs" | "dfs" |
  // Heap algorithms
  "buildHeap" | "heapSort" |
  // Math algorithms
  "gcd" | "fibonacci" | "sieveOfEratosthenes" | "binaryExponentiation" | "primalityTest";

export interface AlgorithmInfo {
  id: AlgorithmType;
  name: string;
  category: AlgorithmCategory;
  description: string;
}

// List of all available algorithms with metadata
export const algorithms: AlgorithmInfo[] = [
  // Array algorithms
  {
    id: "bubbleSort",
    name: "Bubble Sort",
    category: "array",
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
  },
  {
    id: "selectionSort",
    name: "Selection Sort",
    category: "array",
    description: "A sorting algorithm that selects the smallest element from an unsorted list in each iteration and places it at the beginning."
  },
  {
    id: "insertionSort",
    name: "Insertion Sort",
    category: "array",
    description: "A sorting algorithm that builds the final sorted array one item at a time, similar to sorting playing cards in your hand."
  },
  // Linked List algorithms
  {
    id: "traverseLinkedList",
    name: "Traverse",
    category: "linkedList",
    description: "Visits each node in the linked list from head to tail."
  },
  {
    id: "insertAtBeginning",
    name: "Insert at Beginning",
    category: "linkedList",
    description: "Adds a new node at the beginning of the linked list."
  },
  {
    id: "deleteNode",
    name: "Delete Node",
    category: "linkedList",
    description: "Removes a node from the linked list."
  },
  // Stack algorithms
  {
    id: "stackPush",
    name: "Push",
    category: "stack",
    description: "Adds an element to the top of the stack."
  },
  {
    id: "stackPop",
    name: "Pop",
    category: "stack",
    description: "Removes the top element from the stack."
  },
  {
    id: "stackPeek",
    name: "Peek",
    category: "stack",
    description: "Views the top element without removing it."
  },
  // Queue algorithms
  {
    id: "queueEnqueue",
    name: "Enqueue",
    category: "queue",
    description: "Adds an element to the back of the queue."
  },
  {
    id: "queueDequeue",
    name: "Dequeue",
    category: "queue",
    description: "Removes an element from the front of the queue."
  },
  {
    id: "queuePeek",
    name: "Peek",
    category: "queue",
    description: "Views the front element without removing it."
  },
  // Tree algorithms
  {
    id: "inOrderTraversal",
    name: "In-Order Traversal",
    category: "tree",
    description: "Traverses the tree in the order: left subtree, root, right subtree."
  },
  {
    id: "preOrderTraversal",
    name: "Pre-Order Traversal",
    category: "tree",
    description: "Traverses the tree in the order: root, left subtree, right subtree."
  },
  {
    id: "postOrderTraversal",
    name: "Post-Order Traversal",
    category: "tree",
    description: "Traverses the tree in the order: left subtree, right subtree, root."
  },
  // Graph algorithms
  {
    id: "bfs",
    name: "Breadth-First Search",
    category: "graph",
    description: "Explores all vertices at the present depth before moving on to vertices at the next depth level."
  },
  {
    id: "dfs",
    name: "Depth-First Search",
    category: "graph",
    description: "Explores as far as possible along each branch before backtracking."
  },
  // Heap algorithms
  {
    id: "buildHeap",
    name: "Build Heap",
    category: "heap",
    description: "Converts an array into a binary heap data structure."
  },
  {
    id: "heapSort",
    name: "Heap Sort",
    category: "heap",
    description: "Sorts an array using a binary heap data structure."
  },
  // Math algorithms
  {
    id: "gcd",
    name: "Euclidean GCD",
    category: "math",
    description: "Computes the greatest common divisor of two integers."
  },
  {
    id: "fibonacci",
    name: "Fibonacci Numbers",
    category: "math",
    description: "Generates the Fibonacci sequence where each number is the sum of the two preceding ones."
  },
  {
    id: "sieveOfEratosthenes",
    name: "Sieve of Eratosthenes",
    category: "math",
    description: "An algorithm for finding all prime numbers up to a specified integer."
  },
  {
    id: "binaryExponentiation",
    name: "Binary Exponentiation",
    category: "math",
    description: "A fast algorithm for calculating large powers of numbers."
  },
  {
    id: "primalityTest",
    name: "Primality Test",
    category: "math",
    description: "Determines if a number is prime by checking if it's divisible by any smaller number."
  }
];

// Categorized algorithms for easier access
export const categorizedAlgorithms = algorithms.reduce<Record<AlgorithmCategory, AlgorithmInfo[]>>(
  (acc, algorithm) => {
    if (!acc[algorithm.category]) {
      acc[algorithm.category] = [];
    }
    acc[algorithm.category].push(algorithm);
    return acc;
  },
  { array: [], linkedList: [], stack: [], queue: [], tree: [], graph: [], heap: [], math: [] }
);
