import i18n from 'i18next';
import { app } from 'electron';
import LocaleEnUS from '_src/main/locales/en';
import LocaleZhCN from '_src/main/locales/zh';

const resources = {
  enUS: LocaleEnUS,
  zhCN: LocaleZhCN,
};

i18n.init({
  resources,
  lng: app.getLocale().replace('-', '') || 'zhCN',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
