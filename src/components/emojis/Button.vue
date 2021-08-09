<script>
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['click'],
  props: {
    sources: {
      type: Object,
      required: true
    }
  },
  methods: {
    newEmoji ({ target }) {
      const column = (Math.floor(Math.random() * 11)) * -22
      const row = (Math.floor(Math.random() * 4)) * -22

      target.style.backgroundPosition = `${column}px ${row}px`
    }
  }
})
</script>

<template>
  <div :style="`background-image: url(${sources.emoji});`" class="vue3-discord-emojipicker__emojibutton filter grayscale hover:filter-none transform transition duration-200 cursor-pointer hover:scale-110" @mouseleave="newEmoji" @click="$emit('click', 'emoji')" />
</template>