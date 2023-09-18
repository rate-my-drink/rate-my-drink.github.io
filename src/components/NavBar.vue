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
        <router-link class="text-2xl font-bold text-black px-4" to="/">Home</router-link>
        <router-link class="text-2xl font-bold text-black px-4" to="/">About</router-link>
        <router-link class="text-2xl font-bold text-black px-4" to="/">Contact</router-link>
        <button v-if="userName === null" @click="showSignUp = !showSignUp" class="text-2xl font-bold text-black px-4">Sign
            up</button>
        <button v-if="userName" @click="logout()" class="text-2xl font-bold text-black px-4">Sign out</button>
        {{ userName ? userName : "Not yet logged in" }}
    </div>
</template>
  