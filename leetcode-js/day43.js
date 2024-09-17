/*
884. Uncommon Words from Two Sentences
Easy
Topics
Companies
A sentence is a string of single-space separated words where each word consists only of lowercase letters.

A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.

 

Example 1:

Input: s1 = "this apple is sweet", s2 = "this apple is sour"

Output: ["sweet","sour"]

Explanation:

The word "sweet" appears only in s1, while the word "sour" appears only in s2.

Example 2:

Input: s1 = "apple apple", s2 = "banana"

Output: ["banana"]
*/

function uncommonFromSentences(s1, s2) {
    // Split both sentences into words
    const words1 = s1.split(' ');
    const words2 = s2.split(' ');
  
    // Create a map to count occurrences of each word
    const wordCount = new Map();
  
    // Function to count words
    function countWords(words) {
      for (let word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      }
    }
  
    // Count words from both sentences
    countWords(words1);
    countWords(words2);
  
    // Find the uncommon words that appear exactly once
    const result = [];
    for (let [word, count] of wordCount) {
      if (count === 1) {
        result.push(word);
      }
    }
  
    return result;
  }
  
  // Example usage:
  const s1 = "this apple is sweet";
  const s2 = "this apple is sour";
  console.log(uncommonFromSentences(s1, s2)); // Output: ["sweet", "sour"]
  