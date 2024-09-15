/*
1371. Find the Longest Substring Containing Vowels in Even Counts
Medium
Topics
Companies
Hint
Given the string s, return the size of the longest substring containing each vowel an even number of times. That is, 'a', 'e', 'i', 'o', and 'u' must appear an even number of times.

 

Example 1:

Input: s = "eleetminicoworoep"
Output: 13
Explanation: The longest substring is "leetminicowor" which contains two each of the vowels: e, i and o and zero of the vowels: a and u.
Example 2:

Input: s = "leetcodeisgreat"
Output: 5
Explanation: The longest substring is "leetc" which contains two e's.
Example 3:

Input: s = "bcbcbc"
Output: 6
Explanation: In this case, the given string "bcbcbc" is the longest because all vowels: a, e, i, o and u appear zero times.
*/

function findTheLongestSubstring(s) {
    const vowelMask = { 'a': 1 << 0, 'e': 1 << 1, 'i': 1 << 2, 'o': 1 << 3, 'u': 1 << 4 };
    
    let mask = 0;  // To track the parity of the vowels
    let maxLength = 0;
    
    // Map to store the first occurrence of each mask state
    let maskMap = new Map();
    maskMap.set(0, -1);  // We set this to handle cases where the whole string has even counts from the start
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] in vowelMask) {
            // Toggle the bit corresponding to the vowel
            mask ^= vowelMask[s[i]];
        }
        
        // If the mask has been seen before, it means the substring between these two points has even vowel counts
        if (maskMap.has(mask)) {
            maxLength = Math.max(maxLength, i - maskMap.get(mask));
        } else {
            // Store the first occurrence of this mask
            maskMap.set(mask, i);
        }
    }
    
    return maxLength;
}

// Test cases
console.log(findTheLongestSubstring("eleetminicoworoep")); // Output: 13
console.log(findTheLongestSubstring("leetcodeisgreat"));    // Output: 5
console.log(findTheLongestSubstring("bcbcbc"));             // Output: 6
