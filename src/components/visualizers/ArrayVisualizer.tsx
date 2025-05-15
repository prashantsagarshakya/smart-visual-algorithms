
import React from "react";
import { useVisualizer } from "../../contexts/VisualizerContext";
import { ArrayElement } from "../../utils/algorithms";

const ArrayVisualizer: React.FC = () => {
  const { array } = useVisualizer();
  
  // Calculate the maximum value in the array for scaling
  const maxValue = Math.max(...array.map(item => item.value));
  
  return (
    <div className="flex items-end justify-center h-64 p-4">
      {array.map((element, index) => {
        // Calculate height based on value (60% to 100% of container height)
        const heightPercentage = 60 + (element.value / maxValue) * 40;
        
        // Determine the color based on the element state
        let bgColor = "bg-algo-unsorted";
        if (element.state === "comparing") bgColor = "bg-algo-comparing";
        else if (element.state === "sorted") bgColor = "bg-algo-sorted";
        else if (element.state === "current") bgColor = "bg-algo-highlight";
        
        return (
          <div
            key={index}
            className="flex flex-col items-center mx-0.5"
            style={{ height: "100%", width: `${100 / array.length}%` }}
          >
            <div
              className={`w-full ${bgColor} transition-all duration-200`}
              style={{ 
                height: `${heightPercentage}%`,
                minWidth: array.length > 50 ? "2px" : "auto",
                maxWidth: array.length > 50 ? "4px" : "30px",
              }}
            ></div>
            {array.length <= 30 && (
              <span className="text-xs mt-1">{element.value}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArrayVisualizer;
