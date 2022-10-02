function solution(rows, columns, queries) {
  const arr = makeInitArr(rows, columns);
  let answer = [];

  for (let q of queries) {
    let [x1, y1, x2, y2] = q;
    x1--;
    y1--;
    x2--;
    y2--;

    let beforeValue = arr[x1][y1]; // 이전 행렬 위치의 값
    let constValue = arr[x1][y1]; // 현재 행렬 위치의 값
    let minValue = constValue; // 최소값

    // ➡️ 이동하며 값 변경
    for (let y = y1 + 1; y <= y2; y++) {
      constValue = arr[x1][y]; // 현재 행렬 위치의 값 저장
      arr[x1][y] = beforeValue; // 현재 행렬 위치의 값을 이전 행렬 위치의 값으로 변경
      beforeValue = constValue; // 이전 값에 현재 값으로 변경하여 저장
      minValue = Math.min(minValue, constValue); // 가장 작은 값과 현재 값 비교하여 작은 값 저장
    }
    // ⬇️ 이동하며 값 변경
    for (let x = x1 + 1; x <= x2; x++) {
      constValue = arr[x][y2];
      arr[x][y2] = beforeValue;
      beforeValue = constValue;
      minValue = Math.min(minValue, constValue);
    }
    // ⬅️ 이동하며 값 변경
    for (let y = y2 - 1; y >= y1; y--) {
      constValue = arr[x2][y];
      arr[x2][y] = beforeValue;
      beforeValue = constValue;
      minValue = Math.min(minValue, constValue);
    }
    // ⬆️ 이동하며 값 변경
    for (let x = x2 - 1; x >= x1; x--) {
      constValue = arr[x][y1];
      arr[x][y1] = beforeValue;
      beforeValue = constValue;
      minValue = Math.min(minValue, constValue);
    }

    answer.push(minValue);
  }

  return answer;
}

const makeInitArr = (rows, columns) => {
  const arr = [];
  let cnt = 1;

  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < columns; j++) {
      arr[i].push(cnt);
      cnt += 1;
    }
  }

  return arr;
};
