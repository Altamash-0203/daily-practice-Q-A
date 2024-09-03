/*
1945. Sum of Digits of String After Convert
Easy
Topics
Companies
Hint
You are given a string s consisting of lowercase English letters, and an integer k.

First, convert s into an integer by replacing each letter with its position in the alphabet (i.e., replace 'a' with 1, 'b' with 2, ..., 'z' with 26). Then, transform the integer by replacing it with the sum of its digits. Repeat the transform operation k times in total.

For example, if s = "zbax" and k = 2, then the resulting integer would be 8 by the following operations:

Convert: "zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124
Transform #1: 262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17
Transform #2: 17 ➝ 1 + 7 ➝ 8
Return the resulting integer after performing the operations described above.

 

Example 1:

Input: s = "iiii", k = 1
Output: 36
Explanation: The operations are as follows:
- Convert: "iiii" ➝ "(9)(9)(9)(9)" ➝ "9999" ➝ 9999
- Transform #1: 9999 ➝ 9 + 9 + 9 + 9 ➝ 36
Thus the resulting integer is 36.
Example 2:

Input: s = "leetcode", k = 2
Output: 6
Explanation: The operations are as follows:
- Convert: "leetcode" ➝ "(12)(5)(5)(20)(3)(15)(4)(5)" ➝ "12552031545" ➝ 12552031545
- Transform #1: 12552031545 ➝ 1 + 2 + 5 + 5 + 2 + 0 + 3 + 1 + 5 + 4 + 5 ➝ 33
- Transform #2: 33 ➝ 3 + 3 ➝ 6
Thus the resulting integer is 6.
Example 3:

Input: s = "zbax", k = 2
Output: 8
*/

function getLucky(s, k) {
    // Convert the string to a number string
    let numStr = '';
    for (let char of s) {
        numStr += (char.charCodeAt(0) - 'a'.charCodeAt(0) + 1).toString();
    }
    
    // Initial sum of digits
    let total = numStr.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    // Perform the transformation k-1 more times
    for (let i = 1; i < k; i++) {
        total = total.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    
    return total;
}

// Example usage:
const s1 = "iiii";
const k1 = 1;
console.log(`Result for input (${s1}, ${k1}):`, getLucky(s1, k1)); // Output: 36

const s2 = "leetcode";
const k2 = 2;
console.log(`Result for input (${s2}, ${k2}):`, getLucky(s2, k2)); // Output: 6

const s3 = "zbax";
const k3 = 2;
console.log(`Result for input (${s3}, ${k3}):`, getLucky(s3, k3)); // Output: 8
