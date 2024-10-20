/*
1106. Parsing A Boolean Expression
Hard
Topics
Companies
Hint
A boolean expression is an expression that evaluates to either true or false. It can be in one of the following shapes:

't' that evaluates to true.
'f' that evaluates to false.
'!(subExpr)' that evaluates to the logical NOT of the inner expression subExpr.
'&(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical AND of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
'|(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical OR of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
Given a string expression that represents a boolean expression, return the evaluation of that expression.

It is guaranteed that the given expression is valid and follows the given rules.

 

Example 1:

Input: expression = "&(|(f))"
Output: false
Explanation: 
First, evaluate |(f) --> f. The expression is now "&(f)".
Then, evaluate &(f) --> f. The expression is now "f".
Finally, return false.
Example 2:

Input: expression = "|(f,f,f,t)"
Output: true
Explanation: The evaluation of (false OR false OR false OR true) is true.
Example 3:

Input: expression = "!(&(f,t))"
Output: true
Explanation: 
First, evaluate &(f,t) --> (false AND true) --> false --> f. The expression is now "!(f)".
Then, evaluate !(f) --> NOT false --> true. We return true.
 

Constraints:

1 <= expression.length <= 2 * 104
expression[i] is one following characters: '(', ')', '&', '|', '!', 't', 'f', and ','.
*/

function parseBoolExpr(expression) {
    let stack = [];

    for (let char of expression) {
        if (char === ',') {
            continue;  // Ignore commas as they are just separators
        } else if (char === ')') {
            // Collect all values for this operation
            let values = [];
            while (stack[stack.length - 1] !== '(') {
                values.push(stack.pop());
            }
            stack.pop();  // Remove '('
            
            let operator = stack.pop();
            
            // Perform the logical operation
            if (operator === '&') {
                stack.push(values.every(val => val === 't') ? 't' : 'f');
            } else if (operator === '|') {
                stack.push(values.some(val => val === 't') ? 't' : 'f');
            } else if (operator === '!') {
                stack.push(values[0] === 't' ? 'f' : 't');
            }
        } else {
            // Push the current character (boolean or operator) to the stack
            stack.push(char);
        }
    }

    // The result is the only remaining element in the stack
    return stack[0] === 't';
}

// Example usage:
console.log(parseBoolExpr("&(|(f))")); // Output: false
console.log(parseBoolExpr("|(f,f,f,t)")); // Output: true
console.log(parseBoolExpr("!(&(f,t))")); // Output: true
