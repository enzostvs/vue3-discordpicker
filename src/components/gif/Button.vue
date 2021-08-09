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
  <img :src="sources.gif" alt="Gif button" width="10" height="10" class="vue3-discord-emojipicker__gifbutton w-6 transition duration-200 filter hover:brightness-150 cursor-pointer transform hover:scale-110" @click="$emit('click', 'gif')">
</template>