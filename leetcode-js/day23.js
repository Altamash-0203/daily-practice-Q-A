/*1905. Count Sub Islands
Medium
Topics
Companies
Hint
You are given two m x n binary matrices grid1 and grid2 containing only 0's (representing water) and 1's (representing land). An island is a group of 1's connected 4-directionally (horizontal or vertical). Any cells outside of the grid are considered water cells.

An island in grid2 is considered a sub-island if there is an island in grid1 that contains all the cells that make up this island in grid2.

Return the number of islands in grid2 that are considered sub-islands.

 

Example 1:


Input: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
Output: 3
Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
The 1s colored red in grid2 are those considered to be part of a sub-island. There are three sub-islands.
Example 2:


Input: grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]], grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]
Output: 2 
Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
The 1s colored red in grid2 are those considered to be part of a sub-island. There are two sub-islands.
*/


function countSubIslands(grid1, grid2) {
    const rows = grid1.length;
    const cols = grid1[0].length;

    // Helper function to perform DFS
    const dfs = (grid1, grid2, row, col) => {
        // If we're out of bounds or at water (0), return true
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid2[row][col] === 0) {
            return true;
        }

        // Mark the cell as visited in grid2 by setting it to 0
        grid2[row][col] = 0;

        // Check if this cell is part of a sub-island, i.e., it should exist in grid1 as well
        let isSubIsland = grid1[row][col] === 1;

        // Perform DFS in 4 directions (up, down, left, right)
        isSubIsland = dfs(grid1, grid2, row - 1, col) && isSubIsland;
        isSubIsland = dfs(grid1, grid2, row + 1, col) && isSubIsland;
        isSubIsland = dfs(grid1, grid2, row, col - 1) && isSubIsland;
        isSubIsland = dfs(grid1, grid2, row, col + 1) && isSubIsland;

        return isSubIsland;
    };

    let subIslandCount = 0;

    // Traverse each cell in grid2
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // If we find land (1) in grid2, we start DFS
            if (grid2[i][j] === 1) {
                // If DFS confirms that the island in grid2 is a sub-island of grid1, increase count
                if (dfs(grid1, grid2, i, j)) {
                    subIslandCount++;
                }
            }
        }
    }

    return subIslandCount; 
    

}

let grid1 = [
    [1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 0, 1, 1]
];

let grid2 = [
    [1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [1, 0, 1, 1, 0],
    [0, 1, 0, 1, 0]
];

console.log(countSubIslands(grid1, grid2));  