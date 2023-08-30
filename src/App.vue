<script setup>
import { ref } from 'vue';
import { supabase } from "./config/supabase.ts"

const drinks = ref([])
async function fetchDrinks() {
  const { data, error } = await supabase
    .from('drinks')
    .select('name', 'id')
  console.log(data, error)
  if (data === null) {
    drinks.value = []
  }
  drinks.value = data
}
fetchDrinks()
</script>

<template>
  <div class="">
    <h1>Coffee and Tea app</h1>
    <p>An app for all your coffee and tea rating. Find the best</p>
  </div>
  <ul v-for="drink in drinks">
    <li :key="drink.id">{{ drink.name }}</li>
  </ul>
</template>