<template>
  <div>
    <div style="height: 90vh; display: flex; align-items: flex-end; justify-content: center; box-sizing: border-box; padding: 40px;">
      <discord-picker @change="setEmoji" input :value="value" @update:value="value = $event" />
    </div>
  </div>
</template>

<script>
import DiscordPicker from '@/components/DiscordPicker.vue'

export default {
  name: 'App',
  components: {
    DiscordPicker
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    setEmoji (emoji) {
      console.log(emoji)
    }
  }
}
</script>

