/*
2696. Minimum String Length After Removing Substrings
Easy
Topics
Companies
Hint
You are given a string s consisting only of uppercase English letters.

You can apply some operations to this string where, in one operation, you can remove any occurrence of one of the substrings "AB" or "CD" from s.

Return the minimum possible length of the resulting string that you can obtain.

Note that the string concatenates after removing the substring and could produce new "AB" or "CD" substrings.

 

Example 1:

Input: s = "ABFCACDB"
Output: 2
Explanation: We can do the following operations:
- Remove the substring "ABFCACDB", so s = "FCACDB".
- Remove the substring "FCACDB", so s = "FCAB".
- Remove the substring "FCAB", so s = "FC".
So the resulting length of the string is 2.
It can be shown that it is the minimum length that we can obtain.
Example 2:

Input: s = "ACBBD"
Output: 5
Explanation: We cannot do any operations on the string so the length remains the same.
*/


function minLength(s) {
    const stack = [];

    for (let char of s) {
        // Check the top of the stack and the current character
        if (stack.length > 0 && (
            (stack[stack.length - 1] === 'A' && char === 'B') || 
            (stack[stack.length - 1] === 'C' && char === 'D')
        )) {
            // If the top of the stack is 'A' and current char is 'B', pop 'A'
            // If the top of the stack is 'C' and current char is 'D', pop 'C'
            stack.pop();
        } else {
            // Otherwise, push the current character to the stack
            stack.push(char);
        }
    }

    // The length of the stack represents the final length of the string
    return stack.length;
}

// Example 1:
console.log(minLength("ABFCACDB"));  // Output: 2

// Example 2:
console.log(minLength("ACBBD"));     // Output: 5
