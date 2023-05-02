import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './locales/ru/translations.json';
import en from './locales/en/translations.json'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ru',
    resources: {
      en: {
        translations: en 
      },
      ru: {
        translations: ru
      }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['en', 'ru'];

export default i18n;
