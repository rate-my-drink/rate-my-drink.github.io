<script setup>
import { ref } from 'vue';

const props = defineProps(['product'])
const product = ref(props.product);

const addToCart = () => {
    // You can implement your add to cart logic here
};
</script>
<template>
    <div class="bg-white rounded-lg shadow-lg h-96">
        <img :src="product.image_url" alt="Product Image" class="rounded-t-lg w-full h-48 object-cover">
        <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
            <p class="text-gray-700 mb-4">{{ product.description }}</p>
        </div>
    </div>
</template>
  
 
  