function solution(w, h) {
  const total = w * h;
  const gcd = getGCD(w, h);

  return total - (w + h - gcd);
}

let getGCD = (num1, num2) => (num2 > 0 ? getGCD(num2, num1 % num2) : num1);
