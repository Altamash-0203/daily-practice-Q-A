/*
2807. Insert Greatest Common Divisors in Linked List
Medium
Topics
Companies
Given the head of a linked list head, in which each node contains an integer value.

Between every pair of adjacent nodes, insert a new node with a value equal to the greatest common divisor of them.

Return the linked list after insertion.

The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.

 

Example 1:


Input: head = [18,6,10,3]
Output: [18,6,6,2,10,1,3]
Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes (nodes in blue are the inserted nodes).
- We insert the greatest common divisor of 18 and 6 = 6 between the 1st and the 2nd nodes.
- We insert the greatest common divisor of 6 and 10 = 2 between the 2nd and the 3rd nodes.
- We insert the greatest common divisor of 10 and 3 = 1 between the 3rd and the 4th nodes.
There are no more adjacent nodes, so we return the linked list.
Example 2:


Input: head = [7]
Output: [7]
Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes.
There are no pairs of adjacent nodes, so we return the initial linked list.
 

*/

// Definition for singly-linked list.
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Function to compute the GCD of two numbers
const gcd = (a, b) => {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

// Function to insert GCD nodes in the linked list
function insertGreatestCommonDivisors(head) {
    let current = head;
    
    // Traverse the linked list and insert GCD nodes between adjacent nodes
    while (current !== null && current.next !== null) {
        const nextNode = current.next;
        const gcdValue = gcd(current.val, nextNode.val);
        
        // Create a new node with the GCD value and insert it between current and nextNode
        const gcdNode = new ListNode(gcdValue);
        current.next = gcdNode;
        gcdNode.next = nextNode;
        
        // Move to the next pair of nodes
        current = nextNode;
    }
    
    return head;
}

// Helper function to print the linked list
function printLinkedList(head) {
    let current = head;
    const result = [];
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    console.log(result);
}

// Example usage
const head = new ListNode(18, new ListNode(6, new ListNode(10, new ListNode(3))));
const newHead = insertGreatestCommonDivisors(head);
printLinkedList(newHead);  // Output: [18, 6, 6, 2, 10, 1, 3]
