<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { supabase } from "../config/supabase.ts";
import Reviews from "./subviews/Reviews.vue";

const route = useRoute();
const drinkId = route.params.id;
const image_url = ref("");
const name = ref("");
const description = ref("");
const producer = ref("");
async function fetchDrink() {
  const { data } = await supabase
    .from("drinks")
    .select("id, name, description, producer(name), image( url )")
    .eq("id", drinkId)
    .maybeSingle();
  if (data === null) {
    image_url.value = "";
    name.value = "An error occurred";
    description.value = "";
    return;
  }
  image_url.value =
    data.image && data.image.url
      ? data.image.url
      : import.meta.env.BASE_URL + "images/placeholder_mug.webp";
  name.value = data.name;
  description.value = data.description;
  producer.value = data.producer.name;
}
fetchDrink();
</script>

<template>
  <div class="flex h-full w-full justify-center md:mt-8">
    <div class="h-full w-full justify-start rounded-lg bg-white shadow-lg lg:w-3/4">
      <div id="Top fields" class="flex flex-col md:flex-row">
        <img :src="image_url" alt="Product Image"
          class="h-full w-full rounded-br-3xl rounded-tl-lg object-cover md:w-1/2" />
        <div class="w-full p-4 md:w-1/2">
          <h2 class="mb-2 text-xl font-semibold">{{ name }}</h2>
          <span class="text-m p-4 font-semibold text-gray-600">Produced by {{ producer }}</span>
          <p class="mb-4 text-gray-700">{{ description }}</p>
        </div>
      </div>
      <reviews :drinkId="drinkId" />
    </div>
  </div>
</template>
