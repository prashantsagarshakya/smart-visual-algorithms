
import React from "react";
import { useVisualizer } from "../../contexts/VisualizerContext";
import { TreeStep } from "../../utils/algorithms";

const TreeVisualizer: React.FC = () => {
  const { steps, currentStep } = useVisualizer();
  
  if (!steps[currentStep] || !(steps[currentStep] as TreeStep).nodes) {
    return (
      <div className="flex items-center justify-center h-64 p-4">
        <p className="text-gray-500">No tree data available</p>
      </div>
    );
  }
  
  const treeData = steps[currentStep] as TreeStep;
  const nodeSize = 40;
  const levelHeight = 70;
  const maxDepth = Math.floor(Math.log2(treeData.nodes.length + 1));
  
  // Calculate positions for each node
  const getTreeLayout = () => {
    // Clone nodes to avoid modifying the original data
    const nodes = treeData.nodes.map((node, index) => ({
      ...node,
      x: 0,
      y: 0,
      depth: Math.floor(Math.log2(index + 1)),
      parentIndex: index === 0 ? null : Math.floor((index - 1) / 2)
    }));
    
    // Calculate tree width based on number of nodes at the lowest level
    const bottomLevelCount = Math.pow(2, maxDepth);
    const treeWidth = bottomLevelCount * nodeSize * 1.5;
    
    // Position each node
    for (let i = 0; i < nodes.length; i++) {
      const depth = Math.floor(Math.log2(i + 1));
      const levelWidth = Math.pow(2, depth);
      const position = i - Math.pow(2, depth) + 1;
      
      // Calculate x position centered for each level
      const levelWidthPx = levelWidth * nodeSize * 2;
      const startX = (treeWidth - levelWidthPx) / 2 + nodeSize;
      
      nodes[i].x = startX + position * (treeWidth / levelWidth);
      nodes[i].y = depth * levelHeight + 30;
    }
    
    return { nodes, width: treeWidth, height: (maxDepth + 1) * levelHeight + 30 };
  };
  
  const { nodes, width, height } = getTreeLayout();
  
  // Function to draw edge between nodes
  const drawEdge = (fromNode: any, toNode: any) => {
    return (
      <line
        key={`edge-${fromNode.id}-${toNode.id}`}
        x1={fromNode.x + nodeSize / 2}
        y1={fromNode.y + nodeSize / 2}
        x2={toNode.x + nodeSize / 2}
        y2={toNode.y + nodeSize / 2}
        stroke="#999"
        strokeWidth="2"
      />
    );
  };
  
  return (
    <div className="flex items-center justify-center h-96 p-4 overflow-auto">
      <svg width={width} height={height}>
        {/* Draw edges first */}
        {nodes.map((node, index) => {
          if (index === 0) return null; // Skip root, it has no parent
          
          const parentIndex = Math.floor((index - 1) / 2);
          return drawEdge(nodes[parentIndex], node);
        })}
        
        {/* Draw nodes */}
        {nodes.map((node, index) => {
          // Determine node styling based on state
          let nodeStyle = "fill-white stroke-gray-300";
          if (node.state === "visited") nodeStyle = "fill-purple-100 stroke-purple-500";
          else if (node.state === "current") nodeStyle = "fill-yellow-100 stroke-yellow-500";
          else if (node.state === "comparing") nodeStyle = "fill-red-100 stroke-red-500";
          else if (node.state === "found") nodeStyle = "fill-green-100 stroke-green-500";
          
          return (
            <g key={`node-${index}`} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                cx={nodeSize / 2}
                cy={nodeSize / 2}
                r={nodeSize / 2}
                className={`${nodeStyle} stroke-2`}
              />
              <text
                x={nodeSize / 2}
                y={nodeSize / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
              >
                {node.value}
              </text>
            </g>
          );
        })}
        
        {/* Draw traversal sequence if available */}
        {treeData.traversalOrder && treeData.traversalOrder.length > 0 && (
          <text 
            x={width / 2} 
            y={height - 10} 
            textAnchor="middle" 
            fontSize="14" 
            className="fill-gray-600"
          >
            Traversal: {treeData.traversalOrder.map(idx => treeData.nodes[idx].value).join(" → ")}
          </text>
        )}
      </svg>
    </div>
  );
};

export default TreeVisualizer;
