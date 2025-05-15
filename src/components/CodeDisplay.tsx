
import React from "react";
import { useVisualizer } from "../contexts/VisualizerContext";

const CodeDisplay: React.FC = () => {
  const { algorithm, dataStructure } = useVisualizer();

  const getAlgorithmCode = () => {
    switch (algorithm) {
      // Array sorting algorithms
      case "bubbleSort":
        return `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j+1]) {
        // Swap if they are in wrong order
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  
  return arr;
}`;

      case "selectionSort":
        return `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap the found minimum element with first element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}`;

      case "insertionSort":
        return `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    // Element to be inserted
    let current = arr[i];
    let j = i - 1;
    
    // Move elements greater than current
    // to one position ahead
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert current at correct position
    arr[j + 1] = current;
  }
  
  return arr;
}`;

      // Linked List algorithms
      case "traverseLinkedList":
        return `function traverseLinkedList(head) {
  let current = head;
  
  while (current !== null) {
    // Process current node
    console.log(current.value);
    
    // Move to next node
    current = current.next;
  }
}`;

      case "insertAtBeginning":
        return `function insertAtBeginning(head, value) {
  // Create new node
  const newNode = {
    value: value,
    next: head
  };
  
  // Return new head
  return newNode;
}`;

      case "deleteNode":
        return `function deleteNode(head, value) {
  // If head contains value to delete
  if (head !== null && head.value === value) {
    return head.next;
  }
  
  let current = head;
  
  // Search for the node to delete
  while (current !== null && current.next !== null) {
    if (current.next.value === value) {
      // Skip over the node to be deleted
      current.next = current.next.next;
      return head;
    }
    current = current.next;
  }
  
  return head;
}`;

      // Stack algorithms
      case "stackPush":
        return `function push(stack, value) {
  // Add element to top of stack
  stack.push(value);
  return stack;
}`;

      case "stackPop":
        return `function pop(stack) {
  // Check if stack is empty
  if (stack.length === 0) {
    return null;
  }
  
  // Remove and return top element
  return stack.pop();
}`;

      case "stackPeek":
        return `function peek(stack) {
  // Check if stack is empty
  if (stack.length === 0) {
    return null;
  }
  
  // Return top element without removing
  return stack[stack.length - 1];
}`;

      // Queue algorithms
      case "queueEnqueue":
        return `function enqueue(queue, value) {
  // Add element to end of queue
  queue.push(value);
  return queue;
}`;

      case "queueDequeue":
        return `function dequeue(queue) {
  // Check if queue is empty
  if (queue.length === 0) {
    return null;
  }
  
  // Remove and return front element
  return queue.shift();
}`;

      case "queuePeek":
        return `function peek(queue) {
  // Check if queue is empty
  if (queue.length === 0) {
    return null;
  }
  
  // Return front element without removing
  return queue[0];
}`;

      // Tree traversal algorithms
      case "inOrderTraversal":
        return `function inOrderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node === null) return;
    
    // Visit left subtree
    traverse(node.left);
    
    // Visit node
    result.push(node.value);
    
    // Visit right subtree
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}`;

      case "preOrderTraversal":
        return `function preOrderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node === null) return;
    
    // Visit node first
    result.push(node.value);
    
    // Then visit left subtree
    traverse(node.left);
    
    // Then visit right subtree
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}`;

      case "postOrderTraversal":
        return `function postOrderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node === null) return;
    
    // Visit left subtree
    traverse(node.left);
    
    // Visit right subtree
    traverse(node.right);
    
    // Visit node last
    result.push(node.value);
  }
  
  traverse(root);
  return result;
}`;

      // Graph algorithms
      case "bfs":
        return `function bfs(graph, startNode) {
  const queue = [startNode];
  const visited = new Set([startNode]);
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    // Process all neighbors
    for (let neighbor of graph.getNeighbors(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}`;

      case "dfs":
        return `function dfs(graph, startNode) {
  const stack = [startNode];
  const visited = new Set();
  const result = [];
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      
      // Process all neighbors
      for (let neighbor of graph.getNeighbors(node)) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  
  return result;
}`;

      default:
        return "// Select an algorithm to view code";
    }
  };

  return (
    <div className="bg-white dark:bg-algo-background-dark p-4 rounded-md shadow-md">
      <h3 className="text-lg font-medium mb-2 dark:text-white">
        {dataStructure.charAt(0).toUpperCase() + dataStructure.slice(1)} - {algorithm} Code
      </h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
        <code className="text-sm text-gray-800 dark:text-gray-200">
          {getAlgorithmCode()}
        </code>
      </pre>
    </div>
  );
};

export default CodeDisplay;
