/*
564. Find the Closest Palindrome
Hard
Topics
Companies
Hint
Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.

The closest is defined as the absolute difference minimized between two integers.

 

Example 1:

Input: n = "123"
Output: "121"
Example 2:

Input: n = "1"
Output: "0"
Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.
*/function nearestPalindromic(n) {
    const intN = BigInt(n);  // Use BigInt to handle very large numbers
    
    // Edge case: if n is 1, the closest palindrome is 0
    if (intN === 1n) {
        return "0";
    }

    // Helper function to create a palindrome by mirroring the first half
    function createPalindrome(firstHalf, length) {
        const firstHalfStr = firstHalf.toString();
        if (length % 2 === 0) {
            return BigInt(firstHalfStr + firstHalfStr.split('').reverse().join(''));
        } else {
            return BigInt(firstHalfStr + firstHalfStr.slice(0, -1).split('').reverse().join(''));
        }
    }

    const length = n.length;
    const firstHalf = n.slice(0, Math.ceil(length / 2));
    const firstHalfInt = BigInt(firstHalf);

    // Create three palindrome candidates by adjusting the first half
    const samePalindrome = createPalindrome(firstHalfInt, length);
    const smallerPalindrome = createPalindrome(firstHalfInt - 1n, length);
    const largerPalindrome = createPalindrome(firstHalfInt + 1n, length);

    // Add edge case palindromes (like all 9's case, 999 -> 1001)
    const candidates = [
        smallerPalindrome,
        samePalindrome,
        largerPalindrome,
        BigInt(10) ** BigInt(length - 1) - 1n,  // Case for 1000 -> 999
        BigInt(10) ** BigInt(length) + 1n       // Case for 999 -> 1001
    ];

    // Filter out the original number itself
    const filteredCandidates = candidates.filter(cand => cand !== intN);

    // Sort by closest distance, and in case of tie, by smaller value
    filteredCandidates.sort((a, b) => {
        const diffA = a > intN ? a - intN : intN - a;



        
        const diffB = b > intN ? b - intN : intN - b;
        if (diffA === diffB) {
            return a < b ? -1 : 1;
        }
        return diffA < diffB ? -1 : 1;
    });

    // Return the closest palindrome as a string
    return filteredCandidates[0].toString();
}

// Example usage:
var ret = nearestPalindromic("807045053224792883");  // Example input
console.log(ret);  // Output should match expected: "807045053350540708"

