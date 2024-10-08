/*
1963. Minimum Number of Swaps to Make the String Balanced
Medium
Topics
Companies
Hint
You are given a 0-indexed string s of even length n. The string consists of exactly n / 2 opening brackets '[' and n / 2 closing brackets ']'.

A string is called balanced if and only if:

It is the empty string, or
It can be written as AB, where both A and B are balanced strings, or
It can be written as [C], where C is a balanced string.
You may swap the brackets at any two indices any number of times.

Return the minimum number of swaps to make s balanced.

 

Example 1:

Input: s = "][]["
Output: 1
Explanation: You can make the string balanced by swapping index 0 with index 3.
The resulting string is "[[]]".
Example 2:

Input: s = "]]][[["
Output: 2
Explanation: You can do the following to make the string balanced:
- Swap index 0 with index 4. s = "[]][][".
- Swap index 1 with index 5. s = "[[][]]".
The resulting string is "[[][]]".
Example 3:

Input: s = "[]"
Output: 0
Explanation: The string is already balanced.

*/

function minSwaps(s) {
    let balance = 0;
    let maxImbalance = 0;
    
    // Iterate through the string
    for (let char of s) {
        // Increase balance for '[', decrease for ']'
        if (char === '[') {
            balance++;
        } else {
            balance--;
        }
        
        // Track the maximum imbalance (negative balance)
        if (balance < 0) {
            maxImbalance = Math.max(maxImbalance, -balance);
        }
    }
    
    // The minimum number of swaps required is half the maximum imbalance
    return Math.ceil(maxImbalance / 2);
}

// Example usage:
console.log(minSwaps("][][")); // Output: 1
console.log(minSwaps("]]][[[")); // Output: 2
console.log(minSwaps("[]")); // Output: 0
