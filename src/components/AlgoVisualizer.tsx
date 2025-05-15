
import React from "react";
import { VisualizerProvider } from "../contexts/VisualizerContext";
import ArrayDisplay from "./ArrayDisplay";
import ControlPanel from "./ControlPanel";
import CodeDisplay from "./CodeDisplay";
import InfoPanel from "./InfoPanel";

const AlgoVisualizer: React.FC = () => {
  return (
    <VisualizerProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Algorithm Visualizer
        </h1>
        
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
