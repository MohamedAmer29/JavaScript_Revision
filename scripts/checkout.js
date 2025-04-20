import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/backend-practice.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
  await loadProductsFetch();

  await new Promise((resolve) => {
    loadCart();
    resolve();
  });

  renderPaymentSummary();
  renderOrderSummary();
}
loadPage();

// Promise.all([
//   loadProductsFetch(),

//   new Promise((resolve) => {
//     loadCart();
//     resolve();
//   }),
// ]).then(() => {
//   renderPaymentSummary();
//   renderOrderSummary();
// });

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
