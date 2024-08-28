/*
Given the root of an n-ary tree, return the postorder traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

 

Example 1:


Input: root = [1,null,3,2,4,null,5,6]
Output: [5,6,3,2,4,1]
Example 2:


Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [2,6,14,11,7,3,12,8,4,13,9,10,5,1]
*/


// Definition for an N-ary Tree Node
class Node {
    constructor(val, children = []) {
        this.val = val;
        this.children = children;
    }
}

// Function to perform postorder traversal
function postorder(root) {
    const result = [];

    function traverse(node) {
        if (!node) return;

        // Traverse all children first
        for (let child of node.children) {
            traverse(child);
        }

        // Add the current node value to result
        result.push(node.val);
    }

    traverse(root);
    return result;
}

// Example 1
const root1 = new Node(1, [
    new Node(3, [new Node(5), new Node(6)]),
    new Node(2),
    new Node(4)
]);
console.log(postorder(root1)); // Output: [5, 6, 3, 2, 4, 1]

// Example 2
const root2 = new Node(1, [
    new Node(2),
    new Node(3, [
        new Node(6),
        new Node(7, [new Node(14)])
    ]),
    new Node(4, [new Node(8, [new Node(12)])]),
    new Node(5, [
        new Node(9, [new Node(13)]),
        new Node(10, [new Node(11)])
    ])
]);
console.log(postorder(root2)); // Output: [2, 6, 14, 7, 3, 12, 8, 4, 13, 9, 11, 10, 5, 1]
