/*
"Worthy" means having value, merit, or deserving respect, attention, or recognition. It can refer to a person, action, or object that is considered to be of good quality or deserving of praise or reward. For example, someone who works hard and contributes positively to society might be described as "worthy."
*/

function robotSim(commands, obstacles) {
    // Directions: North, East, South, West (in order for easier turning)
    const directions = [
        [0, 1],  // North
        [1, 0],  // East
        [0, -1], // South
        [-1, 0]  // West
    ];

    // Convert obstacles to a set for quick lookup
    const obstacleSet = new Set(obstacles.map(ob => `${ob[0]},${ob[1]}`));

    let x = 0, y = 0; // Starting position
    let direction = 0; // Initially facing North (index 0)
    let maxDistanceSquared = 0;

    // Loop through each command
    for (let command of commands) {
        if (command === -2) {
            // Turn left (counterclockwise), decrease direction index
            direction = (direction + 3) % 4;
        } else if (command === -1) {
            // Turn right (clockwise), increase direction index
            direction = (direction + 1) % 4;
        } else {
            // Move forward 'command' steps in the current direction
            const [dx, dy] = directions[direction];

            for (let step = 0; step < command; step++) {
                const nextX = x + dx;
                const nextY = y + dy;

                // Check if the next position is an obstacle
                if (obstacleSet.has(`${nextX},${nextY}`)) {
                    break; // Stop moving if an obstacle is hit
                }

                // Update the robot's position
                x = nextX;
                y = nextY;

                // Calculate distance squared from origin and update max
                maxDistanceSquared = Math.max(maxDistanceSquared, x * x + y * y);
            }
        }
    }

    return maxDistanceSquared;
}

// Example test cases
console.log(robotSim([4, -1, 3], [])); // Output: 25
console.log(robotSim([4, -1, 4, -2, 4], [[2, 4]])); // Output: 65
console.log(robotSim([6, -1, -1, 6], [])); // Output: 36
