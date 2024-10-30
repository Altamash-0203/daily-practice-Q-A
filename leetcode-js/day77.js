/*
1671. Minimum Number of Removals to Make Mountain Array
Hard
Topics
Companies
Hint
You may recall that an array arr is a mountain array if and only if:

arr.length >= 3
There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
Given an integer array nums​​​, return the minimum number of elements to remove to make nums​​​ a mountain array.

 

Example 1:

Input: nums = [1,3,1]
Output: 0
Explanation: The array itself is a mountain array so we do not need to remove any elements.
Example 2:

Input: nums = [2,1,1,5,6,2,3,1]
Output: 3
Explanation: One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].
*/

function minimumMountainRemovals(nums) {
    const n = nums.length;
    
    // Arrays to store the lengths of increasing subsequences
    const lis = new Array(n).fill(1);
    const lds = new Array(n).fill(1);

    // Fill LIS array (left to right)
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                lis[i] = Math.max(lis[i], lis[j] + 1);
            }
        }
    }

    // Fill LDS array (right to left)
    for (let i = n - 2; i >= 0; i--) {
        for (let j = n - 1; j > i; j--) {
            if (nums[i] > nums[j]) {
                lds[i] = Math.max(lds[i], lds[j] + 1);
            }
        }
    }

    // Calculate the minimum removals
    let minRemovals = Infinity;
    for (let i = 1; i < n - 1; i++) {
        if (lis[i] > 1 && lds[i] > 1) {  // Valid mountain peak
            const mountainLength = lis[i] + lds[i] - 1;
            minRemovals = Math.min(minRemovals, n - mountainLength);
        }
    }

    return minRemovals;
}

// Test cases
console.log(minimumMountainRemovals([1, 3, 1]));         // Output: 0
console.log(minimumMountainRemovals([2, 1, 1, 5, 6, 2, 3, 1])); // Output: 3
