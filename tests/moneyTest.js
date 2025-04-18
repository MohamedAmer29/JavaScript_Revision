import { formatCurrency } from "../scripts/utils/money.js";

console.log(`Convert Cents into dollars`);

if (formatCurrency(2095) === "20.95") {
  console.log(`1- Passed`);
} else {
  console.log(`1- Failed`);
}

console.log(`Works with 0`);

if (formatCurrency(0) === "0.00") {
  console.log(`2- Passed`);
} else {
  console.log(`2- Failed`);
}

console.log(`Round up to nearest cent to the greater`);

if (formatCurrency(2000.5) === "20.01") {
  console.log(`3- Passed`);
} else {
  console.log(`3- Failed`);
}
console.log(`Round up to nearest cent to the smaller`);
if (formatCurrency(2000.4) === "20.00") {
  console.log(`4- Passed`);
} else {
  console.log(`4- Failed`);
}
