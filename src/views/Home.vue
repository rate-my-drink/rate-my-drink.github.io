<script setup>
import { computed, ref } from 'vue';
import { supabase } from "@/config/supabase.ts"
import DrinkCard from "@/components/DrinkCard.vue"
import { RouterLink } from 'vue-router'

const drinks = ref([])
const numbPerPage = ref(15)
const currentPage = ref(0)
const totalNumDrinks = ref(0)
const searchTerm = ref('')
const isLoading = ref(true)
// Get the maximum page number for the current number of drinks
// This is based on array counting so the max page number is 1 less than the actual number of pages
// Because the first page is page 0
const maxPageNum = computed(() => Math.max(0, Math.ceil(totalNumDrinks.value / numbPerPage.value) - 1))
const startDrink = computed(() => currentPage.value * numbPerPage.value)
const stopDrink = computed(() => (currentPage.value + 1) * numbPerPage.value - 1)
// Get the total number of drinks in the database


function getDrinks() {
    isLoading.value = true
    if (searchTerm.value === '') {
        getAllDrinks()
    } else {
        searchDrinks()
    }
}

function getAllDrinks() {
    supabase
        .from('drinks')
        .select('id, name, image_url, description')
        .order('name', { ascending: true })
        .range(startDrink.value, stopDrink.value)
        .then((res) => {
            const data = res.data
            if (data === null) {
                drinks.value = []
                return
            }
            drinks.value = data
            isLoading.value = false
        })

    supabase
        .from('drinks')
        .select('*', { count: 'exact', head: true })
        .then((res) => {
            totalNumDrinks.value = res.count
        }
        )
}

function searchDrinks() {
    // Split the string on spaces
    const allWords = searchTerm.value.split(" ").filter(word => word !== "");

    // Add ":*" to each split element using map
    const allFuzzyWords = allWords.map(word => word + ":*");

    // Join the modified elements back together using join with a space separator
    const searchString = allFuzzyWords.join(" & ");

    supabase
        .from('drinks')
        .select('id, name, image_url, description')
        .textSearch('fts', searchString)
        .order('name', { ascending: true })
        .range(startDrink.value, stopDrink.value)
        .then((res) => {
            const data = res.data
            if (data === null) {
                drinks.value = []
                return
            }
            drinks.value = data
            isLoading.value = false
        })

    supabase
        .from('drinks')
        .select('*', { count: 'exact', head: true })
        .textSearch('fts', searchString)
        .then((res) => {
            totalNumDrinks.value = res.count
        }
        )
}

function nextPage() {
    if (currentPage.value >= maxPageNum.value) return
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
            <div class="flex justify-center w-full">
                <input type="text" v-model="searchTerm" class="border border-gray-400 w-3/5 rounded py-2 px-4"
                    placeholder="Search drinks..." @input="getDrinks()">
            </div>
            <div v-if="isLoading">
                loading
            </div>
            <div v-else class="flex justify-between">
                <button class="bg-red-400 p-2 px-4 rounded-l-full m-2" @click="previousPage()">
                    Previous page
                </button>
                <span>
                    {{ currentPage + 1 }} of {{ maxPageNum + 1 }}
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
