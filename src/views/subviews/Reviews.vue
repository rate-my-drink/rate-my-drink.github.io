<script setup>
import { toRefs, ref, computed } from "vue";
import { supabase } from "../../config/supabase.ts"
import { inject } from 'vue'
import StarRating from 'vue-star-rating'
import Plus from "../../components/svgs/Plus.vue";
import Minus from "../../components/svgs/Minus.vue";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast({
    position: "top",
});

const { userId, userIsVerified } = inject('userName')

const props = defineProps({
    drinkId: String,
});
const { drinkId } = toRefs(props);
const reviewText = ref("")
const reviewRating = ref(2.5)
const allReviews = ref([])
const maxRating = ref(5)
const incrementSizeRating = ref(0.5)
const reviewId = ref(null)

const databaseRating = computed(() => {
    // The database score is an uint8 from 0 till 240
    // This gives room in the future to change to a different scale without changing the database.
    return Math.round(reviewRating.value * 240 / maxRating.value);
});

if (userId.value) {
    supabase.from("drink_reviews")
        .select("id, message, score")
        .eq("user_id", userId.value)
        .eq("drink_id", drinkId.value)
        .then((res) => {
            const data = res.data
            if (!data) {
                return
            }
            reviewId.value = data[0].id
            reviewText.value = data[0].message
            reviewRating.value = data[0].score / 240 * maxRating.value
        })
}

async function uploadReview() {
    if (!userId.value) {
        $toast.error('You need to login to leave a review');
        return
    }
    if (!userIsVerified.value) {
        $toast.error('You need to verify your email to leave a review');
        return
    }
    if (reviewId.value) {
        let { error } = await supabase
            .from('drink_reviews')
            .update({
                message: reviewText.value,
                score: databaseRating.value,
                drink_id: drinkId.value,
                user_id: userId.value
            }).eq(
                "id", reviewId.value
            )
        if (error) {
            $toast.error(error.message);
            return
        }
    } else {
        let { error } = await supabase
            .from('drink_reviews')
            .insert({
                message: reviewText.value,
                score: databaseRating.value,
                drink_id: drinkId.value,
                user_id: userId.value
            })

        if (error) {
            $toast.error(error.message);
            return
        }
    }

    getReviews()
}

async function getReviews() {
    supabase
        .from('drink_reviews')
        .select('created_at, score, message')
        .eq('drink_id', drinkId.value)
        .order('created_at', { ascending: false })
        .limit(10)
        .then((res) => {
            const data = res.data
            if (data === null) {
                allReviews.value = []
                return
            }
            allReviews.value = data
        })
}
getReviews()

function incrementRating() {
    if (reviewRating.value < maxRating.value) {
        reviewRating.value += incrementSizeRating.value
    } else {
        reviewRating.value = maxRating.value
    }
}

function decreaseRating() {
    if (reviewRating.value > 0) {
        reviewRating.value -= incrementSizeRating.value
    } else {
        reviewRating.value = 0
    }
}
</script>

<template>
    <div class="flex justify-center w-full">
        <div class="flex flex-col justify-center w-3/4">
            <textarea class="m-2 p-2 bg-amber-100" type="text" v-model="reviewText"></textarea>
            <div class="flex justify-center">
                <div class="h-full flex flex-col justify-center">
                    <Minus class="h-8" @click="decreaseRating()" />
                </div>
                <star-rating v-model:rating="reviewRating" :increment="incrementSizeRating" :max-rating="maxRating"
                    :animate="true" :show-rating="false" :star-size="34" :rounded-corners="true" :border-width="6" />
                <div class="h-full flex flex-col justify-center">
                    <Plus class="h-8" @click="incrementRating()" />
                </div>
            </div>
            <button class="button" @click="uploadReview">Add review</button>
        </div>
    </div>
    <div class="flex flex-col justify-center">
        <div v-for="review in allReviews" key="review" class="flex justify-center">
            <div class="flex flex-col rounded-xl bg-gray-200 w-3/4 p-4 m-2">
                <div class="flex flex-col justify-between">
                    <star-rating :rating="review.score / 240 * maxRating" :read-only="true" :increment="incrementSizeRating"
                        :max-rating="maxRating" :star-size="20" :show-rating="false" :rounded-corners="true"
                        :border-width="6" />
                    <span class="my-2">
                        {{ review.message }}
                    </span>
                    <div class="text-slate-600">{{ review.created_at }}</div>
                </div>
            </div>
        </div>
    </div>
</template>