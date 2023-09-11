<script setup>
import { ref } from 'vue';
import { inject } from 'vue'

const { userName, logout } = inject('userName')
import SingUp from './SingUp.vue';

const showSignUp = ref(false)

</script>
  
<template>
    <SingUp v-show="showSignUp" v-model="showSignUp" />
    <div class="flex items-center justify-around bg-amber-500 py-6">
        <button @click="console.log('/')" class="text-2xl font-bold text-black px-4">Home</button>
        <button @click="console.log('/about')" class="text-2xl font-bold text-black px-4">About</button>
        <button @click="console.log('/contact')" class="text-2xl font-bold text-black px-4">Contact</button>
        <button v-if="userName === null" @click="showSignUp = !showSignUp" class="text-2xl font-bold text-black px-4">Sign
            up</button>
        <button v-if="userName" @click="logout()" class="text-2xl font-bold text-black px-4">Sign out</button>
        {{ userName ? userName : "Not yet logged in" }}
    </div>
</template>
  