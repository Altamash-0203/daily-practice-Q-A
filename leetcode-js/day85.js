/*
1861. Rotating the Box
Medium
Topics
Companies
Hint
You are given an m x n matrix of characters box representing a side-view of a box. Each cell of the box is one of the following:

A stone '#'
A stationary obstacle '*'
Empty '.'
The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not affect the stones' horizontal positions.

It is guaranteed that each stone in box rests on an obstacle, another stone, or the bottom of the box.

Return an n x m matrix representing the box after the rotation described above.

 

Example 1:



Input: box = [["#",".","#"]]
Output: [["."],
         ["#"],
         ["#"]]
Example 2:



Input: box = [["#",".","*","."],
              ["#","#","*","."]]
Output: [["#","."],
         ["#","#"],
         ["*","*"],
         [".","."]]
Example 3:



Input: box = [["#","#","*",".","*","."],
              ["#","#","#","*",".","."],
              ["#","#","#",".","#","."]]
Output: [[".","#","#"],
         [".","#","#"],
         ["#","#","*"],
         ["#","*","."],
         ["#",".","*"],
         ["#",".","."]]
         */

         var rotateTheBox = function(box) {
            const m = box.length;    // Number of rows
            const n = box[0].length; // Number of columns
        
            // Process each row to apply gravity
            for (let i = 0; i < m; i++) {
                let empty = n - 1; // Position where the stone can fall
        
                // Traverse the row from right to left
                for (let j = n - 1; j >= 0; j--) {
                    if (box[i][j] === '#') {
                        // Move stone down
                        box[i][j] = '.';
                        box[i][empty] = '#';
                        empty--;
                    } else if (box[i][j] === '*') {
                        // Obstacle found, reset empty position
                        empty = j - 1;
                    }
                }
            }
        
            // Rotate the box 90 degrees clockwise
            const rotated = Array.from({ length: n }, () => Array(m).fill('.'));
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    rotated[j][m - i - 1] = box[i][j];
                }
            }
        
            return rotated;
        };
        
        // Example Usage
        const box1 = [["#",".","#"]];
        console.log(rotateTheBox(box1)); // Output: [["."], ["#"], ["#"]]
        
        const box2 = [["#",".","*","."], ["#","#","*","."]];
        console.log(rotateTheBox(box2)); // Output: [["#","."], ["#","#"], ["*","*"], [".","."]]
        
        const box3 = [["#","#","*",".","*","."], ["#","#","#","*",".","."], ["#","#","#",".","#","."]];
        console.log(rotateTheBox(box3)); // Output: [[".","#","#"], [".","#","#"], ["#","#","*"], ["#","*","."], ["#",".","*"], ["#",".","."]];
        