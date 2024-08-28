/*
The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.

For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
Given an integer num, return its complement.

 

Example 1:

Input: num = 5
Output: 2
Explanation: The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.
Example 2:

Input: num = 1
Output: 0
Explanation: The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.
*/

function findComplement(num) {
    // Convert the number to its binary representation without the '0b' prefix
    let binary = num.toString(2);
    
    // Flip the bits: replace '1' with '0' and '0' with '1'
    let flippedBinary = '';
    for (let bit of binary) {
        flippedBinary += (bit === '1') ? '0' : '1';
    }
    
    // Convert the flipped binary string back to an integer
    return parseInt(flippedBinary, 2);
}

// Example usage:
console.log(findComplement(5)); // Output: 2
console.log(findComplement(1)); // Output: 0
