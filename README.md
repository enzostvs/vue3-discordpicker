# vue3-discord-picker
____

![VueJS](https://img.shields.io/badge/vuejs-%2335495e.svg?&style=for-the-badge&logo=vue.js&logoColor=%234FC08D)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?&style=for-the-badge&logo=tailwind-css&logoColor=white)

[![NPM](https://nodei.co/npm/vue3-discordpicker.png)](https://nodei.co/npm/vue3-discordpicker/)

A new emoji / gif picker for your app !
Based on discord.

This components is available only in vue3.

🚧 Rework in typescript and composition-api soon.

### Example
- [Live demo 🎉](https://en-zo.dev/vue3-discordpicker)
- [Code demo 🎈](https://github.com/enzostvs/vue3-discordpicker/blob/master/examples/Index.vue)

### Install
```js
npm install vue3-discordpicker
```

### Global
```js
import Vue from 'vue'
import DiscordPicker from 'vue3-discordpicker'

Vue.use(DiscordPicker, /* { default options with global component } */)
```

### Local registration
```js
import DiscordPicker from 'vue3-discordpicker'

export default {
  components: {
    DiscordPicker
  }
}
```

____

## Props
| Name   |      Type      |  Default | Description |
|----------|:-------------:|:------:|------:|
| input |    `Boolean`   |   false |  Load input w/ autocomplete |
| value | `String`, `Number` |  null | v-model to input value |
| categories | `Array` |   true | Display the mask on first load |
| gifFormat | `String` |  | Return gif link with markdown format or html format (default: nothing) |
| apiKey | `String` |  | API_KEY tenor.com (free, register here: https://tenor.com/gifapi) (if no key: gif not appear) |
| showUpload | `Boolean` |  | Display upload icon at left (with emit method) |
| showEmoji | `Boolean` |  | Display emoji icon |
| sources | `Object` |  | Set new source url for all image |

### Sources props
"search": `String`
"gif": `String`
"emoji": `String`
"category": `String` (add %REPLACE% in your URL to change with slug, example: `https://en-zo.dev/vue-discord-emojipicker/categories/%REPLACE%.svg` transform into https://en-zo.dev/vue-discord-emojipicker/categories/animals.svg`)
"variation": `String` (same at category, example: `https://en-zo.dev/vue-discord-emojipicker/variations/variation_%REPLACE%.svg` transform into `https://en-zo.dev/vue-discord-emojipicker/variations/variation_0.svg` (0 - 4))

### Categories
All categories list:
`['people', 'animals', 'foods', 'travel', 'activities', 'objects', 'symbols', 'flags']`

