<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

interface OrbitProps {
  dimensions: number;
  contactsCount?: number;
  fadeOut?: boolean;
}

const props = defineProps<OrbitProps>();
const orbit = ref<HTMLDivElement | null>(null);

const orbitDimension = computed(() => ({
  width: `${props.dimensions}px`,
  height: `${props.dimensions}px`
}));

watch(
  () => props.contactsCount,
  () => {
    orderContactsOnOrbit();
  },
  { immediate: true }
);

watch(
  () => orbit.value?.children,
  () => {
    orderContactsOnOrbit();
  },
  { immediate: true, deep: true }
);

watch(
  () => props.dimensions,
  () => {
    orderContactsOnOrbit();
  }
);

function orderContactsOnOrbit() {
  const avatars = orbit?.value?.children;
  const orbitRadius = props.dimensions / 2;

  if (avatars?.length) {
    if (avatars.length === 1) {
      (avatars[0] as HTMLDivElement).style.transform =
        `rotate(0deg) translate(${orbitRadius}px) rotate(-0deg)`;
      return;
    }

    const displayAngle = 160;
    const angleInterval = displayAngle / avatars.length > 35 ? 35 : displayAngle / avatars.length;
    const avatarsArr = Array.from(avatars);
    const isAvatarsCountOdd = avatars.length % 2 !== 0;

    // 1) Divide
    const leftCount = Math.floor(avatars.length / 2);
    let leftAvatars = avatarsArr.slice(0, leftCount);
    let rightAvatars = avatarsArr.slice(leftCount);

    if (isAvatarsCountOdd) {
      rightAvatars = avatarsArr.slice(leftCount + 1);
      (avatars[leftCount] as HTMLDListElement).style.transform =
        `rotate(0deg) translate(${orbitRadius}px) rotate(-0deg)`;
    }

    // 2) Loop throught the left array
    let angle = isAvatarsCountOdd ? 360 - angleInterval : 360 - angleInterval / 2;
    leftAvatars.reverse().forEach((el, index) => {
      if (index > 0) angle -= angleInterval;
      (el as HTMLDivElement).style.transform =
        `rotate(${angle}deg) translate(${orbitRadius}px) rotate(-${angle}deg)`;
    });

    angle = isAvatarsCountOdd ? angleInterval : angleInterval / 2;
    rightAvatars.forEach((el, index) => {
      if (index > 0) angle += angleInterval;
      (el as HTMLDivElement).style.transform =
        `rotate(${angle}deg) translate(${orbitRadius}px) rotate(-${angle}deg)`;
    });
  }
}

onMounted(() => {
  orderContactsOnOrbit();
});
</script>

<template>
  <div class="orbit-wrapper" :class="{ 'opacity-0': props.fadeOut }" :style="orbitDimension">
    <div ref="orbit" class="orbit">
      <slot />
    </div>
  </div>
</template>

<style>
.orbit-wrapper {
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  border: 1px solid;
  background-image: linear-gradient(180deg, #ffffff -6.6%, rgba(255, 255, 255, 0) 46.31%);
  padding: 1px;
  transition: all 0.5s ease-in;
}

.orbit {
  background-color: var(--Colors-Black-100);
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: grid;
  place-items: center;
  rotate: -90deg;
  position: relative;
}

.orbit > * {
  position: absolute;
  transition: all 0.5s ease-in;
}

.opacity-0 {
  opacity: 0;
}
</style>
