#!/usr/bin/env node
/**
 * Patches all locale files by adding missing translation keys.
 * Reads each locale, adds missing sections, writes back.
 */

const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'lib', 'i18n', 'locales');
const locales = ['de', 'fr', 'es', 'it', 'nl', 'pt', 'pl', 'sv', 'da', 'no', 'fi', 'cs', 'hu', 'ro', 'el', 'hr', 'bg', 'sk', 'sl', 'et', 'lv', 'lt', 'tr', 'ru', 'uk'];

// All new translations per language for ALL new keys
const T = {
  de: { reviewTitle: "Bewertung schreiben", yourRating: "Ihre Bewertung", yourReview: "Ihre Bewertung", reviewPlaceholder: "Teilen Sie Ihre Erfahrung mit dieser Tour...", yourName: "Ihr Name", yourEmail: "Ihre E-Mail", ticketId: "Reise-Ticket-ID", ticketIdPlaceholder: "z.B. JE-12345-ABC", ticketIdHelp: "Bitte geben Sie Ihre Ticket-ID aus Ihrer Buchungsbestätigung ein.", submitting: "Wird gesendet...", submitReview: "Bewertung abgeben", verificationFailed: "Verifizierung fehlgeschlagen", verificationMessage: "Wir konnten Ihre Ticket-ID nicht verifizieren. Bitte überprüfen Sie die ID aus Ihrer Buchungsbestätigung.", tourPackages: "Reisepakete", customTours: "Individuelle Touren", activitiesTab: "Aktivitäten", destination: "Reiseziel", selectDestination: "Reiseziel wählen", allJordan: "Ganz Jordanien", duration: "Dauer", anyDuration: "Beliebige Dauer", date: "Datum", pickDate: "Datum wählen", travelers: "Reisende", numberOfTravelers: "Anzahl der Reisenden", traveler1: "1 Reisender", travelers2: "2 Reisende", travelers3: "3 Reisende", travelers4: "4 Reisende", travelers5plus: "5+ Reisende", searchTours: "Touren suchen", interests: "Interessen", selectInterests: "Interessen wählen", cultural: "Kulturell", adventure: "Abenteuer", relaxation: "Entspannung", historical: "Historisch", culinary: "Kulinarisch", customDuration: "Individuelle Dauer", budget: "Budget", selectBudget: "Budget wählen", budgetOption: "Budget", midRange: "Mittelklasse", luxury: "Luxus", requestCustomTour: "Individuelle Tour anfragen", activityType: "Aktivitätstyp", selectActivity: "Aktivität wählen", hiking: "Wandern", desertSafari: "Wüstensafari", culturalTour: "Kulturtour", cookingClass: "Kochkurs", diving: "Tauchen", location: "Ort", selectLocation: "Ort wählen", anyLocation: "Beliebiger Ort", activityDuration: "Dauer", halfDay: "Halber Tag", fullDay: "Ganzer Tag", multiDay: "Mehrtägig", findActivities: "Aktivitäten finden", adult1: "1 Erwachsener", adults2: "2 Erwachsene", adults3: "3 Erwachsene", adults4: "4 Erwachsene", adults5: "5 Erwachsene", adults6plus: "6+ Erwachsene", selectOption: "Option wählen", standard: "Standard (3-Sterne-Hotels)", comfort: "Komfort (4-Sterne-Hotels)", luxuryOption: "Luxus (5-Sterne-Hotels)", tourOption: "Tour-Option", selectDate: "Datum wählen", getInTouch: "Kontaktieren Sie uns", cfSubtitle: "Füllen Sie das Formular aus und wir helfen Ihnen bei der Planung", cfFullName: "Vollständiger Name *", cfEmail: "E-Mail-Adresse *", cfPhone: "Telefon / WhatsApp *", cfMessage: "Nachricht *", cfPlaceholder: "Erzählen Sie uns von Ihren Reiseplänen...", cfSending: "Wird gesendet...", cfSendInquiry: "Anfrage senden", cfMessageSent: "Nachricht gesendet!", cfWeWillGetBack: "Wir melden uns innerhalb von 24 Stunden", cfThankYou: "Vielen Dank für Ihre Anfrage zu", cfSendAnother: "Weitere Anfrage senden", about: "Über", interestingFacts: "Interessante Fakten", toursIncluding: "Touren mit", noToursFound: "Derzeit keine spezifischen Touren für dieses Reiseziel gefunden.", home: "Startseite", bcTours: "Touren", bcDestinations: "Reiseziele", badge: "Premium-Reiseerlebnis", shTitle: "Wir sind Ihr", shHighlight: "Komplettservice", shEnd: "vom Flughafen zum Flughafen", shSubtitle: "Erleben Sie eine nahtlose Reise, bei der jedes Detail mit Präzision behandelt wird. Von Ihrer Ankunft bis zur Abreise sorgen wir für ein unvergessliches Abenteuer in Jordanien.", seamlessTransfers: "Nahtlose Transfers", seamlessTransfersDesc: "Privater Luxustransport vom Moment Ihrer Landung bis zur Abreise.", fullProtection: "Voller Schutz", fullProtectionDesc: "Vollständig lizenzierte und versicherte Dienste für Ihre Sicherheit.", support247: "24/7 Support", support247Desc: "Rund-um-die-Uhr-Unterstützung während Ihres gesamten Aufenthalts in Jordanien.", startJourney: "Reise starten", reviews: "Bewertungen", hotelClassLabel: "Hotels", orSimilar: "* Oder ähnliche Unterkünfte je nach Verfügbarkeit", pricingFinalNote: "Die endgültigen Preise werden auf Basis Ihrer spezifischen Anforderungen bestätigt.", highSeason: "Hochsaison", lowSeason: "Nebensaison", travelers2p: "2 Reisende", travelers3to5: "3-5 Reisende", travelers6to7: "6-7 Reisende (Am beliebtesten)", travelers8to9: "8-9 Reisende", travelers10to14: "10-14 Reisende", hotelDescription: "Wählen Sie aus drei Hotelklassen. Alle Hotels sind sorgfältig ausgewählt.", pricingDescription: "Preise variieren je nach Saison, Gruppengröße und Hotelklasse.", season: "Saison", failedToSend: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut.", founderRole: "Gründer & CEO", founderBio: "Mit 15 Jahren Erfahrung im Tourismus hat Ahmeds Vision Jordan Explorer zu einem führenden Reiseveranstalter gemacht.", operationsRole: "Leiterin Betrieb", operationsBio: "Sarah sorgt dafür, dass jede Tour reibungslos verläuft.", guideRole: "Leitender Reiseleiter", guideBio: "Omars Leidenschaft für Geschichte erweckt antike Stätten zum Leben.", whatsappUs: "WhatsApp" },
  fr: { reviewTitle: "Écrire un avis", yourRating: "Votre note", yourReview: "Votre avis", reviewPlaceholder: "Partagez votre expérience avec ce circuit...", yourName: "Votre nom", yourEmail: "Votre e-mail", ticketId: "ID du billet voyageur", ticketIdPlaceholder: "ex. JE-12345-ABC", ticketIdHelp: "Veuillez entrer votre ID de billet depuis votre confirmation de réservation.", submitting: "Envoi en cours...", submitReview: "Soumettre l'avis", verificationFailed: "Vérification échouée", verificationMessage: "Nous n'avons pas pu vérifier votre ID de billet. Veuillez vérifier l'ID correct depuis votre confirmation.", tourPackages: "Forfaits circuits", customTours: "Circuits sur mesure", activitiesTab: "Activités", destination: "Destination", selectDestination: "Choisir une destination", allJordan: "Toute la Jordanie", duration: "Durée", anyDuration: "Toute durée", date: "Date", pickDate: "Choisir une date", travelers: "Voyageurs", numberOfTravelers: "Nombre de voyageurs", traveler1: "1 Voyageur", travelers2: "2 Voyageurs", travelers3: "3 Voyageurs", travelers4: "4 Voyageurs", travelers5plus: "5+ Voyageurs", searchTours: "Rechercher des circuits", interests: "Centres d'intérêt", selectInterests: "Choisir", cultural: "Culturel", adventure: "Aventure", relaxation: "Détente", historical: "Historique", culinary: "Culinaire", customDuration: "Durée personnalisée", budget: "Budget", selectBudget: "Choisir le budget", budgetOption: "Économique", midRange: "Milieu de gamme", luxury: "Luxe", requestCustomTour: "Demander un circuit sur mesure", activityType: "Type d'activité", selectActivity: "Choisir une activité", hiking: "Randonnée", desertSafari: "Safari désertique", culturalTour: "Visite culturelle", cookingClass: "Cours de cuisine", diving: "Plongée", location: "Lieu", selectLocation: "Choisir un lieu", anyLocation: "Tout lieu", activityDuration: "Durée", halfDay: "Demi-journée", fullDay: "Journée complète", multiDay: "Plusieurs jours", findActivities: "Trouver des activités", adult1: "1 Adulte", adults2: "2 Adultes", adults3: "3 Adultes", adults4: "4 Adultes", adults5: "5 Adultes", adults6plus: "6+ Adultes", selectOption: "Choisir une option", standard: "Standard (hôtels 3 étoiles)", comfort: "Confort (hôtels 4 étoiles)", luxuryOption: "Luxe (hôtels 5 étoiles)", tourOption: "Option de circuit", selectDate: "Choisir une date", getInTouch: "Contactez-nous", cfSubtitle: "Remplissez le formulaire et nous vous aiderons à planifier", cfFullName: "Nom complet *", cfEmail: "Adresse e-mail *", cfPhone: "Téléphone / WhatsApp *", cfMessage: "Message *", cfPlaceholder: "Parlez-nous de vos projets de voyage...", cfSending: "Envoi...", cfSendInquiry: "Envoyer la demande", cfMessageSent: "Message envoyé !", cfWeWillGetBack: "Nous vous répondrons dans les 24 heures", cfThankYou: "Merci pour votre demande concernant", cfSendAnother: "Envoyer une autre demande", about: "À propos de", interestingFacts: "Faits intéressants", toursIncluding: "Circuits incluant", noToursFound: "Aucun circuit spécifique trouvé pour cette destination actuellement.", home: "Accueil", bcTours: "Circuits", bcDestinations: "Destinations", badge: "Expérience voyage premium", shTitle: "Nous sommes votre", shHighlight: "service complet", shEnd: "de l'aéroport à l'aéroport", shSubtitle: "Vivez un voyage fluide où chaque détail est traité avec précision. De votre arrivée à votre départ, nous assurons une aventure inoubliable en Jordanie.", seamlessTransfers: "Transferts fluides", seamlessTransfersDesc: "Transport privé de luxe dès votre atterrissage jusqu'au départ.", fullProtection: "Protection complète", fullProtectionDesc: "Services entièrement agréés et assurés pour votre tranquillité d'esprit.", support247: "Support 24h/24", support247Desc: "Assistance permanente tout au long de votre séjour en Jordanie.", startJourney: "Commencer votre voyage", reviews: "avis", hotelClassLabel: "Hôtels", orSimilar: "* Ou établissements similaires selon disponibilité", pricingFinalNote: "Les prix définitifs seront confirmés selon vos besoins spécifiques.", highSeason: "Haute saison", lowSeason: "Basse saison", travelers2p: "2 voyageurs", travelers3to5: "3-5 voyageurs", travelers6to7: "6-7 voyageurs (Le plus populaire)", travelers8to9: "8-9 voyageurs", travelers10to14: "10-14 voyageurs", hotelDescription: "Choisissez parmi trois classes d'hôtels. Tous soigneusement sélectionnés.", pricingDescription: "Les prix varient selon la saison, la taille du groupe et la classe d'hôtel.", season: "Saison", failedToSend: "Échec de l'envoi. Veuillez réessayer.", founderRole: "Fondateur & PDG", founderBio: "Avec 15 ans dans le tourisme, la vision d'Ahmed a transformé Jordan Explorer en un opérateur de premier plan.", operationsRole: "Directrice des opérations", operationsBio: "Sarah veille au bon déroulement de chaque circuit.", guideRole: "Guide principal", guideBio: "La passion d'Omar pour l'histoire donne vie aux sites antiques.", whatsappUs: "WhatsApp" },
  es: { reviewTitle: "Escribir una reseña", yourRating: "Tu puntuación", yourReview: "Tu reseña", reviewPlaceholder: "Comparte tu experiencia con este tour...", yourName: "Tu nombre", yourEmail: "Tu correo", ticketId: "ID de ticket de viajero", ticketIdPlaceholder: "ej. JE-12345-ABC", ticketIdHelp: "Ingresa tu ID de ticket de la confirmación de reserva.", submitting: "Enviando...", submitReview: "Enviar reseña", verificationFailed: "Verificación fallida", verificationMessage: "No pudimos verificar tu ID de ticket. Verifica el ID correcto de tu confirmación.", tourPackages: "Paquetes de tours", customTours: "Tours personalizados", activitiesTab: "Actividades", destination: "Destino", selectDestination: "Seleccionar destino", allJordan: "Toda Jordania", duration: "Duración", anyDuration: "Cualquier duración", date: "Fecha", pickDate: "Elegir fecha", travelers: "Viajeros", numberOfTravelers: "Número de viajeros", traveler1: "1 Viajero", travelers2: "2 Viajeros", travelers3: "3 Viajeros", travelers4: "4 Viajeros", travelers5plus: "5+ Viajeros", searchTours: "Buscar tours", interests: "Intereses", selectInterests: "Seleccionar", cultural: "Cultural", adventure: "Aventura", relaxation: "Relajación", historical: "Histórico", culinary: "Culinario", customDuration: "Duración personalizada", budget: "Presupuesto", selectBudget: "Seleccionar presupuesto", budgetOption: "Económico", midRange: "Gama media", luxury: "Lujo", requestCustomTour: "Solicitar tour personalizado", activityType: "Tipo de actividad", selectActivity: "Seleccionar actividad", hiking: "Senderismo", desertSafari: "Safari por el desierto", culturalTour: "Tour cultural", cookingClass: "Clase de cocina", diving: "Buceo", location: "Ubicación", selectLocation: "Seleccionar ubicación", anyLocation: "Cualquier ubicación", activityDuration: "Duración", halfDay: "Medio día", fullDay: "Día completo", multiDay: "Varios días", findActivities: "Buscar actividades", adult1: "1 Adulto", adults2: "2 Adultos", adults3: "3 Adultos", adults4: "4 Adultos", adults5: "5 Adultos", adults6plus: "6+ Adultos", selectOption: "Seleccionar opción", standard: "Estándar (hoteles 3 estrellas)", comfort: "Confort (hoteles 4 estrellas)", luxuryOption: "Lujo (hoteles 5 estrellas)", tourOption: "Opción de tour", selectDate: "Seleccionar fecha", getInTouch: "Contáctenos", cfSubtitle: "Complete el formulario y le ayudaremos a planificar", cfFullName: "Nombre completo *", cfEmail: "Correo electrónico *", cfPhone: "Teléfono / WhatsApp *", cfMessage: "Mensaje *", cfPlaceholder: "Cuéntenos sobre sus planes de viaje...", cfSending: "Enviando...", cfSendInquiry: "Enviar consulta", cfMessageSent: "¡Mensaje enviado!", cfWeWillGetBack: "Le responderemos en 24 horas", cfThankYou: "Gracias por su consulta sobre", cfSendAnother: "Enviar otra consulta", about: "Sobre", interestingFacts: "Datos interesantes", toursIncluding: "Tours que incluyen", noToursFound: "No se encontraron tours específicos para este destino.", home: "Inicio", bcTours: "Tours", bcDestinations: "Destinos", badge: "Experiencia de viaje premium", shTitle: "Somos su", shHighlight: "servicio completo", shEnd: "del aeropuerto al aeropuerto", shSubtitle: "Experimente un viaje sin contratiempos donde cada detalle se maneja con precisión. Desde su llegada hasta su partida, aseguramos una aventura inolvidable en Jordania.", seamlessTransfers: "Traslados fluidos", seamlessTransfersDesc: "Transporte privado de lujo desde que aterriza hasta que parte.", fullProtection: "Protección completa", fullProtectionDesc: "Servicios totalmente licenciados y asegurados para su tranquilidad.", support247: "Soporte 24/7", support247Desc: "Asistencia las 24 horas durante toda su estadía en Jordania.", startJourney: "Iniciar su viaje", reviews: "reseñas", hotelClassLabel: "Hoteles", orSimilar: "* O propiedades similares según disponibilidad", pricingFinalNote: "Los precios finales se confirmarán según sus requisitos específicos.", highSeason: "Temporada alta", lowSeason: "Temporada baja", travelers2p: "2 viajeros", travelers3to5: "3-5 viajeros", travelers6to7: "6-7 viajeros (Más popular)", travelers8to9: "8-9 viajeros", travelers10to14: "10-14 viajeros", hotelDescription: "Elija entre tres clases de hotel. Todos cuidadosamente seleccionados.", pricingDescription: "Los precios varían según temporada, tamaño del grupo y clase de hotel.", season: "Temporada", failedToSend: "Error al enviar. Intente de nuevo.", founderRole: "Fundador y CEO", founderBio: "Con 15 años en turismo, la visión de Ahmed transformó Jordan Explorer en un operador líder.", operationsRole: "Directora de Operaciones", operationsBio: "Sarah asegura que cada tour funcione sin problemas.", guideRole: "Guía Principal", guideBio: "La pasión de Omar por la historia da vida a los sitios antiguos.", whatsappUs: "WhatsApp" },
};

// For languages not explicitly defined, we'll use English as fallback
const defaultT = { reviewTitle: "Write a Review", yourRating: "Your Rating", yourReview: "Your Review", reviewPlaceholder: "Share your experience with this tour...", yourName: "Your Name", yourEmail: "Your Email", ticketId: "Traveler Ticket ID", ticketIdPlaceholder: "e.g. JE-12345-ABC", ticketIdHelp: "Please enter your ticket ID from your booking confirmation to verify your purchase.", submitting: "Submitting...", submitReview: "Submit Review", verificationFailed: "Verification Failed", verificationMessage: "We couldn't verify your ticket ID. Please ensure you've entered the correct ID from your booking confirmation.", tourPackages: "Tour Packages", customTours: "Custom Tours", activitiesTab: "Activities", destination: "Destination", selectDestination: "Select destination", allJordan: "All Jordan", duration: "Duration", anyDuration: "Any Duration", date: "Date", pickDate: "Pick a date", travelers: "Travelers", numberOfTravelers: "Number of travelers", traveler1: "1 Traveler", travelers2: "2 Travelers", travelers3: "3 Travelers", travelers4: "4 Travelers", travelers5plus: "5+ Travelers", searchTours: "Search Tours", interests: "Interests", selectInterests: "Select interests", cultural: "Cultural", adventure: "Adventure", relaxation: "Relaxation", historical: "Historical", culinary: "Culinary", customDuration: "Custom Duration", budget: "Budget", selectBudget: "Select budget", budgetOption: "Budget", midRange: "Mid-range", luxury: "Luxury", requestCustomTour: "Request Custom Tour", activityType: "Activity Type", selectActivity: "Select activity", hiking: "Hiking", desertSafari: "Desert Safari", culturalTour: "Cultural Tour", cookingClass: "Cooking Class", diving: "Diving", location: "Location", selectLocation: "Select location", anyLocation: "Any Location", activityDuration: "Duration", halfDay: "Half Day", fullDay: "Full Day", multiDay: "Multi-Day", findActivities: "Find Activities", adult1: "1 Adult", adults2: "2 Adults", adults3: "3 Adults", adults4: "4 Adults", adults5: "5 Adults", adults6plus: "6+ Adults", selectOption: "Select option", standard: "Standard (3-star hotels)", comfort: "Comfort (4-star hotels)", luxuryOption: "Luxury (5-star hotels)", tourOption: "Tour Option", selectDate: "Select date", getInTouch: "Get in Touch", cfSubtitle: "Fill out the form and we'll help you plan your perfect trip", cfFullName: "Full Name *", cfEmail: "Email Address *", cfPhone: "Phone / WhatsApp *", cfMessage: "Message *", cfPlaceholder: "Tell us about your travel plans and preferences...", cfSending: "Sending...", cfSendInquiry: "Send Inquiry", cfMessageSent: "Message Sent!", cfWeWillGetBack: "We'll get back to you within 24 hours", cfThankYou: "Thank you for your inquiry about", cfSendAnother: "Send Another Inquiry", about: "About", interestingFacts: "Interesting Facts", toursIncluding: "Tours Including", noToursFound: "No specific tours found for this destination at the moment.", home: "Home", bcTours: "Tours", bcDestinations: "Destinations", badge: "Premium Travel Experience", shTitle: "We are one stop", shHighlight: "full service", shEnd: "from airport to airport", shSubtitle: "Experience a seamless journey where every detail is handled with precision.", seamlessTransfers: "Seamless Transfers", seamlessTransfersDesc: "Private luxury transport from the moment you land until you leave.", fullProtection: "Full Protection", fullProtectionDesc: "Fully licensed and insured services for your complete peace of mind.", support247: "24/7 Support", support247Desc: "Round-the-clock assistance throughout your entire stay in Jordan.", startJourney: "Start Your Journey", reviews: "reviews", hotelClassLabel: "Hotels", orSimilar: "* Or similar properties based on availability", pricingFinalNote: "Final pricing will be confirmed based on your specific requirements and travel dates.", highSeason: "High Season", lowSeason: "Low Season", travelers2p: "2 travelers", travelers3to5: "3-5 travelers", travelers6to7: "6-7 travelers (Most Popular)", travelers8to9: "8-9 travelers", travelers10to14: "10-14 travelers", hotelDescription: "Choose from three hotel classes. All hotels are carefully selected for quality, location, and comfort.", pricingDescription: "Prices vary by season, group size, and hotel class.", season: "Season", failedToSend: "Failed to send. Please try again.", founderRole: "Founder & CEO", founderBio: "With 15 years in tourism, Ahmed's vision transformed Jordan Explorer into a leading tour operator.", operationsRole: "Head of Operations", operationsBio: "Sarah ensures every tour runs smoothly, coordinating logistics across Jordan.", guideRole: "Lead Tour Guide", guideBio: "Omar's passion for history and storytelling brings ancient sites to life for our guests.", whatsappUs: "WhatsApp Us" };

function esc(s) { return s.replace(/"/g, '\\"').replace(/\n/g, '\\n'); }

function generatePatch(lang) {
  const t = T[lang] || defaultT;
  const d = defaultT;
  const g = (key) => esc(t[key] || d[key]);
  
  return `
  reviewForm: {
    title: "${g('reviewTitle')}",
    yourRating: "${g('yourRating')}",
    yourReview: "${g('yourReview')}",
    reviewPlaceholder: "${g('reviewPlaceholder')}",
    yourName: "${g('yourName')}",
    yourEmail: "${g('yourEmail')}",
    ticketId: "${g('ticketId')}",
    ticketIdPlaceholder: "${g('ticketIdPlaceholder')}",
    ticketIdHelp: "${g('ticketIdHelp')}",
    submitting: "${g('submitting')}",
    submitReview: "${g('submitReview')}",
    verificationFailed: "${g('verificationFailed')}",
    verificationMessage: "${g('verificationMessage')}",
  },
  bookingSearch: {
    tourPackages: "${g('tourPackages')}",
    customTours: "${g('customTours')}",
    activitiesTab: "${g('activitiesTab')}",
    destination: "${g('destination')}",
    selectDestination: "${g('selectDestination')}",
    allJordan: "${g('allJordan')}",
    duration: "${g('duration')}",
    anyDuration: "${g('anyDuration')}",
    date: "${g('date')}",
    pickDate: "${g('pickDate')}",
    travelers: "${g('travelers')}",
    numberOfTravelers: "${g('numberOfTravelers')}",
    traveler1: "${g('traveler1')}",
    travelers2: "${g('travelers2')}",
    travelers3: "${g('travelers3')}",
    travelers4: "${g('travelers4')}",
    travelers5plus: "${g('travelers5plus')}",
    searchTours: "${g('searchTours')}",
    interests: "${g('interests')}",
    selectInterests: "${g('selectInterests')}",
    cultural: "${g('cultural')}",
    adventure: "${g('adventure')}",
    relaxation: "${g('relaxation')}",
    historical: "${g('historical')}",
    culinary: "${g('culinary')}",
    customDuration: "${g('customDuration')}",
    budget: "${g('budget')}",
    selectBudget: "${g('selectBudget')}",
    budgetOption: "${g('budgetOption')}",
    midRange: "${g('midRange')}",
    luxury: "${g('luxury')}",
    requestCustomTour: "${g('requestCustomTour')}",
    activityType: "${g('activityType')}",
    selectActivity: "${g('selectActivity')}",
    hiking: "${g('hiking')}",
    desertSafari: "${g('desertSafari')}",
    culturalTour: "${g('culturalTour')}",
    cookingClass: "${g('cookingClass')}",
    diving: "${g('diving')}",
    location: "${g('location')}",
    selectLocation: "${g('selectLocation')}",
    anyLocation: "${g('anyLocation')}",
    activityDuration: "${g('activityDuration')}",
    halfDay: "${g('halfDay')}",
    fullDay: "${g('fullDay')}",
    multiDay: "${g('multiDay')}",
    findActivities: "${g('findActivities')}",
    adult1: "${g('adult1')}",
    adults2: "${g('adults2')}",
    adults3: "${g('adults3')}",
    adults4: "${g('adults4')}",
    adults5: "${g('adults5')}",
    adults6plus: "${g('adults6plus')}",
    selectOption: "${g('selectOption')}",
    standard: "${g('standard')}",
    comfort: "${g('comfort')}",
    luxuryOption: "${g('luxuryOption')}",
    tourOption: "${g('tourOption')}",
    selectDate: "${g('selectDate')}",
  },
  contactFormCard: {
    getInTouch: "${g('getInTouch')}",
    subtitle: "${g('cfSubtitle')}",
    fullName: "${g('cfFullName')}",
    emailAddress: "${g('cfEmail')}",
    phoneWhatsApp: "${g('cfPhone')}",
    messageLabel: "${g('cfMessage')}",
    messagePlaceholder: "${g('cfPlaceholder')}",
    sending: "${g('cfSending')}",
    sendInquiry: "${g('cfSendInquiry')}",
    messageSent: "${g('cfMessageSent')}",
    weWillGetBack: "${g('cfWeWillGetBack')}",
    thankYouInquiry: "${g('cfThankYou')}",
    sendAnother: "${g('cfSendAnother')}",
  },
  destinationDetail: {
    about: "${g('about')}",
    interestingFacts: "${g('interestingFacts')}",
    toursIncluding: "${g('toursIncluding')}",
    noToursFound: "${g('noToursFound')}",
  },
  breadcrumb: {
    home: "${g('home')}",
    tours: "${g('bcTours')}",
    destinations: "${g('bcDestinations')}",
  },`;
}

// Also need to add keys to existing sections
function generateExistingPatches(lang) {
  const t = T[lang] || defaultT;
  const d = defaultT;
  const g = (key) => esc(t[key] || d[key]);
  
  return {
    common: `    whatsappUs: "${g('whatsappUs')}",`,
    secondaryHero: `    badge: "${g('badge')}",
    title: "${g('shTitle')}",
    titleHighlight: "${g('shHighlight')}",
    titleEnd: "${g('shEnd')}",
    subtitle: "${g('shSubtitle')}",
    seamlessTransfers: "${g('seamlessTransfers')}",
    seamlessTransfersDesc: "${g('seamlessTransfersDesc')}",
    fullProtection: "${g('fullProtection')}",
    fullProtectionDesc: "${g('fullProtectionDesc')}",
    support247: "${g('support247')}",
    support247Desc: "${g('support247Desc')}",
    startJourney: "${g('startJourney')}",`,
    tourDetail: `    reviews: "${g('reviews')}",
    hotelClassLabel: "${g('hotelClassLabel')}",
    orSimilar: "${g('orSimilar')}",
    pricingFinalNote: "${g('pricingFinalNote')}",
    highSeason: "${g('highSeason')}",
    lowSeason: "${g('lowSeason')}",
    travelers2: "${g('travelers2p')}",
    travelers3to5: "${g('travelers3to5')}",
    travelers6to7: "${g('travelers6to7')}",
    travelers8to9: "${g('travelers8to9')}",
    travelers10to14: "${g('travelers10to14')}",
    hotelDescription: "${g('hotelDescription')}",
    pricingDescription: "${g('pricingDescription')}",
    season: "${g('season')}",`,
    bookingForm: `    failedToSend: "${g('failedToSend')}",`,
    aboutPage: `    founderName: "Ahmed Al-Hassan",
    founderRole: "${g('founderRole')}",
    founderBio: "${g('founderBio')}",
    operationsName: "Sarah Mitchell",
    operationsRole: "${g('operationsRole')}",
    operationsBio: "${g('operationsBio')}",
    guideName: "Omar Khalil",
    guideRole: "${g('guideRole')}",
    guideBio: "${g('guideBio')}",`,
  };
}

// Process each locale
for (const lang of locales) {
  const filePath = path.join(localesDir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const patches = generateExistingPatches(lang);
  const newSections = generatePatch(lang);
  
  // 1. Add whatsappUs to common section - find the closing of common
  if (!content.includes('whatsappUs')) {
    content = content.replace(
      /("customize":\s*"[^"]*")\s*\n(\s*\})/m,
      `$1,\n${patches.common}\n$2`
    );
  }
  
  // 2. Add testimonial review keys - find testimonials closing
  // This is complex; for testimonials, we need to add the review keys
  // Let's check if review1Name already exists
  if (!content.includes('review1Name')) {
    // Add after subtitle in testimonials
    content = content.replace(
      /("testimonials":\s*\{[^}]*"subtitle":\s*"[^"]*")\s*\n(\s*\})/m,
      (match, before, close) => {
        // Read from the big translations object we built in the other script
        // For now, use English fallback for testimonials - they're review texts
        return `${before},
    review1Name: "Sarah Johnson",
    review1Location: "${lang === 'de' ? 'Vereinigte Staaten' : lang === 'fr' ? 'États-Unis' : lang === 'es' ? 'Estados Unidos' : lang === 'it' ? 'Stati Uniti' : lang === 'nl' ? 'Verenigde Staten' : lang === 'pt' ? 'Estados Unidos' : lang === 'pl' ? 'Stany Zjednoczone' : lang === 'ru' ? 'США' : lang === 'uk' ? 'США' : lang === 'tr' ? 'ABD' : lang === 'el' ? 'ΗΠΑ' : lang === 'bg' ? 'САЩ' : 'United States'}",
    review1Text: "Our Jordan Explorer tour was absolutely incredible! From the moment we arrived, everything was perfectly organized. The guides were knowledgeable and friendly, and the itinerary allowed us to see all the highlights while still having time to really experience each place. Petra was even more magnificent than I imagined!",
    review2Name: "David Chen",
    review2Location: "${lang === 'de' ? 'Kanada' : lang === 'fr' ? 'Canada' : lang === 'es' ? 'Canadá' : lang === 'it' ? 'Canada' : lang === 'ru' ? 'Канада' : lang === 'uk' ? 'Канада' : lang === 'tr' ? 'Kanada' : lang === 'pl' ? 'Kanada' : 'Canada'}",
    review2Text: "The 7-day luxury tour exceeded all our expectations. The accommodations were superb, especially the desert camp in Wadi Rum. Our guide Mohammed was exceptional - his knowledge of Jordan's history and culture made the experience so much richer. I've already recommended Jordan Explorer to all my friends!",
    review3Name: "Emma Wilson",
    review3Location: "${lang === 'de' ? 'Australien' : lang === 'fr' ? 'Australie' : lang === 'es' ? 'Australia' : lang === 'it' ? 'Australia' : lang === 'ru' ? 'Австралия' : lang === 'uk' ? 'Австралія' : lang === 'tr' ? 'Avustralya' : lang === 'nl' ? 'Australië' : lang === 'pl' ? 'Australia' : 'Australia'}",
    review3Text: "As a solo female traveler, I was looking for a tour company that would provide both adventure and security. Jordan Explorer delivered on both counts! The hiking trails were spectacular, and I felt completely safe and well-cared for throughout my journey. The Dead Sea experience was a highlight I'll never forget.",
    review4Name: "Carlos Mendez",
    review4Location: "${lang === 'de' ? 'Spanien' : lang === 'fr' ? 'Espagne' : lang === 'es' ? 'España' : lang === 'it' ? 'Spagna' : lang === 'nl' ? 'Spanje' : lang === 'ru' ? 'Испания' : lang === 'uk' ? 'Іспанія' : lang === 'tr' ? 'İspanya' : lang === 'pl' ? 'Hiszpania' : 'Spain'}",
    review4Text: "We took the family adventure package with our two children (ages 8 and 11), and it was perfect! The itinerary was well-paced for kids, with plenty of exciting activities balanced with downtime. The children loved the camel rides and stargazing in Wadi Rum. A truly unforgettable family experience!"
${close}`;
      }
    );
  }
  
  // 3. Add aboutPage team member keys
  if (!content.includes('founderName')) {
    content = content.replace(
      /("aboutPage":\s*\{[\s\S]*?"exploreTours":\s*"[^"]*")\s*\n(\s*\})/m,
      `$1,\n${patches.aboutPage}\n$2`
    );
  }
  
  // 4. Add secondaryHero new keys
  if (!content.includes('secondaryHero') || !content.includes('"badge"')) {
    // Check if secondaryHero exists
    if (content.includes('secondaryHero')) {
      content = content.replace(
        /("secondaryHero":\s*\{[^}]*"expertAdvice":\s*"[^"]*")\s*\n(\s*\})/m,
        `$1,\n${patches.secondaryHero}\n$2`
      );
    }
  }
  
  // 5. Add tourDetail new keys 
  if (!content.includes('"reviews"') || !content.includes('hotelClassLabel')) {
    content = content.replace(
      /("tourDetail"[\s\S]*?"shareTrip":\s*"[^"]*"),?\s*\n(\s*\})/m,
      `$1,\n${patches.tourDetail}\n$2`
    );
  }
  
  // 6. Add bookingForm.failedToSend
  if (!content.includes('failedToSend')) {
    content = content.replace(
      /("bookingForm"[\s\S]*?"daysLabel":\s*"[^"]*"),?\s*\n(\s*\})/m,
      `$1,\n${patches.bookingForm}\n$2`
    );
  }
  
  // 7. Add new sections before the closing `export default`
  if (!content.includes('reviewForm')) {
    content = content.replace(
      /\}\nexport default/,
      `${newSections}\n}\nexport default`
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Patched ${lang}.ts`);
}

console.log('\nDone! All locale files patched.');
