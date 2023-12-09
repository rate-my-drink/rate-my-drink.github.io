<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

const props = defineProps(['product'])
const product = ref(props.product);

const url = product.value.image && product.value.image.url ? product.value.image.url : "/src/assets/images/placeholder_mug.png"
</script>
<template>
    <router-link class="bg-white rounded-lg shadow-lg h-96 overflow-hidden text-ellipsis" :to="'/drink/' + product.id">
        <img :src="url" alt="Product Image" class="rounded-t-lg w-full h-48 object-cover" />
        <div class="p-4 h-full">
            <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
            <p class="text-gray-700">{{ product.description }}</p>
        </div>
    </router-link>
</template>
  
 
  