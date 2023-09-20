<script setup>
import { ref } from 'vue';
import { supabase } from "../config/supabase.ts"
import router from "../router.js"

const error_message = ref(null)
const producers = ref([])
const image_url = ref("")
const name = ref("")
const description = ref("")

// Get producers from supabase
async function getProducers() {
    const { data, error } = await supabase
        .from('producers')
        .select('id, name')

    if (error) { 
        console.log(error)
        return
    }
    producers.value = data
}

// Upload a drink to supabase
async function uploadDrink() {
    const { response, error } = await supabase
        .from('drinks')
        .insert({
            name: name.value,
            description: description.value,
            // image_url: image_url.value
        })

    if (error) { 
        console.log(error.status)
        if(error.status === 401) {
            error_message.value = "You must be logged in to upload a drink"
            return
        }       
        error_message.value = "There was an error uploading your drink"
        return
    }
    error_message.value = null
    router.push({ path: '/' })
}
</script>

<template>
    <div class="w-full flex justify-center h-full md:mt-8">
        <div class="flex flex-col justify-start bg-white rounded-lg shadow-lg h-full w-full lg:w-3/4">

            <div v-if="error_message" class="w-full bg-red-300 rounded-t-lg p-1">
                {{ error_message }}
            </div>
            <div class="flex flex-col md:flex-row justify-start h-full w-full">
                <img :src="image_url" alt="Product Image" class="rounded-t-lg h-full w-full md:w-1/2 object-cover">
                <div class="p-4 w-full md:w-1/2 ">
                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="drinkName"
                    v-model="name" placeholder="Name of drink" />
                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="drinkDescription"
                    v-model="description" placeholder="Description of the drink" />
                    <button type="button" class="button" @click="uploadDrink">Upload</button>
                </div>
            </div>
        </div>
    </div>
</template>