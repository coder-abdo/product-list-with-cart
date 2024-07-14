<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import { CartItem } from "@/types";
import RemoveCartItemBtn from "@/assets/images/icon-remove-item.svg";
import { computed } from "vue";
const store = useCartStore();
type CartItemProps = CartItem & {
  isInModal?: boolean;
};
const props = defineProps<CartItemProps>();
const itemCount = computed(() => props.price * props.quantity!);
</script>

<template>
  <div class="flex justify-between items-center border-b border-gray-300 py-4">
    <div class="flex flex-col gap-2">
      <h3 class="text-rose-950 text-sm md:text-lg font-semibold">{{ name }}</h3>
      <div class="flex gap-3 items-center md:gap-6">
        <span class="text-sm md:text-lg text-rose-950 font-bold"
          >{{ quantity }}x</span
        >
        <p class="flex gap-2 text-rose-800 text-sm">
          <span>@ ${{ price }} </span>
          <span class="font-semibold"> ${{ itemCount }}</span>
        </p>
      </div>
    </div>
    <h6 v-if="isInModal" class="text-sm md:text-lg text-rose-950 font-bold">
      <strong>{{ itemCount }}</strong>
    </h6>
    <button
      v-else
      class="bg-transparent border-none outline-none focus:outline-none cursor-pointer"
      @click="store.deleteFromCart({ name, price })"
    >
      <img
        :src="RemoveCartItemBtn"
        alt="remove item button"
        class="w-3 h-3 md:w-5 md:h-5"
      />
    </button>
  </div>
</template>
