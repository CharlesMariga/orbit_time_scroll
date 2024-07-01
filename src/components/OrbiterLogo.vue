<script setup lang="ts">
import { computed } from 'vue';
import orbiterLogo from '../assets/images/logo_dark256.png';

/**
 * Orbit logo is approximately 1/5 of the smallets orbit size
 * since no definite breakpoints were provided in the design
 */
const size = computed(() => Math.ceil(0.2 * (window.innerHeight / 7)) * 2);
</script>

<template>
  <div class="orbiter">
    <img class="orbiter-logo" :src="orbiterLogo" :width="size" :height="size" />
  </div>
</template>

<style scoped>
.orbiter {
  position: absolute;
  bottom: 1vh;
  left: 50%;
  border: 1px solid var(--Colors-Black-10, #ffffff);
  transform: translateX(-50%);
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
</style>
