/*
2054. Two Best Non-Overlapping Events
Medium
Topics
Companies
Hint
You are given a 0-indexed 2D integer array of events where events[i] = [startTimei, endTimei, valuei]. The ith event starts at startTimei and ends at endTimei, and if you attend this event, you will receive a value of valuei. You can choose at most two non-overlapping events to attend such that the sum of their values is maximized.

Return this maximum sum.

Note that the start time and end time is inclusive: that is, you cannot attend two events where one of them starts and the other ends at the same time. More specifically, if you attend an event with end time t, the next event must start at or after t + 1.

 

Example 1:


Input: events = [[1,3,2],[4,5,2],[2,4,3]]
Output: 4
Explanation: Choose the green events, 0 and 1 for a sum of 2 + 2 = 4.
Example 2:

Example 1 Diagram
Input: events = [[1,3,2],[4,5,2],[1,5,5]]
Output: 5
Explanation: Choose event 2 for a sum of 5.
Example 3:


Input: events = [[1,5,3],[1,5,1],[6,6,5]]
Output: 8
Explanation: Choose events 0 and 2 for a sum of 3 + 5 = 8.
js code
*/


function maxTwoEvents(events) {
    // Sort events by their end times
    events.sort((a, b) => a[1] - b[1]);

    // Array to store the maximum value up to the ith event
    let maxValues = [];
    let maxValue = 0;

    // Store the maximum value so far for easier lookup
    for (let i = 0; i < events.length; i++) {
        maxValue = Math.max(maxValue, events[i][2]);
        maxValues.push(maxValue);
    }

    let result = 0;

    // Helper function to perform binary search
    function binarySearch(end) {
        let left = 0, right = events.length - 1;
        let bestIndex = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (events[mid][1] < end) {
                bestIndex = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return bestIndex;
    }

    for (let i = 0; i < events.length; i++) {
        // Include the current event's value
        const currentValue = events[i][2];
        const previousIndex = binarySearch(events[i][0]);

        // If there's a compatible previous event, add its value
        if (previousIndex !== -1) {
            result = Math.max(result, currentValue + maxValues[previousIndex]);
        } else {
            result = Math.max(result, currentValue);
        }
    }

    return result;
}

// Example usage:
console.log(maxTwoEvents([[1, 3, 2], [4, 5, 2], [2, 4, 3]])); // Output: 4
console.log(maxTwoEvents([[1, 3, 2], [4, 5, 2], [1, 5, 5]])); // Output: 5
console.log(maxTwoEvents([[1, 5, 3], [1, 5, 1], [6, 6, 5]])); // Output: 8
