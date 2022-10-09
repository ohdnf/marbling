const MULTIPLE = 65536;
function solution(str1, str2) {
  const [str1Arr, str2Arr] = [makeArr(str1), makeArr(str2)];
  if ((str1Arr.length === 0) & (str2Arr.length === 0)) return MULTIPLE;

  const unionArr = makeUnionArr([...str1Arr], str2Arr);
  const intersectionArr = makeIntersectionArr([...str1Arr], str2Arr);

  return Math.floor((intersectionArr.length / unionArr.length) * MULTIPLE);
}

const makeArr = (str) => {
  const resArr = [];
  const specialLetterReg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\" ]/gi;
  const numLetterReg = /[0-9]/gi;

  for (let i = 0; i < str.length - 1; i++) {
    const firstStr = str[i].toLowerCase();
    const secondStr = str[i + 1].toLowerCase();
    const res = (firstStr + secondStr)
      .replace(specialLetterReg, "")
      .replace(numLetterReg, "");

    if (res.length === 2) {
      resArr.push(res);
    }
  }

  return resArr;
};

const makeUnionArr = (firstArr, secondArr) => {
  const resArr = [...firstArr];

  for (let second of secondArr) {
    if (firstArr.includes(second)) {
      const idx = firstArr.indexOf(second);
      if (idx > -1) {
        firstArr.splice(idx, 1);
      }
    } else {
      resArr.push(second);
    }
  }
  return resArr;
};

const makeIntersectionArr = (firstArr, secondArr) => {
  const resArr = [];

  for (let second of secondArr) {
    if (firstArr.includes(second)) {
      resArr.push(second);
      const idx = firstArr.indexOf(second);
      if (idx > -1) {
        firstArr.splice(idx, 1);
      }
    }
  }
  return resArr;
};
