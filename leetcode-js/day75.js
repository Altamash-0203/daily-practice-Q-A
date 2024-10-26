/*
2458. Height of Binary Tree After Subtree Removal Queries
Hard
Topics
Companies
Hint
You are given the root of a binary tree with n nodes. Each node is assigned a unique value from 1 to n. You are also given an array queries of size m.

You have to perform m independent queries on the tree where in the ith query you do the following:

Remove the subtree rooted at the node with the value queries[i] from the tree. It is guaranteed that queries[i] will not be equal to the value of the root.
Return an array answer of size m where answer[i] is the height of the tree after performing the ith query.

Note:

The queries are independent, so the tree returns to its initial state after each query.
The height of a tree is the number of edges in the longest simple path from the root to some node in the tree.
 

Example 1:


Input: root = [1,3,4,2,null,6,5,null,null,null,null,null,7], queries = [4]
Output: [2]
Explanation: The diagram above shows the tree after removing the subtree rooted at node with value 4.
The height of the tree is 2 (The path 1 -> 3 -> 2).
Example 2:


Input: root = [5,8,9,2,1,3,7,4,6], queries = [3,2,4,8]
Output: [3,2,3,2]
Explanation: We have the following queries:
- Removing the subtree rooted at node with value 3. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 4).
- Removing the subtree rooted at node with value 2. The height of the tree becomes 2 (The path 5 -> 8 -> 1).
- Removing the subtree rooted at node with value 4. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 6).
- Removing the subtree rooted at node with value 8. The height of the tree becomes 2 (The path 5 -> 9 -> 3).
*/




// JavaScript


var treeQueries = function(root, queries) {
    const heights = new Array(50000).fill(0);
    const d = new Array(100001).fill(0);
    const l = new Array(100001).fill(0);
    const r = new Array(100001).fill(0);
    let len = 0;

    function search(p, h) {
        d[p.val] = h;

        if (!p.left && !p.right) {
            heights[len] = h;
            l[p.val] = r[p.val] = len;
            len++;
            return;
        }

        l[p.val] = len;

        if (p.left) search(p.left, h + 1);
        if (p.right) search(p.right, h + 1);

        r[p.val] = len - 1;
    }

    search(root, 0);

    const n = len;
    const maxl = new Array(n).fill(0);
    const maxr = new Array(n).fill(0);

    for (let i = 1; i < n; i++) {
        maxl[i] = Math.max(maxl[i-1], heights[i-1]);
        maxr[n-i-1] = Math.max(maxr[n-i], heights[n-i]);
    }

    const ret = [];
    const k = queries.length;

    for (let i = 0; i < k; i++) {
        const maxxl = maxl[l[queries[i]]];
        const maxxr = maxr[r[queries[i]]];
        ret.push(Math.max(Math.max(maxxl, maxxr), d[queries[i]] - 1));
    }

    return ret;
};
