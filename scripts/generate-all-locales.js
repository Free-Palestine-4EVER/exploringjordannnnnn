#!/usr/bin/env node
/**
 * Generates complete locale files with all new translation keys.
 * Reads existing translations from each locale file and adds missing ones.
 */

const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'lib', 'i18n', 'locales');

// New keys that need to be added per section, with translations for each language
// We group by the NEW sections/keys that didn't exist before

const newKeys = {
  // ---- common.whatsappUs ----
  "common.whatsappUs": {
    de: "WhatsApp", fr: "WhatsApp", es: "WhatsApp", it: "WhatsApp", nl: "WhatsApp",
    pt: "WhatsApp", pl: "WhatsApp", sv: "WhatsApp", da: "WhatsApp", no: "WhatsApp",
    fi: "WhatsApp", cs: "WhatsApp", hu: "WhatsApp", ro: "WhatsApp", el: "WhatsApp",
    hr: "WhatsApp", bg: "WhatsApp", sk: "WhatsApp", sl: "WhatsApp", et: "WhatsApp",
    lv: "WhatsApp", lt: "WhatsApp", tr: "WhatsApp", ru: "WhatsApp", uk: "WhatsApp",
  },

  // ---- aboutPage new keys ----
  "aboutPage.founderName": { _all: "Ahmed Al-Hassan" },
  "aboutPage.founderRole": {
    de: "Gründer & CEO", fr: "Fondateur & PDG", es: "Fundador y CEO", it: "Fondatore e CEO", nl: "Oprichter & CEO",
    pt: "Fundador e CEO", pl: "Założyciel i CEO", sv: "Grundare & VD", da: "Grundlægger & CEO", no: "Grunnlegger & CEO",
    fi: "Perustaja & toimitusjohtaja", cs: "Zakladatel a CEO", hu: "Alapító és vezérigazgató", ro: "Fondator și CEO", el: "Ιδρυτής & CEO",
    hr: "Osnivač i CEO", bg: "Основател и изпълнителен директор", sk: "Zakladateľ a CEO", sl: "Ustanovitelj in CEO", et: "Asutaja ja tegevjuht",
    lv: "Dibinātājs un izpilddirektors", lt: "Įkūrėjas ir generalinis direktorius", tr: "Kurucu ve CEO", ru: "Основатель и генеральный директор", uk: "Засновник та генеральний директор",
  },
  "aboutPage.founderBio": {
    de: "Mit 15 Jahren Erfahrung im Tourismus hat Ahmeds Vision Jordan Explorer zu einem führenden Reiseveranstalter gemacht.",
    fr: "Avec 15 ans d'expérience dans le tourisme, la vision d'Ahmed a transformé Jordan Explorer en un opérateur de premier plan.",
    es: "Con 15 años en turismo, la visión de Ahmed transformó Jordan Explorer en un operador turístico líder.",
    it: "Con 15 anni nel turismo, la visione di Ahmed ha trasformato Jordan Explorer in un operatore leader.",
    nl: "Met 15 jaar ervaring in toerisme heeft Ahmeds visie Jordan Explorer getransformeerd tot een toonaangevende touroperator.",
    pt: "Com 15 anos no turismo, a visão de Ahmed transformou a Jordan Explorer em uma operadora líder.",
    pl: "Z 15-letnim doświadczeniem w turystyce, wizja Ahmeda przekształciła Jordan Explorer w wiodącego touroperatora.",
    sv: "Med 15 års erfarenhet inom turism har Ahmeds vision förvandlat Jordan Explorer till en ledande researrangör.",
    da: "Med 15 års erfaring i turisme har Ahmeds vision forvandlet Jordan Explorer til en førende rejsearrangør.",
    no: "Med 15 års erfaring i turisme har Ahmeds visjon gjort Jordan Explorer til en ledende turoperatør.",
    fi: "15 vuoden matkailukokemuksella Ahmedin visio muutti Jordan Explorerin johtavaksi matkanjärjestäjäksi.",
    cs: "S 15 lety zkušeností v cestovním ruchu Ahmedova vize proměnila Jordan Explorer ve vedoucího touroperátora.",
    hu: "15 éves turisztikai tapasztalattal Ahmed víziója Jordan Explorert vezető utazásszervezővé tette.",
    ro: "Cu 15 ani de experiență în turism, viziunea lui Ahmed a transformat Jordan Explorer într-un operator de top.",
    el: "Με 15 χρόνια στον τουρισμό, το όραμα του Ahmed μετέτρεψε τη Jordan Explorer σε κορυφαίο ταξιδιωτικό γραφείο.",
    hr: "S 15 godina iskustva u turizmu, Ahmedova vizija pretvorila je Jordan Explorer u vodećeg turoperatora.",
    bg: "С 15 години опит в туризма, визията на Ахмед превърна Jordan Explorer във водещ туроператор.",
    sk: "S 15 rokmi skúseností v cestovnom ruchu Ahmedova vízia premenila Jordan Explorer na vedúceho touroperátora.",
    sl: "S 15-letnimi izkušnjami v turizmu je Ahmedova vizija Jordan Explorer spremenila v vodilnega organizatorja potovanj.",
    et: "15-aastase turismialase kogemusega on Ahmedi visioon muutnud Jordan Exploreri juhtivaks reisikorraldajaks.",
    lv: "Ar 15 gadu pieredzi tūrismā Ahmeda vīzija ir pārveidojusi Jordan Explorer par vadošo tūrisma operatoru.",
    lt: "Su 15 metų patirtimi turizme Ahmedo vizija pavertė Jordan Explorer pirmaujančiu kelionių organizatoriumi.",
    tr: "15 yıllık turizm deneyimiyle Ahmed'in vizyonu Jordan Explorer'ı önde gelen bir tur operatörüne dönüştürdü.",
    ru: "С 15-летним опытом в туризме, видение Ахмеда превратило Jordan Explorer в ведущего туроператора.",
    uk: "З 15-річним досвідом у туризмі, бачення Ахмеда перетворило Jordan Explorer на провідного туроператора.",
  },
  "aboutPage.operationsName": { _all: "Sarah Mitchell" },
  "aboutPage.operationsRole": {
    de: "Leiterin Betrieb", fr: "Directrice des opérations", es: "Directora de Operaciones", it: "Responsabile Operazioni", nl: "Hoofd Operations",
    pt: "Diretora de Operações", pl: "Kierownik Operacji", sv: "Operationschef", da: "Driftschef", no: "Driftssjef",
    fi: "Operatiivinen johtaja", cs: "Vedoucí provozu", hu: "Operatív igazgató", ro: "Director Operațiuni", el: "Υπεύθυνη Λειτουργίας",
    hr: "Voditeljica operacija", bg: "Ръководител операции", sk: "Vedúca prevádzky", sl: "Vodja operacij", et: "Operatsioonide juht",
    lv: "Operāciju vadītāja", lt: "Operacijų vadovė", tr: "Operasyon Müdürü", ru: "Руководитель операционного отдела", uk: "Керівник операційного відділу",
  },
  "aboutPage.operationsBio": {
    de: "Sarah sorgt dafür, dass jede Tour reibungslos verläuft, und koordiniert die Logistik in ganz Jordanien.",
    fr: "Sarah veille au bon déroulement de chaque circuit et coordonne la logistique à travers la Jordanie.",
    es: "Sarah asegura que cada tour funcione sin problemas, coordinando la logística en toda Jordania.",
    it: "Sarah garantisce che ogni tour proceda senza intoppi, coordinando la logistica in tutta la Giordania.",
    nl: "Sarah zorgt ervoor dat elke tour soepel verloopt en coördineert de logistiek in heel Jordanië.",
    pt: "Sarah garante que cada tour funcione perfeitamente, coordenando a logística em toda a Jordânia.",
    pl: "Sarah dba o to, aby każda wycieczka przebiegała bezproblemowo, koordynując logistykę w całej Jordanii.",
    sv: "Sarah ser till att varje resa löper smidigt och koordinerar logistiken i hela Jordanien.",
    da: "Sarah sikrer, at hver tur forløber glat, og koordinerer logistikken i hele Jordan.",
    no: "Sarah sørger for at hver tur går smidig, og koordinerer logistikken i hele Jordan.",
    fi: "Sarah varmistaa jokaisen kiertueen sujuvan toteutumisen ja koordinoi logistiikkaa koko Jordaniassa.",
    cs: "Sarah zajišťuje hladký průběh každého zájezdu a koordinuje logistiku po celém Jordánsku.",
    hu: "Sarah gondoskodik minden túra zökkenőmentes lebonyolításáról, koordinálva a logisztikát Jordánia-szerte.",
    ro: "Sarah se asigură că fiecare tur se desfășoară fără probleme, coordonând logistica în toată Iordania.",
    el: "Η Sarah διασφαλίζει ότι κάθε περιήγηση λειτουργεί ομαλά, συντονίζοντας τη logistics σε όλη την Ιορδανία.",
    hr: "Sarah osigurava da svako putovanje prolazi glatko, koordinirajući logistiku diljem Jordana.",
    bg: "Сара се грижи за безпроблемното протичане на всеки тур, координирайки логистиката в цяла Йордания.",
    sk: "Sarah zabezpečuje hladký priebeh každého zájazdu a koordinuje logistiku po celom Jordánsku.",
    sl: "Sarah skrbi za nemoteno izvedbo vsakega potovanja in koordinira logistiko po vsej Jordaniji.",
    et: "Sarah tagab iga reisi sujuva korralduse, koordineerides logistikat kogu Jordaanias.",
    lv: "Sāra nodrošina, ka katra tūre norit gludi, koordinējot loģistiku visā Jordānijā.",
    lt: "Sarah užtikrina, kad kiekviena kelionė vyktų sklandžiai, koordinuodama logistiką visoje Jordanijoje.",
    tr: "Sarah, Ürdün genelinde lojistiği koordine ederek her turun sorunsuz ilerlemesini sağlıyor.",
    ru: "Сара обеспечивает безупречную организацию каждого тура, координируя логистику по всей Иордании.",
    uk: "Сара забезпечує безперебійну організацію кожного туру, координуючи логістику по всій Йорданії.",
  },
  "aboutPage.guideName": { _all: "Omar Khalil" },
  "aboutPage.guideRole": {
    de: "Leitender Reiseleiter", fr: "Guide principal", es: "Guía Principal", it: "Guida Principale", nl: "Hoofdgids",
    pt: "Guia Principal", pl: "Główny Przewodnik", sv: "Huvudguide", da: "Ledende guide", no: "Hovedguide",
    fi: "Pääopas", cs: "Hlavní průvodce", hu: "Vezető idegenvezetö", ro: "Ghid Principal", el: "Επικεφαλής Ξεναγός",
    hr: "Glavni vodič", bg: "Главен екскурзовод", sk: "Hlavný sprievodca", sl: "Glavni vodnik", et: "Peaviht",
    lv: "Galvenais gids", lt: "Vyriausiasis gidas", tr: "Baş Rehber", ru: "Главный экскурсовод", uk: "Головний екскурсовод",
  },
  "aboutPage.guideBio": {
    de: "Omars Leidenschaft für Geschichte und Storytelling erweckt antike Stätten für unsere Gäste zum Leben.",
    fr: "La passion d'Omar pour l'histoire et la narration donne vie aux sites antiques pour nos visiteurs.",
    es: "La pasión de Omar por la historia y la narrativa da vida a los sitios antiguos para nuestros huéspedes.",
    it: "La passione di Omar per la storia e la narrazione fa rivivere i siti antichi per i nostri ospiti.",
    nl: "Omars passie voor geschiedenis en storytelling brengt oude sites tot leven voor onze gasten.",
    pt: "A paixão de Omar pela história e narrativa dá vida aos sítios antigos para nossos visitantes.",
    pl: "Pasja Omara do historii i opowiadania ożywia starożytne miejsca dla naszych gości.",
    sv: "Omars passion för historia och berättande ger antika platser liv för våra gäster.",
    da: "Omars passion for historie og fortællekunst bringer gamle steder til live for vores gæster.",
    no: "Omars lidenskap for historie og historiefortelling bringer gamle steder til liv for gjestene våre.",
    fi: "Omarin intohimo historiaan ja tarinankerrontaan herättää muinaiset kohteet henkiin vieraillemme.",
    cs: "Omarova vášeň pro historii a vyprávění oživuje starověká místa pro naše hosty.",
    hu: "Omar szenvedélye a történelem és a mesélés iránt életre kelti az ősi helyszíneket vendégeink számára.",
    ro: "Pasiunea lui Omar pentru istorie și povestire aduce siturile antice la viață pentru oaspeții noștri.",
    el: "Το πάθος του Omar για την ιστορία και την αφήγηση ζωντανεύει τα αρχαία μνημεία για τους επισκέπτες μας.",
    hr: "Omarova strast prema povijesti i pripovijedanju oživljava drevna mjesta za naše goste.",
    bg: "Страстта на Омар към историята и разказването вдъхва живот на древните обекти за нашите гости.",
    sk: "Omarova vášeň pre históriu a rozprávanie oživuje starobylé miesta pre našich hostí.",
    sl: "Omarjeva strast do zgodovine in pripovedovanja oživlja starodavna mesta za naše goste.",
    et: "Omari kirg ajaloo ja jutustamise vastu äratab iidsed paigad meie külalistele ellu.",
    lv: "Omara aizraušanās ar vēsturi un stāstīšanu atdzīvina senas vietas mūsu viesiem.",
    lt: "Omaro aistra istorijai ir pasakojimui atgaivina senovines vietas mūsų svečiams.",
    tr: "Omar'ın tarih ve hikaye anlatıcılığına olan tutkusu, antik alanları konuklarımız için canlandırıyor.",
    ru: "Страсть Омара к истории и рассказам оживляет древние достопримечательности для наших гостей.",
    uk: "Пристрасть Омара до історії та оповідання оживлює стародавні місця для наших гостей.",
  },
};

// Instead of the above approach, let me just write the missing sections directly into each locale file.
// The approach: for each locale file, read it, find the `export default` line,
// and insert the missing sections before it.

const locales = ['de', 'fr', 'es', 'it', 'nl', 'pt', 'pl', 'sv', 'da', 'no', 'fi', 'cs', 'hu', 'ro', 'el', 'hr', 'bg', 'sk', 'sl', 'et', 'lv', 'lt', 'tr', 'ru', 'uk'];

// Generate the new sections text for a given language
function getNewSections(lang) {
  // These are complete new sections that need to be added
  const sections = {};
  
  // Pick language-appropriate text
  const t = translations[lang] || {};
  
  return `  reviewForm: {
    title: "${t.reviewForm?.title || 'Write a Review'}",
    yourRating: "${t.reviewForm?.yourRating || 'Your Rating'}",
    yourReview: "${t.reviewForm?.yourReview || 'Your Review'}",
    reviewPlaceholder: "${t.reviewForm?.reviewPlaceholder || 'Share your experience with this tour...'}",
    yourName: "${t.reviewForm?.yourName || 'Your Name'}",
    yourEmail: "${t.reviewForm?.yourEmail || 'Your Email'}",
    ticketId: "${t.reviewForm?.ticketId || 'Traveler Ticket ID'}",
    ticketIdPlaceholder: "${t.reviewForm?.ticketIdPlaceholder || 'e.g. JE-12345-ABC'}",
    ticketIdHelp: "${t.reviewForm?.ticketIdHelp || 'Please enter your ticket ID from your booking confirmation to verify your purchase.'}",
    submitting: "${t.reviewForm?.submitting || 'Submitting...'}",
    submitReview: "${t.reviewForm?.submitReview || 'Submit Review'}",
    verificationFailed: "${t.reviewForm?.verificationFailed || 'Verification Failed'}",
    verificationMessage: "${t.reviewForm?.verificationMessage || "We couldn't verify your ticket ID. Please ensure you've entered the correct ID from your booking confirmation."}",
  },`;
}

// This approach is too complex inline. Let me just use a simpler approach.
console.log("Use patch-locales.js instead");
