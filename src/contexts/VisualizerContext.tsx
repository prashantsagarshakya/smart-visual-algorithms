
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { bubbleSort, insertionSort, selectionSort } from "../utils/algorithms";

type AlgorithmType = "bubbleSort" | "selectionSort" | "insertionSort";

type ArrayElement = {
  value: number;
  state: "default" | "comparing" | "sorted" | "current";
};

interface VisualizerContextType {
  array: ArrayElement[];
  algorithm: AlgorithmType;
  speed: number;
  isRunning: boolean;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  steps: ArrayElement[][];
  
  // Actions
  setAlgorithm: (algo: AlgorithmType) => void;
  setSpeed: (speed: number) => void;
  generateNewArray: (size?: number) => void;
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
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("bubbleSort");
  const [speed, setSpeed] = useState(5); // 1-10 scale
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [steps, setSteps] = useState<ArrayElement[][]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [arraySize, setArraySize] = useState(20);

  // Generate a new random array
  const generateNewArray = (size: number = arraySize) => {
    setArraySize(size);
    const newArray: ArrayElement[] = [];
    
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) + 5, // Values between 5-104
        state: "default"
      });
    }
    
    setArray(newArray);
    setSteps([newArray.map(item => ({ ...item }))]);
    setCurrentStep(0);
    setTotalSteps(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  // Initialize with a random array
  useEffect(() => {
    generateNewArray();
  }, []);

  // Run the selected algorithm and generate steps
  const runAlgorithm = () => {
    const arrayValues = array.map(item => item.value);
    let algorithmSteps: ArrayElement[][] = [];
    
    switch(algorithm) {
      case "bubbleSort":
        algorithmSteps = bubbleSort([...arrayValues]);
        break;
      case "insertionSort":
        algorithmSteps = insertionSort([...arrayValues]);
        break;
      case "selectionSort":
        algorithmSteps = selectionSort([...arrayValues]);
        break;
    }
    
    setSteps(algorithmSteps);
    setTotalSteps(algorithmSteps.length - 1);
    setCurrentStep(0);
    
    return algorithmSteps;
  };

  // Start the visualization
  const startVisualization = () => {
    if (isRunning && isPaused) {
      setIsPaused(false);
      return;
    }
    
    if (!isRunning) {
      const algorithmSteps = runAlgorithm();
      setIsRunning(true);
      setArray(algorithmSteps[0]);
      setCurrentStep(0);
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
      setArray(steps[0]);
    }
  };

  // Go to the next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      setArray(steps[nextStepIndex]);
    }
  };

  // Go to the previous step
  const previousStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      setArray(steps[prevStepIndex]);
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
        array,
        algorithm,
        speed,
        isRunning,
        isPaused,
        currentStep,
        totalSteps,
        steps,
        setAlgorithm,
        setSpeed,
        generateNewArray,
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
