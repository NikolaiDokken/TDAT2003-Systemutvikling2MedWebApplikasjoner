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
  v1.reduce(
    (print, e, i) =>
      print + "v1[" + i + "] = " + e + (i == v1.length - 1 ? "" : ", "),
    ""
  )
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

console.log(
  "sum of v: ",
  v.reduce(
    () =>
      "Complex { real: " +
      v.reduce((m, n) => m + n.imag, 0) +
      ", imag: " +
      v.reduce((m, n) => m + n.real, 0) +
      " }"
  )
);

let students = [
  { name: "Ola", grade: "A" },
  { name: "Kari", grade: "C" },
  { name: "Knut", grade: "C" }
];

console.log(
  "students elements as strings: [" +
    students.reduce(
      (print, e, i) =>
        print + e.name + " got " + e.grade + (i == v1.length - 1 ? "" : ", "),
      ""
    ) +
    " ]"
);

console.log("How many got C: ", students.filter(e => e.grade == "C").length);

console.log(
  "Percentage of C grades: ",
  students.filter(e => e.grade == "C").length / students.length
);

console.log(
  "Did anyone get A: ",
  students.some(e => e.grade == "A") ? "Yes" : "No"
);

console.log(
  "Did anyone get F: ",
  students.some(e => e.grade == "F") ? "Yes" : "No"
);
