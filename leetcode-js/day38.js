/*

Code
Testcase
Test Result
Test Result
1684. Count the Number of Consistent Strings
Easy
Topics
Companies
Hint
You are given a string allowed consisting of distinct characters and an array of strings words. A string is consistent if all characters in the string appear in the string allowed.

Return the number of consistent strings in the array words.

 

Example 1:

Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
Output: 2
Explanation: Strings "aaab" and "baa" are consistent since they only contain characters 'a' and 'b'.
Example 2:

Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
Output: 7
Explanation: All strings are consistent.
Example 3:

Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
Output: 4
Explanation: Strings "cc", "acd", "ac", and "d" are consistent.
*/
function countConsistentStrings(allowed, words) {
    const allowedSet = new Set(allowed); // Convert allowed string to a set of characters
    let consistentCount = 0;
  
    for (let word of words) {
      // Check if every character in the word is in the allowed set
      if ([...word].every(char => allowedSet.has(char))) {
        consistentCount++;
      }
    }
  
    return consistentCount;
  }
  
  // Example Usage:
  const allowed = "ab";
  const words = ["ad", "bd", "aaab", "baa", "badab"];
  console.log(countConsistentStrings(allowed, words)); // Output: 2
  