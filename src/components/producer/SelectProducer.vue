<script setup>
import { ref } from "vue";
import { supabase } from "../../config/supabase.ts";
import "vue-toast-notification/dist/theme-sugar.css";

const selectedProducer = defineModel("selectedProducer");
const showProducer = ref(false);

const producers = ref([]);

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
  <label class="text-gray-500">Producer</label>
  <div>
    <input
      type="text"
      class="border-grey-light mb-4 block w-full rounded border p-3"
      @focus="showProducer = true"
      @blur="showProducer = false"
    />
    <div
      v-show="showProducer"
      class="absolute min-w-96 rounded-xl border-2 border-solid border-gray-600 bg-white py-2"
    >
      <div
        class="m-1 px-2 hover:bg-amber-500"
        v-for="producer in producers"
        :key="producer.id"
        v-on:mousedown="selectedProducer = producer"
      >
        {{ producer.name }}
      </div>
    </div>
  </div>
</template>
