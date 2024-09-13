/*
You are given an array arr of positive integers. You are also given the array queries where queries[i] = [lefti, righti].

For each query i compute the XOR of elements from lefti to righti (that is, arr[lefti] XOR arr[lefti + 1] XOR ... XOR arr[righti] ).

Return an array answer where answer[i] is the answer to the ith query.

 

Example 1:

Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8] 
Explanation: 
The binary representation of the elements in the array are:
1 = 0001 
3 = 0011 
4 = 0100 
8 = 1000 
The XOR values for queries are:
[0,1] = 1 xor 3 = 2 
[1,2] = 3 xor 4 = 7 
[0,3] = 1 xor 3 xor 4 xor 8 = 14 
[3,3] = 8
Example 2:

Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
Output: [8,0,4,4]*/

function xorQueries(arr, queries) {
    // Step 1: Compute the prefix XOR array
    const n = arr.length;
    const prefix = new Array(n);
    prefix[0] = arr[0];
    
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] ^ arr[i];
    }

    // Step 2: Answer each query
    return queries.map(([left, right]) => 
        left === 0 ? prefix[right] : prefix[right] ^ prefix[left - 1]
    );
}

// Example usage:
const arr = [1, 3, 4, 8];
const queries = [[0, 1], [1, 2], [0, 3], [3, 3]];
console.log(xorQueries(arr, queries)); // Output: [2, 7, 14, 8]

const arr2 = [4, 8, 2, 10];
const queries2 = [[2, 3], [1, 3], [0, 0], [0, 3]];
console.log(xorQueries(arr2, queries2)); // Output: [8, 0, 4, 4]
