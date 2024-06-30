<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Orbit from './components/Orbit.vue';
import OrbiterLogo from './components/OrbiterLogo.vue';
import type { WeekData } from './types/contacts';
import ContactCard from './components/ContactCard.vue';

const smallestEllipseDimension = 400;
const gapBetweenEllipsis = 116;
const maxOrbitsOnscreen = 7;
const orbitCount = ref(maxOrbitsOnscreen);
const dimensions = ref<number[]>([]);
const timeOut = ref();
const scrollY = ref(0);

const contactsData = ref<WeekData>([]);

const contactsToDisplay = computed(() => contactsData.value.slice(0, orbitCount.value));

watch(
  () => contactsData.value.length,
  () => {
    dimensions.value = contactsData.value.map((el, i) => {
      if (i < orbitCount.value) return calculateDimension(i);
      return 0;
    });
  }
);

async function fetchData() {
  const res = await fetch(
    `https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week?start_date=${getFormattedDate()}`
  );
  const data = await res.json();
  contactsData.value = data;
}
fetchData();

function calculateDimension(value: number) {
  return (
    smallestEllipseDimension + (contactsToDisplay.value.length - value - 1) * 2 * gapBetweenEllipsis
  );
}

function fadeOrbitOut(dimension: number) {
  return dimension > smallestEllipseDimension + 6 * 2 * gapBetweenEllipsis;
}

function add() {
  if (orbitCount.value != contactsData.value.length) {
    orbitCount.value += 1;

    for (let i = 0; i < orbitCount.value; i++) {
      if (dimensions.value[i] === 0) dimensions.value[i] = smallestEllipseDimension;
      else dimensions.value[i] += gapBetweenEllipsis * 2;
    }
  }
}

function subtract() {
  if (orbitCount.value > 7) {
    orbitCount.value -= 1;

    for (let i = 0; i <= orbitCount.value; i++) {
      if (i === orbitCount.value) dimensions.value[i] = 0;
      else dimensions.value[i] -= gapBetweenEllipsis * 2;
    }
  }
}

function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

function isOuterOrbit(dimension: number) {
  return dimension === smallestEllipseDimension + 6 * 2 * gapBetweenEllipsis;
}

window.addEventListener('wheel', (e) => {
  clearTimeout(timeOut.value);

  timeOut.value = setTimeout(() => {
    if (e.deltaY > 0 && scrollY.value <= 120 * contactsData.value.length - maxOrbitsOnscreen) {
      // Downward scroll
      scrollY.value += 120;
      add();
    } else if (e.deltaY < 0 && scrollY.value !== 0) {
      // Upward scroll
      scrollY.value -= 120;
      subtract();
    }
  }, 100);
});

document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      event.preventDefault();
      break;
  }
});
</script>

<template>
  <div v-if="contactsData.length" class="container">
    <Orbit
      v-for="(contact, i) in contactsToDisplay"
      :key="contact.contact_date"
      :isOuterOrbit="isOuterOrbit(dimensions[i])"
      :dimensions="dimensions[i]"
      :contacts-count="contactsData[i]?.array.length || 0"
      :fade-out="fadeOrbitOut(dimensions[i])"
      :date="contactsData[i].contact_date"
    >
      <ContactCard
        v-for="contact in contactsData[i]?.array"
        :key="contact.id"
        :details="contact"
        :dimensions="dimensions[i]"
      />
    </Orbit>
    <OrbiterLogo />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}

.buttons {
  position: absolute;
  top: 0;
  bottom: 0;
  max-height: max-content;
}

.buttons button {
  padding: 6px 8px;
}

.scroll-snap {
  height: 100vh;
  scroll-snap-align: center;
}
</style>
