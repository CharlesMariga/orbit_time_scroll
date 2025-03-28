<script setup lang="ts">
import { formatLongDateString, timeAgo } from '@/lib/utilts';
import type { LastMessage } from '@/types/contacts';
import { ref } from 'vue';

interface MessageProps {
  lastMessage: LastMessage;
  date: string;
}

const props = defineProps<MessageProps>();

const showFullMessage = ref(false);

function toggleMessage() {
  showFullMessage.value ? (showFullMessage.value = false) : (showFullMessage.value = true);
}
</script>

<template>
  <div class="message">
    <div class="message__header">
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 7.19629C3 6.66586 3.21071 6.15715 3.58579 5.78208C3.96086 5.407 4.46957 5.19629 5 5.19629H19C19.5304 5.19629 20.0391 5.407 20.4142 5.78208C20.7893 6.15715 21 6.66586 21 7.19629M3 7.19629V17.1963C3 17.7267 3.21071 18.2354 3.58579 18.6105C3.96086 18.9856 4.46957 19.1963 5 19.1963H19C19.5304 19.1963 20.0391 18.9856 20.4142 18.6105C20.7893 18.2354 21 17.7267 21 17.1963V7.19629M3 7.19629L12 13.1963L21 7.19629"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span>Reply from Emery Wells</span>
    </div>
    <div class="message__content">
      <div class="message__date">
        <time class="message__time">{{ formatLongDateString(props.date) }}</time>
        <span class="message__duration">{{ timeAgo(props.date) }}</span>
      </div>
      <div>
        <h3 class="message__heading">{{ props.lastMessage.message_head }}</h3>
        <p class="message__text" :class="{ 'hide-text': !showFullMessage }">
          {{ props.lastMessage.message }}
        </p>
      </div>
      <button class="messaeg__more-btn" @click="toggleMessage">
        <span>{{ showFullMessage ? 'Less' : 'More' }}</span>
        <svg
          :style="{
            transform: `rotate(${showFullMessage ? '180' : '0'}deg)`,
            transition: 'all .25s ease-in'
          }"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9.19629L12 15.1963L18 9.19629"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.message {
  border-radius: 8px;
  overflow: hidden;
}

.message__header {
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  background-image: linear-gradient(
      0deg,
      var(--Syntax-Transparent-background, rgba(255, 255, 255, 0.05)),
      var(--Syntax-Transparent-background, rgba(255, 255, 255, 0.05))
    ),
    linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%),
    linear-gradient(
      0deg,
      var(--Colors-Black-tansparent-65, rgba(10, 10, 10, 0.65)),
      var(--Colors-Black-tansparent-65, rgba(10, 10, 10, 0.65))
    );
}

.message__content {
  padding: 10px;
  display: grid;
  gap: 10px;
  background-color: var(--Colors-Black-100);
}

.message__date {
  color: #929292;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message__heading {
  font-size: 16px;
  font-weight: 700;
  color: white;
}

.message__text {
  font-size: 16px;
  color: white;
  font-weight: 300;
  margin-top: 5px;
  width: 462px;
}

.hide-text {
  text-overflow: ellipsis;
  text-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
}

.messaeg__more-btn {
  border: none;
  width: auto;
  background: none;
  color: white;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  cursor: pointer;
}

.rotate-180 {
  transform: rotate(180deb);
}
</style>
