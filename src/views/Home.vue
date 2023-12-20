<script setup>
import { computed, ref } from 'vue';
import { supabase } from "@/config/supabase.ts"
import DrinkCard from "@/components/cards/DrinkCard.vue"
import { RouterLink } from 'vue-router'
import Loadingcard from '../components/cards/Loadingcard.vue';

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

function updateTotalDrinks(newTotal) {
    totalNumDrinks.value = newTotal
    if (currentPage.value >= maxPageNum.value) {
        currentPage.value = maxPageNum.value
    }
}
function getAllDrinks() {
    supabase
        .from('drinks')
        .select('id, name, description, image( url )')
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
            updateTotalDrinks(res.count)
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
        .select('id, name, description, image( url )')
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
            updateTotalDrinks(res.count)
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
            <div class="grid grid-cols-3 gap-4 w-full">
                <div class="flex justify-start">
                    <button v-show="currentPage != 0" class="p-2 px-4 rounded-l-full m-2 flex items-center"
                        @click="previousPage()">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10.707 3.293a1 1 0 010 1.414L6.414 9H17a1 1 0 110 2H6.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Previous page
                    </button>
                </div>
                <span class="flex justify-center">
                    {{ currentPage + 1 }} of {{ maxPageNum + 1 }}
                </span>
                <div class="flex justify-end">
                    <button v-show="currentPage < maxPageNum" class="p-2 px-4 rounded-r-full m-2 flex items-center"
                        @click="nextPage()">
                        Next page
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9.293 16.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-4.293-4.293a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Loadingcard v-if="isLoading" v-for="num in numbPerPage" :key="num" />
                <DrinkCard v-else v-for="drink in drinks" :product="drink" :key="drink.id" />
            </div>
        </div>
    </div>
</template>
