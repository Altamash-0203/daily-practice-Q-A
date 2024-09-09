/*

2326. Spiral Matrix IV
Medium
Topics
Companies
Hint
You are given two integers m and n, which represent the dimensions of a matrix.

You are also given the head of a linked list of integers.

Generate an m x n matrix that contains the integers in the linked list presented in spiral order (clockwise), starting from the top-left of the matrix. If there are remaining empty spaces, fill them with -1.

Return the generated matrix.

 

Example 1:


Input: m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]
Output: [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
Explanation: The diagram above shows how the values are printed in the matrix.
Note that the remaining spaces in the matrix are filled with -1.
Example 2:


Input: m = 1, n = 4, head = [0,1,2]
Output: [[0,1,2,-1]]
Explanation: The diagram above shows how the values are printed from left to right in the matrix.
The last space in the matrix is set to -1.
*/


class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function spiralMatrix(m, n, head) {
    // Create an empty m x n matrix filled with -1
    let matrix = Array.from({ length: m }, () => Array(n).fill(-1));

    let top = 0, bottom = m - 1, left = 0, right = n - 1;
    let current = head;

    while (top <= bottom && left <= right) {
        // Traverse from left to right along the top row
        for (let i = left; i <= right && current; i++) {
            matrix[top][i] = current.val;
            current = current.next;
        }
        top++;

        // Traverse from top to bottom along the right column
        for (let i = top; i <= bottom && current; i++) {
            matrix[i][right] = current.val;
            current = current.next;
        }
        right--;

        // Traverse from right to left along the bottom row
        for (let i = right; i >= left && current; i--) {
            matrix[bottom][i] = current.val;
            current = current.next;
        }
        bottom--;

        // Traverse from bottom to top along the left column
        for (let i = bottom; i >= top && current; i--) {
            matrix[i][left] = current.val;
            current = current.next;
        }
        left++;
    }

    return matrix;
}

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    let dummy = new ListNode();
    let current = dummy;
    for (let val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
}

// Example 1
let m = 3, n = 5;
let head = createLinkedList([3, 0, 2, 6, 8, 1, 7, 9, 4, 2, 5, 5, 0]);
console.log(spiralMatrix(m, n, head));

// Example 2
m = 1;
n = 4;
head = createLinkedList([0, 1, 2]);
console.log(spiralMatrix(m, n, head));
