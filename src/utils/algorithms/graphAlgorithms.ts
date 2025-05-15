
type GraphNode = {
  id: number;
  value: string | number;
  state: "default" | "visited" | "current" | "processing" | "discovered";
  x: number; // For visualization positioning
  y: number;
};

type GraphEdge = {
  from: number;
  to: number;
  weight?: number;
  state: "default" | "visited" | "current" | "discovery" | "back";
};

type GraphStep = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  current: number | null;
  queue?: number[]; // For BFS
  stack?: number[]; // For DFS
};

// Helper to create a deep copy of the graph state
const createGraphSnapshot = (step: GraphStep): GraphStep => {
  return {
    nodes: step.nodes.map(node => ({ ...node })),
    edges: step.edges.map(edge => ({ ...edge })),
    current: step.current,
    queue: step.queue ? [...step.queue] : undefined,
    stack: step.stack ? [...step.stack] : undefined
  };
};

// Create a graph from adjacency list
export const createGraph = (nodes: { id: number; value: string | number; x: number; y: number }[], 
                            edges: { from: number; to: number; weight?: number }[]): GraphStep => {
  return {
    nodes: nodes.map(node => ({
      ...node,
      state: "default"
    })),
    edges: edges.map(edge => ({
      ...edge,
      state: "default"
    })),
    current: null
  };
};

// Breadth-First Search algorithm
export const bfs = (startNodeId: number, graphData: { 
  nodes: { id: number; value: string | number; x: number; y: number }[]; 
  edges: { from: number; to: number; weight?: number }[] 
}): GraphStep[] => {
  const steps: GraphStep[] = [];
  const initialGraph = createGraph(graphData.nodes, graphData.edges);
  
  steps.push(createGraphSnapshot(initialGraph));
  
  let currentGraph = createGraphSnapshot(initialGraph);
  
  // Create adjacency list for faster neighbor lookup
  const adjacencyList = new Map<number, number[]>();
  currentGraph.nodes.forEach(node => {
    adjacencyList.set(node.id, []);
  });
  
  currentGraph.edges.forEach(edge => {
    const neighbors = adjacencyList.get(edge.from) || [];
    neighbors.push(edge.to);
    adjacencyList.set(edge.from, neighbors);
  });
  
  // BFS algorithm
  const queue: number[] = [startNodeId];
  const visited = new Set<number>();
  
  currentGraph.nodes.find(node => node.id === startNodeId)!.state = "current";
  currentGraph.current = startNodeId;
  currentGraph.queue = [...queue];
  steps.push(createGraphSnapshot(currentGraph));
  
  visited.add(startNodeId);
  
  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    currentGraph.current = nodeId;
    currentGraph.queue = [...queue];
    
    // Mark current node as processing
    const currentNodeIndex = currentGraph.nodes.findIndex(node => node.id === nodeId);
    currentGraph.nodes[currentNodeIndex].state = "processing";
    steps.push(createGraphSnapshot(currentGraph));
    
    // Get neighbors
    const neighbors = adjacencyList.get(nodeId) || [];
    
    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        // Mark neighbor as discovered
        const neighborIndex = currentGraph.nodes.findIndex(node => node.id === neighborId);
        currentGraph.nodes[neighborIndex].state = "discovered";
        
        // Mark edge as discovery
        const edgeIndex = currentGraph.edges.findIndex(
          edge => edge.from === nodeId && edge.to === neighborId
        );
        if (edgeIndex !== -1) {
          currentGraph.edges[edgeIndex].state = "discovery";
        }
        
        queue.push(neighborId);
        visited.add(neighborId);
        currentGraph.queue = [...queue];
        steps.push(createGraphSnapshot(currentGraph));
      }
    }
    
    // Mark current node as visited after processing all neighbors
    currentGraph.nodes[currentNodeIndex].state = "visited";
    steps.push(createGraphSnapshot(currentGraph));
  }
  
  // Final state with all processed nodes marked as visited
  currentGraph.current = null;
  currentGraph.queue = [];
  steps.push(createGraphSnapshot(currentGraph));
  
  return steps;
};

// Depth-First Search algorithm
export const dfs = (startNodeId: number, graphData: { 
  nodes: { id: number; value: string | number; x: number; y: number }[]; 
  edges: { from: number; to: number; weight?: number }[] 
}): GraphStep[] => {
  const steps: GraphStep[] = [];
  const initialGraph = createGraph(graphData.nodes, graphData.edges);
  
  steps.push(createGraphSnapshot(initialGraph));
  
  let currentGraph = createGraphSnapshot(initialGraph);
  
  // Create adjacency list for faster neighbor lookup
  const adjacencyList = new Map<number, number[]>();
  currentGraph.nodes.forEach(node => {
    adjacencyList.set(node.id, []);
  });
  
  currentGraph.edges.forEach(edge => {
    const neighbors = adjacencyList.get(edge.from) || [];
    neighbors.push(edge.to);
    adjacencyList.set(edge.from, neighbors);
  });
  
  // DFS algorithm
  const stack: number[] = [startNodeId];
  const visited = new Set<number>();
  
  currentGraph.nodes.find(node => node.id === startNodeId)!.state = "current";
  currentGraph.current = startNodeId;
  currentGraph.stack = [...stack];
  steps.push(createGraphSnapshot(currentGraph));
  
  while (stack.length > 0) {
    const nodeId = stack.pop()!;
    
    if (visited.has(nodeId)) {
      continue;
    }
    
    currentGraph.current = nodeId;
    currentGraph.stack = [...stack];
    
    // Mark current node as processing
    const currentNodeIndex = currentGraph.nodes.findIndex(node => node.id === nodeId);
    currentGraph.nodes[currentNodeIndex].state = "processing";
    steps.push(createGraphSnapshot(currentGraph));
    
    visited.add(nodeId);
    
    // Get neighbors
    const neighbors = adjacencyList.get(nodeId) || [];
    
    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        // Mark neighbor as discovered
        const neighborIndex = currentGraph.nodes.findIndex(node => node.id === neighborId);
        currentGraph.nodes[neighborIndex].state = "discovered";
        
        // Mark edge as discovery
        const edgeIndex = currentGraph.edges.findIndex(
          edge => edge.from === nodeId && edge.to === neighborId
        );
        if (edgeIndex !== -1) {
          currentGraph.edges[edgeIndex].state = "discovery";
        }
        
        stack.push(neighborId);
        currentGraph.stack = [...stack];
        steps.push(createGraphSnapshot(currentGraph));
      } else {
        // Mark edge as back edge if neighbor already visited
        const edgeIndex = currentGraph.edges.findIndex(
          edge => edge.from === nodeId && edge.to === neighborId
        );
        if (edgeIndex !== -1) {
          currentGraph.edges[edgeIndex].state = "back";
          steps.push(createGraphSnapshot(currentGraph));
        }
      }
    }
    
    // Mark current node as visited after processing all neighbors
    currentGraph.nodes[currentNodeIndex].state = "visited";
    steps.push(createGraphSnapshot(currentGraph));
  }
  
  // Final state with all processed nodes marked as visited
  currentGraph.current = null;
  currentGraph.stack = [];
  steps.push(createGraphSnapshot(currentGraph));
  
  return steps;
};

export type { GraphNode, GraphEdge, GraphStep };
