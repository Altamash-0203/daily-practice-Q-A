/*
1497. Check If Array Pairs Are Divisible by k
Medium
Topics
Companies
Hint
Given an array of integers arr of even length n and an integer k.

We want to divide the array into exactly n / 2 pairs such that the sum of each pair is divisible by k.

Return true If you can find a way to do that or false otherwise.

 

Example 1:

Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
Output: true
Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).
Example 2:

Input: arr = [1,2,3,4,5,6], k = 7
Output: true
Explanation: Pairs are (1,6),(2,5) and(3,4).
Example 3:

Input: arr = [1,2,3,4,5,6], k = 10
Output: false
Explanation: You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.
*/

function canArrange(arr, k) {
    // Create a frequency map for remainders
    const remainderCount = new Array(k).fill(0);
    
    // Count the remainder of each element when divided by k
    for (let num of arr) {
        const remainder = ((num % k) + k) % k;  // Handle negative numbers
        remainderCount[remainder]++;
    }

    // Check if we can pair the elements correctly
    for (let i = 0; i < k; i++) {
        if (i === 0) {
            // Elements that are divisible by k must have an even count
            if (remainderCount[i] % 2 !== 0) {
                return false;
            }
        } else {
            // The count of elements with remainder i should match
            // the count of elements with remainder k - i
            if (remainderCount[i] !== remainderCount[k - i]) {
                return false;
            }
        }
    }

    return true;
}

// Example usage:
console.log(canArrange([1,2,3,4,5,10,6,7,8,9], 5)); // true
console.log(canArrange([1,2,3,4,5,6], 7)); // true
console.log(canArrange([1,2,3,4,5,6], 10)); // false
