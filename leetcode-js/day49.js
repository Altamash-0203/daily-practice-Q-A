/*
2707. Extra Characters in a String
Medium
Topics
Companies
Hint
You are given a 0-indexed string s and a dictionary of words dictionary. You have to break s into one or more non-overlapping substrings such that each substring is present in dictionary. There may be some extra characters in s which are not present in any of the substrings.

Return the minimum number of extra characters left over if you break up s optimally.

 

Example 1:

Input: s = "leetscode", dictionary = ["leet","code","leetcode"]
Output: 1
Explanation: We can break s in two substrings: "leet" from index 0 to 3 and "code" from index 5 to 8. There is only 1 unused character (at index 4), so we return 1.

Example 2:

Input: s = "sayhelloworld", dictionary = ["hello","world"]
Output: 3
Explanation: We can break s in two substrings: "hello" from index 3 to 7 and "world" from index 8 to 12. The characters at indices 0, 1, 2 are not used in any substring and thus are considered as extra characters. Hence, we return 3.

*/

function minExtraChar(s, dictionary) {
    const n = s.length;
    const dp = new Array(n + 1).fill(0); // dp[i] stores the minimum extra characters for the prefix s[0:i-1]
    const wordSet = new Set(dictionary); // Convert dictionary to a set for quick lookup

    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] + 1; // Assume we don't find any valid word ending at i-1 (add 1 extra character)
        
        for (let j = 0; j < i; j++) {
            const substring = s.slice(j, i); // Get substring s[j:i]
            if (wordSet.has(substring)) {
                dp[i] = Math.min(dp[i], dp[j]); // No extra characters if we match a word
            }
        }
    }

    return dp[n];
}

// Example usage:
console.log(minExtraChar("leetscode", ["leet", "code", "leetcode"])); // Output: 1
console.log(minExtraChar("sayhelloworld", ["hello", "world"])); // Output: 3
