class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    push([node, prob]) {
        this.heap.push([node, prob]);
        this._heapifyUp();
    }
    
    pop() {
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return top;
    }
    
    _heapifyUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[idx][1] <= this.heap[parentIdx][1]) break;
            [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
            idx = parentIdx;
        }
    }
    
    _heapifyDown() {
        let idx = 0;
        const length = this.heap.length;
        while (true) {
            const leftChildIdx = 2 * idx + 1;
            const rightChildIdx = 2 * idx + 2;
            let largest = idx;
            
            if (leftChildIdx < length && this.heap[leftChildIdx][1] > this.heap[largest][1]) {
                largest = leftChildIdx;
            }
            
            if (rightChildIdx < length && this.heap[rightChildIdx][1] > this.heap[largest][1]) {
                largest = rightChildIdx;
            }
            
            if (largest === idx) break;
            
            [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
            idx = largest;
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}

function maxProbability(n, edges, succProb, start, end) {
    const graph = Array.from({ length: n }, () => []);
    
    // Build the graph
    for (let i = 0; i < edges.length; i++) {
        const [u, v] = edges[i];
        graph[u].push([v, succProb[i]]);
        graph[v].push([u, succProb[i]]);
    }
    
    // Probability array to store max probability for each node
    const prob = Array(n).fill(0);
    prob[start] = 1;
    
    // Max heap to always expand the highest probability path first
    const heap = new MaxHeap();
    heap.push([start, 1]);
    
    while (!heap.isEmpty()) {
        const [node, curProb] = heap.pop();
        
        if (node === end) {
            return curProb;
        }
        
        for (const [neighbor, neighborProb] of graph[node]) {
            const newProb = curProb * neighborProb;
            if (newProb > prob[neighbor]) {
                prob[neighbor] = newProb;
                heap.push([neighbor, newProb]);
            }
        }
    }
    
    return 0;
}

// Example usage
console.log(maxProbability(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.2], 0, 2)); // Output: 0.25
console.log(maxProbability(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.3], 0, 2)); // Output: 0.3
console.log(maxProbability(3, [[0,1]], [0.5], 0, 2));                    // Output: 0.0
