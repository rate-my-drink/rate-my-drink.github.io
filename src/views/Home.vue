<script setup>
import { ref } from 'vue';
import { supabase } from "../config/supabase.ts"
import DrinkCard from "../components/DrinkCard.vue"
import { RouterLink } from 'vue-router'

const drinks = ref([])

supabase
    .from('drinks')
    .select('id, name, image_url, description')
    .order('name', { ascending: true })
    .limit(15)
    .then((res) => {
        const data = res.data
        if (data === null) {
            drinks.value = []
            return
        }
        drinks.value = data
    })

</script>

<template>
    <div class="w-full flex justify-center">
        <h1>Caffeine Critics</h1>
    </div>
    <div class="w-full flex justify-center h-full">
        <div class="w-full flex flex-col justify-center lg:w-2/3 bg-slate-200 h-full p-2 px-6">
            <div class="flex justify-center w-full">
                <router-link class="text-2xl font-bold w-4/5 button m-4" to="/add-drink">Add Drink</router-link>
            </div>
            <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <DrinkCard v-for="drink in drinks" :product="drink" />
            </div>
        </div>
    </div>
</template>