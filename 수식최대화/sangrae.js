/**
 * 1. 모든 경우의 수를 다 따져보며 계산
 * 2. 기호 단위로 나누어진 3차원의 배열이라고 생각
 *  (ex. "100 * 20 + 500 * 30 - 1" => [[[100 20], 20, [500 30]], 1])
 *  2-1. * - + 우선 순위 적용 3! 총 6가지 ( * + - / * - + / + * - / + - * / - * + / - + *)
 *  2-2. 가장 높은 차원의 배열부터 2-1에서 적용된 우선 순위 역순으로 계산
 *  2-3. 고정된 변수에 절대값이 가장 큰 값으로 할당
 */
const expSigns = [
  ["*", "+", "-"],
  ["*", "-", "+"],
  ["+", "*", "-"],
  ["+", "-", "*"],
  ["-", "*", "+"],
  ["-", "+", "*"],
];

const calculator = (num1, num2, sign) => {
  num1 = parseInt(num1);
  num2 = parseInt(num2);

  if (sign === "*") {
    return num1 * num2;
  }

  if (sign === "+") {
    return num1 + num2;
  }

  if (sign === "-") {
    return num1 - num2;
  }
};

function solution(expression) {
  let answer = 0;

  const divideByExpression = (curExpression, remainSign) => {
    if (remainSign.length === 0) {
      return;
    }

    const curSign = remainSign[0];
    const curExp = curExpression.split(curSign);
    let result;

    for (let unit of curExp) {
      if (unit.match(/(\+|-|\*)/)) {
        unit = divideByExpression(unit, remainSign.slice(1));
      }

      if (result === undefined) {
        result = parseInt(unit);
      } else {
        result = calculator(result, unit, curSign);
      }
    }

    return result;
  };

  for (let expSign of expSigns) {
    const result = Math.abs(divideByExpression(expression, expSign));
    answer = result > answer ? result : answer;
  }

  return parseInt(answer);
}
