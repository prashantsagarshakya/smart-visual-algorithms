
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useVisualizer } from "../contexts/VisualizerContext";
import { PlayCircle, PauseCircle, RotateCcw, StepBack, StepForward, List, ListTree, TreePine, Calculator } from "lucide-react";
import { categorizedAlgorithms } from "../utils/algorithms/index";

const ControlPanel: React.FC = () => {
  const { 
    dataStructure,
    algorithm, 
    setAlgorithm,
    setDataStructure,
    speed, 
    setSpeed,
    isRunning,
    isPaused,
    startVisualization,
    pauseVisualization,
    resetVisualization,
    nextStep,
    previousStep,
    generateNewArray,
    generateNewLinkedList,
    generateNewTree,
    generateNewGraph,
    currentStep,
    totalSteps,
    array
  } = useVisualizer();

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0]);
  };

  const handleArraySizeChange = (value: number[]) => {
    generateNewArray(value[0]);
  };

  const handleDataStructureChange = (value: string) => {
    setDataStructure(value as any);
  };

  const getDataStructureIcon = () => {
    switch(dataStructure) {
      case "array": return <List className="mr-2 h-4 w-4" />;
      case "linkedList": return <List className="mr-2 h-4 w-4" />;
      case "stack": return <List className="mr-2 h-4 w-4" />;
      case "queue": return <List className="mr-2 h-4 w-4" />;
      case "tree": return <TreePine className="mr-2 h-4 w-4" />;
      case "graph": return <ListTree className="mr-2 h-4 w-4" />;
      case "heap": return <TreePine className="mr-2 h-4 w-4" />;
      case "math": return <Calculator className="mr-2 h-4 w-4" />;
      default: return null;
    }
  };

  const generateNewDataStructure = () => {
    switch(dataStructure) {
      case "array":
        generateNewArray();
        break;
      case "linkedList":
        generateNewLinkedList();
        break;
      case "stack":
      case "queue":
        generateNewArray(5); // Use smaller size for stack/queue
        break;
      case "tree":
        generateNewTree();
        break;
      case "graph":
        generateNewGraph();
        break;
      case "heap":
        generateNewArray();
        break;
      case "math":
        generateNewArray(2); // For math algorithms that use small samples
        break;
    }
  };

  return (
    <div className="bg-white dark:bg-algo-background-dark p-4 rounded-md shadow-md mb-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={isRunning && !isPaused ? "secondary" : "default"}
            onClick={startVisualization}
            disabled={isRunning && !isPaused && currentStep >= totalSteps}
          >
            <PlayCircle className="mr-1 h-4 w-4" />
            {isRunning && !isPaused ? "Playing" : "Start"}
          </Button>
          
          <Button
            variant="outline"
            onClick={pauseVisualization}
            disabled={!isRunning || isPaused || currentStep >= totalSteps}
          >
            <PauseCircle className="mr-1 h-4 w-4" />
            Pause
          </Button>
          
          <Button
            variant="outline"
            onClick={resetVisualization}
            disabled={currentStep === 0 && !isRunning}
          >
            <RotateCcw className="mr-1 h-4 w-4" />
            Reset
          </Button>
          
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStep <= 0 || (isRunning && !isPaused)}
          >
            <StepBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            onClick={nextStep}
            disabled={currentStep >= totalSteps || (isRunning && !isPaused)}
          >
            <StepForward className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-48">
            <p className="text-sm mb-1 dark:text-gray-300">Data Structure</p>
            <Select 
              value={dataStructure} 
              onValueChange={handleDataStructureChange}
              disabled={isRunning}
            >
              <SelectTrigger>
                <div className="flex items-center">
                  {getDataStructureIcon()}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="array">Array</SelectItem>
                <SelectItem value="linkedList">Linked List</SelectItem>
                <SelectItem value="stack">Stack</SelectItem>
                <SelectItem value="queue">Queue</SelectItem>
                <SelectItem value="tree">Tree</SelectItem>
                <SelectItem value="graph">Graph</SelectItem>
                <SelectItem value="heap">Heap</SelectItem>
                <SelectItem value="math">Math</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-48">
            <p className="text-sm mb-1 dark:text-gray-300">Algorithm</p>
            <Select 
              value={algorithm} 
              onValueChange={(value) => setAlgorithm(value as any)}
              disabled={isRunning}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categorizedAlgorithms[dataStructure]?.map(algo => (
                  <SelectItem key={algo.id} value={algo.id}>{algo.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-48">
            <p className="text-sm mb-1 dark:text-gray-300">Speed: {speed}</p>
            <Slider
              value={[speed]}
              min={1}
              max={10}
              step={1}
              onValueChange={handleSpeedChange}
            />
          </div>
          
          <div className="w-full md:w-48">
            <Button variant="outline" onClick={generateNewDataStructure} disabled={isRunning && !isPaused}>
              Generate New {dataStructure === "array" ? "Array" : 
                          dataStructure === "linkedList" ? "Linked List" :
                          dataStructure === "stack" ? "Stack" :
                          dataStructure === "queue" ? "Queue" :
                          dataStructure === "tree" ? "Tree" :
                          dataStructure === "graph" ? "Graph" : 
                          dataStructure === "heap" ? "Heap" : "Data"}
            </Button>
          </div>
          
          {dataStructure === "array" && (
            <div className="w-full md:w-48">
              <p className="text-sm mb-1 dark:text-gray-300">Array Size</p>
              <Slider
                value={[array.length]}
                min={5}
                max={100}
                step={5}
                onValueChange={handleArraySizeChange}
                disabled={isRunning && !isPaused}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default ControlPanel;
