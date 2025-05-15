
import React from "react";
import { useVisualizer } from "../contexts/VisualizerContext";
import ArrayVisualizer from "./visualizers/ArrayVisualizer";
import LinkedListVisualizer from "./visualizers/LinkedListVisualizer";
import StackQueueVisualizer from "./visualizers/StackQueueVisualizer";
import TreeVisualizer from "./visualizers/TreeVisualizer";
import GraphVisualizer from "./visualizers/GraphVisualizer";
import HeapVisualizer from "./visualizers/HeapVisualizer";
import MathVisualizer from "./visualizers/MathVisualizer";

interface VisualizerProps {
  dataStructure: string;
}

const VisualizerComponent: React.FC<VisualizerProps> = ({ dataStructure }) => {
  switch (dataStructure) {
    case "array":
      return <ArrayVisualizer />;
    case "linkedList":
      return <LinkedListVisualizer />;
    case "stack":
    case "queue":
      return <StackQueueVisualizer />;
    case "tree":
      return <TreeVisualizer />;
    case "graph":
      return <GraphVisualizer />;
    case "heap":
      return <HeapVisualizer />;
    case "math":
      return <MathVisualizer />;
    default:
      return <div>No visualizer available for this data structure</div>;
  }
};

const ArrayDisplay: React.FC = () => {
  const { dataStructure } = useVisualizer();

  return (
    <div className="bg-white dark:bg-algo-background-dark p-4 rounded-md shadow-md">
      <VisualizerComponent dataStructure={dataStructure} />
    </div>
  );
};

export default ArrayDisplay;
