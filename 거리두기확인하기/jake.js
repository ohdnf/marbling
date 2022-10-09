const directionArr = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];
let place = [];

function solution(places) {
  let answer = [];
  for (let arr of places) {
    place = arr;
    answer.push(checkPlaceIsFulfilled());
  }

  return answer;
}

const checkPlaceIsFulfilled = () => {
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (place[x][y] === 'P') {
        if (moveAndCheck(x, y, 0, 0, 1) === false) return 0;
      }
    }
  }
  return 1;
};

const moveAndCheck = (
  currentX,
  currentY,
  beforeDirectionX,
  beforeDirectionY,
  depth
) => {
  if (depth === 3) return true;

  for (let i = 0; i < directionArr.length; i++) {
    const [directionX, directionY] = directionArr[i];
    const afterX = currentX + directionX;
    const afterY = currentY + directionY;

    if (afterX < 0 || afterX > 4 || afterY < 0 || afterY > 4) continue; // 배열 범위를 넘어가면 continue

    const currentValue = place[afterX][afterY];

    if (directionX === -beforeDirectionX && directionY === -beforeDirectionY)
      continue; // 직전 위치로는 안 감
    if (currentValue === 'P') return false;
    if (currentValue === 'X') continue;

    if (
      moveAndCheck(afterX, afterY, directionX, directionY, depth + 1) === false
    ) {
      return false;
    }
  }
  return true;
};
