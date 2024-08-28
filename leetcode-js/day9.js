/*
Write a function argumentsLength that returns the count of arguments passed to it.
 

Example 1:

Input: args = [5]
Output: 1
Explanation:
argumentsLength(5); // 1

One value was passed to the function so it should return 1.
Example 2:

Input: args = [{}, null, "3"]
Output: 3
Explanation: 
argumentsLength({}, null, "3"); // 3

Three values were passed to the function so it should return 3.
*/

function argumentsLength(...args) // The ...args syntax allows the function to accept any number of arguments. All the arguments passed to the function are collected into an array-like object called args.

{
  return args.length;
}

// Example usage:
console.log(argumentsLength(5));      // the number of passing in this line it showing count
console.log(argumentsLength({}, null, "3")); // Output: 3 because there are three value passed {},null,string

