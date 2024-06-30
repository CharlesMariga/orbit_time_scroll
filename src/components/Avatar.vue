<script setup lang="ts">
import { computed } from 'vue';
import defaultAvatar from '../assets/images/default-avatar.png';

interface AvatarProps {
  width?: number;
  height?: number;
  src?: string;
  alt?: string;
}

const props = withDefaults(defineProps<AvatarProps>(), {
  width: 60,
  height: 60
});

const avatarDimension = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`
}));
</script>

<template>
  <div class="avatar-container" :style="avatarDimension">
    <div class="avatar">
      <img
        class="avatar-img"
        :src="props.src || defaultAvatar"
        :alt="props.alt || 'Avatar image'"
      />
    </div>
  </div>
</template>

<style scoped>
.avatar-container {
  transition: all 1s ease-in-out;
  cursor: pointer;
}

.avatar {
  border: 1px solid;
  padding: 1px;
  border-radius: 50%;
  overflow: hidden;
  background-image: linear-gradient(180deg, #ffffff 0%, #000000 100%);
  transform: rotate(90deg);
  width: 100%;
  height: 100%;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
</style>
