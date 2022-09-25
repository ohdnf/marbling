/**
 * 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성
 * @param {string[]} orders 각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열
 * @param {string[]} courseLengths 코스요리 메뉴의 길이가 담긴 배열
 * @returns {string[]} 새로 추가하게 될 코스요리의 메뉴 구성(문자열 형태) 배열
 */
function solution(orders, courseLengths) {
  // 만들고 싶은 코스요리의 길이별 배열 초기화
  const newCourses = courseLengths.reduce((courses, courseLength, idx) => {
    courses[courseLength] = [];
    return courses;
  }, {});
  // 각 손님이 주문한 단품메뉴 조합에서 코스요리 후보를 생성한다.
  for (const order of orders) {
    for (const courseLength of courseLengths) {
      // nCr 조합
      function combination(itemsLeft, course) {
        itemsLeft = [...itemsLeft].sort().join("");
        if (course.length === courseLength)
          newCourses[courseLength].push(course);
        if (!itemsLeft?.length) return;
        [...itemsLeft].forEach((item, idx) => {
          combination(itemsLeft.slice(idx + 1), course.concat(item));
        });
      }
      combination(order, "");
    }
  }
  // console.log({ newCourses });
  // 각 코스요리 메뉴 길이별 후보 중 최다 등장 후보를 선정한다.
  const answer = [];
  for (const courses of Object.values(newCourses)) {
    const counter = courses.reduce((prev, cur) => {
      prev[cur] = prev[cur] ? prev[cur] + 1 : 1;
      return prev;
    }, {});
    const candidates = { maxCount: 0, courses: [] };
    for (const [course, count] of Object.entries(counter)) {
      if (candidates.maxCount < count) {
        candidates.maxCount = count;
        candidates.courses = [course];
      } else if (candidates.maxCount === count) {
        candidates.courses.push(course);
      }
    }
    if (candidates.maxCount > 1) answer.push(...candidates.courses);
  }
  answer.sort();
  return answer;
}

console.log(
  solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4]),
  ["AC", "ACDE", "BCFG", "CDE"]
);
console.log(
  solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5]),
  ["ACD", "AD", "ADE", "CD", "XYZ"]
);
console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4]), ["WX", "XY"]);
