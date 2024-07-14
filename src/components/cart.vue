<script lang="ts" setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useModalStore } from "@/stores/modalStore";
import cartEmptyImg from "@/assets/images/illustration-empty-cart.svg";
import carbonNeutralIcon from "@/assets/images/icon-carbon-neutral.svg";
import CartItem from "./cartI-item.vue";
const cartStore = useCartStore();
const modalStore = useModalStore();
const cartItemsCount = computed(() =>
  cartStore.cart.reduce((a, b) => a + b.quantity!, 0)
);
const totlalPrice = computed(() => {
  return cartStore.cart
    .map((item) => item.price * item.quantity!)
    .reduce((a, b) => a + b, 0);
});
</script>
<template>
  <aside
    class="flex flex-col bg-white md:basis-4/12 shadow-md md:max-h-64 md:overflow-y-scroll p-2 md:p-4 rounded-md"
  >
    <h2 class="text-red-500 text-sm md:text-lg font-bold">
      your cart ({{ cartItemsCount }})
    </h2>
    <div v-if="cartItemsCount === 0">
      <img :src="cartEmptyImg" alt="cart is empty" />
      <span class="text-xs md:text-sm text-rose-950 text-center"
        >your adde3d items will appear here</span
      >
    </div>
    <div class="flex gap-2 md:gap-4 pb-2 flex-col" v-else>
      <CartItem
        v-for="item in cartStore.cart"
        :key="item.name"
        :name="item.name"
        :price="item.price"
        :quantity="item.quantity"
      />
      <div class="flex justify-between items-center p-2 md:p-4">
        <h4 class="text-sm md:text-lg text-rose-950">Order Total</h4>
        <h5 class="text-lg md:text-2xl font-bold text-rose-950">
          <strong>${{ totlalPrice }}</strong>
        </h5>
      </div>
      <div class="flex gap-2 justify-center mb-2">
        <img
          :src="carbonNeutralIcon"
          alt="carbon neutral"
          class="w-3 h-3 md:h-5 md:w-5"
          loading="lazy"
        />
        <p class="text-rose-950 text-xs md:text-sm">
          <span>this is a </span>
          <strong class="font-bold">carbon-neutral</strong>
          <span>delivery</span>
        </p>
      </div>
      <button
        class="bg-rose-700 text-white text-sm outline-none py-3 px-6 rounded-full"
        @click="modalStore.handleModalOpen"
      >
        Confirm Order
      </button>
    </div>
  </aside>
</template>
