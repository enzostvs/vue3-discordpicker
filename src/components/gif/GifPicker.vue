<template>
  <div style="height: calc(100% - 9px)">
    <header class="bg-grey-400 px-5 pt-2 pb-5 shadow-lg relative z-1">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between w-full bg-grey-600 rounded-md overflow-hidden pr-4">
          <input v-model="search" class="bg-grey-600 w-full text-sm py-2 px-3 text-white outline-none" placeholder="Find the perfect gif" />
          <img :src="sources.search" class="w-4" />
        </div>
      </div>
    </header>
    <div class="vue3-discordpicker__container flex">
      <div class="bg-grey-400 h-full w-full flex flex-col">
        <div class="overflow-auto relative p-4 h-full w-full">
          <div v-if="search !== '' && results && results.length" class="grid grid-cols-2 grid-flow-row auto-rows-auto gap-4">
            <div
              v-for="(result, r) in results"
              :key="r"
              class="h-28 rounded-lg bg-cover text-white flex items-center justify-center relative font-semibold font-xl border-2 border-transparent hover:border-blue transition duration-300 cursor-pointer group z-1 overflow-hidden"
              :style="`background-image: url(${renderSmallGif(result.media[0])})`"
              @click="send(result.media[0])"
            />
          </div>
          <div v-else-if="tags && tags.length" class="grid grid-cols-2 grid-flow-row auto-rows-auto	gap-4">
            <div
              v-for="(tag, t) in tags"
              :key="t"
              class="vue3-discord-emojipicker__gifimage h-28 rounded-lg bg-cover text-white flex items-center justify-center relative font-semibold font-xl border-2 border-transparent hover:border-blue transition duration-300 cursor-pointer group z-1 overflow-hidden"
              :style="`background-image: url(${tag.image})`"
              @click="search = tag.searchterm"
            >
              <div class="vue3-discord-emojipicker__gifimage h-full absolute top-0 left-0 bg-black opacity-0 group-hover:opacity-70 transition duration-300 w-full -z-1">
              </div>
              {{ tag.searchterm }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apiKey: {
      type: String,
      required: true
    },
    sources: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      search: null,
      results: [],
      tags: []
    }
  },
  mounted () {
    fetch(`https://g.tenor.com/v1/categories?key=${this.apiKey}`)
    .then(res => res.json())
    .then(({ tags }) => this.tags = tags)
  },
  watch: {
    search: 'onSearch',
  },
  methods: {
    onSearch (key) {
      this.get(`search?q=${key}&limit=32`, 'results')
    },
    renderSmallGif ({ tinygif }) {
      return tinygif.url
    },
    renderHugeGif ({ mediumgif }) {
      return mediumgif.url
    },
    get (query, key) {
      fetch(`https://g.tenor.com/v1/${query}&key=${this.apiKey}`)
      .then(res => res.json())
      .then(data => this[key] = data[key])
    },
    send (url) {
      this.$emit('send', { url: this.renderHugeGif(url), send: true, type: 'gif' })
      this.search = null
    }
  }
}
</script>