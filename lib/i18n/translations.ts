// Centralized translations - imports from per-language locale files
import en from './locales/en'
import type { TranslationType } from './locales/en'
import de from './locales/de'
import fr from './locales/fr'
import es from './locales/es'
import it from './locales/it'
import nl from './locales/nl'
import pt from './locales/pt'
import pl from './locales/pl'
import sv from './locales/sv'
import da from './locales/da'
import no from './locales/no'
import fi from './locales/fi'
import cs from './locales/cs'
import hu from './locales/hu'
import ro from './locales/ro'
import el from './locales/el'
import hr from './locales/hr'
import bg from './locales/bg'
import sk from './locales/sk'
import sl from './locales/sl'
import et from './locales/et'
import lv from './locales/lv'
import lt from './locales/lt'
import tr from './locales/tr'
import ru from './locales/ru'
import uk from './locales/uk'

export const translations: Record<string, TranslationType> = {
  en, de, fr, es, it, nl, pt, pl, sv, da, no, fi, cs, hu, ro, el, hr, bg, sk, sl, et, lv, lt, tr, ru, uk,
}

export type Language = keyof typeof translations
export type TranslationKeys = TranslationType
