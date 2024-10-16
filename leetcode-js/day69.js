/*
1405. Longest Happy String
Medium
Topics
Companies
Hint
A string s is called happy if it satisfies the following conditions:

s only contains the letters 'a', 'b', and 'c'.
s does not contain any of "aaa", "bbb", or "ccc" as a substring.
s contains at most a occurrences of the letter 'a'.
s contains at most b occurrences of the letter 'b'.
s contains at most c occurrences of the letter 'c'.
Given three integers a, b, and c, return the longest possible happy string. If there are multiple longest happy strings, return any of them. If there is no such string, return the empty string "".

A substring is a contiguous sequence of characters within a string.

 

Example 1:

Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
Explanation: "ccbccacc" would also be a correct answer.
Example 2:

Input: a = 7, b = 1, c = 0
Output: "aabaa"
Explanation: It is the only correct answer in this case.
*/
function longestDiverseString(a, b, c) {
    const res = [];
    // Max-heap like array [count, character]
    let heap = [];
    
    if (a > 0) heap.push([a, 'a']);
    if (b > 0) heap.push([b, 'b']);
    if (c > 0) heap.push([c, 'c']);
    
    while (heap.length > 0) {
        // Sort heap based on remaining counts, so the largest count comes first
        heap.sort((x, y) => y[0] - x[0]);
        
        let first = heap[0];
        let second = heap.length > 1 ? heap[1] : null;
        
        // If the current result ends with two consecutive 'first[1]', add from second
        if (res.length >= 2 && res[res.length - 1] === first[1] && res[res.length - 2] === first[1]) {
            if (!second) break; // If there's no other character to use, break
            res.push(second[1]);
            second[0]--;
            if (second[0] === 0) heap.splice(1, 1); // Remove second if it's depleted
        } else {
            // Otherwise, use the first character
            res.push(first[1]);
            first[0]--;
            if (first[0] === 0) heap.splice(0, 1); // Remove first if it's depleted
        }
    }
    
    return res.join('');
}
