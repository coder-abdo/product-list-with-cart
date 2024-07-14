<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import type { ProductType } from "@/types";
import addToCartIcon from "@/assets/images/icon-add-to-cart.svg";
import incrementQuantityIcon from "@/assets/images/icon-increment-quantity.svg";
import decrementQuantityIcon from "@/assets/images/icon-decrement-quantity.svg";

import { useCartStore } from "@/stores/cartStore";
const props = defineProps<ProductType>();
const cartStore = useCartStore();
const isClicked = ref(false);
const cartLength = computed(() => cartStore.cart.length);
const count = ref(1);
const baseBtnClass =
  "absolute left-1/2 -bottom-4 flex justify-center items-center gap-2 w-[65%] -translate-x-1/2 bg-white hover:cursor-pointer p-2 rounded border border-rose-400";
const btnAddedToCartClass =
  "absolute left-1/2 -bottom-4 flex justify-center items-center gap-2 w-[65%] -translate-x-1/2 bg-rose-950 text-white flex justify-between items-center hover:cursor-pointer p-2 rounded border border-rose-400";
const btnStyle = computed(() => {
  return isClicked.value ? btnAddedToCartClass : baseBtnClass;
});
watch(cartLength, (newVal) => {
  if (newVal === 0) {
    isClicked.value = false;
  }
});
const handleClick = () => {
  isClicked.value = true;
  cartStore.addToCart({ ...props });
};
const handleIncreaseItem = () => {
  count.value++;
  cartStore.addToCart({ name: props.name, price: props.price });
};
const handleDecreaseItem = () => {
  if (count.value >= 1) {
    count.value--;
    cartStore.removeFromCart({ name: props.name, price: props.price });
  }
};
</script>

<template>
  <div>
    <div class="relative">
      <img
        :src="image.desktop"
        alt="product image"
        class="w-full rounded-md shadow-sm"
        :srcset="image.tablet + ' 768w, ' + image.mobile + ' 480w'"
        sizes="(max-width: 768px) 100vw, 768px"
      />
      <button @click.once="handleClick" :class="btnStyle">
        <slot v-if="!isClicked || cartStore.cart.length === 0">
          <img
            :src="addToCartIcon"
            alt="add to cart icon"
            class="md:w-5 md:h-5 h-3 w-3"
          />
          <span class="text-rose-950 font-bold text-xs md:text-sm"
            >Add to cart</span
          >
        </slot>
        <slot v-else>
          <img
            @click="handleDecreaseItem"
            :src="decrementQuantityIcon"
            alt="decrement quanity icon"
            class="md:w-5 md:h-5 h-3 w-3"
          />
          <span class="text-sm font-semibold">{{
            cartStore.cart.length === 0 ? 0 : count
          }}</span>
          <img
            @click="handleIncreaseItem"
            :src="incrementQuantityIcon"
            alt="increment quanity icon"
            class="w-3 h-3 md:w-4 md:h-5"
          />
        </slot>
      </button>
    </div>
    <div class="flex flex-col gap-1 md:gap-2 py-6">
      <h4 class="text-xs text-rose-300">{{ category }}</h4>
      <h3 class="text-sm md:text-lg text-rose-950 font-bold">{{ name }}</h3>
      <h5 class="text-red-500 text-sm">${{ price }}</h5>
    </div>
  </div>
</template>
