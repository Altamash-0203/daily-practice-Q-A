/*
There is a strange printer with the following two special properties:

The printer can only print a sequence of the same character each time.
At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.
Given a string s, return the minimum number of turns the printer needed to print it.

 

Example 1:

Input: s = "aaabbb"
Output: 2
Explanation: Print "aaa" first and then print "bbb".
Example 2:

Input: s = "aba"
Output: 2
Explanation: Print "aaa" first and then print "b" from the second place of the string, which will cover the existing character 'a'.
*/



function strangePrinter(s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // Base case: single character substrings require 1 turn
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    // Fill the DP table
    for (let len = 2; len <= n; len++) { // len is the length of the substring
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            dp[i][j] = dp[i][j - 1] + 1; // max case: print s[j] separately
            
            for (let k = i; k < j; k++) {
                if (s[k] === s[j]) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + (k + 1 <= j - 1 ? dp[k + 1][j - 1] : 0));
                }
            }
        }
    }

    return dp[0][n - 1];
}

// Test cases
console.log(strangePrinter("aaabbb")); // Output: 2
console.log(strangePrinter("aba"));    // Output: 2
