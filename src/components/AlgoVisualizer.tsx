
import React from "react";
import { VisualizerProvider } from "../contexts/VisualizerContext";
import ArrayDisplay from "./ArrayDisplay";
import ControlPanel from "./ControlPanel";
import CodeDisplay from "./CodeDisplay";
import InfoPanel from "./InfoPanel";
import { ThemeToggle } from "./ThemeToggle";

const AlgoVisualizer: React.FC = () => {
  return (
    <VisualizerProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">
            Data Structure & Algorithm Visualizer
          </h1>
          <ThemeToggle />
        </div>
        
        <div className="mb-8">
          <ControlPanel />
        </div>
        
        <div className="mb-8">
          <ArrayDisplay />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CodeDisplay />
          <InfoPanel />
        </div>
      </div>
    </VisualizerProvider>
  );
};

export default AlgoVisualizer;
