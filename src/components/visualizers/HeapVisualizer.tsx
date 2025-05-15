
import React from "react";
import { useVisualizer } from "../../contexts/VisualizerContext";
import { ArrayElement } from "../../utils/algorithms";

const HeapVisualizer: React.FC = () => {
  const { steps, currentStep } = useVisualizer();
  
  if (!steps[currentStep]) {
    return (
      <div className="flex items-center justify-center h-64 p-4">
        <p className="text-gray-500">No heap data available</p>
      </div>
    );
  }
  
  const heapStep = steps[currentStep] as any;
  let elements: ArrayElement[] = [];
  
  if (Array.isArray(heapStep)) {
    // For heapSort algorithm
    elements = heapStep;
  } else if (heapStep.elements) {
    // For heapify algorithm
    elements = heapStep.elements;
  }
  
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...elements.map(item => item.value));
  
  return (
    <div className="flex flex-col items-center justify-center h-64 p-4">
      {/* Heap visualization (similar to array but organized as a tree) */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative h-full w-full">
          {/* Render as array bars first */}
          <div className="flex items-end justify-center h-48 w-full">
            {elements.map((element, index) => {
              // Calculate height based on value
              const heightPercentage = 60 + (element.value / maxValue) * 40;
              
              // Determine color based on element state
              let bgColor = "bg-algo-unsorted";
              if (element.state === "comparing") bgColor = "bg-algo-comparing";
              else if (element.state === "sorted") bgColor = "bg-algo-sorted";
              else if (element.state === "current") bgColor = "bg-algo-highlight";
              
              return (
                <div
                  key={index}
                  className="flex flex-col items-center mx-0.5"
                  style={{ height: "100%", width: `${100 / elements.length}%` }}
                >
                  <div
                    className={`w-full ${bgColor} transition-all duration-200`}
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                  {elements.length <= 30 && (
                    <span className="text-xs mt-1">{element.value}</span>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Display heap structure visualization */}
          <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            {heapStep.swapIndices && (
              <p>Swapping elements at indices {heapStep.swapIndices[0]} and {heapStep.swapIndices[1]}</p>
            )}
            {heapStep.currentIndex !== undefined && (
              <p>Current index: {heapStep.currentIndex}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeapVisualizer;
