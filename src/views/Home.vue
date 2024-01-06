<script setup>
import { computed, ref } from 'vue';
import { supabase } from "@/config/supabase.ts"
import DrinkCard from "@/components/cards/DrinkCard.vue"
import { RouterLink } from 'vue-router'
import Loadingcard from '../components/cards/Loadingcard.vue';
import arrow from '../components/svgs/Arrow.vue';
import funnel from '../components/svgs/Funnel.vue'

const drinks = ref([])
const numbPerPage = ref(24)
const currentPage = ref(0)
const totalNumDrinks = ref(0)
const searchTerm = ref('')
const isLoading = ref(true)
const showFilters = ref(false)
const allProducers = ref([])
// Get the maximum page number for the current number of drinks
// This is based on array counting so the max page number is 1 less than the actual number of pages
// Because the first page is page 0
const maxPageNum = computed(() => Math.max(0, Math.ceil(totalNumDrinks.value / numbPerPage.value) - 1))
const startDrink = computed(() => currentPage.value * numbPerPage.value)
const stopDrink = computed(() => (currentPage.value + 1) * numbPerPage.value - 1)


function updateTotalDrinks(newTotal) {
    totalNumDrinks.value = newTotal
    if (currentPage.value >= maxPageNum.value) {
        currentPage.value = maxPageNum.value
    }
}
async function getDrinks() {
    isLoading.value = true
    let producerIds = allProducers.value.filter((i) => i.isSelected).map((i) => i.id)

    console.log(producerIds)
    let chainPage = supabase
        .from('drinks')
        .select('id, name, description, producer, image( url )')
        .order('name', { ascending: true })
    let chainTotalDrinks = supabase
        .from('drinks')
        .select('*', { count: 'exact', head: true })

    if (producerIds.length > 0) {
        chainPage = chainPage.in('producer', producerIds)
        chainTotalDrinks = chainTotalDrinks.in('producer', producerIds)
    }


    if (searchTerm.value !== '') {
        // Split the string on spaces
        const allWords = searchTerm.value.split(" ").filter(word => word !== "");

        // Add ":*" to each split element using map
        const allFuzzyWords = allWords.map(word => word + ":*");

        // Join the modified elements back together using join with a space separator
        const searchString = allFuzzyWords.join(" & ");

        chainPage = chainPage.textSearch('fts', searchString)
        chainTotalDrinks = chainTotalDrinks.textSearch('fts', searchString)
    }

    await chainTotalDrinks.then((res) => {
        updateTotalDrinks(res.count)
    }
    )

    chainPage = chainPage.range(startDrink.value, stopDrink.value)

    chainPage.then((res) => {
        const data = res.data
        if (data === null) {
            drinks.value = []
            return
        }
        drinks.value = data
        isLoading.value = false
    })

}

function getAllProducers() {
    supabase
        .from('producers')
        .select('id, name')
        .order('name', { ascending: true })
        .then((res) => {
            const data = res.data
            if (data === null) {
                allProducers.value = []
                return
            }
            allProducers.value = data.map((i) => ({ ...i, isSelected: false }))
        })
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

function toggleShowFilters() {
    showFilters.value = !showFilters.value
    console.log(showFilters.value)
}
getAllProducers()
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
        <div class="w-full flex flex-col justify-center xl:w-4/5 bg-slate-200 h-full p-2 px-6">
            <div class="flex justify-center w-full">
                <router-link class="text-2xl font-bold w-4/5 button m-4" to="/add-drink">Add Drink</router-link>
            </div>
            <div class="flex justify-center w-full">
                <div class="w-4/5 flex justify-center">
                    <input type="text" v-model="searchTerm" class="border border-gray-400 w-5/6 rounded py-2 px-4"
                        placeholder="Search drinks..." @input="getDrinks()">
                    <funnel class="w-12 h-12 ml-2 hover:cursor-pointer" @click="toggleShowFilters()" />
                </div>
            </div>
            <div v-if="showFilters" class="h-screen w-screen fixed bg-transparent z-0 top-0 left-0 right-0"
                @click="showFilters = false">
            </div>
            <div class="h-0 z-10">
                <div class="bg-slate-400 rounded-lg transform ease-in-out duration-500 my-2 origin-bottom static" :class="showFilters
                    ? 'translate-y-0 p-4'
                    : '-translate-y-full scale-y-0'
                    ">
                    <!-- Close button -->
                    <div class="flex justify-end">
                        <div @click="showFilters = false">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        </div>
                    </div>

                    <h2>Producers</h2>
                    <div class="grid grid-cols-4 gap-4">
                        <div v-for="producer  in allProducers" :key="producer.id">
                            <label>
                                <input type="checkbox" id="producer.id" v-model="producer.isSelected"
                                    @change="getDrinks()" />
                                {{ producer.name }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4 w-full">
                <div class="flex justify-start">
                    <button v-show="currentPage != 0" class="p-2 px-4 rounded-l-full m-2 flex items-center"
                        @click="previousPage()">
                        <arrow class="rotate-180" />
                        Previous page
                    </button>
                </div>
                <span class="flex justify-center">
                    <span class="flex flex-col justify-center">
                        {{ currentPage + 1 }} of {{ maxPageNum + 1 }}
                    </span>
                </span>
                <div class="flex justify-end">
                    <button v-show="currentPage < maxPageNum" class="p-2 px-4 rounded-r-full m-2 flex items-center"
                        @click="nextPage()">
                        Next page
                        <arrow />
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                <Loadingcard v-if="isLoading" v-for="num in numbPerPage" :key="num" />
                <DrinkCard v-else v-for="drink in drinks" :product="drink" :key="drink.id" />
            </div>
            <div class="grid grid-cols-3 gap-4 w-full">
                <div class="flex justify-start">
                    <button v-show="currentPage != 0" class="p-2 px-4 rounded-l-full m-2 flex items-center"
                        @click="previousPage()">
                        <arrow class="rotate-180" />
                        Previous page
                    </button>
                </div>
                <span class="flex justify-center">
                    <span class="flex flex-col justify-center">
                        {{ currentPage + 1 }} of {{ maxPageNum + 1 }}
                    </span>
                </span>
                <div class="flex justify-end">
                    <button v-show="currentPage < maxPageNum" class="p-2 px-4 rounded-r-full m-2 flex items-center"
                        @click="nextPage()">
                        Next page
                        <arrow />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
