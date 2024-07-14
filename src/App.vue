<script setup lang="ts">
import { onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useModalStore } from "@/stores/modalStore";
import CartModal from "@/components/cart-modal.vue";

import CartProducts from "@/components/cart-products.vue";
import Cart from "@/components/cart.vue";

const cartStore = useCartStore();
const modalStore = useModalStore();

onMounted(() => {
  cartStore.getProducts();
});
</script>

<template>
  <div class="relative">
    <div
      v-if="modalStore.isModalOpen"
      class="absolute z-10 bg-black/65 top-0 left-0 bottom-0 right-0 min-h-screen w-full"
    ></div>
    <CartModal v-if="modalStore.isModalOpen" />
    <main
      class="relative flex flex-col md:flex-row gap-4 md:py-6 py-2 px-2 md:px-4 z-0 h-full"
    >
      <section class="bg-rose-50 md:p-4 p-2 md:basis-9/12">
        <h1 class="text-lg font-bold text-rose-950">Desert</h1>
        <CartProducts />
      </section>
      <Cart />
    </main>
  </div>
</template>

<style scoped></style>
