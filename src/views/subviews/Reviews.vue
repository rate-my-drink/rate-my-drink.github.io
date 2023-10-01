<script setup>
import { defineProps, toRefs, ref } from "vue";
import { supabase } from "../../config/supabase.ts"
import { inject } from 'vue'

const { userId } = inject('userName')

const props = defineProps({
    drinkId: String,
});
const { drinkId } = toRefs(props);
const reviewText = ref("")
const reviewRating = ref(2)
const errorMessage = ref(null)

async function uploadReview() {
    const { error } = await supabase
        .from('drink_reviews')
        .insert({
            message: reviewText.value,
            score: reviewRating.value,
            drink_id: drinkId.value,
            user_id: userId.value
        })

    if (error) {
        console.log(error.status)
        if (error.status === 401) {
            errorMessage.value = "You must be logged in to upload a review"
            return
        }
        errorMessage.value = "There was an error uploading your review"
        return
    }
    errorMessage.value = null
}
</script>

<template>
    <div v-if="errorMessage">
        {{ errorMessage }}
    </div>
    <div class="flex justify-center w-full">
        <div class="flex flex-col justify-center w-3/4">
            <input class="m-2 p-2 bg-amber-100" type="text" :value="reviewText" />
            <input class="m-2 p-2 bg-amber-100" type="number" max="5" min="0" :value="reviewRating" />
            <button class="button" @click="uploadReview">Add review</button>
        </div>
    </div>
    <div>
        {{ drinkId }}
    </div>
</template>