/*
1367. Linked List in Binary Tree
Medium
Topics
Companies
Hint
Given a binary tree root and a linked list with head as the first node. 

Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.

 

Example 1:



Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.  
Example 2:



Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Example 3:

Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements of the linked list from head.
*/
// Definition for a binary tree node
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

// Definition for a singly-linked list node
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

// Helper function to check if the linked list matches a downward path in the tree
function checkPath(head, root) {
    if (!head) return true;   // Linked list fully matched
    if (!root) return false;  // Reached leaf in tree before finishing list

    if (head.val !== root.val) return false;  // Values don't match

    // Continue checking either the left or right child
    return checkPath(head.next, root.left) || checkPath(head.next, root.right);
}

// Main function to solve the problem
function isSubPath(head, root) {
    if (!root) return false;  // If the tree is empty, no path is possible

    // Start DFS traversal, checking if the linked list starts at the current node
    return checkPath(head, root) || isSubPath(head, root.left) || isSubPath(head, root.right);
}
