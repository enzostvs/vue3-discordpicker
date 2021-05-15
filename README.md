# vue3-discord-picker
____

![VueJS](https://img.shields.io/badge/vuejs-%2335495e.svg?&style=for-the-badge&logo=vue.js&logoColor=%234FC08D)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?&style=for-the-badge&logo=tailwind-css&logoColor=white)

[![NPM](https://nodei.co/npm/vue3-discordpicker.png)](https://nodei.co/npm/vue3-discordpicker/)

A new emoji / gif picker for your app !
Based on discord.

This components is available only in vue3.

### Exemple
- [Live demo 🎉](https://en-zo.dev/vue3-discordpicker)
- [Code demo 🎈](https://github.com/enzostvs/vue3-discordpicker/blob/master/examples/Index.vue)

### Install
```js
npm install vue3-discordpicker
```

### Global
```js
import Vue from 'vue'
import EmojiPicker from 'vue3-discordpicker'

Vue.use(EmojiPicker, /* { default options with global component } */)
```

### Local registration
```js
import EmojiPicker from 'vue3-discordpicker'

export default {
  components: {
    EmojiPicker
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
| key | `String` |  | API_KEY tenor.com (free, register here: https://tenor.com/gifapi) |
