/**
 * 1. 두 테이블 T1, T2가 행렬 (r1, c1), (r2, c2)에 각각 위치하고 있다면, T1, T2 사이의 맨해튼 거리는 |r1 - r2| + |c1 - c2| 입니다.
 * 2. 거리 두기 검사
 *  2-1. 검사 하고자하는 요소가 P가 맞을 경우
 *  2-2. 오른쪽 , 아래 2칸 대각선 모든 방향 1칸
 */

const checkInManhattanDistance = (place) => {
  let fail = false;

  for (let r = 0; r < 5; r += 1) {
    if (fail) {
      break;
    }

    for (let c = 0; c < 5; c += 1) {
      if (place[r][c] !== "P") {
        continue;
      }

      if (place[r + 1]) {
        if (place[r + 1][c + 1]) {
          switch (place[r + 1][c + 1]) {
            case "P":
              if (place[r + 1][c] === "X" && place[r][c + 1] === "X") {
                break;
              }
              fail = true;
              break;
          }
        }

        if (place[r + 1][c - 1]) {
          switch (place[r + 1][c - 1]) {
            case "P":
              if (place[r + 1][c] === "X" && place[r][c - 1] === "X") {
                break;
              }
              fail = true;
              break;
          }
        }
      }

      if (place[r - 1]) {
        if (place[r - 1][c + 1]) {
          switch (place[r - 1][c + 1]) {
            case "P":
              if (place[r - 1][c] === "X" && place[r][c + 1] === "X") {
                break;
              }
              fail = true;
              break;
          }
        }

        if (place[r - 1][c - 1]) {
          switch (place[r - 1][c - 1]) {
            case "P":
              if (place[r - 1][c] === "X" && place[r][c - 1] === "X") {
                break;
              }
              fail = true;
              break;
          }
        }
      }

      if (place[r + 1]) {
        switch (place[r + 1][c]) {
          case "P":
            fail = true;
            break;
          case "O":
            if (place[r + 2] && place[r + 2][c] === "P") {
              fail = true;
            }
            break;
        }
      }

      if (place[c + 1]) {
        switch (place[r][c + 1]) {
          case "P":
            fail = true;
            break;
          case "O":
            if (place[c + 2] && place[r][c + 2] === "P") {
              fail = true;
            }
            break;
        }
      }
    }
  }

  return !fail ? 1 : 0;
};

function solution(places) {
  let answer = [];

  const makeSoultionFunc = () => {
    for (const place of places) {
      answer.push(checkInManhattanDistance(place));
    }
  };

  makeSoultionFunc();

  return answer;
}
