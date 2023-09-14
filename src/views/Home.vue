<script setup>
import { ref } from 'vue';
import { supabase } from "../config/supabase.ts"
import DrinkCard from "../components/DrinkCard.vue"

const drinks = ref([])
async function fetchDrinks() {
    const { data, error } = await supabase
        .from('drinks')
        .select('id, name, image_url, description')
        .order('name', { ascending: true })
        .limit(15)
    if (data === null) {
        drinks.value = []
    }
    drinks.value = data
}
fetchDrinks()
</script>

<template>
    <div class="w-full flex justify-center">
        <h1>Coffee and Tea app</h1>
    </div>
    <div class="w-full flex justify-center h-full">

        <div class="grid grid-cols-3 gap-4 w-2/3 bg-slate-200 h-full p-2 px-6">
            <DrinkCard v-for="drink in drinks" :product="drink" />
        </div>
    </div>
</template>