/*


*/
const initialize2DArray = (n, m) => { let d = []; for (let i = 0; i < n; i++) { let t = Array(m).fill(0); d.push(t); } return d; };

const hit = (cur) => {
    if (cur == 'W') return true;
    if (cur == 'G') return true;
    return false;
}

const countUnguarded = (n, m, guards, walls) => {
    let visit = initialize2DArray(n, m), cnt = 0;
    for (const [x, y] of walls) visit[x][y] = 'W';
    for (const [x, y] of guards) visit[x][y] = 'G';
    for (const [x, y] of guards) {
        for (let j = y + 1; j < m; j++) { // right
            if (hit(visit[x][j])) break;
            visit[x][j] = "R";
        }
        for (let j = y - 1; j >= 0; j--) { // left
            if (hit(visit[x][j])) break;
            visit[x][j] = "R";
        }
        for (let i = x + 1; i < n; i++) { // down
            if (hit(visit[i][y])) break;
            visit[i][y] = "R";
        }
        for (let i = x - 1; i >= 0; i--) { // up
            if (hit(visit[i][y])) break;
            visit[i][y] = "R";
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (visit[i][j] == 0) cnt++;
        }
    }
    return cnt;
};