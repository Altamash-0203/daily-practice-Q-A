/*

2583. Kth Largest Sum in a Binary Tree
Medium
Topics
Companies
Hint
You are given the root of a binary tree and a positive integer k.

The level sum in the tree is the sum of the values of the nodes that are on the same level.

Return the kth largest level sum in the tree (not necessarily distinct). If there are fewer than k levels in the tree, return -1.

Note that two nodes are on the same level if they have the same distance from the root.

 

Example 1:


Input: root = [5,8,9,2,1,3,7,4,6], k = 2
Output: 13
Explanation: The level sums are the following:
- Level 1: 5.
- Level 2: 8 + 9 = 17.
- Level 3: 2 + 1 + 3 + 7 = 13.
- Level 4: 4 + 6 = 10.
The 2nd largest level sum is 13.
Example 2:


Input: root = [1,2,null,3], k = 1
Output: 3
Explanation: The largest level sum is 3.

*/
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function kthLargestLevelSum(root, k) {
    if (!root) return -1;

    // Perform level order traversal using BFS
    const queue = [root];
    const levelSums = [];

    while (queue.length > 0) {
        const levelSize = queue.length;
        let currentLevelSum = 0;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevelSum += node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        levelSums.push(currentLevelSum);
    }

    // Sort level sums in descending order
    levelSums.sort((a, b) => b - a);

    // Return the k-th largest sum, or -1 if there are fewer than k levels
    return k <= levelSums.length ? levelSums[k - 1] : -1;
}

// Example 1
const root1 = new TreeNode(5);
root1.left = new TreeNode(8);
root1.right = new TreeNode(9);
root1.left.left = new TreeNode(2);
root1.left.right = new TreeNode(1);
root1.right.left = new TreeNode(3);
root1.right.right = new TreeNode(7);
root1.left.left.left = new TreeNode(4);
root1.left.left.right = new TreeNode(6);

console.log(kthLargestLevelSum(root1, 2)); // Output: 13

// Example 2
const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);

console.log(kthLargestLevelSum(root2, 1)); // Output: 3
