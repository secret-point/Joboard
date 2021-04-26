import i18n from 'i18next';
import enUS_servicePages from './locales/en-US/service-pages.json';
import enUS_workflowPageTitles from './locales/en-US/workflow-page-titles.json';
import enGB_servicePages from './locales/en-GB/service-pages.json';
import enGB_workflowPageTitles from './locales/en-GB/workflow-page-titles.json';
import deDE_servicePages from './locales/de-DE/service-pages.json';
import deDE_workflowPageTitles from './locales/de-DE/workflow-page-titles.json';

import { initReactI18next } from 'react-i18next';

export const resources = {
  "en-US": {
    "servicePages": enUS_servicePages,
    "workflowPageTitles": enUS_workflowPageTitles,
  },
  "en-GB": {
    "servicePages": enGB_servicePages,
    "workflowPageTitles": enGB_workflowPageTitles,
  },
  "de-DE": {
    "servicePages": deDE_servicePages,
    "workflowPageTitles": deDE_workflowPageTitles,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en-US',
  ns: ['servicePages', 'workflowPageTitles'],
  resources,
});

export default i18n;
