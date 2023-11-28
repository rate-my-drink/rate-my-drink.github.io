<script setup>
import { ref } from 'vue'
import { supabase } from "../config/supabase.ts"
import router from "../router.js"
import { inject } from 'vue'

const { userId } = inject('userName')
const errorMessage = ref(null)
const producers = ref([])
const producerId = ref(null)
const previewImage = ref("")
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
    const sorted_producers = data.sort((a, b) => a.name.localeCompare(b.name))
    producers.value = sorted_producers
}

// Upload a drink to supabase
async function uploadDrink() {
    const { error } = await supabase
        .from('drinks')
        .insert({
            name: name.value,
            description: description.value,
            producer: producerId.value,
            user_id: userId.value
        })

    if (error) {
        console.log(error.status)
        if (error.status === 401) {
            errorMessage.value = "You must be logged in to upload a drink"
            return
        }
        errorMessage.value = "There was an error uploading your drink"
        return
    }
    errorMessage.value = null
    router.push({ path: '/' })
}

function uploadImage(e) {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
        previewImage.value = e.target.result;
    };
}

getProducers()
</script>

<template>
    <div class="w-full flex justify-center h-full md:mt-8">
        <div class="flex flex-col justify-start bg-white rounded-lg shadow-lg h-full w-full lg:w-3/4">

            <div v-if="errorMessage" class="w-full bg-red-300 rounded-t-lg p-1">
                {{ errorMessage }}
            </div>
            <div class="flex flex-col md:flex-row justify-start h-full w-full">
                <div class="p-4 w-full md:w-1/2 ">
                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="drinkName"
                        v-model="name" placeholder="Name of drink" />
                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="drinkDescription" v-model="description" placeholder="Description of the drink" />
                    <select class="block border border-grey-light w-full p-3 rounded mb-4" v-model="producerId">
                        <option value="" disabled selected>Select a producer</option>
                        <option v-for="producer in producers" :key="producer.id" :value="producer.id">{{ producer.name }}
                        </option>
                    </select>
                    <button type="button" class="button" @click="uploadDrink">Upload</button>
                </div>

                <label class="md:w-1/2 h-full p-2">
                    <input type="file" class="hidden" accept="image/jpeg, image/png, image/jpg" @change=uploadImage>
                    Upload your image
                    <img :src="previewImage" class="w-full h-full" />
                </label>
            </div>
        </div>
    </div>
</template>