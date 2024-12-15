/*
1792. Maximum Average Pass Ratio
Medium
Topics
Companies
Hint
There is a school that has classes of students and each class will be having a final exam. You are given a 2D integer array classes, where classes[i] = [passi, totali]. You know beforehand that in the ith class, there are totali total students, but only passi number of students will pass the exam.

You are also given an integer extraStudents. There are another extraStudents brilliant students that are guaranteed to pass the exam of any class they are assigned to. You want to assign each of the extraStudents students to a class in a way that maximizes the average pass ratio across all the classes.

The pass ratio of a class is equal to the number of students of the class that will pass the exam divided by the total number of students of the class. The average pass ratio is the sum of pass ratios of all the classes divided by the number of the classes.

Return the maximum possible average pass ratio after assigning the extraStudents students. Answers within 10-5 of the actual answer will be accepted.

 

Example 1:

Input: classes = [[1,2],[3,5],[2,2]], extraStudents = 2
Output: 0.78333
Explanation: You can assign the two extra students to the first class. The average pass ratio will be equal to (3/4 + 3/5 + 2/2) / 3 = 0.78333.
Example 2:

Input: classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
Output: 0.53485
*/


/**
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
var maxAverageRatio = function(classes, extraStudents) {
    let maxRatioGainHeap = new MaxPriorityQueue();
    let ratioSum = 0;
    for(let [numPass, numStudents] of classes){
        // skip if already at 100%
        if((numPass / numStudents) === 1){
            ratioSum += 1;
        } else{
            maxRatioGainHeap.enqueue([numPass, numStudents], getRatioGain(numPass, numStudents));
        }
    }
    while(maxRatioGainHeap.size() && extraStudents){
        // pick the class where we can make the largest difference in pass ratio
        let [numPass, numStudents] = maxRatioGainHeap.dequeue().element;
        maxRatioGainHeap.enqueue([numPass + 1, numStudents + 1], getRatioGain(numPass + 1, numStudents + 1));
        extraStudents -= 1;
    }
    // sum up final ratios
    while(maxRatioGainHeap.size()){
        let [numPass, numStudents] = maxRatioGainHeap.dequeue().element;
        ratioSum += (numPass / numStudents);
    }
    return ratioSum / classes.length;
};

// compute the difference of the ratio if one passiing student is added
function getRatioGain(numPass, numStudents){
    return ((numPass + 1) / (numStudents + 1)) - (numPass / numStudents);
}