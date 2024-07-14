import { defineStore } from "pinia";
import { ref } from "vue";


export const useModalStore = defineStore('modal', () =>{
    const isModalOpen = ref(false)
    function handleModalOpen ()  {
        isModalOpen.value = true
    }
    function handleModalClose () {
        isModalOpen.value = false
    }
    
    return {
      isModalOpen,
      handleModalClose,
      handleModalOpen
    }
})