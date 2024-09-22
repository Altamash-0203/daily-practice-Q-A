/*
440. K-th Smallest in Lexicographical Order
Hard
Topics
Companies
Given two integers n and k, return the kth lexicographically smallest integer in the range [1, n].

 

Example 1:

Input: n = 13, k = 2
Output: 10
Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.
Example 2:

Input: n = 1, k = 1
Output: 1
*/

var findKthNumber = function(n, k) {
    // Helper function to count the numbers in the prefix range [prefix, prefix + 1)
    const countSteps = (prefix, n) => {
        let current = prefix;
        let next = prefix + 1;
        let steps = 0;
        
        while (current <= n) {
            steps += Math.min(n + 1, next) - current;
            current *= 10;
            next *= 10;
        }
        return steps;
    }

    let current = 1;
    k -= 1; // We start with the first number, so we reduce k by 1

    while (k > 0) {
        let steps = countSteps(current, n);
        
        if (steps <= k) {
            // If there are not enough numbers in the current prefix, move to the next sibling
            current += 1;
            k -= steps;
        } else {
            // If there are enough numbers in the current prefix, move to the next level in the prefix tree
            current *= 10;
            k -= 1;
        }
    }

    return current;
};

// Example usage:
console.log(findKthNumber(13, 2)); // Output: 10
console.log(findKthNumber(1, 1));  // Output: 1
