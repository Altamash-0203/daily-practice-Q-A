/*
951. Flip Equivalent Binary Trees
Medium
Topics
Companies
For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.

A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.

Given the roots of two binary trees root1 and root2, return true if the two trees are flip equivalent or false otherwise.

 

Example 1:

Flipped Trees Diagram
Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
Output: true
Explanation: We flipped at nodes with values 1, 3, and 5.
Example 2:

Input: root1 = [], root2 = []
Output: true
Example 3:

Input: root1 = [], root2 = [1]
Output: false
*/

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

function flipEquiv(root1, root2) {
    // If both roots are null, trees are equivalent
    if (!root1 && !root2) return true;
    
    // If one of them is null or their values don't match, not equivalent
    if (!root1 || !root2 || root1.val !== root2.val) return false;
    
    // Recursively check if the trees are flip equivalent by comparing:
    // 1. Without flipping: root1's left with root2's left AND root1's right with root2's right
    // 2. With flipping: root1's left with root2's right AND root1's right with root2's left
    return (flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)) || 
           (flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left));
}

// Example usage:
let root1 = new TreeNode(1, 
    new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(7), new TreeNode(8))),
    new TreeNode(3, new TreeNode(6))
);

let root2 = new TreeNode(1,
    new TreeNode(3, new TreeNode(6)),
    new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(8), new TreeNode(7)))
);

console.log(flipEquiv(root1, root2)); // Output: true
