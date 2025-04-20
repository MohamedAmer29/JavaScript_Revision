import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/backend-practice.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
  try {
    await loadProductsFetch();

    await new Promise((resolve) => {
      loadCart();
      resolve();
    });
  } catch (error) {
    console.error("Error in fetching data", error);
  }
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
