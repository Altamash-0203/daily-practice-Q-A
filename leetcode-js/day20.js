/*
145. Binary Tree Postorder Traversal
Easy
Topics
Companies
Given the root of a binary tree, return the postorder traversal of its nodes' values.

 

Example 1:


Input: root = [1,null,2,3]
Output: [3,2,1]
Example 2:

Input: root = []
Output: []
Example 3:

Input: root = [1]
Output: [1]*/


// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

// Define the postorderTraversal function
function postorderTraversal(root) {
    if (!root) return [];
    
    const stack = [root], result = [];
    
    while (stack.length) {
        const node = stack.pop();
        result.push(node.val);
        
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    
    return result.reverse(); // Reverse to get postorder
}

// Example usage
let param_1 = new TreeNode(1);
param_1.right = new TreeNode(2);
param_1.right.left = new TreeNode(3);

// Call the function
var ret = postorderTraversal(param_1);
console.log(ret);  // Output: [3, 2, 1]
