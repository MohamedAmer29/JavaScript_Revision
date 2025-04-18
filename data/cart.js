export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
}

export function removeFromCart(productId) {
  let newCart = cart.filter((item) => item.productId !== productId);

  cart = newCart;
  console.log(cart);
}
