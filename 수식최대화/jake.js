let maxNum = 0;
const priorityList = [
  ['*', '+', '-'],
  ['*', '-', '+'],
  ['+', '*', '-'],
  ['+', '-', '*'],
  ['-', '*', '+'],
  ['-', '+', '*'],
];

function solution(expression) {
  const expressionList = makeExpressionList(expression);

  for (let arithmeticList of priorityList) {
    calc(arithmeticList, expressionList);
  }

  return maxNum;
}

const makeExpressionList = (originString) => {
  const exp = ['*', '+', '-'];
  let res = [];
  let string = '';
  for (let i = 0; i < originString.length; i++) {
    if (exp.includes(originString[i])) {
      res = [...res, Number(string), originString[i]];
      string = '';
    } else {
      string += originString[i];
    }
  }
  res.push(Number(string));

  return res;
};

const calc = (arithmeticList, expressionList) => {
  for (let arithmetic of arithmeticList) {
    let nextExpressionList = [];
    for (let i = 0; i < expressionList.length; i++) {
      nextExpressionList.push(expressionList[i]);

      if (expressionList[i] === arithmetic) {
        nextExpressionList.pop();
        let beforeValue = nextExpressionList.pop();

        let calc = 0;
        switch (arithmetic) {
          case '+':
            calc = beforeValue + expressionList[i + 1];
            break;
          case '-':
            calc = beforeValue - expressionList[i + 1];
            break;
          case '*':
            calc = beforeValue * expressionList[i + 1];
            break;
        }

        i += 1;
        nextExpressionList.push(calc);
      }
    }
    expressionList = [...nextExpressionList];
  }
  const result = Math.abs(expressionList[0]);
  maxNum = result > maxNum ? result : maxNum;
};
