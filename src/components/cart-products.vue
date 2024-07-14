<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import CartProduct from "./cart-product.vue";
import { computed } from "vue";
const cartStore = useCartStore();
const products = computed(() => cartStore.products);
</script>
<template>
  <div class="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
    <CartProduct
      v-for="product in products"
      :key="product.name"
      :category="product.category"
      :image="product.image"
      :price="product.price"
      :name="product.name"
    />
  </div>
</template>
