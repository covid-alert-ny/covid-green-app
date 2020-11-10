import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-community/async-storage';
import {
  fallback,
  defaultNamespace,
  namespaces,
  supportedLocales
} from './common';
import {format as F} from 'date-fns';
import {AsyncStorageKeys} from 'providers/context';

export const getDeviceLanguage = () => {
  const lang = Localization.locale.split('-')[0].replace('-', '');
  return Object.keys(supportedLocales).includes(lang) ? lang : fallback;
};

export const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lang: string) => void) => {
    const storedLanguage = await AsyncStorage.getItem(
      AsyncStorageKeys.language
    );
    callback(storedLanguage || getDeviceLanguage());
  },
  init: () => {},
  cacheUserLanguage: () => {}
} as const;

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: fallback,
    resources: supportedLocales,
    ns: namespaces,
    defaultNS: defaultNamespace,
    debug: false,
    interpolation: {
      escapeValue: false,
      format: (value: Date | string, format: string | undefined): string => {
        if (value instanceof Date && format) {
          return F(value, format);
        } else {
          return value.toString();
        }
      }
    }
  });

export default i18n;
