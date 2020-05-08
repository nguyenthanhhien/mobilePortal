import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import enTranslations from "./en.json";

const resources = {
  en: { messages: enTranslations },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    react: {
      wait: true,
    },
    resources: resources,
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    ns: ['messages'],
    defaultNS: 'messages',
    fallbackNS: [],
  });


export default i18n;
