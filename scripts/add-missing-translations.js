#!/usr/bin/env node
/**
 * Script to add missing translation keys to all locale files.
 * Generates proper translations for each language.
 */

const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'lib', 'i18n', 'locales');

// New keys that need to be added to ALL locale files, with translations per language
// Format: { section: { key: { lang: "translation" } } }

const translations = {
  // Languages: de, fr, es, it, nl, pt, pl, sv, da, no, fi, cs, hu, ro, el, hr, bg, sk, sl, et, lv, lt, tr, ru, uk

  common: {
    whatsappUs: {
      de: "WhatsApp", fr: "WhatsApp", es: "WhatsApp", it: "WhatsApp", nl: "WhatsApp",
      pt: "WhatsApp", pl: "WhatsApp", sv: "WhatsApp", da: "WhatsApp", no: "WhatsApp",
      fi: "WhatsApp", cs: "WhatsApp", hu: "WhatsApp", ro: "WhatsApp", el: "WhatsApp",
      hr: "WhatsApp", bg: "WhatsApp", sk: "WhatsApp", sl: "WhatsApp", et: "WhatsApp",
      lv: "WhatsApp", lt: "WhatsApp", tr: "WhatsApp", ru: "WhatsApp", uk: "WhatsApp",
    },
  },

  testimonials: {
    review1Name: { de: "Sarah Johnson", fr: "Sarah Johnson", es: "Sarah Johnson", it: "Sarah Johnson", nl: "Sarah Johnson", pt: "Sarah Johnson", pl: "Sarah Johnson", sv: "Sarah Johnson", da: "Sarah Johnson", no: "Sarah Johnson", fi: "Sarah Johnson", cs: "Sarah Johnson", hu: "Sarah Johnson", ro: "Sarah Johnson", el: "Sarah Johnson", hr: "Sarah Johnson", bg: "Sarah Johnson", sk: "Sarah Johnson", sl: "Sarah Johnson", et: "Sarah Johnson", lv: "Sarah Johnson", lt: "Sarah Johnson", tr: "Sarah Johnson", ru: "Сара Джонсон", uk: "Сара Джонсон" },
    review1Location: { de: "Vereinigte Staaten", fr: "États-Unis", es: "Estados Unidos", it: "Stati Uniti", nl: "Verenigde Staten", pt: "Estados Unidos", pl: "Stany Zjednoczone", sv: "USA", da: "USA", no: "USA", fi: "Yhdysvallat", cs: "Spojené státy", hu: "Egyesült Államok", ro: "Statele Unite", el: "Ηνωμένες Πολιτείες", hr: "Sjedinjene Države", bg: "Съединени щати", sk: "Spojené štáty", sl: "Združene države", et: "Ameerika Ühendriigid", lv: "ASV", lt: "JAV", tr: "Amerika Birleşik Devletleri", ru: "США", uk: "США" },
    review1Text: {
      de: "Unsere Jordan Explorer Tour war absolut unglaublich! Vom Moment unserer Ankunft war alles perfekt organisiert. Die Reiseleiter waren kompetent und freundlich, und die Reiseroute ermöglichte es uns, alle Highlights zu sehen. Petra war noch großartiger als ich mir vorgestellt hatte!",
      fr: "Notre circuit avec Jordan Explorer était absolument incroyable ! Dès notre arrivée, tout était parfaitement organisé. Les guides étaient compétents et sympathiques, et l'itinéraire nous a permis de voir tous les points forts tout en ayant le temps de vraiment apprécier chaque lieu. Pétra était encore plus magnifique que je ne l'imaginais !",
      es: "¡Nuestro tour con Jordan Explorer fue absolutamente increíble! Desde el momento en que llegamos, todo estaba perfectamente organizado. Los guías eran conocedores y amables, y el itinerario nos permitió ver todos los puntos destacados. ¡Petra fue aún más magnífica de lo que imaginaba!",
      it: "Il nostro tour con Jordan Explorer è stato assolutamente incredibile! Dal momento del nostro arrivo, tutto era perfettamente organizzato. Le guide erano competenti e cordiali, e l'itinerario ci ha permesso di vedere tutti i punti salienti. Petra era ancora più magnifica di quanto immaginassi!",
      nl: "Onze Jordan Explorer-tour was absoluut ongelooflijk! Vanaf het moment dat we aankwamen, was alles perfect georganiseerd. De gidsen waren deskundig en vriendelijk. Petra was nog mooier dan ik me had voorgesteld!",
      pt: "Nosso tour com a Jordan Explorer foi absolutamente incrível! Desde o momento em que chegamos, tudo estava perfeitamente organizado. Os guias eram experientes e simpáticos. Petra foi ainda mais magnífica do que eu imaginava!",
      pl: "Nasza wycieczka z Jordan Explorer była absolutnie niesamowita! Od momentu przyjazdu wszystko było perfekcyjnie zorganizowane. Przewodnicy byli kompetentni i przyjaźni. Petra była jeszcze wspanialsza niż sobie wyobrażałam!",
      sv: "Vår Jordan Explorer-tur var helt otrolig! Från det ögonblick vi anlände var allt perfekt organiserat. Guiderna var kunniga och vänliga. Petra var ännu mer magnifik än jag föreställt mig!",
      da: "Vores Jordan Explorer-tur var helt utrolig! Fra det øjeblik vi ankom, var alt perfekt organiseret. Guiderne var vidende og venlige. Petra var endnu mere storslået end jeg havde forestillet mig!",
      no: "Vår Jordan Explorer-tur var helt utrolig! Fra øyeblikket vi ankom var alt perfekt organisert. Guidene var kunnskapsrike og vennlige. Petra var enda mer storslått enn jeg hadde forestilt meg!",
      fi: "Jordan Explorer -kiertomatkamme oli aivan uskomaton! Kaikki oli täydellisesti järjestetty saapumisestamme lähtien. Oppaat olivat asiantuntevia ja ystävällisiä. Petra oli vielä upeampi kuin olin kuvitellut!",
      cs: "Náš zájezd s Jordan Explorer byl naprosto neuvěřitelný! Od chvíle příjezdu bylo vše perfektně zorganizováno. Průvodci byli znalí a přátelští. Petra byla ještě velkolepější, než jsem si představovala!",
      hu: "A Jordan Explorer túránk egyszerűen hihetetlen volt! Az érkezésünk pillanatától kezdve minden tökéletesen meg volt szervezve. Az idegenvezetők hozzáértőek és barátságosak voltak. Petra még csodálatosabb volt, mint képzeltem!",
      ro: "Turul nostru cu Jordan Explorer a fost absolut incredibil! Din momentul în care am ajuns, totul a fost perfect organizat. Ghizii erau pricepuți și prietenoși. Petra a fost și mai magnifică decât mi-am imaginat!",
      el: "Η περιήγησή μας με τη Jordan Explorer ήταν απολύτως απίστευτη! Από τη στιγμή που φτάσαμε, τα πάντα ήταν τέλεια οργανωμένα. Οι ξεναγοί ήταν γνώστες και φιλικοί. Η Πέτρα ήταν ακόμα πιο μεγαλοπρεπής από ό,τι φανταζόμουν!",
      hr: "Naše putovanje s Jordan Explorerom bilo je apsolutno nevjerojatno! Od trenutka dolaska sve je bilo savršeno organizirano. Vodiči su bili stručni i ljubazni. Petra je bila još veličanstvenija nego što sam zamišljala!",
      bg: "Нашето пътуване с Jordan Explorer беше абсолютно невероятно! От момента на пристигането ни всичко беше перфектно организирано. Екскурзоводите бяха компетентни и приятелски настроени. Петра беше още по-великолепна, отколкото си представях!",
      sk: "Náš zájazd s Jordan Explorer bol absolútne neuveriteľný! Od momentu príchodu bolo všetko perfektne zorganizované. Sprievodcovia boli znalí a priateľskí. Petra bola ešte veľkolepejšia, ako som si predstavovala!",
      sl: "Naše potovanje z Jordan Explorerjem je bilo neverjetno! Od trenutka prihoda je bilo vse odlično organizirano. Vodniki so bili strokovni in prijazni. Petra je bila še bolj veličastna, kot sem si predstavljala!",
      et: "Meie Jordan Exploreri reis oli lihtsalt uskumatu! Alates saabumise hetkest oli kõik suurepäraselt korraldatud. Giidid olid asjatundlikud ja sõbralikud. Petra oli veelgi suurejoonelisem, kui olin ette kujutanud!",
      lv: "Mūsu Jordan Explorer tūre bija vienkārši neticama! No brīža, kad ieradāmies, viss bija perfekti organizēts. Gidi bija zinoši un draudzīgi. Petra bija vēl krāšņāka, nekā es iedomājos!",
      lt: "Mūsų kelionė su Jordan Explorer buvo tiesiog neįtikėtina! Nuo pat atvykimo momento viskas buvo tobulai suorganizuota. Gidai buvo kompetentingi ir draugiški. Petra buvo dar nuostabesnė, nei įsivaizdavau!",
      tr: "Jordan Explorer turumuzu kesinlikle inanılmazdı! Varış anımızdan itibaren her şey mükemmel organize edilmişti. Rehberler bilgili ve güler yüzlüydü. Petra hayal ettiğimden bile daha muhteşemdi!",
      ru: "Наш тур с Jordan Explorer был просто невероятным! С момента прибытия всё было идеально организовано. Гиды были знающими и дружелюбными. Петра оказалась ещё величественнее, чем я себе представляла!",
      uk: "Наш тур з Jordan Explorer був просто неймовірним! З моменту прибуття все було ідеально організовано. Гіди були знаючими та привітними. Петра виявилася ще величнішою, ніж я уявляла!",
    },
    review2Name: { de: "David Chen", fr: "David Chen", es: "David Chen", it: "David Chen", nl: "David Chen", pt: "David Chen", pl: "David Chen", sv: "David Chen", da: "David Chen", no: "David Chen", fi: "David Chen", cs: "David Chen", hu: "David Chen", ro: "David Chen", el: "David Chen", hr: "David Chen", bg: "Дейвид Чен", sk: "David Chen", sl: "David Chen", et: "David Chen", lv: "David Chen", lt: "David Chen", tr: "David Chen", ru: "Дэвид Чен", uk: "Девід Чен" },
    review2Location: { de: "Kanada", fr: "Canada", es: "Canadá", it: "Canada", nl: "Canada", pt: "Canadá", pl: "Kanada", sv: "Kanada", da: "Canada", no: "Canada", fi: "Kanada", cs: "Kanada", hu: "Kanada", ro: "Canada", el: "Καναδάς", hr: "Kanada", bg: "Канада", sk: "Kanada", sl: "Kanada", et: "Kanada", lv: "Kanāda", lt: "Kanada", tr: "Kanada", ru: "Канада", uk: "Канада" },
    review2Text: {
      de: "Die 7-tägige Luxustour hat all unsere Erwartungen übertroffen. Die Unterkünfte waren hervorragend, besonders das Wüstencamp im Wadi Rum. Unser Reiseleiter Mohammed war außergewöhnlich. Ich habe Jordan Explorer bereits allen meinen Freunden empfohlen!",
      fr: "Le circuit luxe de 7 jours a dépassé toutes nos attentes. Les hébergements étaient superbes, surtout le camp dans le désert du Wadi Rum. Notre guide Mohammed était exceptionnel. J'ai déjà recommandé Jordan Explorer à tous mes amis !",
      es: "¡El tour de lujo de 7 días superó todas nuestras expectativas! Los alojamientos fueron magníficos, especialmente el campamento en Wadi Rum. Nuestro guía Mohammed fue excepcional. ¡Ya he recomendado Jordan Explorer a todos mis amigos!",
      it: "Il tour di lusso di 7 giorni ha superato tutte le nostre aspettative. Le sistemazioni erano superbe, soprattutto il campo nel deserto del Wadi Rum. La nostra guida Mohammed era eccezionale. Ho già consigliato Jordan Explorer a tutti i miei amici!",
      nl: "De 7-daagse luxetour overtrof al onze verwachtingen. De accommodaties waren uitstekend, vooral het woestijnkamp in Wadi Rum. Onze gids Mohammed was uitzonderlijk. Ik heb Jordan Explorer al aan al mijn vrienden aanbevolen!",
      pt: "O tour de luxo de 7 dias superou todas as nossas expectativas. As acomodações eram excelentes, especialmente o acampamento no Wadi Rum. Nosso guia Mohammed foi excepcional. Já recomendei a Jordan Explorer a todos os meus amigos!",
      pl: "7-dniowa wycieczka luksusowa przekroczyła wszystkie nasze oczekiwania. Zakwaterowanie było doskonałe, szczególnie obóz na pustyni w Wadi Rum. Nasz przewodnik Mohammed był wyjątkowy. Już poleciłem Jordan Explorer wszystkim moim znajomym!",
      sv: "Den 7-dagars lyxresan överträffade alla våra förväntningar. Boendet var utmärkt, särskilt ökenlägret i Wadi Rum. Vår guide Mohammed var enastående. Jag har redan rekommenderat Jordan Explorer till alla mina vänner!",
      da: "Den 7-dages luksustur overgik alle vores forventninger. Indkvarteringen var fremragende, især ørkenslejren i Wadi Rum. Vores guide Mohammed var enestående. Jeg har allerede anbefalet Jordan Explorer til alle mine venner!",
      no: "7-dagers luksusturen overgikk alle våre forventninger. Overnattingene var utmerkede, spesielt ørkencampen i Wadi Rum. Guiden vår Mohammed var enestående. Jeg har allerede anbefalt Jordan Explorer til alle vennene mine!",
      fi: "7 päivän luksuskierros ylitti kaikki odotuksemme. Majoitus oli erinomaista, erityisesti aavikkoteltta Wadi Rumissa. Oppaamme Mohammed oli poikkeuksellinen. Olen jo suositellut Jordan Exploreria kaikille ystävilleni!",
      cs: "Sedmidenní luxusní zájezd předčil veškerá naše očekávání. Ubytování bylo skvělé, zejména pouštní tábor ve Wádí Rum. Náš průvodce Mohammed byl výjimečný. Už jsem Jordan Explorer doporučil všem svým přátelům!",
      hu: "A 7 napos luxus túra minden várakozásunkat felülmúlta. A szállás kiváló volt, különösen a Wadi Rum-i sivatagi tábor. Idegenvezetőnk, Mohammed, kivételes volt. Már minden barátomnak ajánlottam a Jordan Explorert!",
      ro: "Turul de lux de 7 zile a depășit toate așteptările noastre. Cazarea a fost superbă, mai ales tabăra din deșertul Wadi Rum. Ghidul nostru Mohammed a fost excepțional. Am recomandat deja Jordan Explorer tuturor prietenilor mei!",
      el: "Η 7ήμερη πολυτελής περιήγηση ξεπέρασε όλες τις προσδοκίες μας. Τα καταλύματα ήταν εξαιρετικά, ειδικά η κατασκήνωση στο Wadi Rum. Ο ξεναγός μας Μωχάμεντ ήταν εξαιρετικός. Έχω ήδη προτείνει τη Jordan Explorer σε όλους τους φίλους μου!",
      hr: "7-dnevno luksuzno putovanje nadmašilo je sva naša očekivanja. Smještaj je bio izvrstan, posebno pustinjski kamp u Wadi Rumu. Naš vodič Mohammed bio je izniman. Već sam preporučio Jordan Explorer svim svojim prijateljima!",
      bg: "7-дневната луксозна обиколка надмина всички наши очаквания. Настаняването беше великолепно, особено пустинният лагер във Вади Рум. Нашият екскурзовод Мохамед беше изключителен. Вече препоръчах Jordan Explorer на всичките си приятели!",
      sk: "7-dňový luxusný zájazd prekonal všetky naše očakávania. Ubytovanie bolo vynikajúce, najmä púštny tábor vo Wádí Rum. Náš sprievodca Mohammed bol výnimočný. Už som Jordan Explorer odporučil všetkým priateľom!",
      sl: "7-dnevno luksuzno potovanje je preseglo vsa naša pričakovanja. Nastanitev je bila odlična, posebej puščavski tabor v Wadi Rumu. Naš vodnik Mohammed je bil izjemen. Jordan Explorer sem že priporočil vsem prijateljem!",
      et: "7-päevane luksusreis ületas kõik meie ootused. Majutus oli suurepärane, eriti kõrblaager Wadi Rumis. Meie giid Mohammed oli erakordne. Olen Jordan Explorerit juba kõigile oma sõpradele soovitanud!",
      lv: "7 dienu luksusa tūre pārsniedza visas mūsu cerības. Izmitināšana bija izcila, īpaši tuksneša nometne Vadi Rumā. Mūsu gids Mohameds bija izcils. Esmu jau ieteicis Jordan Explorer visiem saviem draugiem!",
      lt: "7 dienų prabangos kelionė pranoko visus mūsų lūkesčius. Apgyvendinimas buvo puikus, ypač dykumos stovykla Wadi Rume. Mūsų gidas Mohamedas buvo išskirtinis. Jau rekomendavau Jordan Explorer visiems draugams!",
      tr: "7 günlük lüks tur tüm beklentilerimizi aştı. Konaklama harikaydı, özellikle Wadi Rum'daki çöl kampı. Rehberimiz Mohammed olağanüstüydü. Jordan Explorer'ı tüm arkadaşlarıma çoktan tavsiye ettim!",
      ru: "7-дневный люкс-тур превзошёл все наши ожидания. Размещение было превосходным, особенно пустынный лагерь в Вади-Рам. Наш гид Мохаммед был исключительным. Я уже рекомендовал Jordan Explorer всем своим друзьям!",
      uk: "7-денний люкс-тур перевершив усі наші очікування. Розміщення було чудовим, особливо пустельний табір у Ваді-Рам. Наш гід Мохаммед був винятковим. Я вже рекомендував Jordan Explorer усім своїм друзям!",
    },
    review3Name: { de: "Emma Wilson", fr: "Emma Wilson", es: "Emma Wilson", it: "Emma Wilson", nl: "Emma Wilson", pt: "Emma Wilson", pl: "Emma Wilson", sv: "Emma Wilson", da: "Emma Wilson", no: "Emma Wilson", fi: "Emma Wilson", cs: "Emma Wilson", hu: "Emma Wilson", ro: "Emma Wilson", el: "Emma Wilson", hr: "Emma Wilson", bg: "Ема Уилсън", sk: "Emma Wilson", sl: "Emma Wilson", et: "Emma Wilson", lv: "Emma Wilson", lt: "Emma Wilson", tr: "Emma Wilson", ru: "Эмма Уилсон", uk: "Емма Вілсон" },
    review3Location: { de: "Australien", fr: "Australie", es: "Australia", it: "Australia", nl: "Australië", pt: "Austrália", pl: "Australia", sv: "Australien", da: "Australien", no: "Australia", fi: "Australia", cs: "Austrálie", hu: "Ausztrália", ro: "Australia", el: "Αυστραλία", hr: "Australija", bg: "Австралия", sk: "Austrália", sl: "Avstralija", et: "Austraalia", lv: "Austrālija", lt: "Australija", tr: "Avustralya", ru: "Австралия", uk: "Австралія" },
    review3Text: {
      de: "Als alleinreisende Frau suchte ich ein Tourunternehmen, das sowohl Abenteuer als auch Sicherheit bietet. Jordan Explorer hat beides geliefert! Die Wanderwege waren spektakulär, und ich fühlte mich durchgehend sicher und gut betreut. Das Tote-Meer-Erlebnis werde ich nie vergessen.",
      fr: "En tant que voyageuse solo, je cherchais une agence offrant aventure et sécurité. Jordan Explorer a tenu ses promesses ! Les sentiers de randonnée étaient spectaculaires et je me suis sentie en sécurité tout au long du voyage. L'expérience de la mer Morte restera inoubliable.",
      es: "Como viajera solitaria, buscaba una empresa que ofreciera aventura y seguridad. ¡Jordan Explorer cumplió en ambos aspectos! Las rutas de senderismo eran espectaculares y me sentí completamente segura. La experiencia del Mar Muerto fue inolvidable.",
      it: "Come viaggiatrice solitaria, cercavo un tour operator che offrisse avventura e sicurezza. Jordan Explorer ha mantenuto entrambe le promesse! I sentieri erano spettacolari e mi sono sentita al sicuro durante tutto il viaggio. L'esperienza del Mar Morto è stata indimenticabile.",
      nl: "Als solo vrouwelijke reiziger zocht ik een touroperator die zowel avontuur als veiligheid biedt. Jordan Explorer leverde op beide fronten! De wandelpaden waren spectaculair en ik voelde me volkomen veilig. De Dode Zee-ervaring zal ik nooit vergeten.",
      pt: "Como viajante solo, procurava uma empresa que oferecesse aventura e segurança. A Jordan Explorer entregou ambas! As trilhas eram espetaculares e me senti completamente segura. A experiência do Mar Morto foi inesquecível.",
      pl: "Jako samotna podróżniczka szukałam firmy oferującej przygodę i bezpieczeństwo. Jordan Explorer spełnił oba wymagania! Szlaki turystyczne były spektakularne, a ja czułam się bezpiecznie. Doświadczenie Morza Martwego nigdy nie zapomnę.",
      sv: "Som ensamresande kvinna sökte jag ett resebolag som erbjöd både äventyr och trygghet. Jordan Explorer levererade på båda! Vandringslederna var spektakulära och jag kände mig helt trygg. Döda havet-upplevelsen glömmer jag aldrig.",
      da: "Som solo kvindelig rejsende søgte jeg et rejseselskab med både eventyr og sikkerhed. Jordan Explorer leverede på begge! Vandrestierne var spektakulære, og jeg følte mig helt tryg. Dødehavet-oplevelsen glemmer jeg aldrig.",
      no: "Som kvinnelig soloreisende søkte jeg et reiseselskap som tilbød eventyr og sikkerhet. Jordan Explorer leverte på begge! Turløypene var spektakulære, og jeg følte meg helt trygg. Dødehavet-opplevelsen glemmer jeg aldri.",
      fi: "Yksin matkustavana naisena etsin matkanjärjestäjää, joka tarjoaa sekä seikkailua että turvallisuutta. Jordan Explorer toimitti molemmat! Vaellusreitit olivat upeita ja tunsin oloni turvalliseksi koko ajan. Kuolleenmeren kokemus on unohtumaton.",
      cs: "Jako sólově cestující žena jsem hledala společnost nabízející dobrodružství i bezpečnost. Jordan Explorer splnil obojí! Turistické stezky byly velkolepé a cítila jsem se po celou dobu v bezpečí. Zážitek u Mrtvého moře nikdy nezapomenu.",
      hu: "Egyedül utazó nőként olyan céget kerestem, amely kalandot és biztonságot is nyújt. A Jordan Explorer mindkettőt teljesítette! A túraútvonalak látványosak voltak, és végig biztonságban éreztem magam. A Holt-tengeri élmény felejthetetlen marad.",
      ro: "Ca femeie călătorind singură, căutam o companie care să ofere aventură și siguranță. Jordan Explorer a livrat pe ambele fronturi! Traseele de drumeție erau spectaculoase și m-am simțit complet în siguranță. Experiența de la Marea Moartă rămâne de neuitat.",
      el: "Ως γυναίκα που ταξιδεύει μόνη, έψαχνα μια εταιρεία που προσφέρει περιπέτεια και ασφάλεια. Η Jordan Explorer τα πρόσφερε και τα δύο! Τα μονοπάτια πεζοπορίας ήταν εντυπωσιακά και ένιωσα απόλυτα ασφαλής. Η εμπειρία στη Νεκρά Θάλασσα ήταν αξέχαστη.",
      hr: "Kao žena koja putuje sama, tražila sam tvrtku koja nudi avanturu i sigurnost. Jordan Explorer isporučio je oboje! Planinarske staze bile su spektakularne, a osjećala sam se potpuno sigurno. Doživljaj Mrtvog mora nikad neću zaboraviti.",
      bg: "Като жена, пътуваща самостоятелно, търсех компания, предлагаща приключение и сигурност. Jordan Explorer осигури и двете! Пътеките бяха впечатляващи и се чувствах напълно в безопасност. Преживяването на Мъртво море ще остане незабравимо.",
      sk: "Ako žena cestujúca sama som hľadala spoločnosť ponúkajúcu dobrodružstvo aj bezpečnosť. Jordan Explorer splnil oboje! Turistické trasy boli veľkolepé a cítila som sa úplne bezpečne. Zážitok z Mŕtveho mora nikdy nezabudnem.",
      sl: "Kot ženska, ki potuje sama, sem iskala podjetje, ki ponuja pustolovščino in varnost. Jordan Explorer je izpolnil oboje! Pohodniške poti so bile spektakularne in počutila sem se popolnoma varno. Izkušnja na Mrtvem morju bo ostala nepozabna.",
      et: "Üksinda reisiva naisena otsisin ettevõtet, mis pakuks nii seiklust kui turvalisust. Jordan Explorer pakkus mõlemat! Matkarajad olid suurepärased ja tundsin end kogu aja turvaliselt. Surnumere kogemus on unustamatu.",
      lv: "Kā sieviete, kas ceļo viena, meklēju uzņēmumu, kas piedāvā gan piedzīvojumu, gan drošību. Jordan Explorer nodrošināja abus! Pārgājienu maršruti bija iespaidīgi, un es jutosi pilnīgi droši. Nāves jūras pieredze paliks neaizmirstama.",
      lt: "Kaip viena keliaujanti moteris ieškojau įmonės, siūlančios nuotykius ir saugumą. Jordan Explorer pateikė abu! Žygių takai buvo įspūdingi ir jaučiausi visiškai saugiai. Negyvosios jūros patirtis bus neužmirštama.",
      tr: "Tek başına seyahat eden bir kadın olarak hem macera hem güvenlik sunan bir şirket arıyordum. Jordan Explorer her ikisini de sağladı! Yürüyüş parkurları muhteşemdi ve kendimi tamamen güvende hissettim. Ölü Deniz deneyimini asla unutmayacağım.",
      ru: "Как женщина, путешествующая в одиночку, я искала компанию, которая обеспечит и приключения, и безопасность. Jordan Explorer предоставил и то, и другое! Пешеходные маршруты были впечатляющими, и я чувствовала себя в полной безопасности. Впечатления от Мёртвого моря незабываемы.",
      uk: "Як жінка, що подорожує сама, я шукала компанію, яка забезпечить і пригоди, і безпеку. Jordan Explorer забезпечив і те, й інше! Піші маршрути були вражаючими, і я почувалася в повній безпеці. Враження від Мертвого моря незабутні.",
    },
    review4Name: { de: "Carlos Mendez", fr: "Carlos Mendez", es: "Carlos Méndez", it: "Carlos Mendez", nl: "Carlos Mendez", pt: "Carlos Mendez", pl: "Carlos Mendez", sv: "Carlos Mendez", da: "Carlos Mendez", no: "Carlos Mendez", fi: "Carlos Mendez", cs: "Carlos Mendez", hu: "Carlos Mendez", ro: "Carlos Mendez", el: "Κάρλος Μέντεζ", hr: "Carlos Mendez", bg: "Карлос Мендес", sk: "Carlos Mendez", sl: "Carlos Mendez", et: "Carlos Mendez", lv: "Carlos Mendez", lt: "Carlos Mendez", tr: "Carlos Mendez", ru: "Карлос Мендес", uk: "Карлос Мендес" },
    review4Location: { de: "Spanien", fr: "Espagne", es: "España", it: "Spagna", nl: "Spanje", pt: "Espanha", pl: "Hiszpania", sv: "Spanien", da: "Spanien", no: "Spania", fi: "Espanja", cs: "Španělsko", hu: "Spanyolország", ro: "Spania", el: "Ισπανία", hr: "Španjolska", bg: "Испания", sk: "Španielsko", sl: "Španija", et: "Hispaania", lv: "Spānija", lt: "Ispanija", tr: "İspanya", ru: "Испания", uk: "Іспанія" },
    review4Text: {
      de: "Wir haben das Familienabenteuer-Paket mit unseren beiden Kindern (8 und 11 Jahre) gebucht, und es war perfekt! Die Reiseroute war kindgerecht, mit vielen aufregenden Aktivitäten und Ruhepausen. Die Kinder liebten die Kamelritte und das Sternegucken im Wadi Rum. Ein wahrhaft unvergessliches Familienerlebnis!",
      fr: "Nous avons choisi le forfait aventure familiale avec nos deux enfants (8 et 11 ans), et c'était parfait ! L'itinéraire était bien adapté aux enfants, avec plein d'activités passionnantes. Les enfants ont adoré les balades à dos de chameau et l'observation des étoiles au Wadi Rum. Une expérience familiale vraiment inoubliable !",
      es: "¡Tomamos el paquete de aventura familiar con nuestros dos hijos (8 y 11 años) y fue perfecto! El itinerario estaba bien adaptado para niños. A los niños les encantaron los paseos en camello y la observación de estrellas en Wadi Rum. ¡Una experiencia familiar verdaderamente inolvidable!",
      it: "Abbiamo scelto il pacchetto avventura per famiglie con i nostri due figli (8 e 11 anni) ed è stato perfetto! L'itinerario era ben calibrato per i bambini. I bambini hanno adorato i giri in cammello e l'osservazione delle stelle nel Wadi Rum. Un'esperienza familiare davvero indimenticabile!",
      nl: "We namen het familieavontuurpakket met onze twee kinderen (8 en 11 jaar) en het was perfect! Het programma was goed afgestemd op kinderen. De kinderen waren dol op de kameelritten en het sterrenkijken in Wadi Rum. Een onvergetelijke familieervaring!",
      pt: "Fizemos o pacote de aventura familiar com nossos dois filhos (8 e 11 anos) e foi perfeito! O itinerário era bem adaptado para crianças. As crianças adoraram os passeios de camelo e a observação de estrelas em Wadi Rum. Uma experiência familiar verdadeiramente inesquecível!",
      pl: "Wybraliśmy pakiet przygodowy dla rodzin z dwójką dzieci (8 i 11 lat) i było idealnie! Plan podróży był dobrze dostosowany do dzieci. Dzieci uwielbiały jazdę na wielbłądach i obserwowanie gwiazd w Wadi Rum. Naprawdę niezapomniane przeżycie rodzinne!",
      sv: "Vi tog familjeäventyrspaketet med våra två barn (8 och 11 år) och det var perfekt! Resplanen var väl anpassad för barn. Barnen älskade kamelriderna och stjärnskådningen i Wadi Rum. En verkligt oförglömlig familjeupplevelse!",
      da: "Vi tog familieeventyrpakken med vores to børn (8 og 11 år), og det var perfekt! Rejseplanen var velafstemt for børn. Børnene elskede kamelriderne og stjernekiggeriet i Wadi Rum. En virkelig uforglemmelig familieoplevelse!",
      no: "Vi tok familieeventyrpakken med våre to barn (8 og 11 år), og det var perfekt! Reiseruten var godt tilpasset barn. Barna elsket kamelridene og stjernekikkingen i Wadi Rum. En virkelig uforglemmelig familieopplevelse!",
      fi: "Valitsimme perheen seikkailupaketin kahden lapsemme (8 ja 11 vuotta) kanssa, ja se oli täydellistä! Ohjelma oli hyvin suunniteltu lapsille. Lapset rakastivat kameliratsastusta ja tähtien katselua Wadi Rumissa. Todella unohtumaton perhekokemus!",
      cs: "Vzali jsme rodinný dobrodružný balíček s našimi dvěma dětmi (8 a 11 let) a bylo to perfektní! Itinerář byl skvěle přizpůsoben dětem. Děti milovaly jízdu na velbloudech a pozorování hvězd ve Wádí Rum. Opravdu nezapomenutelný rodinný zážitek!",
      hu: "A családi kalandcsomagot választottuk két gyermekünkkel (8 és 11 éves), és tökéletes volt! Az útvonal jól illeszkedett a gyerekekhez. A gyerekek imádták a tevés lovaglást és a csillaglesést Wadi Rumban. Igazán felejthetetlen családi élmény!",
      ro: "Am ales pachetul de aventură pentru familii cu cei doi copii ai noștri (8 și 11 ani) și a fost perfect! Itinerariul era bine adaptat pentru copii. Copiii au adorat plimbările cu cămila și observarea stelelor în Wadi Rum. O experiență de familie cu adevărat de neuitat!",
      el: "Επιλέξαμε το οικογενειακό πακέτο περιπέτειας με τα δύο παιδιά μας (8 και 11 ετών) και ήταν τέλειο! Το πρόγραμμα ήταν καλά προσαρμοσμένο για παιδιά. Τα παιδιά λάτρεψαν τις βόλτες με καμήλα και την αστρονομική παρατήρηση στο Wadi Rum. Μια πραγματικά αξέχαστη οικογενειακή εμπειρία!",
      hr: "Izabrali smo obiteljski avanturistički paket s dvoje djece (8 i 11 godina) i bilo je savršeno! Raspored je bio dobro prilagođen djeci. Djeca su obožavala jahanje deva i promatranje zvijezda u Wadi Rumu. Zaista nezaboravno obiteljsko iskustvo!",
      bg: "Избрахме семейния приключенски пакет с двете ни деца (на 8 и 11 години) и беше перфектно! Маршрутът беше чудесно пригоден за деца. Децата обожаваха яденето на камили и наблюдението на звезди във Вади Рум. Наистина незабравимо семейно преживяване!",
      sk: "Vzali sme rodinný dobrodružný balíček s dvoma deťmi (8 a 11 rokov) a bolo to perfektné! Itinerár bol skvele prispôsobený deťom. Deti milovali jazdu na ťavách a pozorovanie hviezd vo Wádí Rum. Naozaj nezabudnuteľný rodinný zážitok!",
      sl: "Izbrali smo družinski pustolovščinski paket z dvema otrokoma (8 in 11 let) in bilo je popolno! Načrt je bil odlično prilagojen otrokom. Otroci so obožovali jahanje kamel in opazovanje zvezd v Wadi Rumu. Res nepozabna družinska izkušnja!",
      et: "Valisime pereseikluse paketi oma kahe lapsega (8 ja 11 aastat) ja see oli täiuslik! Programm oli hästi kohandatud lastele. Lastele meeldisid kaameli ratsutamine ja tähtede vaatamine Wadi Rumis. Tõeliselt unustamatu pereelamus!",
      lv: "Izvēlējāmies ģimenes piedzīvojumu paketi ar diviem bērniem (8 un 11 gadi), un tas bija ideāli! Maršruts bija labi pielāgots bērniem. Bērniem patika kamieļjāšana un zvaigžņu vērošana Vadi Rumā. Patiesi neaizmirstams ģimenes piedzīvojums!",
      lt: "Pasirinkome šeimos nuotykių paketą su dviem vaikais (8 ir 11 metų) ir buvo tobula! Maršrutas buvo puikiai pritaikytas vaikams. Vaikai mėgo jodinėjimą kupranugariais ir žvaigždžių stebėjimą Wadi Rume. Tikrai nepamirštama šeimos patirtis!",
      tr: "İki çocuğumuzla (8 ve 11 yaş) aile macera paketini aldık ve mükemmeldi! Program çocuklar için iyi ayarlanmıştı. Çocuklar deve binmeyi ve Wadi Rum'da yıldız izlemeyi çok sevdiler. Gerçekten unutulmaz bir aile deneyimi!",
      ru: "Мы выбрали семейный приключенческий пакет с двумя детьми (8 и 11 лет), и это было идеально! Маршрут был отлично адаптирован для детей. Дети обожали катание на верблюдах и наблюдение за звёздами в Вади-Рам. Поистине незабываемый семейный опыт!",
      uk: "Ми обрали сімейний пригодницький пакет з двома дітьми (8 та 11 років), і це було ідеально! Маршрут був чудово пристосований для дітей. Діти обожнювали катання на верблюдах та спостереження за зірками у Ваді-Рам. Справді незабутній сімейний досвід!",
    },
  },
};

// This script is too large for inline translations of ALL new sections.
// Instead, let me generate a comprehensive patch file.

// Read en.ts to extract all keys
const enContent = fs.readFileSync(path.join(localesDir, 'en.ts'), 'utf-8');

// For each locale, read, parse, add missing keys, write back
const locales = ['de', 'fr', 'es', 'it', 'nl', 'pt', 'pl', 'sv', 'da', 'no', 'fi', 'cs', 'hu', 'ro', 'el', 'hr', 'bg', 'sk', 'sl', 'et', 'lv', 'lt', 'tr', 'ru', 'uk'];

console.log('This script is a placeholder. Use the node script generate-all-locales.js instead.');
