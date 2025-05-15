
import React from "react";
import { useVisualizer } from "../contexts/VisualizerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InfoPanel: React.FC = () => {
  const { algorithm } = useVisualizer();
  
  const getAlgorithmInfo = () => {
    switch (algorithm) {
      // Sorting algorithms
      case "bubbleSort":
        return {
          title: "Bubble Sort",
          description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
          timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
          },
          spaceComplexity: "O(1)",
          stable: true
        };
        
      case "selectionSort":
        return {
          title: "Selection Sort",
          description: "Selection Sort works by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.",
          timeComplexity: {
            best: "O(n²)",
            average: "O(n²)",
            worst: "O(n²)"
          },
          spaceComplexity: "O(1)",
          stable: false
        };
        
      case "insertionSort":
        return {
          title: "Insertion Sort",
          description: "Insertion Sort builds the final sorted array one item at a time. It's much less efficient on large lists than more advanced algorithms.",
          timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
          },
          spaceComplexity: "O(1)",
          stable: true
        };
      
      // Heap algorithms
      case "buildHeap":
        return {
          title: "Build Heap",
          description: "Converts an array into a binary heap data structure where the parent node is always greater/smaller than its children.",
          timeComplexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)"
          },
          spaceComplexity: "O(1)",
          stable: false
        };
      
      case "heapSort":
        return {
          title: "Heap Sort",
          description: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.",
          timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
          },
          spaceComplexity: "O(1)",
          stable: false
        };
      
      // Math algorithms
      case "gcd":
        return {
          title: "Euclidean GCD",
          description: "Computes the greatest common divisor of two integers using Euclid's algorithm through repeated division.",
          timeComplexity: {
            best: "O(1)",
            average: "O(log(min(a,b)))",
            worst: "O(log(min(a,b)))"
          },
          spaceComplexity: "O(1)",
          stable: true
        };
      
      case "fibonacci":
        return {
          title: "Fibonacci Sequence",
          description: "Generates the Fibonacci sequence where each number is the sum of the two preceding ones, usually starting with 0 and 1.",
          timeComplexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)"
          },
          spaceComplexity: "O(1)",
          stable: true
        };
      
      case "sieveOfEratosthenes":
        return {
          title: "Sieve of Eratosthenes",
          description: "An algorithm for finding all prime numbers up to a specified integer by iteratively marking multiples of each prime, starting from 2.",
          timeComplexity: {
            best: "O(n log log n)",
            average: "O(n log log n)",
            worst: "O(n log log n)"
          },
          spaceComplexity: "O(n)",
          stable: true
        };
      
      case "binaryExponentiation":
        return {
          title: "Binary Exponentiation",
          description: "A technique to compute x^n using only O(log n) multiplications, by squaring the result in each step.",
          timeComplexity: {
            best: "O(log n)",
            average: "O(log n)",
            worst: "O(log n)"
          },
          spaceComplexity: "O(1)",
          stable: true
        };
        
      case "primalityTest":
        return {
          title: "Primality Test",
          description: "Determines if a given number is prime by checking if it's divisible by any integer from 2 to √n.",
          timeComplexity: {
            best: "O(1)",
            average: "O(√n)",
            worst: "O(√n)"
          },
          spaceComplexity: "O(1)",
          stable: true
        };
        
      default:
        return {
          title: "Unknown Algorithm",
          description: "Please select an algorithm to see information.",
          timeComplexity: {
            best: "-",
            average: "-",
            worst: "-"
          },
          spaceComplexity: "-",
          stable: false
        };
    }
  };
  
  const info = getAlgorithmInfo();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{info.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">{info.description}</p>
        
        <h4 className="font-medium mb-2">Time Complexity</h4>
        <ul className="list-disc pl-5 mb-4 text-sm">
          <li>Best Case: <code>{info.timeComplexity.best}</code></li>
          <li>Average Case: <code>{info.timeComplexity.average}</code></li>
          <li>Worst Case: <code>{info.timeComplexity.worst}</code></li>
        </ul>
        
        <h4 className="font-medium mb-2">Space Complexity</h4>
        <p className="mb-4 text-sm"><code>{info.spaceComplexity}</code></p>
        
        <h4 className="font-medium mb-2">Stable</h4>
        <p className="text-sm">{info.stable ? "Yes" : "No"}</p>
        
        <div className="mt-4 pt-4 border-t text-sm">
          <h4 className="font-medium mb-2">Legend</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-algo-unsorted rounded-sm mr-2"></div>
              <span>Unsorted</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-algo-comparing rounded-sm mr-2"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-algo-sorted rounded-sm mr-2"></div>
              <span>Sorted</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-algo-highlight rounded-sm mr-2"></div>
              <span>Current</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoPanel;
