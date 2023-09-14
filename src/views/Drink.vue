<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue';
import { supabase } from "../config/supabase.ts"

const route = useRoute()
const drinkId = route.params.id
const image_url = ref("")
const name = ref("")
const description = ref("")
async function fetchDrink() {
    const { data, error } = await supabase
        .from('drinks')
        .select('id, name, image_url, description')
        .eq('id', drinkId)
        .maybeSingle()
    if (data === null) {
        image_url.value = ""
        name.value = ""
        description.value = ""
        return
    }
    console.log(data)
    image_url.value = data.image_url
    name.value = data.name
    description.value = data.description
}
fetchDrink()
</script>

<template>
    <div class="w-full flex justify-center h-full mt-8">
        <div class="flex justify-start bg-white rounded-lg shadow-lg w-3/4">
            <img :src="image_url" alt="Product Image" class="rounded-t-lg w-1/2 h-48 object-cover">
            <div class="p-4 w-1/2">
                <h2 class="text-xl font-semibold mb-2">{{ name }}</h2>
                <p class="text-gray-700 mb-4">{{ description }}</p>
            </div>
        </div>
    </div>
</template>