function solution(rows, columns, queries) {
  // 행렬 초기화
  let matrix = Array.from(Array(rows), () => new Array(columns));
  let num = 1;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      matrix[row][col] = num;
      num++;
    }
  }

  function rotate(x1, y1, x2, y2) {
    // 좌표를 0 기준으로 설정
    x1--;
    y1--;
    x2--;
    y2--;
    let prev = matrix[x1][y1]; // 이전 값 초기화
    let min = matrix[x1][y1]; // 회전된 값 중 가장 작은 값 초기화
    // (x1, y1) -> (x1, y2)
    for (let col = y1; col < y2; col++) {
      let temp = matrix[x1][col + 1];
      min = min > temp ? temp : min;
      matrix[x1][col + 1] = prev;
      prev = temp;
    }
    // (x1, y2) -> (x2, y2)
    for (let row = x1; row < x2; row++) {
      let temp = matrix[row + 1][y2];
      min = min > temp ? temp : min;
      matrix[row + 1][y2] = prev;
      prev = temp;
    }
    // (x2, y2) -> (x2, y1)
    for (let col = y2; col > y1; col--) {
      let temp = matrix[x2][col - 1];
      min = min > temp ? temp : min;
      matrix[x2][col - 1] = prev;
      prev = temp;
    }
    // (x2, y1) -> (x1, y1)
    for (let row = x2; row > x1; row--) {
      let temp = matrix[row - 1][y1];
      min = min > temp ? temp : min;
      matrix[row - 1][y1] = prev;
      prev = temp;
    }
    return min;
  }

  // 각 회전 처리
  return queries.map((query) => rotate(...query));
}

console.log(
  solution(6, 6, [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ]),
  [8, 10, 25]
);
console.log(
  solution(3, 3, [
    [1, 1, 2, 2],
    [1, 2, 2, 3],
    [2, 1, 3, 2],
    [2, 2, 3, 3],
  ]),
  [1, 1, 5, 3]
);
console.log(solution(100, 97, [[1, 1, 100, 97]]), [1]);
