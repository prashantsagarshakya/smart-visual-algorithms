
import React from "react";
import { useVisualizer } from "../../contexts/VisualizerContext";
import { StackQueueStep } from "../../utils/algorithms";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const StackQueueVisualizer: React.FC = () => {
  const { steps, currentStep, dataStructure } = useVisualizer();
  
  if (!steps[currentStep] || !(steps[currentStep] as StackQueueStep).elements) {
    return (
      <div className="flex items-center justify-center h-64 p-4">
        <p className="text-gray-500">No {dataStructure} data available</p>
      </div>
    );
  }
  
  const data = steps[currentStep] as StackQueueStep;
  const isStack = dataStructure === "stack";
  
  // Operation animations and labels
  let operationLabel = "";
  let animationClass = "";
  
  if (data.action === "push" || data.action === "enqueue") {
    operationLabel = isStack ? "Push" : "Enqueue";
    animationClass = "animate-bounce";
  } else if (data.action === "pop" || data.action === "dequeue") {
    operationLabel = isStack ? "Pop" : "Dequeue";
    animationClass = "animate-pulse";
  } else if (data.action === "peek") {
    operationLabel = "Peek";
    animationClass = "animate-pulse";
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-64 p-4">
      {/* Operation label */}
      {data.action !== "initial" && data.action !== "none" && (
        <div className={`text-lg font-bold mb-4 ${animationClass}`}>
          {operationLabel}
        </div>
      )}
      
      <div className="relative">
        {/* Stack visualization - vertical */}
        {isStack && (
          <div className="flex flex-col-reverse items-center border-2 border-gray-300 p-2 bg-gray-50 rounded">
            {data.elements.map((element, index) => {
              // Determine element styling based on state
              let elementStyle = "bg-white border-gray-300";
              if (element.state === "active") elementStyle = "bg-blue-100 border-blue-500";
              else if (element.state === "new") elementStyle = "bg-green-100 border-green-500";
              else if (element.state === "removing") elementStyle = "bg-red-100 border-red-500";
              
              const isTop = index === data.elements.length - 1;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center justify-between w-40 border-2 ${elementStyle} p-2 m-1 rounded transition-all duration-200`}
                >
                  <span>{element.value}</span>
                  {isTop && <span className="text-xs font-bold">← TOP</span>}
                </div>
              );
            })}
            
            {data.elements.length === 0 && (
              <div className="text-gray-500 p-4">Empty Stack</div>
            )}
          </div>
        )}
        
        {/* Queue visualization - horizontal */}
        {!isStack && (
          <div className="flex flex-col">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-bold">FRONT</span>
              <span className="text-xs font-bold">BACK</span>
            </div>
            <div className="flex items-center border-2 border-gray-300 p-2 bg-gray-50 rounded">
              {data.elements.map((element, index) => {
                // Determine element styling based on state
                let elementStyle = "bg-white border-gray-300";
                if (element.state === "active") elementStyle = "bg-blue-100 border-blue-500";
                else if (element.state === "new") elementStyle = "bg-green-100 border-green-500";
                else if (element.state === "removing") elementStyle = "bg-red-100 border-red-500";
                
                const isFront = index === 0;
                const isBack = index === data.elements.length - 1;
                
                return (
                  <div 
                    key={index}
                    className={`flex flex-col items-center justify-center border-2 ${elementStyle} p-2 m-1 rounded h-16 w-16 transition-all duration-200`}
                  >
                    <span>{element.value}</span>
                  </div>
                );
              })}
              
              {data.elements.length === 0 && (
                <div className="text-gray-500 p-4">Empty Queue</div>
              )}
            </div>
          </div>
        )}
        
        {/* Direction indicators */}
        <div className={`absolute ${isStack ? "right-full mr-2" : "bottom-full mb-2"} flex items-center`}>
          {isStack ? (
            <>
              <ArrowUpIcon className="h-5 w-5 text-green-600" />
              <ArrowDownIcon className="h-5 w-5 text-red-600" />
              <span className="ml-1 text-xs">Push/Pop</span>
            </>
          ) : (
            <div className="w-full flex justify-between">
              <ArrowDownIcon className="h-5 w-5 text-red-600 rotate-90" />
              <ArrowUpIcon className="h-5 w-5 text-green-600 -rotate-90" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StackQueueVisualizer;
