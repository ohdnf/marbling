function solution(w, h) {
  if (w === h) {
    return w * h - w;
  }
  let removed = 0;
  for (let i = 1; i < w + 1; i++) {
    removed += Math.ceil((h * i) / w) - Math.floor((h * (i - 1)) / w);
  }
  return w * h - removed;
}

console.log(solution(8, 12), 80);
