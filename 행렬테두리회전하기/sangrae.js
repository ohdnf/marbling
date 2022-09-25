/**
 * 1. 사각형 만들기
 * 2. 회전할 번호 뽑기
 *  2-1) [(x1, y1), (x1, y1 + 1), ..., (x1, y2), (x1 + 1, y2), (x1 + 2, y2) ..., (x2, y2), ]
 *  2-2) 번호 뽑으면서 작은 수 찾기
 * 3. 회전 후 인덱스에 넣기
 */

function solution(rows, columns, queries) {
  const square = [];

  for (let r = 0; r < rows; r += 1) {
    const row = [];
    for (let c = 0; c < columns; c += 1) {
      row[c] = c + 1 + columns * r;
    }
    square[r] = row;
  }

  const answer = [];

  for (let i = 0; i < queries.length; i += 1) {
    let [x1, y1, x2, y2] = queries[i];
    x1 = x1 - 1;
    y1 = y1 - 1;
    x2 = x2 - 1;
    y2 = y2 - 1;

    const nums = [];

    let min = square[x1][y1];

    // 숫자 빼기
    // 윗변
    for (let i = y1; i < y2; i += 1) {
      const num = square[x1][i];
      nums.push(num);
      min = num < min ? num : min;
    }

    // 오른쪽변
    for (let i = x1; i < x2; i += 1) {
      const num = square[i][y2];
      nums.push(num);
      min = num < min ? num : min;
    }
    // 아랫변
    for (let i = y2; i > y1; i -= 1) {
      const num = square[x2][i];
      nums.push(num);
      min = num < min ? num : min;
    }

    // 왼쪽변
    for (let i = x2; i > x1; i -= 1) {
      const num = square[i][y1];
      nums.push(num);
      min = num < min ? num : min;
    }

    const lastNum = nums.pop();
    nums.unshift(lastNum);

    // 숫자 넣기
    // 윗변
    for (let i = y1; i < y2; i += 1) {
      square[x1][i] = nums.shift();
    }

    // 오른쪽변
    for (let i = x1; i < x2; i += 1) {
      square[i][y2] = nums.shift();
    }

    // 아랫변
    for (let i = y2; i > y1; i -= 1) {
      square[x2][i] = nums.shift();
    }

    // 왼쪽변
    for (let i = x2; i > x1; i -= 1) {
      square[i][y1] = nums.shift();
    }

    answer.push(min);
  }

  return answer;

  // ? 아래의 코드는 제일 처음 짠 코드인데 런타임 에러가 나네요 .. 속상하네요..
  // const square = [];
  // for (let r = 0; r < rows; r += 1) {
  //   const row = [];
  //   for (let c = 0; c < columns; c += 1) {
  //     row[c] = c + 1 + columns * r;
  //   }
  //   square[r] = row;
  // }
  // const rotationHandler = (result = []) => {
  //   if (!queries.length) {
  //     return result;
  //   }
  //   let [x1, y1, x2, y2] = queries.shift();
  //   x1 = x1 - 1;
  //   y1 = y1 - 1;
  //   x2 = x2 - 1;
  //   y2 = y2 - 1;
  //   const nums = [];
  //   let min = square[x1][y1];
  //   // 숫자 빼기
  //   // 윗변
  //   for (let i = y1; i < y2; i += 1) {
  //     const num = square[x1][i];
  //     nums.push(num);
  //     min = num < min ? num : min;
  //   }
  //   // 오른쪽변
  //   for (let i = x1; i < x2; i += 1) {
  //     const num = square[i][y2];
  //     nums.push(num);
  //     min = num < min ? num : min;
  //   }
  //   // 아랫변
  //   for (let i = y2; i > y1; i -= 1) {
  //     const num = square[x2][i];
  //     nums.push(num);
  //     min = num < min ? num : min;
  //   }
  //   // 왼쪽변
  //   for (let i = x2; i > x1; i -= 1) {
  //     const num = square[i][y1];
  //     nums.push(num);
  //     min = num < min ? num : min;
  //   }
  //   const lastNum = nums.pop();
  //   nums.unshift(lastNum);
  //   // 숫자 넣기
  //   // 윗변
  //   for (let i = y1; i < y2; i += 1) {
  //     square[x1][i] = nums.shift();
  //   }
  //   // 오른쪽변
  //   for (let i = x1; i < x2; i += 1) {
  //     square[i][y2] = nums.shift();
  //   }
  //   // 아랫변
  //   for (let i = y2; i > y1; i -= 1) {
  //     square[x2][i] = nums.shift();
  //   }
  //   // 왼쪽변
  //   for (let i = x2; i > x1; i -= 1) {
  //     square[i][y1] = nums.shift();
  //   }
  //   return rotationHandler([...result, min]);
  // };
  // return rotationHandler();
}
