// void DijkstrasAlgo(int **edges, int n, int e, int s)
// {
//     bool *visited = new bool[n];
//     int *dist = new int[n];

//     for (int i = 0; i < n; i++)
//     {
//         visited[i] = false;
//         dist[i] = INT16_MAX;
//     }

//     dist[s] = 0;

//     for (int j = 0; j < n - 1; j++)
//     {
//         int minDist = INT16_MAX;
//         int minDistIndex;
//         for (int i = 0; i < n; i++)
//         {
//             if (!visited[i] && dist[i] < minDist)
//             {
//                 minDist = dist[i];
//                 minDistIndex = i;
//             }
//         }

//         for (int i = 0; i < n; i++)
//         {
//             if (edges[minDistIndex][i] != 0 && !visited[i])
//             {
//                 if (edges[minDistIndex][i] + dist[minDistIndex] < dist[i])
//                 {
//                     dist[i] = edges[minDistIndex][i] + dist[minDistIndex];
//                 }
//             }
//         }

//         visited[minDistIndex] = true;
//     }

//     for (int i = 0; i < n; i++)
//     {
//         cout << "From " << s << " To " << i << " distance is " << dist[i] << endl;
//     }

//     delete[] visited;
//     delete[] dist;
// }

//Shortest Distance b/w Source and Target
// int shortestDistance(int n, int m, vector<vector<int>> arr, int X, int Y) {

//     if(arr[0][0] == 0){
//         return -1;
//     }

//     vector<vector<int>> ans(n,vector<int>(m,-1));
//     vector<pair<int,int>> dir = {{1,0},{0,1},{-1,0},{0,-1}};

//     queue<pair<pair<int,int>,int>> q;
//     q.push({{0,0},0}); // Push Source into queue

//     while(q.size() != 0){
//         pair<pair<int,int>,int> curr = q.front();
//         q.pop();

//         for(auto it:dir){
//             int i = curr.first.first + it.first;
//             int j = curr.first.second + it.second;

//             if(i < 0 || i >= n || j < 0 || j >= m || arr[i][j] != 1 || ans[i][j] != -1){
//                 continue;
//             }

//             if(i == X && j == Y){
//                 return curr.second+1;
//             }

//             q.push({{i,j},curr.second+1});

//             ans[i][j] = curr.second+1;
//         }
//     }

//     return -1;
// }

const n = 20;
const m = 64;
let ans = []; // Store the path
let visited = new Array(n);
for (let i = 0; i < n; i++) {
  visited[i] = new Array(m);
  for (let j = 0; j < m; j++) {
    visited[i][j] = false;
  }
}

export default function DijkstrasAlgo(source, target) {
  // let visited = new Array(n);
  // let dp = new Array(n);

  // for (let i = 0; i < n; i++) {
  //   visited[i] = new Array(m);
  //   dp[i] = new Array(m);
  //   for (let j = 0; j < m; j++) {
  //     visited[i][j] = false;
  //     dp[i][j] = -1;
  //   }
  // }

  // const dir = [
  //   {
  //     x: 1,
  //     y: 0,
  //   },
  //   {
  //     x: -1,
  //     y: 0,
  //   },
  //   {
  //     x: 0,
  //     y: 1,
  //   },
  //   {
  //     x: 0,
  //     y: -1,
  //   },
  // ];

  const sx = Number(source.x);
  const sy = Number(source.y);
  const tx = Number(target.x);
  const ty = Number(target.y);

  // console.log(arr);

  // if (sx === tx && sy === ty) {
  //   return 0;
  // }

  // const q = [];
  // q.push({ x: sx, y: sy, dist: 0 });
  // // console.log(q);
  // // console.log(sx, sy, tx, ty);

  // while (q.length > 0) {
  //   const curr = q.shift();

  //   for (let it = 0; it < 4; it++) {
  //     let i = curr.x + dir[it].x;
  //     let j = curr.y + dir[it].y;

  //     if (i < 0 || i >= n || j < 0 || j >= m || dp[i][j] !== -1) {
  //       continue;
  //     }

  //     if (i === tx && j === ty) {
  //       dp[i][j] = curr.dist + 1;
  //       console.log(curr.dist + 1);
  //       return dp;
  //     }

  //     q.push({ x: i, y: j, dist: curr.dist + 1 });
  //     dp[i][j] = curr.dist + 1;
  //   }
  // }

  // // Target Not found
  // return -1;
  // getPathDFS(sx, sy, tx, ty);
  console.log(ans);
}

function getPathDFS(sx, sy, tx, ty) {
  if (sx >= n || sy >= m) {
    return;
  }

  if (sx === tx && sy === ty) {
    ans.push({ x: sx, y: sy });
    visited[sx][sy] = true;
    return;
  }

  visited[sx][sy] = true;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j]) {
        getPathDFS(sx + i, sy + j, tx, ty);
        if (ans.length !== 0) {
          ans.push({ x: i, y: j });
          return;
        }
      }
    }
    // if (!visited[i]) {
    //   getPathDFS(edges, i, ev);
    //   if (ans.length !== 0) {
    //     ans.push(sv);
    //     return;
    //   }
    // }
  }
}
