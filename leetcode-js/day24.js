/*
On a 2D plane, we place n stones at some integer coordinate points. Each coordinate point may have at most one stone.

A stone can be removed if it shares either the same row or the same column as another stone that has not been removed.

Given an array stones of length n where stones[i] = [xi, yi] represents the location of the ith stone, return the largest possible number of stones that can be removed.

 

Example 1:

Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5
Explanation: One way to remove 5 stones is as follows:
1. Remove stone [2,2] because it shares the same row as [2,1].
2. Remove stone [2,1] because it shares the same column as [0,1].
3. Remove stone [1,2] because it shares the same row as [1,0].
4. Remove stone [1,0] because it shares the same column as [0,0].
5. Remove stone [0,1] because it shares the same row as [0,0].
Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.
Example 2:

Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
Explanation: One way to make 3 moves is as follows:
1. Remove stone [2,2] because it shares the same row as [2,0].
2. Remove stone [2,0] because it shares the same column as [0,0].
3. Remove stone [0,2] because it shares the same row as [0,0].
Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.
Example 3:

Input: stones = [[0,0]]
Output: 0
Explanation: [0,0] is the only stone on the plane, so you cannot remove it.
*/



class UnionFind {
    constructor() {
        this.parent = new Map();
        this.rank = new Map();
    }

    find(x) {
        if (this.parent.get(x) !== x) {
            this.parent.set(x, this.find(this.parent.get(x))); // Path compression
        }
        return this.parent.get(x);
    }

    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank.get(rootX) > this.rank.get(rootY)) {
                this.parent.set(rootY, rootX);
            } else if (this.rank.get(rootX) < this.rank.get(rootY)) {
                this.parent.set(rootX, rootY);
            } else {
                this.parent.set(rootY, rootX);
                this.rank.set(rootX, this.rank.get(rootX) + 1);
            }
        }
    }

    add(x) {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
            this.rank.set(x, 0);
        }
    }
}

var removeStones = function(stones) {
    const uf = new UnionFind();
    
    for (let [x, y] of stones) {
        uf.add(x);           // Treat row `x` as a node
        uf.add(~y);          // Treat column `y` as a node (negate to avoid collision with rows)
        uf.union(x, ~y);     // Connect the row to the column
    }

    const uniqueParents = new Set();
    
    for (let [x, y] of stones) {
        uniqueParents.add(uf.find(x));  // Find the unique root for each stone's row
    }
    
    return stones.length - uniqueParents.size;
};

// Example usage:
console.log(removeStones([[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]])); // Output: 5
console.log(removeStones([[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]]));         // Output: 3
console.log(removeStones([[0, 0]]));                                        // Output: 0


