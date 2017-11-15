import manageTranslations, { readMessageFiles, createSingleMessagesFile } from 'react-intl-translations-manager'

const messagesDir = 'extracted-messages'
const translationsDir = 'src/app/l10n/'
const singleMessageFileDir = '.'

manageTranslations({
  messagesDirectory: messagesDir,
  translationsDirectory: translationsDir,
  languages: ['en', 'ru']
})

const extractedMessages = readMessageFiles(messagesDir)

createSingleMessagesFile({
  messages: extractedMessages,
  directory: singleMessageFileDir,
  jsonSpaceIndentation: 4
})
