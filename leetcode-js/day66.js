/*
632. Smallest Range Covering Elements from K Lists
Hard
Topics
Companies
You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.

We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

 

Example 1:

Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
Example 2:

Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]

*/

class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Helper method to swap elements in the heap
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Insert a new value into the heap
    push(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    // Remove and return the smallest element in the heap
    pop() {
        if (this.size() === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }

    // Return the smallest element in the heap without removing it
    peek() {
        return this.heap[0];
    }

    // Return the size of the heap
    size() {
        return this.heap.length;
    }

    // Bubble up the element to maintain the heap property
    bubbleUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];

        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.heap[parentIdx];

            if (element[0] >= parent[0]) break;  // Heap property satisfied
            this.swap(idx, parentIdx);           // Swap with parent
            idx = parentIdx;
        }
    }

    // Bubble down the element to maintain the heap property
    bubbleDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swapIdx = null;

            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (leftChild[0] < element[0]) {
                    swapIdx = leftChildIdx;
                }
            }

            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if (
                    (swapIdx === null && rightChild[0] < element[0]) ||
                    (swapIdx !== null && rightChild[0] < leftChild[0])
                ) {
                    swapIdx = rightChildIdx;
                }
            }

            if (swapIdx === null) break;
            this.swap(idx, swapIdx);
            idx = swapIdx;
        }
    }
}

function smallestRange(nums) {
    let minHeap = new MinHeap();
    let maxVal = -Infinity;
    let bestRange = [-Infinity, Infinity];
    
    // Initialize heap and find initial max value
    for (let i = 0; i < nums.length; i++) {
        minHeap.push([nums[i][0], i, 0]); // [value, list_index, element_index]
        maxVal = Math.max(maxVal, nums[i][0]);
    }

    // Process the heap
    while (minHeap.size() === nums.length) {
        const [minVal, row, col] = minHeap.pop();

        // Check if we have a smaller range
        if (maxVal - minVal < bestRange[1] - bestRange[0]) {
            bestRange = [minVal, maxVal];
        }

        // If there are more elements in the current list, add the next one
        if (col + 1 < nums[row].length) {
            const nextVal = nums[row][col + 1];
            minHeap.push([nextVal, row, col + 1]);
            maxVal = Math.max(maxVal, nextVal); // Update the max value
        }
    }

    return bestRange;
}

// Example usage:
let nums = [
    [4, 10, 15, 24, 26],
    [0, 9, 12, 20],
    [5, 18, 22, 30]
];

console.log(smallestRange(nums)); // Output: [20, 24]
