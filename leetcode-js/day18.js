/*
Given a string expression representing an expression of fraction addition and subtraction, return the calculation result in string format.

The final result should be an irreducible fraction. If your final result is an integer, change it to the format of a fraction that has a denominator 1. So in this case, 2 should be converted to 2/1.

 

Example 1:

Input: expression = "-1/2+1/2"
Output: "0/1"
Example 2:

Input: expression = "-1/2+1/2+1/3"
Output: "1/3"
Example 3:

Input: expression = "1/3-1/2"
Output: "-1/6"
*/


// Helper function to find the greatest common divisor (GCD)
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  
  // Helper function to simplify a fraction
  function simplifyFraction(numerator, denominator) {
    const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / commonDivisor, denominator / commonDivisor];
  }
  
  function fractionAddition(expression) {
    let fractions = expression.match(/[+-]?\d+\/\d+/g);
    
    let numeratorSum = 0, denominatorSum = 1;
  
    for (let fraction of fractions) {
      let [numerator, denominator] = fraction.split('/').map(Number);
  
      // Calculate least common denominator (LCD)
      let lcm = denominatorSum * denominator / gcd(denominatorSum, denominator);
  
      // Adjust numerators based on the LCD
      numeratorSum = numeratorSum * (lcm / denominatorSum) + numerator * (lcm / denominator);
      denominatorSum = lcm;
  
      // Simplify the current result
      [numeratorSum, denominatorSum] = simplifyFraction(numeratorSum, denominatorSum);
    }
  
    // If the numerator is 0, the fraction is 0/1
    if (numeratorSum === 0) return "0/1";
  
    // Return the simplified fraction
    return `${numeratorSum}/${denominatorSum}`;
  }
  
  // Example usage:
  console.log(fractionAddition("-1/2+1/2")); // Output: "0/1"
  console.log(fractionAddition("-1/2+1/2+1/3")); // Output: "1/3"
  console.log(fractionAddition("1/3-1/2")); // Output: "-1/6"
  