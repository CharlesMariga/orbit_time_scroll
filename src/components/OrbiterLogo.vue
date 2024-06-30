<script setup lang="ts">
import orbiterLogo from '../assets/images/logo_dark256.png'
</script>

<template>
  <div class="orbiter">
    <img class="orbiter-logo" :src="orbiterLogo" />
  </div>
</template>

<style scoped>
.orbiter {
  position: absolute;
  bottom: 30px;
  left: 50%;
  border: 1px solid var(--Colors-Black-10, #ffffff);
  transform: translateX(-50%);
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.orbiter-logo {
  width: 75px;
  height: 75px;
}
</style>
