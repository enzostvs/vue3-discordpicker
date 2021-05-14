<template>
  <div class="vue3-emojipicker" style="width: 100%;">
    <div :class="`relative ${input ? 'w-full' : 'max-w-max'} font-sans`">
      <div
        :class="{ 'opacity-0 pointer-events-none': !opened }"
        class="vue3-discord-emojipicker rounded-xl shadow-lg overflow-hidden mx-auto absolute transition duration-200 -top-4 right-0 transform -translate-y-full"
        v-click-outside="close"
      >
        <header class="bg-grey-400 px-5 pt-5 pb-2 shadow-lg relative z-1 flex items-center">
          <p
            :class="{ 'hover:bg-opacity-100 hover:bg-grey-300 bg-grey-300': active === 'gif' }"
            class="font-bold text-white text-sm py-1 hover:bg-grey-300 hover:bg-opacity-40 px-2 rounded-md cursor-pointer w-max hidden md:block mr-3"
            @click="active = 'gif'"
          >
            GIF
          </p>
          <p
            :class="{ 'hover:bg-opacity-100 hover:bg-grey-300 bg-grey-300': active === 'emoji' }"
            class="font-bold text-white text-sm py-1 hover:bg-grey-300 hover:bg-opacity-40 px-2 rounded-md cursor-pointer w-max hidden md:block"
            @click="active = 'emoji'"
          >
            Émoji
          </p>
        </header>
        <gif-picker v-if="active === 'gif'" :api-key="key" />
        <emoji-picker v-if="active === 'emoji'" :categories="categories" :emojis="emojis" @send="({ emoji, send }) => this.send(emoji, send)" />
      </div>
      <div :class="{ 'bg-grey-400 rounded-xl justify-between pr-4 flex items-center': input }" class="mt-4 bg-white">
        <Autocomplete v-if="input" :value="value" :placeholder="placeholder" :opened-picker="opened" :emojis="emojis.list" @change="e => $emit('update:value', e)" @send="send" @close="close" />
        <div class="flex items-center justify-center">
          <gif-button @click="open" />
          <emoji-button @click="open" class="ml-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import clickOutside from '@/directives/click-outside.js'
import emojis from '@/assets/emojis.json'
import EmojiPicker from '@/components/emojis/EmojiPicker.vue'
import GifPicker from '@/components/gif/GifPicker.vue'
import EmojiButton from '@/components/emojis/Button.vue'
import GifButton from '@/components/gif/Button.vue'
import Autocomplete from '@/components/emojis/Autocomplete.vue'

export default defineComponent({
  components: { EmojiButton, Autocomplete, GifButton, GifPicker, EmojiPicker },
  directives: {
    clickOutside,
  },
  emits: ['update:value', 'change'],
  props: {
    categories: {
      type: Array,
      default () {
        return ['people','animals','foods','travel','activities','objects','symbols','flags']
      }
    },
    placeholder: {
      type: String,
      default: 'Type your message'
    },
    input: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: null,
    }
  },
  data () {
    return {
      opened: false,
      emojis,
      active: 'gif',
      key: 'BEASSSWYZQI2'
    }
  },
  methods: {
    close () {
      if (this.opened) {
        this.opened = false
      }
    },
    send (value, send = false) {
      const emoji = (value.variations && this.variation > 0) ? value.variations[this.variation] : value.emoji
      this.$emit('change', emoji)
      if (this.input && send) {
        this.$emit('update:value', `${this.value} ${emoji}`)
      }
      this.opened = false
    },
    open (item = 'emoji') {
      this.active = item
      this.opened = !this.opened
    }
  }
})
</script>


<style>
.vue3-discord-emojipicker {
  height: 454px;
  width: 444px;
}
@media (max-width: 768px) {
  .vue3-discord-emojipicker {
    width: 300px;
    height: 400px;
  }
}
.vue3-discord-emojipicker__tabs {
  min-width: 50px;
}
.vue3-discord-emojipicker__tabs::-webkit-scrollbar {
  display: none !important;
}
.vue3-discordpicker__container {
  height: calc(100% - 111px);
}
@media (max-width: 768px) {
  .vue3-discordpicker__container {
    height: 100%;
  }
}
.vue3-discordpicker__container ::-webkit-scrollbar {
  width: 10px;
}
.vue3-discordpicker__container ::-webkit-scrollbar-track {
  background: #2F3136;
  right: 5px;
}
.vue3-discordpicker__container ::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: #212224;
}
#vue3-discordpicker {
  scroll-behavior: smooth;
}
.vue3-discord-emojipicker__emojibutton {
  background-image: url('https://en-zo.dev/vue-discord-emojipicker/sprite_emojis.png');
  background-position: -22px 0;
  background-size: 242px 88px;
  background-repeat: no-repeat;
  width: 23px;
  height: 22px;
  display: block;
}

.-z-1 {
  z-index: -1;
}
.z-1 {
  z-index: 1;
}
</style>