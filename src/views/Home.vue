<script setup>
import { computed, ref } from 'vue';
import { supabase } from "../config/supabase.ts"
import DrinkCard from "../components/DrinkCard.vue"
import { RouterLink } from 'vue-router'

const drinks = ref([])
const numbPerPage = ref(15)
const currentPage = ref(0)
const totalNumDrinks = ref(0)
const totalNumPages = computed(() => Math.max(1, Math.ceil(totalNumDrinks.value / numbPerPage.value) - 1))

// Get the total number of drinks in the database
supabase
    .from('drinks')
    .select('*', { count: 'exact', head: true })
    .then((res) => {
        totalNumDrinks.value = res.count
    }
    )

function getDrinks() {
    const startDrink = currentPage.value * numbPerPage.value
    const stopDrink = (currentPage.value + 1) * numbPerPage.value - 1
    supabase
        .from('drinks')
        .select('id, name, image_url, description')
        .order('name', { ascending: true })
        .range(startDrink, stopDrink)
        .then((res) => {
            const data = res.data
            if (data === null) {
                drinks.value = []
                return
            }
            drinks.value = data
        })
}

function nextPage() {
    if (currentPage.value >= totalNumPages.value) return
    currentPage.value += 1
    getDrinks()
}

function previousPage() {
    if (currentPage.value <= 0) return
    currentPage.value -= 1
    getDrinks()
}

getDrinks()

</script>

<template>
    <div class="w-full flex justify-center">
        <div>
            <h1 class="pb-0">Caffeine Critics</h1>
            <h3 class="pt-0">Now having {{ totalNumDrinks }} of drinks</h3>
        </div>
    </div>
    <div class="w-full flex justify-center h-full">
        <div class="w-full flex flex-col justify-center lg:w-2/3 bg-slate-200 h-full p-2 px-6">
            <div class="flex justify-center w-full">
                <router-link class="text-2xl font-bold w-4/5 button m-4" to="/add-drink">Add Drink</router-link>
            </div>
            <div class="flex justify-between">

                <button class="bg-red-400 p-2 px-4 rounded-l-full m-2" @click="previousPage()">
                    Previous page
                </button>
                <span>
                    {{ currentPage + 1 }} of {{ totalNumPages + 1 }}
                </span>
                <button class="bg-red-400 p-2 px-4 rounded-r-full m-2" @click="nextPage()">
                    Next page
                </button>
            </div>
            <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <DrinkCard v-for="drink in drinks" :product="drink" :key="drink.id" />
            </div>
        </div>
    </div>
</template>