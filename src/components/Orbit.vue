<script setup lang="ts">
import { formatShortDateString } from '@/lib/utilts';
import { computed, onMounted, ref, watch } from 'vue';

interface OrbitProps {
  dimensions: number;
  contactsCount?: number;
  fadeOut?: boolean;
  isOuterOrbit: boolean;
  date: string;
}

const props = defineProps<OrbitProps>();
const orbit = ref<HTMLDivElement | null>(null);

const orbitDimension = computed(() => ({
  width: `${props.dimensions}px`,
  height: `${props.dimensions}px`
}));

const orbitChildrenLength = computed(() => orbit.value?.children.length || 0);

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
    if (avatars.length === 1 && !props.isOuterOrbit) {
      (avatars[0] as HTMLDivElement).style.transform =
        `rotate(0deg) translate(${orbitRadius}px) rotate(-0deg)`;
      return;
    }

    const displayAngle = 160;
    let itemsOnOrbitCount = avatars.length;
    if (props.isOuterOrbit) itemsOnOrbitCount += 2;

    const angleInterval =
      displayAngle / itemsOnOrbitCount > 35 ? 35 : displayAngle / itemsOnOrbitCount;
    const avatarsArr = Array.from(avatars);
    const isAvatarsCountOdd = avatars.length % 2 !== 0;

    // 1) Divide
    const leftCount = Math.floor(avatars.length / 2);
    let leftAvatars = avatarsArr.slice(0, leftCount);
    let rightAvatars = avatarsArr.slice(leftCount);

    if (isAvatarsCountOdd && !props.isOuterOrbit) {
      rightAvatars = avatarsArr.slice(leftCount + 1);
      (avatars[leftCount] as HTMLDListElement).style.transform =
        `rotate(0deg) translate(${orbitRadius}px) rotate(-0deg)`;
    }

    // 2) Loop throught the left array
    let angle = isAvatarsCountOdd ? 360 - angleInterval : 360 - angleInterval / 2;
    leftAvatars.reverse().forEach((el, index) => {
      if (index === 0 && props.isOuterOrbit) angle -= angleInterval / 2;
      else if (index > 0) angle -= angleInterval;
      (el as HTMLDivElement).style.transform =
        `rotate(${angle}deg) translate(${orbitRadius}px) rotate(-${angle}deg)`;
    });

    // 3) Loop throught the right array
    angle = isAvatarsCountOdd ? angleInterval : angleInterval / 2;
    rightAvatars.forEach((el, index) => {
      if (index === 0 && props.isOuterOrbit) angle += angleInterval / 2;
      else if (index > 0) angle += angleInterval;
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
  <div
    class="orbit-wrapper"
    :class="{ hide: props.fadeOut || props.dimensions === 0 }"
    :style="orbitDimension"
  >
    <Transition name="fade-date">
      <div v-if="props.isOuterOrbit && orbitChildrenLength <= 20" class="orbit-date-container">
        <div class="orbit-date">{{ formatShortDateString(props.date) }}</div>
      </div>
    </Transition>
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
  will-change: transform;
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
  transition: all 0.5s ease-in 0.015s;
  will-change: transform;
}

.hide {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.orbit-date-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
}

.orbit-date {
  color: white;
  z-index: 10;
  background: var(--Colors-Black-100);
  padding: 0 4px;
  font-size: 16px;
  color: rgba(146, 146, 146, 1);
}

.fade-date-enter-active,
.fade-date-leave-active {
  transition: opacity 0.5s ease 0.3s;
}

.fade-date-enter-from,
.fade-date-leave-to {
  opacity: 0;
}
</style>
