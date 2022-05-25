import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import ICU from 'i18next-icu';
import LanguageDetector from 'i18next-browser-languagedetector';

// Whether initialization is complete
let isInitialized = false;
// If initialization is complete, the last error, if any
let initializationError: string | undefined;

type I18nCallback = (err?: string) => void;
// Registered callbacks for when i18n initialization completes
let i18nInitializationCallbacks: I18nCallback[] = [];

i18n.use(resourcesToBackend((language, namespace, callback) => {
        import(`./i18n/translations/${namespace}-${language.substring(0, 2)}.json`)
        .then((resources) => {
            callback(null, resources)
        })
        .catch((error) => {
            callback(error, '')
        })
    }))
    .use(ICU)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(
        {
            debug: process.env.NODE_ENV !== 'production',
            fallbackLng: 'en-US',
            interpolation: {
                // not needed for react as it escapes by default
                escapeValue: false
            },
            load: 'currentOnly',
            detection: {
                // order and from where user language should be detected
                order: ['cookie'],
                lookupCookie: 'hvh-locale'
            }
        },
        (err?: string) => {
            initializationError = err;
            isInitialized = true;
            i18nInitializationCallbacks.forEach(callback => {
              callback(initializationError);
            });
            i18nInitializationCallbacks.length = 0;
        }
    );

i18n.on('languageChanged', lng => {
    // We must manually translate the title of the page, unless this is
    // a Mons app, in which case the title is handled by Seller Central.
    const titleEl = document.querySelector('#app-title') as HTMLElement;
    if (titleEl) {
        titleEl.innerText = i18n.t('sample_app_page_title_text');
    }
});

/**
 * Helper function to run the given callback to report the status of translation initialization.
 *
 * If translation is already initialized the callback will run immediately, otherwise it will run
 * when translation initialization is complete.
 *
 * This helper function fills a gap in the i18next library, where it doesn't report the initialization
 * status through any of its own events or status flags.
 */
const i18nWhenReady = (callback: I18nCallback) => {
    if (isInitialized) {
        callback(initializationError);
    } else {
        i18nInitializationCallbacks.push(callback);
    }
};

export { i18nWhenReady };
export default i18n;
