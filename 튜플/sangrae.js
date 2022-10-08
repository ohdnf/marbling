/**
 * 개요: 빈도 수가 높은 수 순서대로 정렬
 * 1. {} 제거
 * 2. , 기준으로 split 배열
 * 3. reduce를 이용한 빈도 수 측정
 * 4. Object.entries를 이용한 키 / 값 배치
 * 5. 정렬
 * 6. 정렬된 순서로 키 배열화
 */
function solution(s) {
  return Object.entries(
    s
      .replace(/[{|}]/g, "")
      .split(",")
      .reduce((acc, cur) => {
        if (parseInt(cur)) {
          if (acc[parseInt(cur)]) {
            acc[parseInt(cur)] += 1;
          } else {
            acc[parseInt(cur)] = 1;
          }
        }

        return acc;
      }, {})
  )
    .sort((a, b) => {
      if (a[1] > b[1]) {
        return -1;
      } else if (a[1] < b[1]) {
        return 1;
      } else {
        0;
      }
    })
    .map((ele) => parseInt(ele[0]));
}

console.log(solution("{{2},{2,1},{2,1,3},{2,1,3,4}}"), "=>", [2, 1, 3, 4]);
console.log(solution("{{1,2,3},{2,1},{1,2,4,3},{2}}"), "=>", [2, 1, 3, 4]);
console.log(solution("{{20,111},{111}}"), "=>", [111, 20]);
console.log(solution("{{123}}"), "=>", [123]);
console.log(solution("{{4,2,3},{3},{2,3,4,1},{2,3}}"), "=>", [3, 2, 4, 1]);
