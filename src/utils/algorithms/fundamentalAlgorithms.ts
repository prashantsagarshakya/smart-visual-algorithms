
import { ArrayElement, ElementState } from "../algorithms";

// GCD algorithm
export const gcd = (a: number, b: number): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  
  // Convert to array elements for visualization
  const initialStep: ArrayElement[] = [
    { value: a, state: "default" },
    { value: b, state: "default" }
  ];
  
  steps.push([...initialStep]);
  
  // Euclidean algorithm
  while (b !== 0) {
    // Highlight the values being compared
    const compareStep: ArrayElement[] = [
      { value: a, state: "comparing" },
      { value: b, state: "comparing" }
    ];
    steps.push([...compareStep]);
    
    // Calculate remainder
    const remainder = a % b;
    
    // Show calculation step
    const calculationStep: ArrayElement[] = [
      { value: a, state: "default" },
      { value: b, state: "current" },
      { value: remainder, state: "new" }
    ];
    steps.push([...calculationStep]);
    
    // Update values for next iteration
    a = b;
    b = remainder;
    
    // Show updated values
    const updateStep: ArrayElement[] = [
      { value: a, state: "default" },
      { value: b, state: "default" }
    ];
    
    if (b === 0) {
      updateStep[0].state = "found"; // Final GCD
    }
    
    steps.push([...updateStep]);
  }
  
  // Highlight final result
  const finalStep: ArrayElement[] = [
    { value: a, state: "found" }
  ];
  
  steps.push([...finalStep]);
  
  return steps;
};

// Fibonacci numbers
export const fibonacci = (n: number): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  
  if (n <= 0) {
    return steps;
  }
  
  // F(0) = 0
  const step0: ArrayElement[] = [{ value: 0, state: "found" }];
  steps.push([...step0]);
  
  if (n === 1) {
    return steps;
  }
  
  // F(1) = 1
  const step1: ArrayElement[] = [
    { value: 0, state: "default" },
    { value: 1, state: "found" }
  ];
  steps.push([...step1]);
  
  // Calculate remaining Fibonacci numbers
  let a = 0;
  let b = 1;
  
  for (let i = 2; i <= n; i++) {
    // Highlight previous two numbers
    const highlightStep: ArrayElement[] = Array.from({ length: i }, (_, idx) => {
      if (idx === i - 1) return { value: b, state: "comparing" as ElementState };
      if (idx === i - 2) return { value: a, state: "comparing" as ElementState };
      return { value: idx, state: "default" as ElementState };
    });
    steps.push([...highlightStep]);
    
    // Calculate next Fibonacci number
    const c = a + b;
    
    // Show calculation
    const calculationStep: ArrayElement[] = Array.from({ length: i + 1 }, (_, idx) => {
      if (idx === i) return { value: c, state: "new" as ElementState };
      if (idx === i - 1) return { value: b, state: "default" as ElementState };
      if (idx === i - 2) return { value: a, state: "default" as ElementState };
      return { value: idx, state: "default" as ElementState };
    });
    steps.push([...calculationStep]);
    
    // Update values for next iteration
    a = b;
    b = c;
  }
  
  // Final Fibonacci sequence
  const fibSequence: ArrayElement[] = [];
  a = 0;
  b = 1;
  fibSequence.push({ value: a, state: "default" });
  fibSequence.push({ value: b, state: "default" });
  
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    fibSequence.push({ value: c, state: i === n ? "found" as ElementState : "default" as ElementState });
    a = b;
    b = c;
  }
  
  steps.push([...fibSequence]);
  
  return steps;
};

// Sieve of Eratosthenes
export const sieveOfEratosthenes = (n: number): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  const primes: boolean[] = new Array(n + 1).fill(true);
  
  // 0 and 1 are not prime
  primes[0] = false;
  primes[1] = false;
  
  // Initial state
  const initialState: ArrayElement[] = Array.from({ length: n + 1 }, (_, i) => ({
    value: i,
    state: i <= 1 ? "comparing" as ElementState : "default" as ElementState
  }));
  steps.push([...initialState]);
  
  // Mark 0 and 1 as not prime
  const step1: ArrayElement[] = Array.from({ length: n + 1 }, (_, i) => ({
    value: i,
    state: i <= 1 ? "sorted" as ElementState : "default" as ElementState
  }));
  steps.push([...step1]);
  
  // Find all primes
  for (let p = 2; p * p <= n; p++) {
    if (primes[p]) {
      // Highlight current prime
      const currentPrimeStep: ArrayElement[] = Array.from({ length: n + 1 }, (_, i) => ({
        value: i,
        state: i < p ? (primes[i] ? "found" as ElementState : "sorted" as ElementState) : 
               i === p ? "comparing" as ElementState : "default" as ElementState
      }));
      steps.push([...currentPrimeStep]);
      
      // Mark multiples of p
      for (let i = p * p; i <= n; i += p) {
        primes[i] = false;
        
        // Highlight current multiple
        const multipleStep: ArrayElement[] = Array.from({ length: n + 1 }, (_, j) => ({
          value: j,
          state: j < p ? (primes[j] ? "found" as ElementState : "sorted" as ElementState) : 
                 j === p ? "comparing" as ElementState : 
                 j === i ? "current" as ElementState : 
                 j < i && !primes[j] ? "sorted" as ElementState : "default" as ElementState
        }));
        steps.push([...multipleStep]);
        
        // Mark as not prime
        const markStep: ArrayElement[] = Array.from({ length: n + 1 }, (_, j) => ({
          value: j,
          state: j < p ? (primes[j] ? "found" as ElementState : "sorted" as ElementState) : 
                 j === p ? "comparing" as ElementState : 
                 j <= i && !primes[j] ? "sorted" as ElementState : "default" as ElementState
        }));
        steps.push([...markStep]);
      }
    }
  }
  
  // Final state - all primes found
  const finalState: ArrayElement[] = Array.from({ length: n + 1 }, (_, i) => ({
    value: i,
    state: primes[i] ? "found" as ElementState : "sorted" as ElementState
  }));
  steps.push([...finalState]);
  
  return steps;
};

// Binary Exponentiation
export const binaryExponentiation = (x: number, n: number): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  
  // Initial state
  const initialState: ArrayElement[] = [
    { value: x, state: "default" },
    { value: n, state: "default" },
    { value: 1, state: "current" } // Result starts at 1
  ];
  steps.push([...initialState]);
  
  let base = x;
  let exponent = n;
  let result = 1;
  
  while (exponent > 0) {
    // Check if exponent is odd
    const checkStep: ArrayElement[] = [
      { value: base, state: "default" },
      { value: exponent, state: "comparing" },
      { value: result, state: "current" }
    ];
    steps.push([...checkStep]);
    
    if (exponent % 2 === 1) {
      // Multiply result by base if exponent is odd
      const oldResult = result;
      result *= base;
      
      const multiplyStep: ArrayElement[] = [
        { value: base, state: "comparing" },
        { value: exponent, state: "default" },
        { value: oldResult, state: "comparing" },
        { value: result, state: "new" }
      ];
      steps.push([...multiplyStep]);
    }
    
    // Square the base
    const oldBase = base;
    base *= base;
    
    // Integer divide the exponent
    exponent = Math.floor(exponent / 2);
    
    const updateStep: ArrayElement[] = [
      { value: oldBase, state: "comparing" },
      { value: base, state: "new" },
      { value: exponent, state: "current" },
      { value: result, state: "default" }
    ];
    steps.push([...updateStep]);
  }
  
  // Final result
  const finalStep: ArrayElement[] = [
    { value: x, state: "default" },
    { value: n, state: "default" },
    { value: result, state: "found" }
  ];
  steps.push([...finalStep]);
  
  return steps;
};

// Primality Test
export const primalityTest = (n: number): ArrayElement[][] => {
  const steps: ArrayElement[][] = [];
  
  // Initial value
  const initialStep: ArrayElement[] = [
    { value: n, state: "default" }
  ];
  steps.push([...initialStep]);
  
  if (n <= 1) {
    // Not prime
    const notPrimeStep: ArrayElement[] = [
      { value: n, state: "sorted" } // Use "sorted" for non-prime
    ];
    steps.push([...notPrimeStep]);
    return steps;
  }
  
  if (n <= 3) {
    // Is prime
    const primeStep: ArrayElement[] = [
      { value: n, state: "found" } // Use "found" for prime
    ];
    steps.push([...primeStep]);
    return steps;
  }
  
  if (n % 2 === 0 || n % 3 === 0) {
    // Check divisibility by 2 and 3
    const divisibleStep: ArrayElement[] = [
      { value: n, state: "comparing" },
      { value: n % 2 === 0 ? 2 : 3, state: "comparing" }
    ];
    steps.push([...divisibleStep]);
    
    // Not prime
    const notPrimeStep: ArrayElement[] = [
      { value: n, state: "sorted" } // Use "sorted" for non-prime
    ];
    steps.push([...notPrimeStep]);
    return steps;
  }
  
  // Check divisibility by values of form 6k ± 1 up to sqrt(n)
  for (let i = 5; i * i <= n; i += 6) {
    // Check i
    const checkI: ArrayElement[] = [
      { value: n, state: "default" },
      { value: i, state: "comparing" }
    ];
    steps.push([...checkI]);
    
    if (n % i === 0) {
      // Not prime, divisible by i
      const divisibleStep: ArrayElement[] = [
        { value: n, state: "comparing" },
        { value: i, state: "found" },
        { value: n / i, state: "found" }
      ];
      steps.push([...divisibleStep]);
      
      // Not prime
      const notPrimeStep: ArrayElement[] = [
        { value: n, state: "sorted" } // Use "sorted" for non-prime
      ];
      steps.push([...notPrimeStep]);
      return steps;
    }
    
    // Check i+2
    const checkI2: ArrayElement[] = [
      { value: n, state: "default" },
      { value: i + 2, state: "comparing" }
    ];
    steps.push([...checkI2]);
    
    if (n % (i + 2) === 0) {
      // Not prime, divisible by i+2
      const divisibleStep: ArrayElement[] = [
        { value: n, state: "comparing" },
        { value: i + 2, state: "found" },
        { value: n / (i + 2), state: "found" }
      ];
      steps.push([...divisibleStep]);
      
      // Not prime
      const notPrimeStep: ArrayElement[] = [
        { value: n, state: "sorted" } // Use "sorted" for non-prime
      ];
      steps.push([...notPrimeStep]);
      return steps;
    }
  }
  
  // Is prime
  const primeStep: ArrayElement[] = [
    { value: n, state: "found" } // Use "found" for prime
  ];
  steps.push([...primeStep]);
  
  return steps;
};
