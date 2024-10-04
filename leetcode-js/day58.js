/*
2491. Divide Players Into Teams of Equal Skill
Medium
Topics
Companies
Hint
You are given a positive integer array skill of even length n where skill[i] denotes the skill of the ith player. Divide the players into n / 2 teams of size 2 such that the total skill of each team is equal.

The chemistry of a team is equal to the product of the skills of the players on that team.

Return the sum of the chemistry of all the teams, or return -1 if there is no way to divide the players into teams such that the total skill of each team is equal.

 

Example 1:

Input: skill = [3,2,5,1,3,4]
Output: 22
Explanation: 
Divide the players into the following teams: (1, 5), (2, 4), (3, 3), where each team has a total skill of 6.
The sum of the chemistry of all the teams is: 1 * 5 + 2 * 4 + 3 * 3 = 5 + 8 + 9 = 22.
Example 2:

Input: skill = [3,4]
Output: 12
Explanation: 
The two players form a team with a total skill of 7.
The chemistry of the team is 3 * 4 = 12.
Example 3:

Input: skill = [1,1,2,3]
Output: -1
Explanation: 
There is no way to divide the players into teams such that the total skill of each team is equal.
*/
function dividePlayers(skill) {
    // Step 1: Sort the skill array in ascending order
    skill.sort((a, b) => a - b);

    // Step 2: Initialize variables
    let totalChemistry = 0;
    let n = skill.length;

    // The sum of the first and last players should be the target for every pair
    let targetSum = skill[0] + skill[n - 1];

    // Step 3: Try to pair the players
    for (let i = 0; i < n / 2; i++) {
        let left = skill[i];
        let right = skill[n - 1 - i];

        // If the sum of the current pair is not equal to the target, return -1
        if (left + right !== targetSum) {
            return -1;
        }

        // Add the product of the current pair to the total chemistry
        totalChemistry += left * right;
    }

    // Step 4: Return the total chemistry
    return totalChemistry;
}
