import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies

import en from "../locale/en/translation.json";
import ar from "../locale/ar/translation.json";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

// Get language from cookie, default to 'en' if not found
const defaultLanguage = Cookies.get('i18next') || 'en';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    resources,
    lng: defaultLanguage, // Use the language from the cookie
    fallbackLng: 'en',
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "sessionStorage", "navigator", "path", "subdomain"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}translation.json',
    }
  });

i18n.on('languageChanged', (lng) => {
  document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
  Cookies.set('i18next', lng); // Save the selected language in a cookie
});

export default i18n;
