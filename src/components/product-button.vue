<script lang="ts" setup>
 import {ref} from 'vue'

 
 import {useCartStore} from '@/stores/cartStore'

 const cartStore = useCartStore()
  const isClicked = ref(false)
  const count = ref(1)
  const handleClick = () => {
      isClicked.value = true
      cartStore.addToCart
  }
</script>

<template>
    
</template>