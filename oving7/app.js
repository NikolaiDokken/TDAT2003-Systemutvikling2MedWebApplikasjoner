// @flow
let v1 = [1, 2, 3];
let v2 = [4, 5, 6];

// Oppgave 1
console.log("2 + v1: ", v1.map(e => 2 + e));
console.log("2 * v1: ", v1.map(e => 2 * e));
console.log("mean of v1: ", v1.reduce((sum, e) => (sum += e), 0) / v1.length);

function dotp(x, y) {
  function dotp_sum(a, b) {
    return a + b;
  }
  function dotp_times(a, i) {
    return x[i] * y[i];
  }
  return x.map(dotp_times).reduce(dotp_sum, 0);
}
console.log("v1 dot v2: ", dotp(v1, v2));

function plusMultiplied(x, y) {
  function sum(a, b) {
    return a + b;
  }
  function arrayPlusArray(a, i) {
    return x[i] + y[i] * 2;
  }
  return x.map(arrayPlusArray).reduce(sum, 0);
}
console.log("v1 + 2 * v2: ", plusMultiplied(v1, v2));

console.log(
  "v1 as string: ",
  v1.reduce((print, e, i) => print + "v1[" + i + "] = " + e + ", ", "")
);

// Oppgave 2
class Complex {
  real: number;
  imag: number;

  constructor(real: number, img: number) {
    this.real = real;
    this.imag = img;
  }
}

let v = [new Complex(2, 2), new Complex(1, 1)];

console.log(
  "v elements as strings: ",
  v.map(e => e.real + " + " + e.imag + "i")
);

console.log(
  "magnitude of v elements: ",
  v.map(e => Math.sqrt(e.real ** 2 + e.imag ** 2))
);

console.log("sum of v");
