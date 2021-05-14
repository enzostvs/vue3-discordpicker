
<script>
import { defineComponent } from 'vue'

import clickOutside from '@/directives/click-outside.js'
export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    placeholder: {
      type: String
    },
    emojis: {
      type: Array,
      required: true
    },
    openedPicker: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'change', 'send'],
  directives: {
    clickOutside,
  },
  data () {
    return {
      autocomplete: {
        show: false,
        results: []
      },
      content: this.value || null,
    }
  },
  watch: {
    value (value) {
      this.content = value
    },
    openedPicker (value) {
      if (value) {
        this.autocomplete.show = false
      }
    }
  },
  methods: {
    onClose () {
      if (this.autocomplete.show) {
        this.autocomplete.show = false
      }
    },
    onComplete ({ target }) {
      const { value } = target
      const lastWord = value.split(' ').pop().toLowerCase()
      if (lastWord.startsWith(':') && lastWord.length > 3) {
        this.autocomplete = {
          results: this.emojis.filter(({ name }) => name.replace(/\s/g, '').toLowerCase().includes(lastWord.replace(/:/g, ''))),
          show: true
        }
        this.$emit('close')
      } else {
        this.autocomplete = {
          results: [],
          show: false
        }
      }
      this.$emit('change', value)
    },
    onClick (emoji) {
      let value = this.content
      value = value.split(' ')
      value.pop()
      this.$emit('change', `${value.join(' ')} ${emoji.emoji}`)
      this.$emit('send', emoji)
      this.autocomplete.show = false
      this.$refs.input.focus()
    },
  }
})
</script>

<template>
  <div class="w-full">
    <div v-click-outside="onClose" :class="{ 'opacity-0 pointer-events-none': !autocomplete.show }" class="vue3-discord-emojipicker__autocomplete w-full absolute transform -translate-y-full left-0 -top-4 transition duration-200">
      <div class="w-full bg-grey-400 py-3 rounded-xl shadow-xl">
        <p class="text-grey-100 font-semibold uppercase text-sm px-5 mb-3">{{ autocomplete.results.length }} results</p>
        <ul class="px-3">
          <li v-for="(result, r) in autocomplete.results.slice(0, 8)" :key="r" class="flex items-center justify-start hover:bg-grey-300 hover:bg-opacity-60 rounded-md px-2 py-1 cursor-pointer"  @click="onClick(result)">
            <p class="text-lg">{{ result.emoji}}</p>
            <p class="text-white font-semibold text-sm ml-2">
              {{ `:${result.name.replace(/\s/g, '')}:` }}
            </p>
          </li>
        </ul>
      </div> 
    </div>
    <div class="w-full relative">
      <input ref="input" v-model="content" type="text" class="w-full vue3-discord-emojipicker__input bg-transparent px-5 py-3 text-white outline-none text-base placeholder-grey-200" :placeholder="placeholder" @input="onComplete">
    </div>
  </div>
</template>