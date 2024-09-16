/*
539. Minimum Time Difference
Medium
Topics
Companies
Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.
 

Example 1:

Input: timePoints = ["23:59","00:00"]
Output: 1
Example 2:

Input: timePoints = ["00:00","23:59","00:00"]
Output: 0

*/
function findMinDifference(timePoints) {
    // Convert time string "HH:MM" to total minutes since midnight
    const toMinutes = (time) => {
        let [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    // Convert all time points to minutes
    const minutesArray = timePoints.map(toMinutes);

    // Sort the array of minutes
    minutesArray.sort((a, b) => a - b);

    let minDiff = Infinity;

    // Find the minimum difference between consecutive time points
    for (let i = 1; i < minutesArray.length; i++) {
        minDiff = Math.min(minDiff, minutesArray[i] - minutesArray[i - 1]);
    }

    // Check the difference between the first and last time point considering wrap-around (24 hours)
    const wrapAroundDiff = (24 * 60) - minutesArray[minutesArray.length - 1] + minutesArray[0];
    minDiff = Math.min(minDiff, wrapAroundDiff);

    return minDiff;
}

// Example usage:
console.log(findMinDifference(["23:59", "00:00"])); // Output: 1
console.log(findMinDifference(["00:00", "23:59", "00:00"])); // Output: 0
