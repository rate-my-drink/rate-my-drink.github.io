<script setup>
import { ref } from "vue";
import { supabase } from "../../config/supabase.ts";
import { inject } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import NewProducer from "./NewProducer.vue";

const { userId, isUserVerified } = inject("userName");
const props = defineProps(["producerId"]);
const producerId = ref(props.producerId);
const showProducer = ref(false);

const producers = ref([]);

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

getProducers();
</script>

<template>
  <NewProducer class="hidden" />
  <label class="text-gray-500">Producer</label>
  <div>
    <input
      type="text"
      class="border-grey-light mb-4 block w-full rounded border p-3"
      @focus="showProducer = true"
      @blur="showProducer = false"
    />
    <ul v-show="showProducer">
      <li v-for="producer in producers" :key="producer.id">
        {{ producer.name }}
      </li>
    </ul>
  </div>
  <select
    class="border-grey-light mb-4 block w-full rounded border p-3"
    v-model="producerId"
  >
    <option value="" disabled selected>Select a producer</option>
    <option value="new" @click="console.log('new producer')">
      New producer
    </option>
    <option
      v-for="producer in producers"
      :key="producer.id"
      :value="producer.id"
    >
      {{ producer.name }}
    </option>
  </select>
</template>
