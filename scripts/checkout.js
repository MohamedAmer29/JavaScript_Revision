import {
  cart,
  removeFromCart,
  updateQuantity,
  updateCart,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let totalQuantity = updateQuantity();

let searchedItems;
let htmlText = "";

cart.forEach((item) => {
  // totalQuantity += item.quantity;
  products.forEach((product) => {
    if (product.id === item.productId) searchedItems = product;
  });
  const deliveryOptionId = item.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const delivery = today.add(deliveryOption.deliveryDays, "days");
  const deliveryString = delivery.format("dddd, MMMM D");

  const html = `  <div class="cart-item-container remove-cart-item-${
    item.productId
  }">
            <div class="delivery-date">Delivery date: ${deliveryString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${searchedItems.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                 ${searchedItems.name}</div>
                <div class="product-price">$${formatCurrency(
                  searchedItems.priceCents
                )}</div>
                <div class="product-quantity">
                  <span > Quantity: <span class="quantity-label "></span><span class= "quntity-${
                    item.productId
                  }">${item.quantity} </span></span>
                  <input type='number' max="20" min="1" style="width:35px;font-size:18px;font-family:Arial;" class="hideText update-${
                    item.productId
                  }"/>
                  <span class="update-quantity-link link-primary" data-cardItem-id=${
                    item.productId
                  }>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-cardItem-id=${
                    item.productId
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                   ${deliveryOptionHtml(item.productId, item)}
                
                
                
                
                </div>
              </div>
            </div>
          </div>`;
  htmlText += html;
});
function deliveryOptionHtml(productId, item) {
  let radioHtml = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const delivery = today.add(deliveryOption.deliveryDays, "days");
    const deliveryString = delivery.format("dddd, MMMM D");
    const isChecked = deliveryOption.id === item.deliveryOptionId;
    radioHtml += `<div class="delivery-option">
                  <input
                    type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${productId}"
                  />
                  <div>
                    <div class="delivery-option-date">${deliveryString}</div>
                    <div class="delivery-option-price">${
                      deliveryOption.pricceCents === 0
                        ? "Free"
                        : formatCurrency(deliveryOption.pricceCents)
                    } Shipping</div>
                  </div>
                </div>`;
  });
  return radioHtml;
}
document.querySelector(".order-summary").innerHTML = htmlText;

document.querySelectorAll(".delete-quantity-link").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.carditemId;
    console.log(id);
    removeFromCart(id);
    totalQuantity = updateQuantity();

    // cart.forEach((item) => (totalQuantity += item.quantity));

    document.querySelector(`.remove-cart-item-${id}`).remove();
    document.querySelector(
      ".return-to-home-link"
    ).innerHTML = `${totalQuantity} items`;
  });
});
document.querySelectorAll(".update-quantity-link").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.carditemId;
    const update = document.querySelector(`.update-${id}`);
    const quentity = document.querySelector(`.quntity-${id}`);
    update.classList.toggle("hideText");
    if (update.classList.contains("hideText")) {
      button.innerHTML = "Update";
      updateCart(id, Number(update.value));
      totalQuantity = updateQuantity();
      quentity.innerHTML = update.value;
    } else {
      button.innerHTML = "Save";
    }

    // cart.forEach((item) => (totalQuantity += item.quantity));

    document.querySelector(
      ".return-to-home-link"
    ).innerHTML = `${totalQuantity} items`;
  });
});

const quantityHtml = document.querySelector(".return-to-home-link");

totalQuantity === 0
  ? (quantityHtml.innerHTML = "")
  : (quantityHtml.innerHTML = `${totalQuantity} Items`);
