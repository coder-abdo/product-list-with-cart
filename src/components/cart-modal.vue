<script lang="ts" setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useModalStore } from "@/stores/modalStore";
import confirmIcon from "@/assets/images/icon-order-confirmed.svg";
import CartIItem from "./cartI-item.vue";

const cartStore = useCartStore();
const modalStore = useModalStore();
const totlalPrice = computed(() => {
  return cartStore.cart
    .map((item) => item.price * item.quantity!)
    .reduce((a, b) => a + b, 0);
});
const handleClick = () => {
  cartStore.clearCart();
  modalStore.handleModalClose();
};
</script>
<template>
  <div
    class="absolute z-20 top-28 md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 flex flex-col gap-2 md:gap-4 bg-white shadow-md rounded-md max-w-[600px] w-full p-2 md:p-4"
  >
    <div class="flex flex-col gap-2">
      <img
        :src="confirmIcon"
        alt="confirm icon image"
        loading="lazy"
        class="md:w-5 md:h-5 h-3 w-3"
      />
      <h2 class="text-rose-950 text-sm md:text-2xl">Order Confirmed</h2>
      <h5 class="text-xs md:text-sm text-rose-900">
        we hope you enjoy your food!
      </h5>
    </div>
    <div class="flex gap-2 md:gap-4 p-2 md:p-4 flex-col bg-rose-50">
      <CartIItem
        v-for="item in cartStore.cart"
        :key="item.name"
        :name="item.name"
        :price="item.price"
        :quantity="item.quantity"
        :isInModal="true"
      />
      <div class="flex justify-between items-center p-2 md:p-4">
        <h4 class="text-sm md:text-lg text-rose-950">Order Total</h4>
        <h5 class="text-lg md:text-2xl font-bold text-rose-950">
          <strong>${{ totlalPrice }}</strong>
        </h5>
      </div>
      <button
        class="bg-rose-700 text-white text-sm outline-none py-3 px-6 rounded-full"
        @click="handleClick"
      >
        Start New Order
      </button>
    </div>
  </div>
</template>
