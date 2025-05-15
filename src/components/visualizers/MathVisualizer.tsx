
import React from "react";
import { useVisualizer } from "../../contexts/VisualizerContext";
import { ArrayElement } from "../../utils/algorithms";

const MathVisualizer: React.FC = () => {
  const { steps, currentStep, algorithm } = useVisualizer();
  
  if (!steps[currentStep]) {
    return (
      <div className="flex items-center justify-center h-64 p-4">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }
  
  const elements = steps[currentStep] as ArrayElement[];
  
  const renderValues = () => {
    const maxValue = Math.max(...elements.map(item => item.value));
    
    if (algorithm === "sieveOfEratosthenes") {
      return (
        <div className="grid grid-cols-10 gap-2 w-full">
          {elements.map((element, index) => {
            let bgColor = "bg-algo-unsorted";
            if (element.state === "comparing") bgColor = "bg-algo-comparing";
            else if (element.state === "sorted") bgColor = "bg-algo-sorted";
            else if (element.state === "current") bgColor = "bg-algo-highlight";
            
            return (
              <div 
                key={index}
                className={`${bgColor} p-2 rounded flex items-center justify-center transition-all duration-200`}
              >
                <span className="text-xs font-bold text-white">{element.value}</span>
              </div>
            );
          })}
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center space-x-8">
        {elements.map((element, index) => {
          let bgColor = "bg-algo-unsorted";
          if (element.state === "comparing") bgColor = "bg-algo-comparing";
          else if (element.state === "sorted") bgColor = "bg-algo-sorted";
          else if (element.state === "current") bgColor = "bg-algo-highlight";
          
          // Calculate height based on value (40% to 100% of container height)
          const heightPercentage = 40 + (element.value / maxValue) * 60;
          const width = algorithm === "fibonacci" ? 30 : 60;
          
          return (
            <div 
              key={index}
              className="flex flex-col items-center"
            >
              <div
                className={`${bgColor} transition-all duration-200 flex items-center justify-center`}
                style={{ 
                  height: `${heightPercentage}%`, 
                  width: `${width}px`,
                  minHeight: "40px"
                }}
              >
                <span className="text-xs font-bold text-white">{element.value}</span>
              </div>
              {algorithm !== "fibonacci" && (
                <div className="mt-2 text-xs">
                  {algorithm === "gcd" && index === 0 && "GCD"}
                  {algorithm === "binaryExponentiation" && index === 0 && "Result"}
                  {algorithm === "binaryExponentiation" && index === 1 && "Base"}
                  {algorithm === "binaryExponentiation" && index === 2 && "Exp"}
                  {algorithm === "primalityTest" && index === 0 && "Number"}
                  {algorithm === "primalityTest" && index === 1 && (element.value === 1 ? "Is Prime" : "Not Prime")}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="flex items-center justify-center h-64 p-4">
      {renderValues()}
    </div>
  );
};

export default MathVisualizer;
