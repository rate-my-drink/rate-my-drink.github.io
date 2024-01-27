<script setup>
import { ref } from 'vue'
import { supabase } from "../config/supabase.ts"
import router from "../router.js"
import { inject } from 'vue'
import { upload_image } from "../helpers/supabase/upload_image.ts"
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const { userId, isUserVerified } = inject('userName')
const producers = ref([])
const producerId = ref(null)
const previewImage = ref("")
const previewImageType = ref("")
const name = ref("")
const description = ref("")

const $toast = useToast({
    position: "top",
});

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

// Upload a drink to supabase
async function uploadDrink() {
    if (!isUserVerified()) {
        return
    }

    if (!name.value) {
        $toast.error("The Drink most have a name")
        return
    }
    if (!producerId.value) {
        $toast.error("The Drink most have a producer")
        return
    }
    const folderName = `drinks/${producerId.value}`

    let imageId = null
    if (previewImage.value) {
        imageId = await upload_image(previewImage.value, userId.value, folderName)
    }
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
        $toast.error("There was an error uploading your drink")
        return
    }
    $toast.success(`${name.value} has been added`)
    router.push({ path: import.meta.env.BASE_URL })
}

function uploadImage(e) {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
        previewImageType.value = image.type
        previewImage.value = e.target.result
    };
}

getProducers()
</script>

<template>
    <div class="w-full flex justify-center h-full md:mt-8">
        <div class="flex flex-col justify-start bg-white rounded-lg shadow-lg h-full w-full lg:w-3/4">
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
                    <input type="file" class="hidden" accept="image/jpeg, image/png, image/jpg, image/webp"
                        @change=uploadImage>
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