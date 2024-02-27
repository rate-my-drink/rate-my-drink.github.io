<script setup>
import { ref } from "vue";
import { supabase } from "../config/supabase.ts";
import router from "../router.js";
import { inject } from "vue";
import { upload_image } from "../helpers/supabase/upload_image.ts";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import SelectProducer from "../components/producer/SelectProducer.vue";

const { userId, isUserVerified } = inject("userName");
const producers = ref([]);
const selectedProducer = ref(null);
const previewImage = ref("");
const previewImageType = ref("");
const name = ref("");
const description = ref("");

const $toast = useToast({
  position: "top",
});

// Get producers from supabase
async function getProducers() {
  const { data, error } = await supabase.from("producers").select("id, name");

  if (error) {
    console.error(error);
    return;
  }
  const sorted_producers = data.sort((a, b) => a.name.localeCompare(b.name));
  producers.value = sorted_producers;
}

// Upload a drink to supabase
async function uploadDrink() {
  if (!isUserVerified()) {
    return;
  }

  if (!name.value) {
    $toast.error("The Drink most have a name");
    return;
  }
  if (!selectedProducer.value) {
    $toast.error("The Drink most have a producer");
    return;
  }
  const folderName = `drinks/${selectedProducer.value.id}`;

  let imageId = null;
  if (previewImage.value) {
    imageId = await upload_image(previewImage.value, userId.value, folderName);
  }
  const { error } = await supabase.from("drinks").insert({
    name: name.value,
    description: description.value,
    producer: selectedProducer.value.id,
    user_id: userId.value,
    image: imageId,
  });

  if (error) {
    $toast.error("There was an error uploading your drink");
    return;
  }
  $toast.success(`${name.value} has been added`);
  router.push({ path: import.meta.env.BASE_URL });
}

function uploadImage(e) {
  const image = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = (e) => {
    previewImageType.value = image.type;
    previewImage.value = e.target.result;
  };
}

getProducers();
</script>

<template>
  <div class="flex h-full w-full justify-center md:mt-8">
    <div
      class="flex h-full w-full flex-col justify-start rounded-lg bg-white shadow-lg lg:w-3/4"
    >
      <div class="flex h-full w-full flex-col justify-start md:flex-row">
        <div class="w-full p-4 md:w-1/2">
          <div>
            <label class="text-gray-500">Name of the drink</label>
            <input
              type="text"
              class="border-grey-light mb-4 block w-full rounded border p-3"
              name="drinkName"
              v-model="name"
              placeholder="Name of the drink"
            />
          </div>
          <div>
            <label class="text-gray-500">Description of the drink</label>
            <input
              type="text"
              class="border-grey-light mb-4 block w-full rounded border p-3"
              name="drinkDescription"
              v-model="description"
              placeholder="Description of the drink"
            />
          </div>
          <div>Producer: {{ selectedProducer?.name }}</div>
          <SelectProducer v-model:selectedProducer="selectedProducer" />
        </div>

        <label
          class="m-2 h-full rounded-xl p-2 outline outline-gray-400 md:w-1/2"
        >
          <input
            type="file"
            class="hidden"
            accept="image/jpeg, image/png, image/jpg, image/webp"
            @change="uploadImage"
          />
          <span v-show="!previewImage"> Upload a image </span>
          <img :src="previewImage" class="h-full w-full" />
        </label>
      </div>
      <div class="flex justify-center">
        <button type="button" class="button md:w-4/5" @click="uploadDrink">
          Upload
        </button>
      </div>
    </div>
  </div>
</template>
