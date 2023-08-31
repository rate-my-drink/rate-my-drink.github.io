<script setup>

</script>
  
<template>
    <div class="flex items-center justify-between bg-amber-600 py-6">
        <button @click="console.log('/')" class="text-2xl font-bold text-black px-4">Home</button>
        <button @click="console.log('/about')" class="text-2xl font-bold text-black px-4">About</button>
        <button @click="console.log('/contact')" class="text-2xl font-bold text-black px-4">Contact</button>
    </div>
</template>
  