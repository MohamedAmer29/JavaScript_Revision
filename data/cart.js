export let cart;
loadFromStorage();
let matchingItem;
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "3",
      },
    ];
  }
}
export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export // add to card function
function addToCart(productId) {
  let matchingItem;
  const select = document.querySelector(`.js-quantity-selector-${productId}`);
  cart.forEach((cardItem) => {
    if (productId === cardItem.productId) {
      matchingItem = cardItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(select.value);
    select.value = 1;
  } else {
    cart.push({
      productId,
      quantity: Number(select.value),
      deliveryOptionId: "1",
    });
    select.value = 1;
  }
  saveToStorage();
}
export function addToCartTest(productId) {
  let matchingItem;

  cart.forEach((cardItem) => {
    if (productId === cardItem.productId) {
      matchingItem = cardItem;
    }
  });

  cart.push({
    productId,

    deliveryOptionId: "1",
  });

  saveToStorage();
}
export function removeFromCart(productId) {
  let newCart = cart.filter((item) => item.productId !== productId);

  cart = newCart;
  saveToStorage();
}
export function updateQuantity() {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });

  return total;
}
export function updateCart(productId, value) {
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity = value;
    }
  });

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cardItem) => {
    if (productId === cardItem.productId) {
      matchingItem = cardItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
