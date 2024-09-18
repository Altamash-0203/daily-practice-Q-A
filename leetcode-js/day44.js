/*




You said:
179. Largest Number
Medium
Topics
Companies
Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.

Since the result may be very large, so you need to return a string instead of an integer.

 

Example 1:

Input: nums = [10,2]
Output: "210"
Example 2:

Input: nums = [3,30,34,5,9]
Output: "9534330"

*/

function largestNumber(nums) {
    // Convert all numbers to strings for easy concatenation
    nums = nums.map(String);
    
    // Custom sort based on concatenation of two numbers
    nums.sort((a, b) => (b + a) - (a + b));
    
    // Join the sorted numbers into a single string
    let result = nums.join('');
    
    // Edge case: when the result is all zeros, return '0'
    return result[0] === '0' ? '0' : result;
}

// Example usage
console.log(largestNumber([10, 2]));  // Output: "210"
console.log(largestNumber([3, 30, 34, 5, 9]));  // Output: "9534330"
