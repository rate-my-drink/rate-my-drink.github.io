<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

const props = defineProps(['product'])
const product = ref(props.product);

const image = product.value.image
const imageUrl = image && image.url ? image.url : import.meta.env.BASE_URL + "images/placeholder_mug.webp"

</script>
<template>
    <router-link class="card" :to="'/drink/' + product.id">
        <img :src="imageUrl" alt="Product Image" class="card-image" />
        <div class="card-body">
            <h2 class="card-title">{{ product.name }}</h2>
            <p class="card-description">{{ product.description }}</p>
        </div>
    </router-link>
</template>