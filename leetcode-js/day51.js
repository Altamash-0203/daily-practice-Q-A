/*
2416. Sum of Prefix Scores of Strings
Hard
Topics
Companies
Hint
You are given an array words of size n consisting of non-empty strings.

We define the score of a string word as the number of strings words[i] such that word is a prefix of words[i].

For example, if words = ["a", "ab", "abc", "cab"], then the score of "ab" is 2, since "ab" is a prefix of both "ab" and "abc".
Return an array answer of size n where answer[i] is the sum of scores of every non-empty prefix of words[i].

Note that a string is considered as a prefix of itself.

 

Example 1:

Input: words = ["abc","ab","bc","b"]
Output: [5,4,3,2]
Explanation: The answer for each string is the following:
- "abc" has 3 prefixes: "a", "ab", and "abc".
- There are 2 strings with the prefix "a", 2 strings with the prefix "ab", and 1 string with the prefix "abc".
The total is answer[0] = 2 + 2 + 1 = 5.
- "ab" has 2 prefixes: "a" and "ab".
- There are 2 strings with the prefix "a", and 2 strings with the prefix "ab".
The total is answer[1] = 2 + 2 = 4.
- "bc" has 2 prefixes: "b" and "bc".
- There are 2 strings with the prefix "b", and 1 string with the prefix "bc".
The total is answer[2] = 2 + 1 = 3.
- "b" has 1 prefix: "b".
- There are 2 strings with the prefix "b".
The total is answer[3] = 2.
Example 2:

Input: words = ["abcd"]
Output: [4]
Explanation:
"abcd" has 4 prefixes: "a", "ab", "abc", and "abcd".
Each prefix has a score of one, so the total is answer[0] = 1 + 1 + 1 + 1 = 4.
*/

class TrieNode {
    constructor() {
        this.children = {};
        this.count = 0; // keeps track of how many words pass through this node
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word into the Trie
    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
            node.count++; // increment count for every character in the word
        }
    }

    // Get the prefix scores of a word
    getPrefixScores(word) {
        let node = this.root;
        let score = 0;
        for (let char of word) {
            if (!node.children[char]) break;
            node = node.children[char];
            score += node.count; // accumulate the score of the current prefix
        }
        return score;
    }
}

var sumPrefixScores = function(words) {
    const trie = new Trie();
    const n = words.length;
    const result = new Array(n).fill(0);

    // First, insert all the words into the Trie
    for (let word of words) {
        trie.insert(word);
    }

    // Then, calculate the sum of prefix scores for each word
    for (let i = 0; i < n; i++) {
        result[i] = trie.getPrefixScores(words[i]);
    }

    return result;
};

// Example usage:
const words = ["abc", "ab", "bc", "b"];
console.log(sumPrefixScores(words)); // Output: [5, 4, 3, 2]
