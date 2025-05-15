
import React from "react";
import { useVisualizer } from "../contexts/VisualizerContext";
import ArrayVisualizer from "./visualizers/ArrayVisualizer";
import LinkedListVisualizer from "./visualizers/LinkedListVisualizer";
import StackQueueVisualizer from "./visualizers/StackQueueVisualizer";
import TreeVisualizer from "./visualizers/TreeVisualizer";
import GraphVisualizer from "./visualizers/GraphVisualizer";
import HeapVisualizer from "./visualizers/HeapVisualizer";

const ArrayDisplay: React.FC = () => {
  const { dataStructure } = useVisualizer();
  
  return (
    <div className="bg-white dark:bg-algo-background-dark rounded-md shadow-md mb-4 overflow-hidden">
      {/* Render the appropriate visualizer based on the selected data structure */}
      {dataStructure === "array" && <ArrayVisualizer />}
      {dataStructure === "linkedList" && <LinkedListVisualizer />}
      {(dataStructure === "stack" || dataStructure === "queue") && <StackQueueVisualizer />}
      {dataStructure === "tree" && <TreeVisualizer />}
      {dataStructure === "graph" && <GraphVisualizer />}
      {dataStructure === "heap" && <HeapVisualizer />}
    </div>
  );
};

export default ArrayDisplay;
