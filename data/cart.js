export const cart = [];

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
    matchingItem.Quantity += Number(select.value);
    select.value = 1;
  } else {
    cart.push({
      productId,
      Quantity: Number(select.value),
    });
    select.value = 1;
  }
}
