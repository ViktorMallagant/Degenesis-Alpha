import { createI18n } from 'vue-i18n'
import messages from './config/messages'

const storedLocale = localStorage.getItem('locale')
const initialLocale = storedLocale || 'en'

if (!storedLocale) {
  localStorage.setItem('locale', 'en')
}

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackWarn: false,
  messages
})
