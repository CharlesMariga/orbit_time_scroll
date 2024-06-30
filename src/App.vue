<script setup lang="ts">
import { ref } from 'vue';
import Orbit from './components/Orbit.vue';
import OrbiterLogo from './components/OrbiterLogo.vue';
import type { WeekData } from './types/contacts';
import ContactCard from './components/ContactCard.vue';

// https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week?start_date=2024-1-8

const smallestEllipseDimension = 400;
const gapBetweenEllipsis = 116;
const orbitCount = 7;

const contactsData = ref<WeekData>([]);

const orbitsDimensions = Array.from(
  { length: orbitCount },
  (_, i) => smallestEllipseDimension + i * 2 * gapBetweenEllipsis
).reverse();

async function fetchData() {
  const res = await fetch(
    'https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week?start_date=2024-1-8'
  );
  const data = await res.json();
  contactsData.value = data?.reverse();
}

fetchData();
</script>

<template>
  <div v-if="contactsData.length" class="container">
    <Orbit
      v-for="(dimension, i) in orbitsDimensions"
      :key="dimension"
      :dimensions="dimension"
      :contacts-count="contactsData[i]?.array.length || 0"
    >
      <ContactCard v-for="contact in contactsData[i]?.array" :key="contact.id" :details="contact" />
    </Orbit>
    <OrbiterLogo />
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
