function isAlphabet(str) {
  return /^[A-Za-z]{2}$/.test(str);
}

function createMultiset(str) {
  const multiset = {};
  for (let i = 0; i < str.length; i++) {
    const duo = str.slice(i, i + 2).toUpperCase();
    if (isAlphabet(duo)) {
      multiset[duo] = multiset[duo] ? multiset[duo] + 1 : 1;
    }
  }
  return multiset;
}

function getIntersectionSize(multiset1, multiset2) {
  let result = 0;
  const set1 = new Set(Object.keys(multiset1));
  const set2 = new Set(Object.keys(multiset2));
  for (const e of set1) {
    if (set2.has(e)) {
      result += Math.min(multiset1[e], multiset2[e]);
    }
  }
  return result;
}

function getUnionSize(multiset1, multiset2) {
  const set1 = new Set(Object.keys(multiset1));
  const set2 = new Set(Object.keys(multiset2));
  for (const e of set2) {
    set1.add(e);
  }
  return [...set1].reduce((acc, cur) => {
    return acc + Math.max(multiset1[cur] || 0, multiset2[cur] || 0);
  }, 0);
}

function solution(str1, str2) {
  const multiset1 = createMultiset(str1);
  const multiset2 = createMultiset(str2);
  const intersectionSize = getIntersectionSize(multiset1, multiset2);
  const unionSize = getUnionSize(multiset1, multiset2);
  if (!intersectionSize && !unionSize) return 65536;
  return Math.floor((intersectionSize / unionSize) * 65536);
}

console.log(solution("FRANCE", "french"), 16384);
console.log(solution("handshake", "shake hands"), 65536);
console.log(solution("aa1+aa2", "AAAA12"), 43690);
console.log(solution("E=M*C^2", "e=m*c^2"), 65536);
