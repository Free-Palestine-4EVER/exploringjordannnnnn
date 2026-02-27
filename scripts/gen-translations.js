// This script generates the translations for all languages
// Run: node scripts/gen-translations.js >> lib/i18n/translations.ts

const languages = {
  de: {
    common: {
      home: "Startseite", tours: "Touren", destinations: "Reiseziele", about: "Über uns", contact: "Kontakt",
      contactUs: "Kontaktieren Sie uns", bookNow: "Jetzt buchen", faq: "FAQ", learnMore: "Mehr erfahren",
      viewAll: "Alle anzeigen", explore: "Entdecken", submit: "Absenden", sending: "Wird gesendet...",
      success: "Erfolg!", error: "Fehler", loading: "Lädt...", readMore: "Mehr lesen", viewDetails: "Details anzeigen",
      back: "Zurück", next: "Weiter", previous: "Vorherige", close: "Schließen", subscribe: "Abonnieren",
      subscribing: "Wird abonniert...", email: "E-Mail", phone: "Telefon", name: "Name", message: "Nachricht",
      required: "Erforderlich", optional: "Optional", days: "Tage", nights: "Nächte", perPerson: "pro Person",
      from: "Ab", included: "Inklusive", notIncluded: "Nicht inklusive", highlights: "Höhepunkte",
      itinerary: "Reiseplan", pricing: "Preise", tailorTrip: "Reise anpassen", aiTripMaker: "KI-Reiseplaner",
      partners: "Partner", customize: "Anpassen",
    },
    header: { jordanTours: "Jordanien Touren", jordanDestinations: "Jordanien Reiseziele" },
    announcement: {
      freeEsim: "KOSTENLOSE E-SIM mit UNBEGRENZTEN Daten während Ihrer Reise",
      fullRefund: "Volle Rückerstattung bei Stornierung 30 Tage vor der Reise",
      emergencyNumber: "24/7 NOTFALLNUMMER für Chat und Anrufe",
    },
  },
  fr: {
    common: {
      home: "Accueil", tours: "Circuits", destinations: "Destinations", about: "À propos", contact: "Contact",
      contactUs: "Contactez-nous", bookNow: "Réserver", faq: "FAQ", learnMore: "En savoir plus",
      viewAll: "Tout voir", explore: "Explorer", submit: "Envoyer", sending: "Envoi en cours...",
      success: "Succès !", error: "Erreur", loading: "Chargement...", readMore: "Lire la suite",
      viewDetails: "Voir les détails", back: "Retour", next: "Suivant", previous: "Précédent", close: "Fermer",
      subscribe: "S'abonner", subscribing: "Abonnement...", email: "E-mail", phone: "Téléphone", name: "Nom",
      message: "Message", required: "Obligatoire", optional: "Facultatif", days: "Jours", nights: "Nuits",
      perPerson: "par personne", from: "À partir de", included: "Inclus", notIncluded: "Non inclus",
      highlights: "Points forts", itinerary: "Itinéraire", pricing: "Tarifs", tailorTrip: "Personnaliser ce voyage",
      aiTripMaker: "Créateur de voyage IA", partners: "Partenaires", customize: "Personnaliser",
    },
  },
}

console.log(JSON.stringify(languages, null, 2))
