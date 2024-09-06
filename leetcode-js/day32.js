/*
You are given an array of integers nums and the head of a linked list. Return the head of the modified linked list after removing all nodes from the linked list that have a value that exists in nums.

 

Example 1:

Input: nums = [1,2,3], head = [1,2,3,4,5]

Output: [4,5]

Explanation:



Remove the nodes with values 1, 2, and 3.

Example 2:

Input: nums = [1], head = [1,2,1,2,1,2]

Output: [2,2,2]

Explanation:



Remove the nodes with value 1.

Example 3:

Input: nums = [5], head = [1,2,3,4]

Output: [1,2,3,4]

Explanation:



No node has value 5.

 
*/

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function modifiedList(nums, head) {
    const s = new Set(nums);  // Create a set from the nums array for fast lookups
    const dummy = new ListNode(0, head);  // Create a dummy node to handle edge cases
    
    // Traverse the linked list
    for (let pre = dummy; pre.next !== null; ) {
        if (s.has(pre.next.val)) {
            // If the next node's value is in the set, skip the node
            pre.next = pre.next.next;
        } else {
            // Otherwise, move to the next node
            pre = pre.next;
        }
    }
    
    // Return the modified list, starting from the node after the dummy
    return dummy.next;
}

// Example usage:

// Helper function to create a linked list from an array
function arrayToList(arr) {
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to print a linked list
function printList(head) {
    let result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    console.log(result);
}

// Example 1: nums = [1, 2, 3], head = [1, 2, 3, 4, 5]
let head1 = arrayToList([1, 2, 3, 4, 5]);
let nums1 = [1, 2, 3];
let modifiedHead1 = modifiedList(nums1, head1);
printList(modifiedHead1); // Output: [4, 5]

// Example 2: nums = [1], head = [1, 2, 1, 2, 1, 2]
let head2 = arrayToList([1, 2, 1, 2, 1, 2]);
let nums2 = [1];
let modifiedHead2 = modifiedList(nums2, head2);
printList(modifiedHead2); // Output: [2, 2, 2]

// Example 3: nums = [5], head = [1, 2, 3, 4]
let head3 = arrayToList([1, 2, 3, 4]);
let nums3 = [5];
let modifiedHead3 = modifiedList(nums3, head3);
printList(modifiedHead3); // Output: [1, 2, 3, 4]
