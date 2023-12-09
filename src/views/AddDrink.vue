<script setup>
import { ref } from 'vue'
import { supabase } from "../config/supabase.ts"
import router from "../router.js"
import { inject } from 'vue'
import { decode } from 'base64-arraybuffer'
const { userId } = inject('userName')
const errorMessage = ref(null)
const producers = ref([])
const producerId = ref(null)
const previewImage = ref("")
const name = ref("")
const description = ref("")
const testImageUrl = ref("")

// Get producers from supabase
async function getProducers() {
    const { data, error } = await supabase
        .from('producers')
        .select('id, name')

    if (error) {
        console.error(error)
        return
    }
    const sorted_producers = data.sort((a, b) => a.name.localeCompare(b.name))
    producers.value = sorted_producers
}

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

async function upload_image() {
    const parts = previewImage.value.split(',')
    const imageBase64 = parts[parts.length - 1]
    const { data, error } = await supabase
        .storage
        .from('coffee-images')
        .upload(`public/${uuidv4()}.webp`, decode(imageBase64), {
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/webp'
        })

    if (error) {
        console.error(error)
        return
    }
    return data.path
}

async function get_image_url(imgPath) {
    const { data, error } = supabase
        .storage
        .from('coffee-images')
        .getPublicUrl(imgPath)

    if (error) {
        console.error(error)
        return
    }
    return data.publicUrl
}

async function upload_to_image_table(imageUrl) {
    const { data, error } = await supabase
        .from('images')
        .insert({
            url: imageUrl,
            storage_vendor: "supabase"
        })
        .select()

    if (error) {
        console.error(error)
        return
    }
    return data[0].id
}
// Upload a drink to supabase
async function uploadDrink() {
    const imgPath = await upload_image()
    const imageUrl = await get_image_url(imgPath)
    const imageId = await upload_to_image_table(imageUrl)
    const { error } = await supabase
        .from('drinks')
        .insert({
            name: name.value,
            description: description.value,
            producer: producerId.value,
            user_id: userId.value,
            image: imageId
        })

    if (error) {
        if (error.status === 401) {
            errorMessage.value = "You must be logged in to upload a drink"
            return
        }
        errorMessage.value = "There was an error uploading your drink"
        return
    }
    errorMessage.value = null
    // router.push({ path: '/' })
}

function uploadImage(e) {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
        previewImage.value = e.target.result
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
                    <div>
                        <label class="text-gray-500">Name of the drink</label>
                        <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="drinkName"
                            v-model="name" placeholder="Name of the drink" />
                    </div>
                    <div>
                        <label class="text-gray-500">Description of the drink</label>
                        <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="drinkDescription" v-model="description" placeholder="Description of the drink" />
                    </div>
                    <div>
                        <label class="text-gray-500">Producer</label>
                        <select class="block border border-grey-light w-full p-3 rounded mb-4" v-model="producerId">
                            <option value="" disabled selected>Select a producer</option>
                            <option v-for="producer in producers" :key="producer.id" :value="producer.id">{{ producer.name
                            }}
                            </option>
                        </select>
                    </div>
                </div>

                <label class="md:w-1/2 h-full p-2 outline m-2 outline-gray-400 rounded-xl">
                    <!--TODO add image/jpeg, image/png, image/jpg, -->
                    <input type="file" class="hidden" accept="image/webp" @change=uploadImage>
                    <span v-show="!previewImage">
                        Upload a image
                    </span>
                    <img :src="previewImage" class="w-full h-full" />
                </label>
            </div>
            <div class="flex justify-center">
                <button type="button" class="button md:w-4/5" @click="uploadDrink">Upload</button>
            </div>
        </div>
    </div>
</template>