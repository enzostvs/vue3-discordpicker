<template>
  <div>
    <div style="height: 90vh; display: flex; align-items: flex-end; justify-content: center; box-sizing: border-box; padding: 40px;">
      <emoji-picker @change="setEmoji" input :value="value" @update:value="value = $event" />
    </div>
  </div>
</template>

<script>
import EmojiPicker from '@/components/EmojiPicker.vue'

export default {
  name: 'App',
  components: {
    EmojiPicker
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

