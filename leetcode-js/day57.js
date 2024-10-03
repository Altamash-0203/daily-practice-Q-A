/*

1590. Make Sum Divisible by P
Medium
Topics
Companies
Hint
Given an array of positive integers nums, remove the smallest subarray (possibly empty) such that the sum of the remaining elements is divisible by p. It is not allowed to remove the whole array.

Return the length of the smallest subarray that you need to remove, or -1 if it's impossible.

A subarray is defined as a contiguous block of elements in the array.

 

Example 1:

Input: nums = [3,1,4,2], p = 6
Output: 1
Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.
Example 2:

Input: nums = [6,3,5,2], p = 9
Output: 2
Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.
Example 3:

Input: nums = [1,2,3], p = 3
Output: 0
Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.

*/

var minSubarray = function(nums, p) {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);
    const remainder = totalSum % p;
    
    if (remainder === 0) return 0; // If total sum is already divisible by p, return 0

    const modMap = new Map(); // To store (prefix sum % p) and its index
    modMap.set(0, -1); // To handle cases where removing the prefix gives a valid subarray
    let currentPrefixSum = 0;
    let minLen = nums.length;

    for (let i = 0; i < nums.length; i++) {
        currentPrefixSum = (currentPrefixSum + nums[i]) % p;
        const targetMod = (currentPrefixSum - remainder + p) % p; // Adjust for negative mod

        if (modMap.has(targetMod)) {
            minLen = Math.min(minLen, i - modMap.get(targetMod));
        }

        // Store the current prefix sum mod p and index
        modMap.set(currentPrefixSum, i);
    }

    // If minLen hasn't changed, no valid subarray was found
    return minLen === nums.length ? -1 : minLen;
};

// Example usage:
console.log(minSubarray([3, 1, 4, 2], 6)); // Output: 1
console.log(minSubarray([6, 3, 5, 2], 9)); // Output: 2
console.log(minSubarray([1, 2, 3], 3));    // Output: 0

