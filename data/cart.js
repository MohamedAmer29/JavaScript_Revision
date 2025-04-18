export let cart = [];
export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function getFromStorage() {
  const temp = localStorage.getItem("cart");
  return JSON.parse(temp);
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
    });
    select.value = 1;
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = cart.filter((item) => item.productId !== productId);

  cart = newCart;
  saveToStorage();
}
