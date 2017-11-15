// import * as Mobx from 'mobx'
import * as ReactIntl from 'react-intl'
import * as _ from 'lodash'

export type Strings = { [key: string]: string }

const TranslationsBridge: {
  translations: { [key: string]: Strings }
  messages: ReactIntl.Messages
  hasTranslationsLoaded: boolean
  defineMessages: (messages: ReactIntl.Messages) => ReactIntl.Messages
  loadTranslations: (translations: { [key: string]: Strings }) => void
  locales: string[]
} = {
  translations: {},
  messages: {},
  hasTranslationsLoaded: false,
  loadTranslations: translations => {
    _.assign(TranslationsBridge.translations, translations)
    TranslationsBridge.hasTranslationsLoaded = true
    checkTranslationsAvailable(TranslationsBridge.translations, TranslationsBridge.messages)
  },
  defineMessages: messages => {
    _.assign(TranslationsBridge.messages, messages)
    if (TranslationsBridge.hasTranslationsLoaded) checkTranslationsAvailable(TranslationsBridge.translations, messages)
    else console.log(`Translations hasn't loaded yet`)
    return ReactIntl.defineMessages(messages)
  },
  get locales() {
    return Object.keys(this.translations).map(key => key)
  }
}

const checkTranslationsAvailable = async (translations: { [key: string]: Strings }, messages: ReactIntl.Messages) => {
  Object.keys(translations).map(locale => {
    const localeStrings = translations[locale]
    Object.keys(messages).map(messageKey => {
      const message = messages[messageKey]
      if (!localeStrings[message.id]) {
        console.log(`Didn't find ${locale.toUpperCase()} translation for ${messageKey}(${message.id})`)
      }
    })
  })
}

export default TranslationsBridge
