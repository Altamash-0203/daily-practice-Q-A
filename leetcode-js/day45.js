/*

Code
Testcase
Test Result
Test Result
241. Different Ways to Add Parentheses
Medium
Topics
Companies
Given a string expression of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in any order.

The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed 104.

 

Example 1:

Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0 
(2-(1-1)) = 2
Example 2:

Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10
*/


var diffWaysToCompute = function(expression) {
    // Define a function to evaluate two numbers with a given operator
    const compute = (left, right, operator) => {
        switch(operator) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            default:
                return 0;
        }
    };

    // If the expression is a pure number, return it as a single result
    if (!expression.includes('+') && !expression.includes('-') && !expression.includes('*')) {
        return [parseInt(expression)];
    }

    const result = [];

    // Loop through each character of the expression
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        // If the character is an operator, split the expression into two parts
        if (char === '+' || char === '-' || char === '*') {
            // Recursively solve the left and right parts of the expression
            const leftParts = diffWaysToCompute(expression.slice(0, i));
            const rightParts = diffWaysToCompute(expression.slice(i + 1));

            // Combine the results of the left and right parts using the current operator
            for (let left of leftParts) {
                for (let right of rightParts) {
                    result.push(compute(left, right, char));
                }
            }
        }
    }

    return result;
};

// Example 1:
console.log(diffWaysToCompute("2-1-1")); // Output: [0, 2]

// Example 2:
console.log(diffWaysToCompute("2*3-4*5")); // Output: [-34, -14, -10, -10, 10]
