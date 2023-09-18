<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

const props = defineProps(['product'])
const product = ref(props.product);

</script>
<template>
    <router-link class="bg-white rounded-lg shadow-lg h-96" :to="'/drink/' + product.id">
        <img :src="product.image_url" alt="Product Image" class="rounded-t-lg w-full h-48 object-cover">
        <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
            <p class="text-gray-700 mb-4">{{ product.description }}</p>
        </div>
    </router-link>
</template>
  
 
  