/**
 * - 각 요소마다 만들 수 있는 모든 경우의 수를 체크
 * 1. order 확인
 *  1-1. order[n]의 메뉴 순서를 알파벳 순으로 정렬
 * 2. course 확인
 *  2-1. course[n] < order[n].length 조건의 반복 문 재생
 * 3. 2의 반복문을 돌면서 order[n] 당 만들 수 있는 메뉴 모두 allMenu 객체에 넣어 카운팅
 * 4. course[n]에 해당하는 항목 중 가장 많은 요소 추출해 result 배열에 push
 * 5. 알파벳 순으로 정렬
 */

function solution(orders, course) {
  let answer = [];
  const allMenu = {};
  const result = {};

  const genMenuFunc = (count, menu, lastArr) => {
    if (menu.length === count) {
      if (allMenu[menu]) {
        allMenu[menu] += 1;
      } else {
        allMenu[menu] = 1;
      }

      return;
    }

    for (let i = 0; i < lastArr.length; i += 1) {
      genMenuFunc(count, menu + lastArr[i], lastArr.slice(i + 1));
    }

    return;
  };

  const menuHanlder = (count, billArr) => {
    if (billArr.length < count) {
      return;
    }

    const firstMenu = billArr.shift();

    genMenuFunc(count, firstMenu, billArr);

    return menuHanlder(count, billArr);
  };

  for (let bill of orders) {
    const billArr = bill.split("").sort((a, b) => a.localeCompare(b));

    for (let count of course) {
      menuHanlder(count, billArr.slice(0));
    }
  }

  for (let [menu, count] of Object.entries(allMenu)) {
    if (count < 2) {
      continue;
    }

    if (!result[menu.length]) {
      result[menu.length] = { menuArr: [menu], max: count };
    } else {
      if (result[menu.length].max === count) {
        result[menu.length].menuArr.push(menu);
      } else if (result[menu.length].max < count) {
        result[menu.length] = { menuArr: [menu], max: count };
      }
    }
  }

  for (let { menuArr } of Object.values(result)) {
    answer = [...answer, ...menuArr];
  }

  return answer.sort((a, b) => a.localeCompare(b));
}
