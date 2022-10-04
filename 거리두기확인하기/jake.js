const moveArr = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function solution(places) {
  let answer = [];

  for (place of places) {
    answer.push(checkIsOk(place));
  }

  return answer;
}

const checkIsOk = (place) => {
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (place[x][y] === 'P') {
        if (check(x, y, place) === false) return 0;
      }
    }
  }
  return 1;
};

const check = (x, y, place) => {
  for (let i = 0; i < moveArr.length; i++) {
    const [moveX, moveY] = moveArr[i];
    const afterMoveX = x + moveX;
    const afterMoveY = y + moveY;

    if (afterMoveX < 0 || afterMoveX > 4) {
      continue;
    } else if (afterMoveY < 0 || afterMoveY > 4) {
      continue;
    }

    const currentValue = place[afterMoveX][afterMoveY];

    if (currentValue === 'P') return false;
    if (currentValue === 'X') continue;
    if (check2(afterMoveX, afterMoveY, moveX, moveY, place) === false) {
      return false;
    }
  }
  return true;
};

const check2 = (x, y, beforeMoveX, beforeMoveY, place) => {
  for (let i = 0; i < moveArr.length; i++) {
    const [moveX, moveY] = moveArr[i];
    const afterMoveX = x + moveX;
    const afterMoveY = y + moveY;

    if (afterMoveX < 0 || afterMoveX > 4) {
      continue;
    } else if (afterMoveY < 0 || afterMoveY > 4) {
      continue;
    }

    const currentValue = place[afterMoveX][afterMoveY];

    if (moveX === -beforeMoveX && moveY === -beforeMoveY) continue;
    if (currentValue === 'P') return false;
  }
  return true;
};
