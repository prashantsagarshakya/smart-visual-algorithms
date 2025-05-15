
import { ArrayElement } from "../algorithms";

// Binary Exponentiation (fast power calculation)
export const binaryExponentiation = (base: number, exponent: number): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  let result = 1;
  let b = base;
  let e = exponent;
  
  // Initial state
  const initialElements: ArrayElement[] = [
    { value: result, state: "default" },
    { value: b, state: "default" },
    { value: e, state: "default" }
  ];
  
  steps.push([...initialElements]);
  
  // Binary exponentiation algorithm
  while (e > 0) {
    // Highlight current values
    const currentElements: ArrayElement[] = [
      { value: result, state: "current" },
      { value: b, state: "default" },
      { value: e, state: "comparing" }
    ];
    steps.push([...currentElements]);
    
    if (e % 2 === 1) {
      result *= b;
      
      // Show the update of result
      const updateElements: ArrayElement[] = [
        { value: result, state: "comparing" },
        { value: b, state: "current" },
        { value: e, state: "comparing" }
      ];
      steps.push([...updateElements]);
    }
    
    b *= b;
    e = Math.floor(e / 2);
    
    // Show the updates
    const stepElements: ArrayElement[] = [
      { value: result, state: "default" },
      { value: b, state: "comparing" },
      { value: e, state: "current" }
    ];
    steps.push([...stepElements]);
  }
  
  // Final state
  const finalElements: ArrayElement[] = [
    { value: result, state: "sorted" },
    { value: b, state: "default" },
    { value: e, state: "default" }
  ];
  steps.push([...finalElements]);
  
  return steps;
};

// Euclidean algorithm for GCD
export const gcd = (a: number, b: number): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  
  // Initial state
  const initialElements: ArrayElement[] = [
    { value: a, state: "default" },
    { value: b, state: "default" }
  ];
  
  steps.push([...initialElements]);
  
  // Euclidean algorithm
  while (b !== 0) {
    // Highlight current values
    const compareElements: ArrayElement[] = [
      { value: a, state: "comparing" },
      { value: b, state: "comparing" }
    ];
    steps.push([...compareElements]);
    
    const remainder = a % b;
    
    // Show the calculation
    const calculateElements: ArrayElement[] = [
      { value: a, state: "current" },
      { value: b, state: "current" },
      { value: remainder, state: "comparing" }
    ];
    steps.push([...calculateElements]);
    
    a = b;
    b = remainder;
    
    // Show the updates
    if (b !== 0) {
      const updateElements: ArrayElement[] = [
        { value: a, state: "default" },
        { value: b, state: "default" }
      ];
      steps.push([...updateElements]);
    }
  }
  
  // Final state - a contains the GCD
  const finalElements: ArrayElement[] = [
    { value: a, state: "sorted" }
  ];
  steps.push([...finalElements]);
  
  return steps;
};

// Fibonacci sequence generation
export const fibonacci = (n: number): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  
  if (n <= 0) return steps;
  
  if (n === 1) {
    steps.push([{ value: 1, state: "sorted" }]);
    return steps;
  }
  
  let a = 0;
  let b = 1;
  
  // Initial state
  const initialElements: ArrayElement[] = [
    { value: a, state: "default" },
    { value: b, state: "default" }
  ];
  
  steps.push([...initialElements]);
  
  // Generate Fibonacci sequence
  for (let i = 2; i <= n; i++) {
    // Highlight current values
    const compareElements: ArrayElement[] = [
      { value: a, state: "comparing" },
      { value: b, state: "comparing" }
    ];
    steps.push([...compareElements]);
    
    const nextFib = a + b;
    
    // Show the calculation
    const calculateElements: ArrayElement[] = [
      { value: a, state: "current" },
      { value: b, state: "current" },
      { value: nextFib, state: "comparing" }
    ];
    steps.push([...calculateElements]);
    
    a = b;
    b = nextFib;
    
    // Show the updates
    const fibSequence: ArrayElement[] = [];
    for (let j = 0; j <= i; j++) {
      if (j === i) {
        fibSequence.push({ value: b, state: "current" });
      } else if (j === i - 1) {
        fibSequence.push({ value: a, state: "default" });
      } else {
        // Previous Fibonacci numbers
        const fibValue = Math.round(b * (1 - Math.sqrt(5)) / (1 + Math.sqrt(5)) ** j);
        fibSequence.push({ value: fibValue, state: "sorted" });
      }
    }
    steps.push([...fibSequence]);
  }
  
  // Final state
  const finalSequence: ArrayElement[] = [];
  for (let i = 0; i <= n; i++) {
    if (i === n) {
      finalSequence.push({ value: b, state: "sorted" });
    } else if (i === n - 1) {
      finalSequence.push({ value: a, state: "sorted" });
    } else {
      // Previous Fibonacci numbers with approximate calculation
      const fibValue = Math.round(b * (1 - Math.sqrt(5)) / (1 + Math.sqrt(5)) ** i);
      finalSequence.push({ value: fibValue, state: "sorted" });
    }
  }
  steps.push([...finalSequence]);
  
  return steps;
};

// Sieve of Eratosthenes for finding prime numbers
export const sieveOfEratosthenes = (n: number): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  
  if (n <= 1) return steps;
  
  // Create initial array with all numbers from 2 to n
  const sieve: ArrayElement[] = Array.from({ length: n - 1 }, (_, i) => ({ 
    value: i + 2, 
    state: "default" 
  }));
  
  steps.push([...sieve]);
  
  // Apply sieve algorithm
  for (let i = 0; i < sieve.length; i++) {
    if (sieve[i].state === "sorted") continue;
    
    const prime = sieve[i].value;
    
    // Highlight current prime
    const currentSieve = sieve.map((el, idx) => ({
      ...el,
      state: idx === i ? "current" : el.state
    }));
    steps.push([...currentSieve]);
    
    // Mark current number as prime
    sieve[i].state = "sorted";
    
    // Mark multiples as not prime
    for (let j = i + prime; j < sieve.length; j += prime) {
      // Show the marking process
      const markingSieve = sieve.map((el, idx) => {
        if (idx === j) return { ...el, state: "comparing" };
        return { ...el };
      });
      steps.push([...markingSieve]);
      
      // Actually mark as not prime
      sieve[j].state = "current"; // Using "current" to indicate non-prime
    }
    
    // Show the state after processing current prime
    steps.push([...sieve]);
  }
  
  // Final state - only primes are marked as "sorted"
  const finalSieve = sieve.map(el => ({
    ...el,
    state: el.state === "default" ? "sorted" : el.state
  }));
  steps.push([...finalSieve]);
  
  return steps;
};

// Primality test
export const primalityTest = (n: number): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  
  if (n <= 1) {
    steps.push([{ value: n, state: "current" }]);
    steps.push([{ value: n, state: "current" }, { value: 0, state: "sorted" }]); // 0 indicates not prime
    return steps;
  }
  
  // Initial state
  steps.push([{ value: n, state: "default" }]);
  
  // Check if n is divisible by any number from 2 to sqrt(n)
  const limit = Math.floor(Math.sqrt(n));
  
  for (let i = 2; i <= limit; i++) {
    // Show current check
    const checkElements: ArrayElement[] = [
      { value: n, state: "current" },
      { value: i, state: "comparing" }
    ];
    steps.push([...checkElements]);
    
    if (n % i === 0) {
      // Found a divisor, not prime
      const resultElements: ArrayElement[] = [
        { value: n, state: "current" },
        { value: i, state: "comparing" },
        { value: 0, state: "sorted" } // 0 indicates not prime
      ];
      steps.push([...resultElements]);
      return steps;
    }
  }
  
  // If we get here, n is prime
  const finalElements: ArrayElement[] = [
    { value: n, state: "current" },
    { value: 1, state: "sorted" } // 1 indicates prime
  ];
  steps.push([...finalElements]);
  
  return steps;
};
