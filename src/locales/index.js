import en from './en.js';
import no from './no.js';
import de from './de.js';

export const LOCALES = {
  en,
  no,
  de,
};

export function resolveLanguageKey(configLanguage, hassLanguage) {
  const preferred = (configLanguage || hassLanguage || 'en').toLowerCase();

  if (preferred === 'no' || preferred.startsWith('nb') || preferred.startsWith('nn') || preferred.startsWith('no-')) {
    return 'no';
  }

  if (preferred === 'de' || preferred.startsWith('de-')) {
    return 'de';
  }

  return 'en';
}
