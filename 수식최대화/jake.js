let maxNum = 0;

function solution(expression) {
  const originNumbers = expression
    .split(/[*|+|-]/)
    .map((number) => Number(number));
  const originOperations = expression.replace(/[0-9]/g, '').split('');

  const numbersOperations = originNumbers.reduce((acc, current, idx) => {
    acc.push(current, originOperations[idx]);
    return acc;
  }, []);
  numbersOperations.pop();

  const uniqueArr = makeUniqueArr(originOperations);
  const N = uniqueArr.length;
  const selected = new Array(N).fill(0);
  const copy = new Array(N).fill(0);

  permutation(0, uniqueArr, selected, copy, N, numbersOperations);
  return maxNum;
}

const makeUniqueArr = (duplicateArr) => {
  let uniqueArr = [];
  duplicateArr.forEach((element) => {
    if (!uniqueArr.includes(element)) {
      uniqueArr.push(element);
    }
  });

  return uniqueArr;
};

const permutation = (idx, arr, selected, copy, N, originNumbersOperations) => {
  if (idx === N) {
    let numbersOperations = [...originNumbersOperations];
    for (let c of copy) {
      let result = [];
      for (let i = 0; i < numbersOperations.length; i++) {
        result.push(numbersOperations[i]);

        if (numbersOperations[i] === c) {
          result.pop();
          let beforeValue = result.pop();

          let calc = 0;
          switch (c) {
            case '+':
              calc = beforeValue + numbersOperations[i + 1];
              break;
            case '-':
              calc = beforeValue - numbersOperations[i + 1];
              break;
            case '*':
              calc = beforeValue * numbersOperations[i + 1];
              break;
          }

          i += 1;
          result.push(calc);
        }
      }
      numbersOperations = [...result];

      if (result.length === 1) {
        maxNum = Math.abs(result[0]) > maxNum ? Math.abs(result[0]) : maxNum;
      }
    }
    return;
  }
  for (let i = 0; i < N; i++) {
    if (selected[i] === 0) {
      selected[i] = 1;
      copy[idx] = arr[i];
      permutation(idx + 1, arr, selected, copy, N, originNumbersOperations);
      selected[i] = 0;
    }
  }
};
