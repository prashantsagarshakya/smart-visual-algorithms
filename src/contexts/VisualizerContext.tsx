import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as algorithms from "../utils/algorithms";
import { toast } from "@/hooks/use-toast";

// Types for all visualizable data structures
export type DataStructureType = "array" | "linkedList" | "stack" | "queue" | "tree" | "graph" | "heap";

// Import all the algorithm types from our algorithms module
import { 
  ArrayElement, 
  LinkedListStep, 
  StackQueueStep, 
  TreeStep, 
  GraphStep,
  AlgorithmType,
  AlgorithmCategory,
  HeapStep
} from "../utils/algorithms";

// Union type for all possible visualization steps
type VisualizationStep = ArrayElement[] | LinkedListStep | StackQueueStep | TreeStep | GraphStep | HeapStep;

interface VisualizerContextType {
  // Current state
  dataStructure: DataStructureType;
  algorithm: AlgorithmType;
  speed: number;
  isRunning: boolean;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  
  // Array-specific properties
  array: ArrayElement[];
  
  // All steps for visualization
  steps: VisualizationStep[];
  
  // Raw data - used for initialization
  rawArrayData: number[];
  rawLinkedListData: number[];
  rawTreeData: number[];
  rawGraphData: {
    nodes: { id: number; value: string | number; x: number; y: number }[];
    edges: { from: number; to: number; weight?: number }[];
  };
  
  // Actions
  setDataStructure: (ds: DataStructureType) => void;
  setAlgorithm: (algo: AlgorithmType) => void;
  setSpeed: (speed: number) => void;
  generateNewArray: (size?: number) => void;
  generateNewLinkedList: (size?: number) => void;
  generateNewTree: (size?: number) => void;
  generateNewGraph: (nodeCount?: number, edgeCount?: number) => void;
  startVisualization: () => void;
  pauseVisualization: () => void;
  resetVisualization: () => void;
  nextStep: () => void;
  previousStep: () => void;
}

const VisualizerContext = createContext<VisualizerContextType | undefined>(undefined);

export const useVisualizer = (): VisualizerContextType => {
  const context = useContext(VisualizerContext);
  if (context === undefined) {
    throw new Error("useVisualizer must be used within a VisualizerProvider");
  }
  return context;
};

interface VisualizerProviderProps {
  children: ReactNode;
}

export const VisualizerProvider = ({ children }: VisualizerProviderProps) => {
  // State for common properties
  const [dataStructure, setDataStructure] = useState<DataStructureType>("array");
  const [algorithm, setAlgorithmState] = useState<AlgorithmType>("bubbleSort");
  const [speed, setSpeed] = useState(5); // 1-10 scale
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  
  // Data structure specific states
  // Array
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [arraySize, setArraySize] = useState(20);
  const [rawArrayData, setRawArrayData] = useState<number[]>([]);
  
  // Linked List
  const [linkedListSize, setLinkedListSize] = useState(8);
  const [rawLinkedListData, setRawLinkedListData] = useState<number[]>([]);
  
  // Tree
  const [treeSize, setTreeSize] = useState(7); // Perfect binary tree with 7 nodes
  const [rawTreeData, setRawTreeData] = useState<number[]>([]);
  
  // Graph
  const [rawGraphData, setRawGraphData] = useState<{
    nodes: { id: number; value: string | number; x: number; y: number }[];
    edges: { from: number; to: number; weight?: number }[];
  }>({
    nodes: [],
    edges: []
  });

  // Effect to set algorithm based on data structure
  useEffect(() => {
    // When data structure changes, set default algorithm for that structure
    switch(dataStructure) {
      case "array":
        setAlgorithmState("bubbleSort");
        break;
      case "linkedList":
        setAlgorithmState("traverseLinkedList");
        break;
      case "stack":
        setAlgorithmState("stackPush");
        break;
      case "queue":
        setAlgorithmState("queueEnqueue");
        break;
      case "tree":
        setAlgorithmState("inOrderTraversal");
        break;
      case "graph":
        setAlgorithmState("bfs");
        break;
      case "heap":
        setAlgorithmState("buildHeap");
        break;
    }
  }, [dataStructure]);

  // Initialize with random data
  useEffect(() => {
    generateNewArray();
    generateNewLinkedList();
    generateNewTree();
    generateNewGraph();
  }, []);

  // Function to set algorithm with type safety
  const setAlgorithm = (algo: AlgorithmType) => {
    // Check if algorithm belongs to current data structure
    const algoInfo = algorithms.algorithms.find(a => a.id === algo);
    
    if (algoInfo && algoInfo.category !== dataStructure) {
      // Switch data structure if needed
      setDataStructure(algoInfo.category as DataStructureType);
    }
    
    setAlgorithmState(algo);
  };

  // Generate a new random array
  const generateNewArray = (size: number = arraySize) => {
    setArraySize(size);
    const newRawData: number[] = [];
    
    for (let i = 0; i < size; i++) {
      newRawData.push(Math.floor(Math.random() * 100) + 5); // Values between 5-104
    }
    
    setRawArrayData(newRawData);
    
    const newArray: ArrayElement[] = newRawData.map(value => ({
      value,
      state: "default"
    }));
    
    setArray(newArray);
    setSteps([newArray]);
    setCurrentStep(0);
    setTotalSteps(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  // Generate a new random linked list
  const generateNewLinkedList = (size: number = linkedListSize) => {
    setLinkedListSize(size);
    const newRawData: number[] = [];
    
    for (let i = 0; i < size; i++) {
      newRawData.push(Math.floor(Math.random() * 100) + 5); // Values between 5-104
    }
    
    setRawLinkedListData(newRawData);
    
    if (dataStructure === "linkedList") {
      const initialList = algorithms.createLinkedList(newRawData);
      setSteps([initialList]);
      setCurrentStep(0);
      setTotalSteps(0);
      setIsRunning(false);
      setIsPaused(false);
    }
  };

  // Generate a new random binary tree
  const generateNewTree = (size: number = treeSize) => {
    setTreeSize(size);
    const newRawData: number[] = [];
    
    for (let i = 0; i < size; i++) {
      newRawData.push(Math.floor(Math.random() * 100) + 5); // Values between 5-104
    }
    
    setRawTreeData(newRawData);
    
    if (dataStructure === "tree") {
      const initialTree = algorithms.createBinaryTree(newRawData);
      setSteps([initialTree]);
      setCurrentStep(0);
      setTotalSteps(0);
      setIsRunning(false);
      setIsPaused(false);
    }
  };

  // Generate a new random graph
  const generateNewGraph = (nodeCount: number = 6, edgeCount: number = 8) => {
    // Create nodes in a circular layout
    const nodes = Array.from({ length: nodeCount }, (_, i) => {
      const angle = (2 * Math.PI * i) / nodeCount;
      const radius = 150;
      return {
        id: i,
        value: String.fromCharCode(65 + i), // A, B, C, ...
        x: Math.cos(angle) * radius + 200, // Center at (200, 200)
        y: Math.sin(angle) * radius + 200
      };
    });
    
    // Generate random edges (avoiding self-loops and duplicates)
    const edges = [];
    const edgeSet = new Set<string>();
    
    while (edges.length < edgeCount && edges.length < nodeCount * (nodeCount - 1)) {
      const from = Math.floor(Math.random() * nodeCount);
      const to = Math.floor(Math.random() * nodeCount);
      
      // Skip self-loops and duplicates
      if (from !== to && !edgeSet.has(`${from}-${to}`)) {
        edges.push({ from, to, weight: Math.floor(Math.random() * 10) + 1 });
        edgeSet.add(`${from}-${to}`);
      }
    }
    
    setRawGraphData({ nodes, edges });
    
    if (dataStructure === "graph") {
      const initialGraph = algorithms.createGraph(nodes, edges);
      setSteps([initialGraph]);
      setCurrentStep(0);
      setTotalSteps(0);
      setIsRunning(false);
      setIsPaused(false);
    }
  };

  // Run the selected algorithm and generate steps
  const runAlgorithm = () => {
    let algorithmSteps: any[] = [];
    
    try {
      switch(algorithm) {
        // Array algorithms
        case "bubbleSort":
          algorithmSteps = algorithms.bubbleSort([...rawArrayData]);
          break;
        case "insertionSort":
          algorithmSteps = algorithms.insertionSort([...rawArrayData]);
          break;
        case "selectionSort":
          algorithmSteps = algorithms.selectionSort([...rawArrayData]);
          break;
        
        // Linked List algorithms
        case "traverseLinkedList":
          algorithmSteps = algorithms.traverseLinkedList([...rawLinkedListData]);
          break;
        case "insertAtBeginning":
          algorithmSteps = algorithms.insertAtBeginning([...rawLinkedListData], Math.floor(Math.random() * 100) + 1);
          break;
        case "deleteNode":
          const deleteIndex = Math.floor(Math.random() * rawLinkedListData.length);
          algorithmSteps = algorithms.deleteNode([...rawLinkedListData], deleteIndex);
          break;
        
        // Stack algorithms
        case "stackPush":
          algorithmSteps = algorithms.push([...rawArrayData.slice(0, 5)], Math.floor(Math.random() * 100) + 1, "stack");
          break;
        case "stackPop":
          algorithmSteps = algorithms.pop([...rawArrayData.slice(0, 5)], "stack");
          break;
        case "stackPeek":
          algorithmSteps = algorithms.peek([...rawArrayData.slice(0, 5)], "stack");
          break;
        
        // Queue algorithms
        case "queueEnqueue":
          algorithmSteps = algorithms.push([...rawArrayData.slice(0, 5)], Math.floor(Math.random() * 100) + 1, "queue");
          break;
        case "queueDequeue":
          algorithmSteps = algorithms.pop([...rawArrayData.slice(0, 5)], "queue");
          break;
        case "queuePeek":
          algorithmSteps = algorithms.peek([...rawArrayData.slice(0, 5)], "queue");
          break;
        
        // Tree algorithms
        case "inOrderTraversal":
          algorithmSteps = algorithms.inOrderTraversal([...rawTreeData]);
          break;
        case "preOrderTraversal":
          algorithmSteps = algorithms.preOrderTraversal([...rawTreeData]);
          break;
        case "postOrderTraversal":
          algorithmSteps = algorithms.postOrderTraversal([...rawTreeData]);
          break;
        
        // Graph algorithms
        case "bfs":
          algorithmSteps = algorithms.bfs(0, rawGraphData);
          break;
        case "dfs":
          algorithmSteps = algorithms.dfs(0, rawGraphData);
          break;
          
        // Heap algorithms
        case "buildHeap":
          algorithmSteps = algorithms.buildHeap([...rawArrayData]);
          break;
        case "heapSort":
          algorithmSteps = algorithms.heapSort([...rawArrayData]);
          break;
      }
      
      setSteps(algorithmSteps);
      setTotalSteps(algorithmSteps.length - 1);
      setCurrentStep(0);
      
      return algorithmSteps;
    } catch (error) {
      toast({
        title: "Algorithm Error",
        description: `Error executing algorithm: ${(error as Error).message}`,
        variant: "destructive"
      });
      console.error("Algorithm error:", error);
      return [];
    }
  };

  // Start the visualization
  const startVisualization = () => {
    if (isRunning && isPaused) {
      setIsPaused(false);
      return;
    }
    
    if (!isRunning) {
      const algorithmSteps = runAlgorithm();
      if (algorithmSteps.length > 0) {
        setIsRunning(true);
        
        // Update the current view based on data structure
        if (dataStructure === "array" && Array.isArray(algorithmSteps[0])) {
          setArray(algorithmSteps[0] as ArrayElement[]);
        }
        
        setCurrentStep(0);
      }
    }
  };

  // Pause the visualization
  const pauseVisualization = () => {
    setIsPaused(true);
  };

  // Reset the visualization
  const resetVisualization = () => {
    setCurrentStep(0);
    setIsRunning(false);
    setIsPaused(false);
    
    if (steps.length > 0) {
      // Update the current view based on data structure
      if (dataStructure === "array" && Array.isArray(steps[0])) {
        setArray(steps[0] as ArrayElement[]);
      }
    }
  };

  // Go to the next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      
      // Update the current view based on data structure
      if (dataStructure === "array" && Array.isArray(steps[nextStepIndex])) {
        setArray(steps[nextStepIndex] as ArrayElement[]);
      }
    }
  };

  // Go to the previous step
  const previousStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      
      // Update the current view based on data structure
      if (dataStructure === "array" && Array.isArray(steps[prevStepIndex])) {
        setArray(steps[prevStepIndex] as ArrayElement[]);
      }
    }
  };

  // Auto-play animation when running and not paused
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        if (currentStep < totalSteps) {
          nextStep();
        } else {
          setIsRunning(false);
          clearInterval(interval);
        }
      }, 1100 - speed * 100); // Speed from 100ms to 1000ms
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, currentStep, totalSteps, speed, steps]);

  return (
    <VisualizerContext.Provider
      value={{
        // State
        dataStructure,
        algorithm,
        speed,
        isRunning,
        isPaused,
        currentStep,
        totalSteps,
        steps,
        array,
        rawArrayData,
        rawLinkedListData,
        rawTreeData,
        rawGraphData,
        
        // Actions
        setDataStructure,
        setAlgorithm,
        setSpeed,
        generateNewArray,
        generateNewLinkedList,
        generateNewTree,
        generateNewGraph,
        startVisualization,
        pauseVisualization,
        resetVisualization,
        nextStep,
        previousStep
      }}
    >
      {children}
    </VisualizerContext.Provider>
  );
};

export type { AlgorithmType, AlgorithmCategory };
