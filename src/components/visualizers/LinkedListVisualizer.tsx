
import React from "react";
import { useVisualizer } from "../../contexts/VisualizerContext";
import { LinkedListStep } from "../../utils/algorithms";

const LinkedListVisualizer: React.FC = () => {
  const { steps, currentStep } = useVisualizer();
  
  if (!steps[currentStep] || !(steps[currentStep] as LinkedListStep).nodes) {
    return (
      <div className="flex items-center justify-center h-64 p-4">
        <p className="text-gray-500">No linked list data available</p>
      </div>
    );
  }
  
  const linkedList = steps[currentStep] as LinkedListStep;
  const nodeSize = 40;
  const pointerLength = 60;
  const totalWidth = linkedList.nodes.length * (nodeSize + pointerLength);
  
  return (
    <div className="flex items-center justify-center h-64 p-4 overflow-x-auto">
      <div 
        className="flex items-center" 
        style={{ 
          width: Math.max(300, totalWidth), 
          padding: "0 20px" 
        }}
      >
        {linkedList.nodes.map((node, index) => {
          // Determine node styling based on state
          let nodeStyle = "border-gray-300 bg-white";
          if (node.state === "head") nodeStyle = "border-blue-500 bg-blue-100";
          else if (node.state === "tail") nodeStyle = "border-green-500 bg-green-100";
          else if (node.state === "current") nodeStyle = "border-yellow-500 bg-yellow-100";
          else if (node.state === "visited") nodeStyle = "border-purple-500 bg-purple-100";
          else if (node.state === "comparing") nodeStyle = "border-red-500 bg-red-100";
          
          const isLast = node.next === null;
          
          return (
            <React.Fragment key={index}>
              {/* Node */}
              <div 
                className={`flex items-center justify-center border-2 ${nodeStyle} rounded-full h-10 w-10 relative transition-all duration-200`}
              >
                <span className="text-sm">{node.value}</span>
                
                {/* Labels */}
                {node.state === "head" && (
                  <div className="absolute -top-6 text-xs font-bold text-blue-500">HEAD</div>
                )}
                {node.state === "tail" && (
                  <div className="absolute -top-6 text-xs font-bold text-green-500">TAIL</div>
                )}
                {linkedList.pointers && linkedList.pointers.current === index && (
                  <div className="absolute -bottom-6 text-xs font-bold text-yellow-500">CURRENT</div>
                )}
              </div>
              
              {/* Pointer arrow */}
              {!isLast && (
                <div className="flex items-center px-2">
                  <div className="h-0.5 bg-gray-400 flex-1"></div>
                  <div className="text-gray-400 px-1">→</div>
                </div>
              )}
              
              {/* NULL indicator for last node */}
              {isLast && (
                <div className="flex items-center px-2">
                  <div className="h-0.5 bg-gray-400 w-4"></div>
                  <div className="text-gray-500 text-xs border border-gray-300 rounded px-1">NULL</div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
