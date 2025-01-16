// Provide 3 unique implementations of the following function in JavaScript.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

//assuming starting number is 1
var sum_to_n_a = function (n) {
  // your code here
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  // your code here
  let arr = Array(n)
    .fill(0)
    .map((_number, key) => key + 1);
  const sum = arr.reduce((acc, curr) => (acc += curr), 0);
  return sum;
};

var sum_to_n_c = function (n) {
  // your code here
  let sum = 0;
  let i = 1;
  while (i < n + 1) {
    sum += i;
    i++;
  }
  return sum;
};
