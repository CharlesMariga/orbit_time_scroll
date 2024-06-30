<script setup lang="ts">
import type { Contact } from '@/types/contacts';
import Avatar from './Avatar.vue';
import { computed, ref } from 'vue';
import connection1 from '../assets/images/connection-1.jpeg';
import connection2 from '../assets/images/connection-2.jpeg';
import connection3 from '../assets/images/connection-3.png';
import connection4 from '../assets/images/connection-4.png';
import orbiterLogo from '../assets/images/logo_dark256.png';
import Messages from './Messages/Messages.vue';
import Message from './Messages/Message.vue';

interface ContactCardDetailsProps {
  details: Contact;
}

const props = defineProps<ContactCardDetailsProps>();

const contactCard = ref<HTMLDivElement | null>(null);
const showDetails = ref(false);
const showMessages = ref(false);
const topPosition = ref(0);
const leftPosition = ref(0);
const cardIsHoveredOn = ref(false);

const contactCardPosition = computed(() => ({
  left: `${leftPosition.value}px`,
  top: `${topPosition.value}px`
}));

function showContactDetails() {
  showDetails.value = true;

  setTimeout(() => {
    showMessages.value = true;
  }, 500);

  topPosition.value = contactCard.value?.getBoundingClientRect().top || 0;
  leftPosition.value = contactCard.value?.getBoundingClientRect().left || 0;

  const distanceFromRight = window.innerWidth - leftPosition.value;
  const distanceFromBottom = window.innerHeight - topPosition.value;

  // Check if the width is greater than the distanceFromRight
  if (distanceFromRight < 580) {
    leftPosition.value = window.innerWidth - 580;
  }

  // Check if the height is greater than the distanceFromBottom
  if (distanceFromBottom < 350) {
    topPosition.value = window.innerHeight - 350;
  }
}

function hideContactDetails() {
  setTimeout(() => {
    if (!cardIsHoveredOn.value) {
      showDetails.value = false;
      showMessages.value = false;
    }
  }, 100);
}

function cardHoveredOn() {
  cardIsHoveredOn.value = true;
}

function mouseHoveredOff() {
  cardIsHoveredOn.value = false;
  hideContactDetails();
}

window.addEventListener('wheel', () => {
  mouseHoveredOff();
});
</script>

<template>
  <div
    ref="contactCard"
    class="contact"
    @mouseover="showContactDetails"
    @mouseleave="hideContactDetails"
  >
    <!-- Image displayed on orbit -->
    <Avatar :src="props.details.img" :alt="props.details.name" />

    <!-- Content shown on hover -->
    <Teleport to="#app">
      <Transition name="fade">
        <div
          v-if="showDetails"
          class="contact-card"
          :style="contactCardPosition"
          @mouseover="cardHoveredOn"
          @mouseleave="mouseHoveredOff"
        >
          <div class="contact-card__bg">
            <div class="contact-card__wrapper">
              <div class="contact-card__content">
                <div class="contact-card__header">
                  <Avatar
                    class="contact-card__avatar"
                    :src="props.details.img"
                    :width="100"
                    :height="100"
                    :alt="props.details.name"
                  />
                  <div class="contact-card-details">
                    <h3 class="contact-card-details__heading">{{ props.details.name }}</h3>
                    <p class="contact-card-details__position">{{ props.details.position }}</p>
                    <p class="contact-card-details__city">{{ props.details.city }}</p>
                    <div class="contact-card-details__connections">
                      <div class="contact-card-detials__images">
                        <img
                          class="contact-card-detials__img"
                          :src="connection1"
                          alt="Connection 1"
                        />
                        <img
                          class="contact-card-detials__img"
                          :src="connection2"
                          alt="Connection 2"
                        />
                        <img
                          class="contact-card-detials__img"
                          :src="connection3"
                          alt="Connection 3"
                        />
                        <img
                          class="contact-card-detials__img"
                          :src="connection4"
                          alt="Connection 4"
                        />
                      </div>
                      <p class="contact-card-details__description">
                        Jason Diamond, John Eremic, and 281 other mutual connections
                      </p>
                    </div>
                  </div>

                  <!-- Orbiter icon -->
                  <div class="contact-orbiter-icon">
                    <div class="contact-orbiter-icon__border">
                      <img
                        class="contact-orbiter-icon__logo"
                        :src="orbiterLogo"
                        alt="Orbiter logo"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Messages -->
              <Transition name="fade">
                <Messages v-if="showMessages">
                  <Message :last-message="props.details._orbits_last_message" />
                </Messages>
              </Transition>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="css" scoped>
.contact:hover .contact-card {
  display: block;
}

.contact-card {
  position: absolute;
  padding: 1px;
  background-image: linear-gradient(180deg, #b5b5b5 0%, #2c2c2c 100%);
  border-radius: 8px;
  transform-origin: top left;
  z-index: 500;
}

.contact-card__bg {
  background-image: linear-gradient(
      0deg,
      var(--Syntax-Transparent-background),
      var(--Syntax-Transparent-background)
    ),
    linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%),
    linear-gradient(0deg, var(--Colors-Black-tansparent-65), var(--Colors-Black-tansparent-65));

  border-radius: 8px;
}

.contact-card__wrapper {
  background-image: linear-gradient(
      0deg,
      var(--Colors-Black-tansparent-85),
      var(--Colors-Black-tansparent-85)
    ),
    linear-gradient(0deg, var(--Colors-White-transparent-5), var(--Colors-White-transparent-5));
  border-radius: 8px;
}

.contact-card__content {
  border-radius: 8px 8px 0px 0px;
  padding: 10px;
  position: static;
  background-color: var(--Colors-Black-100);
}

.contact-card__header {
  display: flex;
  gap: 15px;
}

.contact-card__avatar {
  transform: rotate(-90deg);
}

.contact-card-details {
  width: 302px;
  color: white;
  display: grid;
  gap: 5px;
}

.contact-card-details__heading {
  font-weight: 700;
  font-size: 16px;
}

.contact-card-details__position {
  font-weight: 400;
  font-size: 12px;
}

.contact-card-details__city {
  font-weight: 400;
  font-size: 12px;
  color: #cecece;
}

.contact-card-details__connections {
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-card-detials__images {
  display: flex;
}

.contact-card-detials__img {
  width: 20px;
  height: 20px;
  display: block;
  border: 1px solid #929292;
  border-radius: 50%;
}

.contact-card-detials__img:not(:first-child) {
  margin-left: -4px;
}

.contact-card-details__description {
  font-weight: 400;
  font-size: 12px;
}

.contact-orbiter-icon {
  margin-left: 50px;
}

.contact-orbiter-icon__border {
  width: 50px;
  height: 50px;
  padding: 1px;
  background-image: linear-gradient(180deg, #b5b5b5 0%, #2c2c2c 100%);
  border-radius: 4px;
}

.contact-orbiter-icon__logo {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
}
</style>
