<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue';
import { supabase } from "../config/supabase.ts"
import Reviews from "./subviews/Reviews.vue"

const route = useRoute()
const drinkId = route.params.id
const image_url = ref("")
const name = ref("")
const description = ref("")
const producer = ref("")
async function fetchDrink() {
    const { data } = await supabase
        .from('drinks')
        .select('id, name, description, producer(name), image( url )')
        .eq('id', drinkId)
        .maybeSingle()
    if (data === null) {
        image_url.value = ""
        name.value = "An error occurred"
        description.value = ""
        return
    }
    image_url.value = data.image && data.image.url ? data.image.url : import.meta.env.BASE_URL + "images/placeholder_mug.png"
    name.value = data.name
    description.value = data.description
    producer.value = data.producer.name
}
fetchDrink()

</script>

<template>
    <div class="w-full h-full  flex justify-center md:mt-8">
        <div class="justify-start bg-white rounded-lg shadow-lg h-full w-full lg:w-3/4">
            <div id="Top fields" class="flex flex-col md:flex-row">
                <img :src="image_url" alt="Product Image"
                    class="rounded-tl-lg rounded-br-3xl h-full w-full md:w-1/2 object-cover">
                <div class="p-4 w-full md:w-1/2 ">
                    <h2 class="text-xl font-semibold mb-2">{{ name }}</h2>
                    <span class="text-m font-semibold p-4 text-gray-600">Produced by {{ producer }}</span>
                    <p class="text-gray-700 mb-4">{{ description }}</p>
                </div>
            </div>
            <reviews :drinkId="drinkId" />
        </div>
    </div>
</template>