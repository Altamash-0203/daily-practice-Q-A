/*
1331. Rank Transform of an Array
Easy
Topics
Companies
Hint
Given an array of integers arr, replace each element with its rank.

The rank represents how large the element is. The rank has the following rules:

Rank is an integer starting from 1.
The larger the element, the larger the rank. If two elements are equal, their rank must be the same.
Rank should be as small as possible.
 

Example 1:

Input: arr = [40,10,20,30]
Output: [4,1,2,3]
Explanation: 40 is the largest element. 10 is the smallest. 20 is the second smallest. 30 is the third smallest.
Example 2:

Input: arr = [100,100,100]
Output: [1,1,1]
Explanation: Same elements share the same rank.
Example 3:

Input: arr = [37,12,28,9,100,56,80,5,12]
Output: [5,3,4,2,8,6,7,1,3]

*/
function arrayRankTransform(arr) {
    // Create a copy of the array and sort it in ascending order
    const sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    
    // Create a map to store the rank of each element
    const rankMap = new Map();
    
    // Assign ranks starting from 1
    sortedArr.forEach((num, index) => {
        rankMap.set(num, index + 1);
    });

    // Replace each element in the original array with its rank
    return arr.map(num => rankMap.get(num));
}

// Test cases
console.log(arrayRankTransform([40, 10, 20, 30])); // Output: [4, 1, 2, 3]
console.log(arrayRankTransform([100, 100, 100])); // Output: [1, 1, 1]
console.log(arrayRankTransform([37, 12, 28, 9, 100, 56, 80, 5, 12])); // Output: [5, 3, 4, 2, 8, 6, 7, 1, 3]
