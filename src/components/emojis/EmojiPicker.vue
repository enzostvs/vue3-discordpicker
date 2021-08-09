<template>
  <div style="height: calc(100% - 10px)">
    <header class="bg-grey-400 px-5 pt-2 pb-5 shadow-lg relative z-1">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between w-full bg-grey-600 rounded-md overflow-hidden pr-4">
          <input v-model="search" class="bg-grey-600 w-full text-sm py-2 px-3 text-white outline-none" :placeholder="selected && selected.name ? `:${selected.name.replace(/\s/g, '')}:`: 'Find the perfect emoji'" />
          <img :src="sources.search" class="w-4" />
        </div>
        <div class="py-2 px-2 ml-2 relative z-1" @mouseenter="hovered = true" @mouseleave="hovered = false">
          <img :src="formatUrlSources(variation, sources.variation)" class="w-6 relative z-1" />
          <div :class="`bg-white border border-grey-600 bg-grey-500 rounded-lg absolute shadow-md -top-1 left-0 w-full -z-1 pt-10 text-center transform ${hovered ? '' : 'pointer-events-none -translate-y-3 opacity-0'} transition duration-300`">
            <template v-for="emj in 5">
              <img
                v-if="variation !== emj - 1"
                :key="emj"
                :src="formatUrlSources(emj - 1, sources.variation)"
                class="w-full px-2 py-2 transition duration-200 hover:bg-grey-400 cursor-pointer vue3-discord-emojipicker__pickvariation"
                @click="setVariation(emj - 1)"
              />
            </template>
          </div>
        </div>
      </div>
    </header>
    <div class="vue3-discordpicker__container flex">
      <div class="vue3-discord-emojipicker__tabs overflow-auto bg-grey-600 px-2 py-2 text-white h-auto hidden md:block">
        <img
          v-for="(category, c) in categories"
          :key="c"
          :src="formatUrlSources(category, sources.category)"
          :class="{ 'bg-grey-300 bg-opacity-50': c === active }"
          class="px-2 py-2 h-9 mb-2 w-full transition duration-200 hover:bg-grey-300 hover:bg-opacity-50 rounded-lg cursor-pointer"
          @click="goToCategory(c)"
        />
      </div>
      <div class="bg-grey-400 h-full w-full flex flex-col">
        <div id="vue3-discordpicker" class="overflow-auto relative pb-4 h-full w-full">
          <template v-if="categories.length > 0">
            <template v-for="(category, c) in categories">
              <div
                v-if="$data[category] && $data[category].length > 0"
                :key="`category_${c}`"
                :class="{ 'mt-2': c > 0 }"
                class="vue3-discordpicker__observer"
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
                    @click="$emit('send', { emoji, send: true })"
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
          <p v-else class="text-grey-100 text-center py-4">No results found :-(</p>
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
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    emojis: {
      type: Object,
      required: true
    },
    sources: {
      type: Object,
      required: true
    }
  },
  emit: ['send'],
  data () {
    return {
      hovered: false,
      search: null,
      variation: 0,
      active: 0,
      selected: null,
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
  // unmounted () {
  //   const container_emojis = document.getElementById('vue3-discordpicker')
  //   container_emojis.removeEventListener('scroll', this.scrollEvent)
  // },
  watch: {
    search: 'onSearch',
    variation: 'onSearch'
  },
  methods: {
    createScrollEvent () {
      const container_emojis = document.getElementById('vue3-discordpicker')
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
      const categories = document.querySelectorAll('.vue3-discordpicker__observer')
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
      const container_emojis = document.getElementById('vue3-discordpicker')
      const categories = document.querySelectorAll('.vue3-discordpicker__observer')
      container_emojis.scrollTop = categories[index].offsetTop
    },
    getClosest (goal) {
      const closest = this.offsetTop.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
      })
      return closest
    },
    formatUrlSources (slug, url) {
      return url.replace('%REPLACE%', slug)
    }
  }
}
</script>