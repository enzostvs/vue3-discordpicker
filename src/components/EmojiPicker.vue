<template>
  <div class="vue3-emojipicker" style="width: 100%;">
    <div :class="`relative ${input ? 'w-full' : 'max-w-max'} font-sans`">
      <div
        :class="{ 'opacity-0 pointer-events-none': !opened }"
        class="vue3-discord-emojipicker rounded-xl shadow-lg overflow-hidden mx-auto absolute transition duration-200 -top-4 right-0 transform -translate-y-full"
        v-click-outside="close"
      >
        <header class="bg-grey-400 px-5 py-5 shadow-lg relative z-1">
          <p class="font-bold text-white text-sm bg-grey-300 py-1 px-2 rounded-md w-max mb-2 hidden md:block">Émoji</p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center justify-between w-full bg-grey-600 rounded-md overflow-hidden pr-4">
              <input v-model="search" class="bg-grey-600 w-full text-sm py-2 px-3 text-white outline-none" :placeholder="selected && selected.name ? `:${selected.name.replace(/\s/g, '')}:`: placeholder" />
              <img src="https://en-zo.dev/vue-discord-emojipicker/search.svg" class="w-4" />
            </div>
            <div class="py-2 px-2 ml-2 relative z-1" @mouseenter="hovered = true" @mouseleave="hovered = false">
              <img :src="`https://en-zo.dev/vue-discord-emojipicker/variations/variation_${variation}.svg`" class="w-6 relative z-1" />
              <div :class="`bg-white border border-grey-600 bg-grey-500 rounded-lg absolute shadow-md -top-1 left-0 w-full -z-1 pt-10 text-center transform ${hovered ? '' : 'pointer-events-none -translate-y-3 opacity-0'} transition duration-300`">
                <template v-for="emj in 5">
                  <img
                    v-if="variation !== emj - 1"
                    :key="emj"
                    :src="`https://en-zo.dev/vue-discord-emojipicker/variations/variation_${emj - 1}.svg`"
                    class="w-full px-2 py-2 transition duration-200 hover:bg-grey-400 cursor-pointer vue3-discord-emojipicker__pickvariation"
                    @click="setVariation(emj - 1)"
                  />
                </template>
              </div>
            </div>
          </div>
        </header>
        <div class="vue3-discord_emojipicker__container flex">
          <div class="vue3-discord-emojipicker__tabs overflow-auto bg-grey-600 px-2 py-2 text-white h-auto hidden md:block">
            <img
              v-for="(category, c) in categories"
              :key="c"
              :src="`https://en-zo.dev/vue-discord-emojipicker/categories/${category}.svg`"
              :class="{ 'bg-grey-300 bg-opacity-50': c === active }"
              class="px-2 py-2 h-10 w-full transition duration-200 hover:bg-grey-300 hover:bg-opacity-50 rounded-lg cursor-pointer"
              @click="goToCategory(c)"
            />
          </div>
          <div class="bg-grey-400 h-full w-full flex flex-col">
            <div id="vue3-discord_emojipicker" class="overflow-auto relative pb-4 h-full w-full">
              <template v-if="categories.length > 0">
                <template v-for="(category, c) in categories">
                  <div
                    v-if="$data[category] && $data[category].length > 0"
                    :key="`category_${c}`"
                    :class="{ 'mt-2': c > 0 }"
                    class="vue3-discord_emojipicker__observer"
                  >
                    <div class="uppercase px-4 py-2 bg-grey-400 text-xs text-grey-100 font-semibold sticky top-0">
                      {{ category }}
                    </div>
                    <div class="px-4 flex flex-items center justify-start flex-wrap">
                      <div
                        v-for="(emoji, e) in $data[category]"
                        :key="`emoji_${e}`"
                        class="text-2xl cursor-pointer p-1 transition duration-200 hover:bg-grey-300 hover:bg-opacity-50 rounded-md w-8 h-8 flex items-center justify-center"
                        @mouseenter="selected = { ...emoji }"
                        @click="send(emoji, true)"
                      >
                        <template v-if="emoji.variations && variation > 0">
                          {{ emoji.variations[variation] }}
                        </template>
                        <template v-else>
                          {{ emoji.emoji }}
                        </template>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
              <p class="text-grey-100 text-center py-4">No results found :-(</p>
            </div>
            <div v-if="selected" class="bg-grey-700 w-full px-5 py-2 border-t border-grey-600 items-center justify-start hidden md:flex">
              <p class="text-3xl">{{ selected.emoji}}</p>
              <p class="text-white font-semibold text-sm ml-2">
                {{ `:${selected.name.replace(/\s/g, '')}:` }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div :class="{ 'bg-grey-400 rounded-xl justify-between pr-4 flex items-center': input }" class="mt-4 bg-white">
        <Autocomplete v-if="input" :value="value" :placeholder="inputPlaceholder" :opened-picker="opened" :emojis="emojis.list" @change="e => $emit('update:value', e)" @send="send" @close="close" />
        <Emoji @click="opened = !opened" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import clickOutside from '@/directives/click-outside.js'
import emojis from '@/assets/emojis.json'
import Emoji from '@/components/Emoji.vue'
import Autocomplete from '@/components/Autocomplete.vue'

export default defineComponent({
  components: { Emoji, Autocomplete },
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
      default: 'Find the perfect emoji'
    },
    input: {
      type: Boolean,
      default: false
    },
    inputPlaceholder: {
      type: String,
      default: 'Type your message'
    },
    value: {
      type: [String, Number],
      default: null,
    }
  },
  data () {
    return {
      search: null,
      opened: false,
      variation: 0,
      active: 0,
      selected: null,
      emojis,
      hovered: false,
      offsetTop: [],
      ...this.categories.map(cat => this[`$${cat}`] = [])
    }
  },
  created () {
    this.categories.forEach(category => {
      const index = this.emojis.categories.findIndex(cat => cat === category)
      if (index >= 0) {
        this.$data[category] = this.emojis.list.filter(emoji => emoji.category === index)
      }
    })
  },
  mounted () {
    this.createScrollEvent()
    this.eachCategoriesHTML()
  },
  unmounted () {
    const container_emojis = document.getElementById('vue3-discord_emojipicker')
    container_emojis.removeEventListener('scroll', this.scrollEvent)
  },
  watch: {
    search: 'onSearch',
    variation: 'onSearch'
  },
  methods: {
    createScrollEvent () {
      const container_emojis = document.getElementById('vue3-discord_emojipicker')
      if (container_emojis) {
        container_emojis.addEventListener('scroll', this.scrollEvent)
      }
    },
    onSearch () {
      this.categories.forEach(category => {
        const index = this.emojis.categories.findIndex(cat => cat === category)
        if (index >= 0) {
          this.$data[category] = this.emojis.list.filter(emoji => this.search ? emoji.category === index && emoji.name.includes(this.search) : emoji.category === index)
          this.$nextTick(() => {
            this.eachCategoriesHTML()
            this.createScrollEvent()
          }) 
        }
      })
    },
    eachCategoriesHTML () {
      this.offsetTop = []
      const categories = document.querySelectorAll('.vue3-discord_emojipicker__observer')
      categories.forEach(category => {
        this.offsetTop.push(category.offsetTop)
      })
    },
    scrollEvent ({ target }) {
      const { scrollTop } = target
      const item = this.getClosest(scrollTop)
      const index = this.offsetTop.findIndex(o => o === item)
      if (index >= 0) {
        this.active = index
      }
    },
    setVariation (index) {
      this.variation = index
      this.hovered = false
    },
    goToCategory (index) {
      const container_emojis = document.getElementById('vue3-discord_emojipicker')
      const categories = document.querySelectorAll('.vue3-discord_emojipicker__observer')
      container_emojis.scrollTop = categories[index].offsetTop
    },
    getClosest (goal) {
      const closest = this.offsetTop.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
      })
      return closest
    },
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
.vue3-discord_emojipicker__container {
  height: calc(100% - 112px);
}
@media (max-width: 768px) {
  .vue3-discord_emojipicker__container {
    height: 100%;
  }
}
.vue3-discord_emojipicker__container ::-webkit-scrollbar {
  width: 10px;
}
.vue3-discord_emojipicker__container ::-webkit-scrollbar-track {
  background: #2F3136;
  right: 5px;
}
.vue3-discord_emojipicker__container ::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: #212224;
}
#vue3-discord_emojipicker {
  scroll-behavior: smooth;
}
.vue3-discord-emojipicker__trigger {
  background-image: url('https://en-zo.dev/vue-discord-emojipicker/sprite_emojis.png');
  background-position: -22px 0;
  background-size: 242px 88px;
  background-repeat: no-repeat;
  width: 22.5px;
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