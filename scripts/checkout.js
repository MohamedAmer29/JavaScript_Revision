import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve("Value1");
    });
  }),

  new Promise((resolve) => {
    loadCart();
    resolve();
  }),
]).then((values) => {
  console.log(values[0]);

  renderPaymentSummary();
  renderOrderSummary();
});

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve("Value1");
//   });
// })

//   .then((value) => {
//     console.log(value);

//     return new Promise((resolve) => {
//       loadCart();
//       resolve();
//     });
//   })

//   .then(() => {
//     renderPaymentSummary();
//     renderOrderSummary();
//   });

// loadProducts(() => {
//   loadCart(() => {
//     renderPaymentSummary();
//     renderOrderSummary();
//   });
// });
