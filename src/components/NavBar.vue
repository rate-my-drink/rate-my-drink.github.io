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
        <button v-if="userName" @click="logout()" class="text-2xl font-bold text-black px-4">Sign out</button>
        <button v-else @click="showSignUp = !showSignUp" class="text-2xl font-bold text-black px-4">
            Sign up</button>
        <span>
            {{ userName ? userName : "Not yet logged in" }}
        </span>
    </div>
</template>
  