const OPERATOR = ["+", "-", "*"];

/**
 * 연산 함수
 * @param {number} num1 첫번째숫자
 * @param {number} num2 두번째숫자
 * @param {string} op 연산자
 * @returns {number} 결과값
 */
function calc(num1, num2, op) {
  if (op === "+") return num1 + num2;
  if (op === "-") return num1 - num2;
  if (op === "*") return num1 * num2;
}

/**
 * 인자로 받은 연산자를 우선 처리하는 함수
 * @param {any[]} expression 수식 배열
 * @param {string} op 연산자
 * @returns {any[]} 처리 후 수식 배열
 */
function process(expression, op) {
  const stack = [];
  while (expression.length) {
    const cur = expression.shift();
    if (cur === op) {
      const before = stack.pop();
      const after = expression.shift();
      stack.push(calc(before, after, cur));
    } else {
      stack.push(cur);
    }
  }
  return stack;
}

function solution(expression) {
  /** expression에 포함된 연산자의 우선순위를 재정의해 수식 결과의 절대값의 최대값 구하기 */
  // 포함된 연산자 구하기 및 expression 배열화
  const operator = new Set();
  let number = "";
  expression = [...expression].reduce((exp, val) => {
    if (OPERATOR.includes(val)) {
      operator.add(val);
      exp.push(parseInt(number), val);
      number = "";
    } else {
      number = number.concat(val);
    }
    return exp;
  }, []);
  expression.push(parseInt(number));
  // 주어진 연산자로 만들 수 있는 모든 우선순위 경우의 수 도출
  const orders = [];
  function combination(remains, order) {
    if (order.length === operator.size) orders.push(order);
    if (!remains?.length) return;
    remains.forEach((op) => {
      combination(
        remains.filter((r) => r !== op),
        [...order, op]
      );
    });
  }
  combination([...operator], []);
  // 서로 다른 연산자 우선순위의 모든 경우의 수에 따라 결과값 계산
  let answer = 0;
  for (const order of orders) {
    let temp = [...expression];
    for (const op of order) {
      temp = process(temp, op);
    }
    answer = Math.max(answer, Math.abs(temp[0]));
  }
  return answer;
}

console.log(solution("100-200*300-500+20"), 60420);
console.log(solution("50*6-3*2"), 300);
