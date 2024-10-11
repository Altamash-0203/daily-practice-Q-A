/*
1942. The Number of the Smallest Unoccupied Chair
Medium
Topics
Companies
Hint
There is a party where n friends numbered from 0 to n - 1 are attending. There is an infinite number of chairs in this party that are numbered from 0 to infinity. When a friend arrives at the party, they sit on the unoccupied chair with the smallest number.

For example, if chairs 0, 1, and 5 are occupied when a friend comes, they will sit on chair number 2.
When a friend leaves the party, their chair becomes unoccupied at the moment they leave. If another friend arrives at that same moment, they can sit in that chair.

You are given a 0-indexed 2D integer array times where times[i] = [arrivali, leavingi], indicating the arrival and leaving times of the ith friend respectively, and an integer targetFriend. All arrival times are distinct.

Return the chair number that the friend numbered targetFriend will sit on.

 

Example 1:

Input: times = [[1,4],[2,3],[4,6]], targetFriend = 1
Output: 1
Explanation: 
- Friend 0 arrives at time 1 and sits on chair 0.
- Friend 1 arrives at time 2 and sits on chair 1.
- Friend 1 leaves at time 3 and chair 1 becomes empty.
- Friend 0 leaves at time 4 and chair 0 becomes empty.
- Friend 2 arrives at time 4 and sits on chair 0.
Since friend 1 sat on chair 1, we return 1.
Example 2:

Input: times = [[3,10],[1,5],[2,6]], targetFriend = 0
Output: 2
Explanation: 
- Friend 1 arrives at time 1 and sits on chair 0.
- Friend 2 arrives at time 2 and sits on chair 1.
- Friend 0 arrives at time 3 and sits on chair 2.
- Friend 1 leaves at time 5 and chair 0 becomes empty.
- Friend 2 leaves at time 6 and chair 1 becomes empty.
- Friend 0 leaves at time 10 and chair 2 becomes empty.
Since friend 0 sat on chair 2, we return 2.
*/

var smallestChair = function(times, targetFriend) {
    const n = times.length;

    // Create an array of arrival and departure events
    const events = [];
    for (let i = 0; i < n; i++) {
        events.push([times[i][0], 'arrive', i]);   // Arrival event
        events.push([times[i][1], 'leave', i]);    // Departure event
    }

    // Sort events first by time, then by type ('leave' comes before 'arrive' at the same time)
    events.sort((a, b) => a[0] - b[0] || (a[1] === 'leave' ? -1 : 1));

    const minHeap = [];  // To keep track of available chairs
    let chairAssignments = new Array(n); // To store the chair each friend sits on
    let nextAvailableChair = 0;  // Keeps track of the next unoccupied chair number

    for (let [time, eventType, friend] of events) {
        if (eventType === 'arrive') {
            // If there are any available chairs, use the smallest one
            let chair = minHeap.length > 0 ? minHeap.shift() : nextAvailableChair++;

            // Assign this chair to the arriving friend
            chairAssignments[friend] = chair;

            // If this is the target friend, return the chair number
            if (friend === targetFriend) {
                return chair;
            }
        } else {
            // When a friend leaves, add their chair to the available chairs (min-heap)
            minHeap.push(chairAssignments[friend]);

            // Keep the heap sorted so that we can always pop the smallest chair
            minHeap.sort((a, b) => a - b);
        }
    }

    return -1; // Fallback return
};
