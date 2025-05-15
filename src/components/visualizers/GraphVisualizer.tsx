
import React from "react";
import { useVisualizer } from "../../contexts/VisualizerContext";
import { GraphStep } from "../../utils/algorithms";

const GraphVisualizer: React.FC = () => {
  const { steps, currentStep } = useVisualizer();
  
  if (!steps[currentStep] || !(steps[currentStep] as GraphStep).nodes) {
    return (
      <div className="flex items-center justify-center h-64 p-4">
        <p className="text-gray-500">No graph data available</p>
      </div>
    );
  }
  
  const graphData = steps[currentStep] as GraphStep;
  const nodeSize = 30;
  
  // Calculate canvas dimensions based on node positions
  const getGraphDimensions = () => {
    const paddingX = 30;
    const paddingY = 30;
    
    let maxX = 0;
    let maxY = 0;
    
    graphData.nodes.forEach(node => {
      maxX = Math.max(maxX, node.x + nodeSize);
      maxY = Math.max(maxY, node.y + nodeSize);
    });
    
    return {
      width: maxX + paddingX,
      height: maxY + paddingY
    };
  };
  
  const { width, height } = getGraphDimensions();
  
  // Function to draw an edge
  const drawEdge = (edge: any) => {
    const fromNode = graphData.nodes.find(n => n.id === edge.from);
    const toNode = graphData.nodes.find(n => n.id === edge.to);
    
    if (!fromNode || !toNode) return null;
    
    // Edge styling based on state
    let edgeStyle = "stroke-gray-300";
    if (edge.state === "visited") edgeStyle = "stroke-purple-400";
    else if (edge.state === "current") edgeStyle = "stroke-yellow-400";
    else if (edge.state === "discovery") edgeStyle = "stroke-green-500";
    else if (edge.state === "back") edgeStyle = "stroke-red-300";
    
    // Calculate midpoint for weight label
    const midX = (fromNode.x + toNode.x) / 2 + nodeSize / 2;
    const midY = (fromNode.y + toNode.y) / 2 + nodeSize / 2;
    
    return (
      <g key={`edge-${edge.from}-${edge.to}`}>
        {/* Edge line */}
        <line
          x1={fromNode.x + nodeSize / 2}
          y1={fromNode.y + nodeSize / 2}
          x2={toNode.x + nodeSize / 2}
          y2={toNode.y + nodeSize / 2}
          className={`${edgeStyle} stroke-2`}
          markerEnd="url(#arrowhead)"
        />
        
        {/* Weight label if exists */}
        {edge.weight !== undefined && (
          <text
            x={midX}
            y={midY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-600 text-xs bg-white"
          >
            {edge.weight}
          </text>
        )}
      </g>
    );
  };
  
  // Function to draw a node
  const drawNode = (node: any) => {
    // Node styling based on state
    let nodeStyle = "fill-white stroke-gray-300";
    if (node.state === "visited") nodeStyle = "fill-purple-100 stroke-purple-500";
    else if (node.state === "current") nodeStyle = "fill-yellow-100 stroke-yellow-500";
    else if (node.state === "processing") nodeStyle = "fill-blue-100 stroke-blue-500";
    else if (node.state === "discovered") nodeStyle = "fill-green-100 stroke-green-500";
    
    return (
      <g key={`node-${node.id}`} transform={`translate(${node.x}, ${node.y})`}>
        <circle
          cx={nodeSize / 2}
          cy={nodeSize / 2}
          r={nodeSize / 2}
          className={`${nodeStyle} stroke-2`}
        />
        <text
          x={nodeSize / 2}
          y={nodeSize / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          className="pointer-events-none"
        >
          {node.value}
        </text>
      </g>
    );
  };
  
  return (
    <div className="flex items-center justify-center h-96 p-4 overflow-auto">
      <svg width={width} height={height}>
        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" className="fill-gray-400" />
          </marker>
        </defs>
        
        {/* Draw edges first */}
        {graphData.edges.map(edge => drawEdge(edge))}
        
        {/* Draw nodes */}
        {graphData.nodes.map(node => drawNode(node))}
        
        {/* Show queue or stack if present */}
        {(graphData.queue || graphData.stack) && (
          <foreignObject x={10} y={height - 50} width={width - 20} height="40">
            <div className="px-2 py-1 bg-gray-100 rounded text-sm">
              {graphData.queue && (
                <div>Queue: {graphData.queue.map(id => graphData.nodes.find(n => n.id === id)?.value).join(" → ")}</div>
              )}
              {graphData.stack && (
                <div>Stack: {graphData.stack.map(id => graphData.nodes.find(n => n.id === id)?.value).join(" → ")}</div>
              )}
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  );
};

export default GraphVisualizer;
