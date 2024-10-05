/*
567. Permutation in String
Medium
Topics
Companies
Hint
Given two strings s1 and s2, return true if s2 contains a 
permutation
 of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

 

Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false
*/

function checkInclusion(s1, s2) {
    const s1Length = s1.length;
    const s2Length = s2.length;

    if (s1Length > s2Length) {
        return false;
    }

    // Create frequency arrays for s1 and s2 (window)
    const s1Count = new Array(26).fill(0);
    const s2Count = new Array(26).fill(0);

    // Fill the frequency array for s1 and the first window of s2
    for (let i = 0; i < s1Length; i++) {
        s1Count[s1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        s2Count[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    // Check the first window
    if (matches(s1Count, s2Count)) {
        return true;
    }

    // Slide the window over s2
    for (let i = s1Length; i < s2Length; i++) {
        // Add the new character in the window
        s2Count[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;

        // Remove the old character from the window
        s2Count[s2.charCodeAt(i - s1Length) - 'a'.charCodeAt(0)]--;

        // Check if the current window matches s1Count
        if (matches(s1Count, s2Count)) {
            return true;
        }
    }

    return false;
}

// Helper function to compare two frequency arrays
function matches(s1Count, s2Count) {
    for (let i = 0; i < 26; i++) {
        if (s1Count[i] !== s2Count[i]) {
            return false;
        }
    }
    return true;
}

// Example usage
console.log(checkInclusion("ab", "eidbaooo")); // true
console.log(checkInclusion("ab", "eidboaoo")); // false
