/*
386. Lexicographical Numbers
Medium
Topics
Companies
Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.

You must write an algorithm that runs in O(n) time and uses O(1) extra space. 

 

Example 1:

Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
Example 2:

Input: n = 2
Output: [1,2]
*/


function lexicalOrder(n) {
    const result = [];

    // Helper function for DFS traversal
    function dfs(current) {
        if (current > n) return;
        result.push(current);
        for (let i = 0; i <= 9; i++) {
            if (current * 10 + i > n) return;
            dfs(current * 10 + i);
        }
    }

    // Start DFS traversal from 1 to 9
    for (let i = 1; i <= 9; i++) {
        if (i > n) break;
        dfs(i);
    }

    return result;
}

// Example usage
console.log(lexicalOrder(13)); // Output: [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(lexicalOrder(2));  // Output: [1, 2]
