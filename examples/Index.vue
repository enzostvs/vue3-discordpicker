<template>
  <discord-picker
    input
    :value="value"
    gif-format="md"
    @update:value="value = $event"
    @emoji="setEmoji"
    @gif="setGif"
  />
</template>

<script>
import DiscordPicker from 'vue3-discordpicker'

export default {
  components: { DiscordPicker },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    setEmoji (emoji) {
      console.log(emoji)
    },
    setGif (gif) {
      console.log(gif)
    }
  }
}
</script>