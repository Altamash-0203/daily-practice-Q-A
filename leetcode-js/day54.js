/*
1381. Design a Stack With Increment Operation
Medium
Topics
Companies
Hint
Design a stack that supports increment operations on its elements.

Implement the CustomStack class:

CustomStack(int maxSize) Initializes the object with maxSize which is the maximum number of elements in the stack.
void push(int x) Adds x to the top of the stack if the stack has not reached the maxSize.
int pop() Pops and returns the top of the stack or -1 if the stack is empty.
void inc(int k, int val) Increments the bottom k elements of the stack by val. If there are less than k elements in the stack, increment all the elements in the stack.
 

Example 1:

Input
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
Output
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
Explanation
CustomStack stk = new CustomStack(3); // Stack is Empty []
stk.push(1);                          // stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.pop();                            // return 2 --> Return top of the stack 2, stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.push(3);                          // stack becomes [1, 2, 3]
stk.push(4);                          // stack still [1, 2, 3], Do not add another elements as size is 4
stk.increment(5, 100);                // stack becomes [101, 102, 103]
stk.increment(2, 100);                // stack becomes [201, 202, 103]
stk.pop();                            // return 103 --> Return top of the stack 103, stack becomes [201, 202]
stk.pop();                            // return 202 --> Return top of the stack 202, stack becomes [201]
stk.pop();                            // return 201 --> Return top of the stack 201, stack becomes []
stk.pop();                            // return -1 --> Stack is empty return -1.
*/

class CustomStack {
    constructor(maxSize) {
        this.stack = [];
        this.maxSize = maxSize;
        this.incArray = new Array(maxSize).fill(0);  // To store increments
    }

    // Pushes an element onto the stack if it has not reached maxSize
    push(x) {
        if (this.stack.length < this.maxSize) {
            this.stack.push(x);
        }
    }

    // Pops the top element from the stack, applying any increments
    pop() {
        const len = this.stack.length;
        if (len === 0) return -1;

        if (len > 1) {
            this.incArray[len - 2] += this.incArray[len - 1];  // Carry increment to the next element
        }

        const result = this.stack.pop() + this.incArray[len - 1];
        this.incArray[len - 1] = 0;  // Reset the increment for this element
        return result;
    }

    // Increment the bottom k elements by val
    increment(k, val) {
        const limit = Math.min(k, this.stack.length);  // Increment only up to the number of elements in the stack
        if (limit > 0) {
            this.incArray[limit - 1] += val;
        }
    }
}

// Example usage:
const customStack = new CustomStack(3);
customStack.push(1);  // stack: [1]
customStack.push(2);  // stack: [1, 2]
console.log(customStack.pop());  // returns 2, stack becomes [1]
customStack.push(2);  // stack: [1, 2]
customStack.push(3);  // stack: [1, 2, 3]
customStack.push(4);  // stack: [1, 2, 3] (cannot push, size exceeded)
customStack.increment(5, 100);  // stack becomes [101, 102, 103] (all elements are incremented by 100)
customStack.increment(2, 100);  // stack becomes [201, 202, 103]
console.log(customStack.pop());  // returns 103, stack becomes [201, 202]
console.log(customStack.pop());  // returns 202, stack becomes [201]
console.log(customStack.pop());  // returns 201, stack becomes []
console.log(customStack.pop());  // returns -1 (stack is empty)
