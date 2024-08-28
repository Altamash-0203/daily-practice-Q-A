/*
Given an integer array nums, a reducer function fn, and an initial value init, return the final result obtained by executing the fn function on each element of the array, sequentially, passing in the return value from the calculation on the preceding element.

This result is achieved through the following operations: val = fn(init, nums[0]), val = fn(val, nums[1]), val = fn(val, nums[2]), ... until every element in the array has been processed. The ultimate value of val is then returned.

If the length of the array is 0, the function should return init.

Please solve it without using the built-in Array.reduce method.

 

Example 1:

Input: 
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr; }
init = 0
Output: 10
Explanation:
initially, the value is init=0.
(0) + nums[0] = 1
(1) + nums[1] = 3
(3) + nums[2] = 6
(6) + nums[3] = 10
The final answer is 10.
Example 2:

Input: 
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr * curr; }
init = 100
Output: 130
Explanation:
initially, the value is init=100.
(100) + nums[0] * nums[0] = 101
(101) + nums[1] * nums[1] = 105
(105) + nums[2] * nums[2] = 114
(114) + nums[3] * nums[3] = 130
The final answer is 130.
Example 3:

Input: 
nums = []
fn = function sum(accum, curr) { return 0; }
init = 25
Output: 25
Explanation: For empty arrays, the answer is always init.
*/


function reduce(nums, fn, init) {
    // Check if nums is an empty array
    if (nums.length === 0) {
        return init;
    }
    
    // Initialize the value with the initial value
    let val = init;
    
    // Iterate over each element in the nums array
    for (let i = 0; i < nums.length; i++) {
        // Apply the function fn to the current value and the current element
        val = fn(val, nums[i]);
    }
    
    // Return the final result
    return val;
}

// Define the function that will be used as the reducer
function sum(accum, curr) {
    return accum + curr;
}

// Example 1: Summing an array of numbers
let nums1 = [1, 2, 3, 4];
let init1 = 0;
let result1 = reduce(nums1, sum, init1);
console.log(result1); // Output: 10

// Example 2: Summing squares of numbers with an initial value of 100
function sumOfSquares(accum, curr) {
    return accum + curr * curr;
}

let nums2 = [1, 2, 3, 4];
let init2 = 100;
let result2 = reduce(nums2, sumOfSquares, init2);
console.log(result2); // Output: 130

// Example 3: Empty array, should return the initial value
let nums3 = [];
let init3 = 25;
let result3 = reduce(nums3, sum, init3);
console.log(result3); // Output: 25

// // Example 4: Using a different function, e.g., multiplying elements
// function multiply(accum, curr) {
//     return accum * curr;
// }

// let nums4 = [1, 2, 3, 4];
// let init4 = 1;
// let result4 = reduce(nums4, multiply, init4);
// console.log(result4); // Output: 24
