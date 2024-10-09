/*
921. Minimum Add to Make Parentheses Valid
Medium
Topics
Companies
A parentheses string is valid if and only if:

It is the empty string,
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.
You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.

For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be "())))".
Return the minimum number of moves required to make s valid.

 

Example 1:

Input: s = "())"
Output: 1
Example 2:

Input: s = "((("
Output: 3
*/

function minAddToMakeValid(s) {
    let leftBrackets = 0;
    let rightBrackets = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            leftBrackets++;  // We need a corresponding ')' for each '('
        } else {
            if (leftBrackets > 0) {
                leftBrackets--;  // A valid pair is formed, so reduce leftBrackets count
            } else {
                rightBrackets++;  // We have an extra ')'
            }
        }
    }

    // The total number of moves needed is the sum of unmatched '(' and unmatched ')'
    return leftBrackets + rightBrackets;
}

// Example 1:
console.log(minAddToMakeValid("())"));  // Output: 1

// Example 2:
console.log(minAddToMakeValid("((("));  // Output: 3
