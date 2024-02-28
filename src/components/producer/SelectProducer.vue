<script setup>
import { ref, computed, onMounted } from "vue";
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
const filterProducers = computed(() => {
  return producers.value.filter((producer) => {
    return producer.name
      .toLowerCase()
      .includes(producerName.value.toLowerCase());
  });
});
getProducers();

function deselectText() {
  showProducer.value = false;
}

function submitProducer() {
  deselectText();
  const foundProducers = producers.value.filter((producer) => {
    return producer.name.toLowerCase() === producerName.value.toLowerCase();
  });

  if (foundProducers.length > 0) {
    selectedProducer.value = foundProducers[0];
  } else {
    selectedProducer.value = { name: producerName.value, id: null };
  }
  producerInputText.value.blur();
}

function focusText() {
  showProducer.value = true;
}

function selectProducer(producer) {
  selectedProducer.value = producer;
  producerName.value = producer.name;
  showProducer.value = false;
}
</script>

<template>
  <form @submit.prevent="submitProducer()">
    <label class="text-gray-500">Producer</label>
    <input
      type="text"
      class="border-grey-light mb-4 block w-full rounded border p-3"
      ref="producerInputText"
      v-model="producerName"
      @focus="focusText()"
      @blur="deselectText()"
    />
    <div
      v-show="showProducer"
      class="absolute min-w-96 rounded-xl border-2 border-solid border-gray-600 bg-white py-2"
    >
      <div
        class="m-1 px-2 hover:bg-amber-500"
        v-for="producer in filterProducers"
        :key="producer.id"
        v-on:mousedown="selectProducer(producer)"
      >
        {{ producer.name }}
      </div>
    </div>
  </form>
</template>
