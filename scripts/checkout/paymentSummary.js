import { cart } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let matchingItem;
  let price = 0;
  let items = 0;
  let deliveryOption = 0;
  cart.forEach((item) => {
    matchingItem = getProduct(item.productId);
    price += matchingItem.priceCents * item.quantity;
    items += item.quantity;
    deliveryOption += getDeliveryOption(item.deliveryOptionId).priceCents;
  });
  let total = (
    formatCurrency(price) -
    0 +
    (formatCurrency(deliveryOption) - 0)
  ).toFixed(2);
  let tax = ((total - 0) / 10).toFixed(2);
  let orderSummary = {
    price: formatCurrency(price),
    shipping: formatCurrency(deliveryOption),
    total,
    tax,
    afterTax: (total - 0 + (tax - 0)).toFixed(2),
  };

  const html = `
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${items}):</div>
            <div class="payment-summary-money">$${orderSummary.price}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${orderSummary.shipping}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${orderSummary.total}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${orderSummary.tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${orderSummary.afterTax}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
        `;
  document.querySelector(".payment-summary").innerHTML = html;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart,
          }),
        });
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.error("Unexpected error. Try again later.");
      }

      window.location.href = "orders.html";
    });
}
