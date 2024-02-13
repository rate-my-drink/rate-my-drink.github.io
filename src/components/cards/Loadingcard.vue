<script setup>
const imageUrl = import.meta.env.BASE_URL + "images/placeholder_mug.webp";
</script>
<template>
  <span class="card">
    <div class="card-image">
      <svg class="h-full w-full animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle class="circle stroke-slate-200" cx="12" cy="12" r="10" stroke-width="2" fill="none"
          stroke-dasharray="31.42" stroke-dashoffset="15.71" />
      </svg>
    </div>
    <div class="card-body animate-pulse">
      <!-- Use a conditional rendering to show the loading state -->
      <h2 class="card-title">Loading...</h2>
      <p class="card-description">loading....</p>
    </div>
  </span>
</template>
