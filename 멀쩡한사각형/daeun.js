function solution(w, h) {
	let gcd;
	if (w > h) {
		gcd = getGcd(w, h);
	} else {
		gcd = getGcd(h, w);
	}
	return w * h - (w + h - gcd);
}

function getGcd(num1, num2) {
	const r = num1 % num2;
	if (r === 0) {
		return num2;
	} else {
		return getGcd(num2, r);
	}
}
