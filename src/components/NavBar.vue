<script setup>
import { ref } from "vue";
import { inject } from "vue";

const { userName, logout } = inject("userName");
import SingUp from "./SingUp.vue";

const showSignUp = ref(false);
</script>

<template>
  <SingUp v-show="showSignUp" v-model="showSignUp" />
  <div class="flex items-center justify-around bg-amber-500 py-6">
    <img :src="'logo2.svg'" class="h-12" />
    <router-link class="px-4 text-2xl font-bold text-black" to="/"
      >Home</router-link
    >
    <button
      v-if="userName"
      @click="logout()"
      class="px-4 text-2xl font-bold text-black"
    >
      Sign out
    </button>
    <button
      v-else
      @click="showSignUp = !showSignUp"
      class="px-4 text-2xl font-bold text-black"
    >
      Sign up
    </button>
    <span>
      {{ userName ? userName : "Not yet logged in" }}
    </span>
  </div>
</template>
