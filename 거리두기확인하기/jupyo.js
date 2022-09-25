function solutionDFS(places) {
  /**
   * 대기실 착석 규칙
   * 대기실은 5x5
   * 응시자 간 맨해튼 거리(|r1 - r2| + |c1 - c2|) 2 이하 착석 불가
   * 응시자 사이 파티션 있을 경우 맨해튼 거리 2 이하도 착석 가능
   * P: 응시자, O: 빈 테이블, X: 파티션
   * 거리두기 지키면 1, 어기면 0을 배열에 담아 반환
   */
  const DIRECTION = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // ESWN
  return places.map((place) => {
    // 대기실 모든 자리 순회
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        // 응시자인 경우 거리두기 확인
        if (place[row][col] === "P") {
          // 방문 기록 배열 생성
          const visited = Array.from(Array(5), () => new Array(5).fill(false));
          const queue = [[row, col, 0]]; // [행, 열, 거리]
          while (queue?.length > 0) {
            const [crow, ccol, distance] = queue.shift();
            // 이미 방문하거나 거리가 2 이상인 경우 스킵
            if (visited[crow][ccol] || distance > 2) continue;
            visited[crow][ccol] = true; // 방문 처리
            if (distance > 0 && place[crow][ccol] === "P") {
              // 거리두기 위반
              return 0;
            } else if (place[crow][ccol] !== "X") {
              // 파티션 없으면 계속 검사
              for (const [drow, dcol] of DIRECTION) {
                const [nrow, ncol] = [crow + drow, ccol + dcol];
                if (nrow >= 0 && nrow < 5 && ncol >= 0 && ncol < 5) {
                  queue.unshift([nrow, ncol, distance + 1]); // DFS
                }
              }
            }
          }
        }
      }
    }
    return 1;
  });
}

function solution(places) {
  /**
   * 대기실 착석 규칙
   * 대기실은 5x5
   * 응시자 간 맨해튼 거리(|r1 - r2| + |c1 - c2|) 2 이하 착석 불가
   * 응시자 사이 파티션 있을 경우 맨해튼 거리 2 이하도 착석 가능
   * P: 응시자, O: 빈 테이블, X: 파티션
   * 거리두기 지키면 1, 어기면 0을 배열에 담아 반환
   */
  const DIRECTION = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // ESWN
  return places.map((place) => {
    // 대기실 모든 자리 순회
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (place[row][col] === "P") {
          // 응시자가 붙어있는 경우 확인
          for (const [drow, dcol] of DIRECTION) {
            const [nrow, ncol] = [row + drow, col + dcol];
            if (
              nrow >= 0 &&
              nrow < 5 &&
              ncol >= 0 &&
              ncol < 5 &&
              place[nrow][ncol] === "P"
            ) {
              return 0;
            }
          }
        } else if (place[row][col] === "O") {
          // 빈 테이블을 사이에 두고 앉아있는 응시자 확인
          let interviewee = 0;
          for (const [drow, dcol] of DIRECTION) {
            const [nrow, ncol] = [row + drow, col + dcol];
            if (
              nrow >= 0 &&
              nrow < 5 &&
              ncol >= 0 &&
              ncol < 5 &&
              place[nrow][ncol] === "P"
            ) {
              interviewee += 1;
            }
          }
          if (interviewee > 1) return 0;
        }
      }
    }
    return 1;
  });
}

console.log(
  solution([
    ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
    ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
    ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
    ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
    ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
    ["XPXPX", "PXPXP", "XPXPX", "PXPXP", "XPXPX"],
    ["PPPPP", "PPPPP", "PPPPP", "PPPPP", "PPPPP"],
    ["OOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOOO"],
    ["XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX"],
    ["POOOO", "OPOOO", "OOPOO", "OOOPO", "OOOOP"],
    ["POOOO", "OOOOO", "OOPOO", "OOOOO", "OOOOP"],
  ]),
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1]
);
