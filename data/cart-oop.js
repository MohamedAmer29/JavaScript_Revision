function Cart(stroageName) {
  const cart = {
    matchingItem: undefined,
    cartItem: undefined,
    loadFromStorage() {
      this.cartItem = JSON.parse(localStorage.getItem(stroageName));
      if (!this.cartItem) {
        this.cartItem = [
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
    },
    saveToStorage() {
      localStorage.setItem(stroageName, JSON.stringify(this.cartItem));
    },

    addTocartItem(productId) {
      let matchingItem;
      const select = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      this.cartItem.forEach((cardItem) => {
        if (productId === cardItem.productId) {
          matchingItem = cardItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += Number(select.value);
        select.value = 1;
      } else {
        if (!select) {
          this.cartItem.push({
            productId,
            quantity: 1,
            deliveryOptionId: "1",
          });
        } else {
          this.cartItem.push({
            productId,
            quantity: Number(select.value),
            deliveryOptionId: "1",
          });
          select.value = 1;
        }
      }
      this.saveToStorage();
    },
    addTocartItemTest(productId) {
      let matchingItem;

      cartItem.forEach((cardItem) => {
        if (productId === cardItem.productId) {
          matchingItem = cardItem;
        }
      });

      cartItem.push({
        productId,

        deliveryOptionId: "1",
      });

      saveToStorage();
    },
    removeFromcartItem(productId) {
      let newcartItem = cartItem.filter((item) => item.productId !== productId);

      this.cartItem = newcartItem;
      saveToStorage();
    },
    updateQuantity() {
      let total = 0;
      cartItem.forEach((item) => {
        total += item.quantity;
      });

      return total;
    },
    updatecartItem(productId, value) {
      this.cartItem.forEach((item) => {
        if (item.productId === productId) {
          item.quantity = value;
        }
      });

      saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      cartItem.forEach((cardItem) => {
        if (productId === cardItem.productId) {
          matchingItem = cardItem;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
      saveToStorage();
    },
  };
  return cart;
}

const cart = Cart("cart-opp");
const bussinessCart = Cart("business-cart");
cart.loadFromStorage();
bussinessCart.loadFromStorage();

console.log(cart.cartItem);
console.log(bussinessCart.cartItem);
