<script setup>
import { toRefs, ref } from "vue";
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
const allReviews = ref([])

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

supabase
    .from('drink_reviews')
    .select('created_at, score, message')
    .eq('drink_id', drinkId.value)
    .order('created_at')
    .limit(10)
    .then((res) => {
        const data = res.data
        if (data === null) {
            allReviews.value = []
            return
        }
        allReviews.value = data
    })
</script>

<template>
    <div v-if="errorMessage">
        {{ errorMessage }}
    </div>
    <div class="flex justify-center w-full">
        <div class="flex flex-col justify-center w-3/4">
            <textarea class="m-2 p-2 bg-amber-100" type="text" v-model="reviewText"></textarea>
            <input class="m-2 p-2 bg-amber-100" type="number" max="5" min="0" v-model.number="reviewRating" />
            <button class="button" @click="uploadReview">Add review</button>
        </div>
    </div>
    <div class="flex flex-col justify-center">
        <div v-for="review in allReviews" key="review" class="flex justify-center">
            <div class="flex flex-col rounded-xl bg-gray-200 w-3/4 p-4 m-2">
                <span>
                    {{ review.message }}
                </span>
                <div class="flex justify-between">
                    <div>Score: {{ review.score }}</div>
                    <div class="text-slate-600">{{ review.created_at }}</div>
                </div>
            </div>
        </div>
    </div>
</template>