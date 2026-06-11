import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from '@/App.vue'
//import router from '@/router'
import messages from './config/messages'
import { createPinia, setMapStoreSuffix } from 'pinia'
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackWarn: false,
  messages
})

// Expose the i18n instance (has .global.t) for the standalone rank-tree.js script
;(window as any).__i18n = i18n

const app = createApp(App)

setMapStoreSuffix('')
const pinia = createPinia()
app.use(pinia)
declare module 'pinia' {
  export interface MapStoresCustomization {
    // set it to the same value as above
    suffix: ''
  }
}

app.use(i18n)

import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

const savedTheme = localStorage.getItem('parasite-theme')
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: savedTheme === 'light' ? 'light' : 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          'surface-bright': '#FFFFFF',
          'surface-variant': '#E0E0E0',
          'on-surface-variant': '#424242',
          primary: '#B71C1C',
          'primary-darken-1': '#7f0000',
          secondary: '#D32F2F',
          'secondary-darken-1': '#B71C1C',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      },
      dark: {
        dark: true,
        colors: {
          background: '#0a0a0a',
          surface: '#1a1a1a',
          'surface-bright': '#2a2a2a',
          'surface-variant': '#333333',
          'on-surface-variant': '#e0e0e0',
          primary: '#B71C1C',
          'primary-darken-1': '#7f0000',
          secondary: '#D32F2F',
          'secondary-darken-1': '#B71C1C',
          error: '#CF6679',
          info: '#78909C',
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      }
    }
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
})
app.use(vuetify)

app.mount('#app')
