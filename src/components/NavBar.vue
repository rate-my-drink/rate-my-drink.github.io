<script setup>
import { ref } from 'vue';

import SingUp from './SingUp.vue';

const show_sign_up = ref(false)
</script>
  
<template>
    <SingUp v-show="show_sign_up" v-model="show_sign_up" />
    <div class="flex items-center justify-around bg-amber-500 py-6">
        <button @click="console.log('/')" class="text-2xl font-bold text-black px-4">Home</button>
        <button @click="console.log('/about')" class="text-2xl font-bold text-black px-4">About</button>
        <button @click="console.log('/contact')" class="text-2xl font-bold text-black px-4">Contact</button>
        <button @click="show_sign_up = !show_sign_up" class="text-2xl font-bold text-black px-4">Sign up</button>
    </div>
</template>
  