/*
2044. Count Number of Maximum Bitwise-OR Subsets
Medium
Topics
Companies
Hint
Given an integer array nums, find the maximum possible bitwise OR of a subset of nums and return the number of different non-empty subsets with the maximum bitwise OR.

An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements of b. Two subsets are considered different if the indices of the elements chosen are different.

The bitwise OR of an array a is equal to a[0] OR a[1] OR ... OR a[a.length - 1] (0-indexed).

 

Example 1:

Input: nums = [3,1]
Output: 2
Explanation: The maximum possible bitwise OR of a subset is 3. There are 2 subsets with a bitwise OR of 3:
- [3]
- [3,1]
Example 2:

Input: nums = [2,2,2]
Output: 7
Explanation: All non-empty subsets of [2,2,2] have a bitwise OR of 2. There are 23 - 1 = 7 total subsets.
Example 3:

Input: nums = [3,2,1,5]
Output: 6
Explanation: The maximum possible bitwise OR of a subset is 7. There are 6 subsets with a bitwise OR of 7:
- [3,5]
- [3,1,5]
- [3,2,5]
- [3,2,1,5]
- [2,5]
- [2,1,5]

*/


function countMaxOrSubsets(nums) {
    let maxOr = 0;
    let count = 0;

    // Calculate the maximum OR value
    for (let num of nums) {
        maxOr |= num;  // This gives the maximum OR possible
    }

    // Backtracking function to count subsets with maximum OR
    function backtrack(index, currentOr) {
        if (index === nums.length) {
            if (currentOr === maxOr) {
                count++;
            }
            return;
        }

        // Include nums[index] in the subset
        backtrack(index + 1, currentOr | nums[index]);

        // Exclude nums[index] from the subset
        backtrack(index + 1, currentOr);
    }

    // Start backtracking from index 0 and current OR 0
    backtrack(0, 0);

    return count;
}

// Example usage:
console.log(countMaxOrSubsets([3, 1])); // Output: 2
console.log(countMaxOrSubsets([2, 2, 2])); // Output: 7
console.log(countMaxOrSubsets([3, 2, 1, 5])); // Output: 6
