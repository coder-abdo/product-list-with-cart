import { defineStore } from "pinia";
import { ref } from "vue";
import type { CartItem, ProductType } from "@/types";


export const useCartStore = defineStore('cart', () =>{
  const cart = ref<CartItem[]>([])
  const products = ref<ProductType[]>([])
  // implement adding item to cart
  function addToCart(item: CartItem) {
    const existingItemIndex = cart.value.findIndex((cartItem:CartItem) => cartItem.name === item.name);
    if (existingItemIndex !== -1) {
      cart.value[existingItemIndex].quantity!++;
    } else {
      cart.value.push({ ...item, quantity: 1 });
    }
  }
  
  // Implement removing item from cart
  function removeFromCart(item: CartItem) {
    const existingItemIndex = cart.value.findIndex((cartItem:CartItem) => cartItem.name === item.name);
    if (existingItemIndex !== -1) {
      if (cart.value[existingItemIndex].quantity! > 1) {
        cart.value[existingItemIndex].quantity!--;
      } else {
        deleteFromCart(item);
      }
    }
  }
  function deleteFromCart(item: CartItem) {
    const existingItemIndex = cart.value.findIndex((cartItem:CartItem) => cartItem.name === item.name);
    if (existingItemIndex !== -1) {
      cart.value.splice(existingItemIndex, 1);
    }
  }
  function clearCart() {
    cart.value = [];
  }
async function getProducts() {
  const response = await fetch("data.json");
  const data = await response.json();
  products.value = data;
}
  return {
    cart,
    products,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getProducts,
    clearCart
  }
})