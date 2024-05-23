<script setup>
import { ref } from "vue";
import { supabase } from "../../config/supabase.ts";
import "vue-toast-notification/dist/theme-sugar.css";

const selectedProducer = defineModel("selectedProducer");
const showProducer = ref(false);
const producerName = ref("");
const producers = ref([]);
const producerInputText = ref(null);

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

function deselectText() {
  showProducer.value = false;
}

function submitProducer() {
  deselectText();
  updateProducer();
  producerInputText.value.blur();
}
function updateProducer() {
  const foundProducers = producers.value.filter((producer) => {
    return producer.name.toLowerCase() === producerName.value.toLowerCase();
  });

  if (foundProducers.length > 0) {
    selectedProducer.value = foundProducers[0];
  } else {
    selectedProducer.value = { name: producerName.value, id: null };
  }
}

function focusText() {
  showProducer.value = true;
}
</script>

<template>
  <form @submit.prevent="submitProducer()">
    <label class="w-full text-gray-500"
      >Producer
      <div class="flex w-full justify-end">
        <input
          type="text"
          class="border-grey-light block w-full rounded border p-3"
          ref="producerInputText"
          list="all-current-producers"
          v-model="producerName"
          @focus="focusText()"
          @blur="deselectText()"
          @input="updateProducer()"
          e2e-id="input-producer-name"
        />
        <div
          v-if="selectedProducer?.id == null && producerName.length > 0"
          class="absolute m-1 h-fit rounded-full bg-blue-600 p-2 text-justify text-xs font-bold text-white"
        >
          NEW
        </div>
      </div>
    </label>
    <datalist id="all-current-producers">
      <option v-for="producer in producers" :value="producer.name"></option>
    </datalist>
  </form>
</template>
