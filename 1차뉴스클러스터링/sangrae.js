/**
 * 1. 문자 소문자 화
 * 2. 둘 중 길이가 더 긴 문자열을 기준으로 for 반복문 실행
 *  2-1. 1번 인덱스부터 시작해 앞 인덱스와 결합해 원소 생성
 *  2-2. 인덱스에 문자열이 없는 경우 문자열 생성 중단
 *  2-3. 현재 인덱스와 앞 인덱스의 문자열이 영문자 쌍이 아닌 경우 무시
 * 3. 두 집합을 A, B로 하고 교집합(intersection)을 I, 합집합(union) U 로 가정할 때
 *  3-1. A의 원소 하나씩 for 문을 실행하여 B의 원소와 겹치는 원소가 있는 지 비교
 *  3-2. 겹친다면 I 및 U 에 1씩 카운트 업
 *  3-3. 위의 과정을 거친 후 A, B의 남은 문자열 개수를 U에 카운트 업
 * 4. I / U * 65536
 */

const alp = "abcdefghijklmnopqrstuvwxyz";

function solution(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  if (str1 === str2) {
    return 65536;
  }

  const max = Math.max(str1.length, str2.length);

  let elements1 = [];
  let elements2 = [];

  const genElementFunc = (unit1, unit2, arr) => {
    unit1 = String(unit1);
    unit2 = String(unit2);
    if (!alp.includes(unit1) || !alp.includes(unit2)) {
      return;
    } else {
      arr.push(unit1 + unit2);
    }

    return;
  };

  for (let i = 1; i < max; i += 1) {
    if (str1[i]) {
      genElementFunc(str1[i - 1], str1[i], elements1);
    }

    if (str2[i]) {
      genElementFunc(str2[i - 1], str2[i], elements2);
    }
  }

  let intersectionCnt = 0;

  const intersectionCntUpFunc = (index = 0) => {
    const element1 = elements1[index];

    if (!element1) {
      return;
    }

    for (let i = 0; i < elements2.length; i += 1) {
      const element2 = elements2[i];

      if (element1 === element2) {
        intersectionCnt += 1;
        elements1.splice(index, 1);
        elements2.splice(i, 1);
        return intersectionCntUpFunc(index);
      }
    }

    return intersectionCntUpFunc((index += 1));
  };

  intersectionCntUpFunc();

  const unionCnt = intersectionCnt + elements1.length + elements2.length;

  return Math.floor((intersectionCnt / unionCnt) * 65536);
}
