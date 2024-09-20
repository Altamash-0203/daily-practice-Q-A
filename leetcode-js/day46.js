/*
214. Shortest Palindrome
Hard
Topics
Companies
You are given a string s. You can convert s to a 
palindrome
 by adding characters in front of it.

Return the shortest palindrome you can find by performing this transformation.

 

Example 1:

Input: s = "aacecaaa"
Output: "aaacecaaa"
Example 2:

Input: s = "abcd"
Output: "dcbabcd"
*/

function shortestPalindrome(s) {
    if (!s) return s;

    // Function to compute the LPS array using KMP preprocessing
    function computeLPS(pattern) {
        const lps = new Array(pattern.length).fill(0);
        let length = 0; // Length of the previous longest prefix suffix

        // Loop to calculate lps[i] for i from 1 to pattern.length - 1
        for (let i = 1; i < pattern.length; i++) {
            while (length > 0 && pattern[i] !== pattern[length]) {
                length = lps[length - 1];
            }

            if (pattern[i] === pattern[length]) {
                length++;
                lps[i] = length;
            } else {
                lps[i] = 0;
            }
        }
        return lps;
    }

    // Reverse the string s
    const reversed_s = s.split('').reverse().join('');

    // Concatenate s, a special character '#', and reversed_s
    const new_s = s + '#' + reversed_s;

    // Compute the LPS array for the concatenated string
    const lps = computeLPS(new_s);

    // The value at the last index of lps will tell us the count of characters
    // that form the palindrome prefix
    const max_palindrome_prefix_length = lps[lps.length - 1];

    // The remaining suffix to be added in front is s[max_palindrome_prefix_length:]
    const suffix_to_add = reversed_s.slice(0, s.length - max_palindrome_prefix_length);

    // Form the shortest palindrome
    return suffix_to_add + s;
}

// Test cases
const testCases = [
    { input: "aacecaaa", expected: "aaacecaaa" },
    { input: "abcd", expected: "dcbabcd" },
    { input: "", expected: "" },
    { input: "a", expected: "a" },
    { input: "ab", expected: "bab" },
    { input: "race", expected: "ecarace" },
    { input: "google", expected: "elgoogle" }
];

testCases.forEach(({ input, expected }, index) => {
    const result = shortestPalindrome(input);
    console.assert(result === expected, `Test case ${index + 1} failed: expected ${expected}, got ${result}`);
    console.log(`Test case ${index + 1} passed: ${input} -> ${result}`);
});
