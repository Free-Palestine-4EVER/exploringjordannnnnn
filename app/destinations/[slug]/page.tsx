"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronRight, MapPin, Star } from "lucide-react"
import Link from "next/link"
import TourCardEnhanced from "@/components/tour-card-enhanced"
import UniversalBookingForm from "@/components/universal-booking-form"

import { notFound } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import toursData from "@/data/tours.json"
import type { Tour } from "@/lib/types/tour"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Send, CheckCircle2 } from "lucide-react"
import { formatPrice } from "@/lib/tour-utils"

interface DestinationPageProps {
  params: {
    slug: string
  }
}

export default function DestinationPage({ params }: DestinationPageProps) {
  // This would normally come from a database or API
  const destinations = {
    petra: {
      name: "Petra",
      title: "Petra: The Rose City",
      description:
        "Petra is a famous archaeological site in Jordan's southwestern desert. Dating to around 300 B.C., it was the capital of the Nabatean Kingdom. Accessed via a narrow canyon called Al Siq, it contains tombs and temples carved into pink sandstone cliffs, earning its nickname, the 'Rose City.' Its most famous structure is 45m-high Al Khazneh, a temple with an ornate, Greek-style facade, and known as The Treasury.",
      longDescription:
        "Petra is half-built, half-carved into the rock, and is surrounded by mountains riddled with passages and gorges. It is one of the world's most famous archaeological sites, where ancient Eastern traditions blend with Hellenistic architectural facades. Petra was the capital of the Nabataean empire of King Aretas IV, and likely existed in its prime from 9 B.C. to A.D. 40. The members of this civilization proved to be early experts in manipulating water technology, constructing intricate tunnels and water chambers, which helped create an artificial oasis. The site was recognized as a World Heritage Site by UNESCO in 1985 and named one of the New Seven Wonders of the World in 2007.",
      image: "/images/tours/jordan-highlights-6d5n/petra.png",
      heroImage: "/images/tours/jordan-highlights-6d5n/petra.png",
      facts: [
        "Petra was named a UNESCO World Heritage Site in 1985",
        "Only 15% of Petra has been explored, with 85% still underground",
        "Petra was rediscovered in 1812 by Swiss explorer Johann Ludwig Burckhardt",
        "The Treasury (Al-Khazneh) is nearly 40 meters high",
        "Petra is also known as the Rose City due to the color of the stone",
      ],
      activities: [
        "Explore the Siq and Treasury",
        "Hike to the Monastery (Ad Deir)",
        "Visit Petra by Night",
        "Discover the Royal Tombs",
        "Explore Little Petra",
      ],
      relatedTours: ["best-of-jordan", "petra-wadi-rum-adventure", "jordan-highlights", "petra-explorer"],
    },
    "wadi-rum": {
      name: "Wadi Rum",
      title: "Wadi Rum: The Valley of the Moon",
      description:
        "Wadi Rum, also known as the Valley of the Moon, is a valley cut into the sandstone and granite rock in southern Jordan. It is the largest wadi in Jordan and has been inhabited since prehistoric times. The area is now one of Jordan's important tourist destinations and attracts an increasing number of foreign tourists, particularly trekkers and climbers.",
      longDescription:
        "Wadi Rum is home to the Zalabia Bedouin who work with climbers and trekkers, and have made a success of developing eco-adventure tourism. The area is now one of Jordan's important tourist destinations and attracts an increasing number of foreign tourists, particularly trekkers and climbers, but also for camel and horse safaris or simply day-trippers from Aqaba or Petra. Popular activities in the desert environment include camping under the stars, riding Arabian horses, hiking and rock-climbing among the massive rock formations. Jeep tours have become an increasingly popular way to explore the vast desert landscape.",
      image: "/images/tours/jordan-highlights-6d5n/wadi-rum.png",
      heroImage: "/images/tours/jordan-highlights-6d5n/wadi-rum.png",
      facts: [
        "Wadi Rum was used as a filming location for Lawrence of Arabia",
        "The area has been inhabited since prehistoric times",
        "The landscape consists of sandstone mountains and red sand dunes",
        "It's home to the Zalabia Bedouin tribe",
        "Wadi Rum was declared a UNESCO World Heritage Site in 2011",
      ],
      activities: ["Jeep Safari Tours", "Camel Riding", "Stargazing", "Rock Climbing", "Hot Air Balloon Rides"],
      relatedTours: ["desert-expedition", "best-of-jordan", "wadi-rum-stars", "jordan-adventure-tour"],
    },
    "dead-sea": {
      name: "Dead Sea",
      title: "Dead Sea: The Lowest Point on Earth",
      description:
        "The Dead Sea is a salt lake bordered by Jordan to the east and Israel and the West Bank to the west. It lies in the Jordan Rift Valley, and its main tributary is the Jordan River. The Dead Sea is 304 m (997 ft) deep, the deepest hypersaline lake in the world. With a salinity of 342 g/kg, or 34.2% (in 2011), it is one of the world's saltiest bodies of water.",
      longDescription:
        "The Dead Sea is an endorheic lake located in the Jordan Rift Valley, a geographic feature formed by the Dead Sea Transform. This left lateral-moving transform fault lies along the tectonic plate boundary between the African Plate and the Arabian Plate. It runs between the East Anatolian Fault zone in Turkey and the northern end of the Red Sea Rift offshore of the southern tip of Sinai. The Dead Sea is 50 kilometers (31 mi) long and 15 kilometers (9 mi) wide at its widest point. It lies in the Jordan Rift Valley and its main tributary is the Jordan River. The Dead Sea has attracted visitors from around the Mediterranean Basin for thousands of years. It was one of the world's first health resorts (for Herod the Great), and it has been the supplier of a wide variety of products, from asphalt for Egyptian mummification to potash for fertilizers.",
      image: "/dead-sea-floating-jordan.jpg",
      heroImage: "/dead-sea-floating-jordan.jpg",
      facts: [
        "The Dead Sea is the lowest point on Earth at 430.5 meters (1,412 ft) below sea level",
        "Its salinity is 34.2%, making it one of the world's saltiest bodies of water",
        "The high salt concentration makes floating effortless",
        "The Dead Sea's mud is used in many cosmetic products",
        "The water level is declining at an alarming rate of about 1 meter per year",
      ],
      activities: [
        "Float in the mineral-rich waters",
        "Apply therapeutic mud",
        "Visit luxury spa resorts",
        "Watch the sunset over the mountains",
        "Explore nearby attractions like Masada",
      ],
      relatedTours: ["dead-sea-relaxation", "best-of-jordan", "jordan-wellness-retreat", "jordan-highlights"],
    },
    amman: {
      name: "Amman",
      title: "Amman: Jordan's Vibrant Capital",
      description:
        "Amman, the capital of Jordan, is a modern city with numerous ancient ruins. Atop Jabal al-Qala'a hill, the historic Citadel includes the pillars of the Roman Temple of Hercules and the 8th-century Umayyad Palace complex, known for its grand dome. Built into a different downtown hillside, the Roman Theater is a 6,000-capacity, 2nd-century stone amphitheater offering occasional events.",
      longDescription:
        "Amman is one of the oldest continuously inhabited cities in the world, with evidence of settlement dating back to 7250 BC. The city has been inhabited by several civilizations, including the Ammonites, Assyrians, Persians, Greeks, Romans, Byzantines, and Umayyads. Today, Amman is a bustling metropolis with a population of over 4 million people, making it the most populous city in Jordan and one of the most populous in the Levant. The city is often referred to as the 'White City' due to the white limestone used to build many of its buildings. Amman is a major tourist destination in the region and serves as a base for visitors exploring other parts of Jordan.",
      image: "/images/tours/jordan-highlights-6d5n/amman.png",
      heroImage: "/images/tours/jordan-highlights-6d5n/amman.png",
      facts: [
        "Amman was originally built on seven hills, but now spans over 19 hills",
        "The city was known as Philadelphia during the Greco-Roman period",
        "Amman is one of the oldest continuously inhabited cities in the world",
        "The city is divided into Eastern (traditional) and Western (modern) parts",
        "Amman hosted the 1999 West Asian Games",
      ],
      activities: [
        "Visit the Amman Citadel",
        "Explore the Roman Theater",
        "Shop at traditional souks",
        "Experience Rainbow Street",
        "Visit the Jordan Museum",
      ],
      relatedTours: ["amman-city-explorer", "best-of-jordan", "jordan-cultural-tour", "jordan-highlights"],
    },
    jerash: {
      name: "Jerash",
      title: "Jerash: Ancient Roman Grandeur",
      description:
        "Jerash is an ancient city in Jordan located 48 kilometers north of the capital Amman. The city is known for the ruins of the Greco-Roman city of Gerasa, also referred to as Antioch on the Golden River. It is sometimes misleadingly referred to as the 'Pompeii of the Middle East', referring to its size, extent of excavation and level of preservation.",
      longDescription:
        "Jerash is considered one of the most important and best preserved Roman cities in the Near East. It was one of the cities of the Decapolis, a federation of 10 Roman cities in the eastern frontier of the Roman Empire in Syria and Jordan. The city's golden age came under Roman rule, during which time it was known as Gerasa. Jerash is now the second-most popular tourist attraction in Jordan, after Petra. The modern city of Jerash is located to the east of the ruins. While the old and new share a city wall, careful preservation and planning has seen the city itself develop well away from the ruins so there is no encroachment on the sites of old.",
      image: "/images/tours/jordan-highlights-6d5n/jerash.png",
      heroImage: "/images/tours/jordan-highlights-6d5n/jerash.png",
      facts: [
        "Jerash was one of the ten great Roman cities of the Decapolis League",
        "The city has a continuous chain of human occupation dating back more than 6,500 years",
        "Jerash was conquered by General Pompey in 63 BC",
        "The city's famous oval plaza is unique in the Roman world",
        "Jerash hosts the annual Jerash Festival of Culture and Arts",
      ],
      activities: [
        "Explore the Oval Plaza",
        "Visit the Temple of Artemis",
        "Walk down the Cardo Maximus (colonnaded street)",
        "See the Jerash Archaeological Museum",
        "Attend the Roman Army and Chariot Experience show",
      ],
      relatedTours: ["jordan-historical-tour", "best-of-jordan", "northern-jordan-explorer", "jordan-highlights"],
    },
    aqaba: {
      name: "Aqaba",
      title: "Aqaba: Jordan's Red Sea Paradise",
      description:
        "Aqaba is a Jordanian port city on the Red Sea's Gulf of Aqaba. Inhabited since 4000 B.C., it's home to the Islamic-era Aqaba Fort and the adjacent Aqaba Archaeological Museum. Its beach resorts are popular for windsurfing and other water sports, and the area is a top destination for scuba divers, with notable dive sites including the Yamanieh coral reef in the Aqaba Marine Park.",
      longDescription:
        "Aqaba is the only coastal city in Jordan and the largest and most populous city on the Gulf of Aqaba. Situated in southernmost Jordan, Aqaba is the administrative center of the Aqaba Governorate. The city had a population of 148,398 in 2015 and a land area of 375 square kilometers (144.8 sq mi). Today, Aqaba plays a major role in the development of the Jordanian economy, through the vibrant trade and tourism sectors. The Port of Aqaba also serves other countries in the region. Aqaba's strategic location at the northeastern tip of the Red Sea between the continents of Asia and Africa, has made its port important over the course of thousands of years. The ancient city was called Ayla, and its strategic location and proximity to copper mines made it a regional hub for copper production and trade in the Chalcolithic period.",
      image: "/aqaba-red-sea-beach.jpg",
      heroImage: "/aqaba-red-sea-beach.jpg",
      facts: [
        "Aqaba is Jordan's only coastal city",
        "The Gulf of Aqaba is home to some of the world's most spectacular coral reefs",
        "Aqaba enjoys a special economic status as a duty-free zone",
        "The city is known for its year-round warm weather and sunny skies",
        "Aqaba was an important strategic port dating back to 4000 BC",
      ],
      activities: [
        "Scuba diving and snorkeling",
        "Glass-bottom boat tours",
        "Visit Aqaba Marine Park",
        "Explore Aqaba Fort",
        "Enjoy water sports like jet skiing and parasailing",
      ],
      relatedTours: ["aqaba-beach-holiday", "red-sea-adventure", "jordan-diving-tour", "best-of-jordan"],
    },
    cairo: {
      name: "Cairo",
      title: "Cairo: Egypt's Historic Capital",
      description:
        "Cairo, Egypt's sprawling capital, is set on the Nile River. At its heart is Tahrir Square and the vast Egyptian Museum, a trove of antiquities including royal mummies and gilded King Tutankhamun artifacts. Nearby, Giza is the site of the iconic pyramids and Great Sphinx, dating to the 26th century BC.",
      longDescription:
        "Cairo is the largest city in the Arab world and Africa, and the 15th-largest in the world. Associated with ancient Egypt, as the famous Giza pyramid complex and the ancient city of Memphis are located in its geographical area, Cairo is nicknamed 'the city of a thousand minarets' for its preponderance of Islamic architecture. Cairo has long been a center of the region's political and cultural life, and is titled 'the city of a thousand minarets' for its preponderance of Islamic architecture. The city is home to Al-Azhar University, one of the oldest universities in the world.",
      image: "/cairo-pyramids-giza.jpg",
      heroImage: "/cairo-pyramids-giza-egypt.jpg",
      facts: [
        "Cairo is home to the last remaining Ancient Wonder of the World - the Great Pyramid of Giza",
        "The city has a population of over 20 million people",
        "Cairo was founded in 969 AD by the Fatimid dynasty",
        "The Egyptian Museum houses over 120,000 artifacts",
        "Cairo is nicknamed 'the city of a thousand minarets'",
      ],
      activities: [
        "Visit the Pyramids of Giza",
        "Explore the Egyptian Museum",
        "Tour the Citadel of Saladin",
        "Shop at Khan el-Khalili bazaar",
        "Cruise the Nile River",
      ],
      relatedTours: ["jordan-egypt-express-10d9n", "classic-jordan-nile-cruise-12d11n", "cultural-grand-tour-14d13n"],
    },
    luxor: {
      name: "Luxor",
      title: "Luxor: Valley of the Kings",
      description:
        "Luxor is a city on the east bank of the Nile River in southern Egypt. It's on the site of ancient Thebes, the pharaohs' capital at the height of their power, during the 16th–11th centuries B.C. Today's city surrounds 2 huge, surviving ancient monuments: graceful Luxor Temple and Karnak Temple, a mile north.",
      longDescription:
        "Luxor has frequently been characterized as the 'world's greatest open-air museum', as the ruins of the temple complexes at Karnak and Luxor stand within the modern city. Immediately opposite, across the River Nile, lie the monuments, temples and tombs of the west bank Theban Necropolis, which includes the Valley of the Kings and Valley of the Queens. Thousands of tourists from all around the world arrive annually to visit these monuments, contributing greatly to the economy of the modern city.",
      image: "/luxor-temple-karnak.jpg",
      heroImage: "/luxor-temple-karnak-egypt.jpg",
      facts: [
        "Luxor contains about a third of the most valuable monuments and antiquities in the world",
        "The ancient city of Thebes was the capital of Egypt during the New Kingdom",
        "The Valley of the Kings contains 63 tombs including King Tutankhamun's",
        "Karnak Temple is the largest ancient religious site in the world",
        "Luxor Temple was connected to Karnak by a 2.7km avenue of sphinxes",
      ],
      activities: [
        "Explore the Valley of the Kings",
        "Visit Karnak Temple Complex",
        "Tour Luxor Temple",
        "Hot air balloon ride over the West Bank",
        "Visit the Temple of Hatshepsut",
      ],
      relatedTours: ["classic-jordan-nile-cruise-12d11n", "cultural-grand-tour-14d13n", "jordan-egypt-express-10d9n"],
    },
    aswan: {
      name: "Aswan",
      title: "Aswan: Gateway to Nubia",
      description:
        "Aswan, a city on the Nile River, has been southern Egypt's strategic and commercial gateway since antiquity. It contains significant archaeological sites like the Philae temple complex, on Agilkia Island near the landmark Aswan Dam. Philae's ruins include the columned Temple of Isis, dating to the 4th century B.C.",
      longDescription:
        "Aswan is a city in the south of Egypt, and is the capital of the Aswan Governorate. Aswan is a busy market and tourist center located just north of the Aswan Dam on the east bank of the Nile at the first cataract. The modern city has expanded and includes the formerly separate community on the island of Elephantine. Aswan is the ancient city of Swenett, which in antiquity was the frontier town of Ancient Egypt facing the south. Swenett is supposed to have derived its name from an Egyptian goddess with the same name.",
      image: "/aswan-philae-temple-egypt-nile.jpg",
      heroImage: "/aswan-philae-temple-egypt-nile.jpg",
      facts: [
        "Aswan is home to the Aswan High Dam, one of the world's largest embankment dams",
        "The city has the driest climate of any major city in the world",
        "Aswan was the ancient Egyptians' gateway to Africa",
        "The Unfinished Obelisk in Aswan is the largest known ancient obelisk",
        "Aswan is the starting point for Nile cruises to Luxor",
      ],
      activities: [
        "Visit Philae Temple",
        "Tour the Aswan High Dam",
        "Sail on a traditional felucca",
        "Explore Nubian villages",
        "Visit Abu Simbel temples",
      ],
      relatedTours: ["classic-jordan-nile-cruise-12d11n", "cultural-grand-tour-14d13n"],
    },
    alexandria: {
      name: "Alexandria",
      title: "Alexandria: Mediterranean Pearl",
      description:
        "Alexandria is a Mediterranean port city in Egypt. During the Hellenistic period, it was home to a lighthouse ranking among the Seven Wonders of the Ancient World as well as a storied library. Today the library is reincarnated in the disc-shaped, ultramodern Bibliotheca Alexandrina.",
      longDescription:
        "Founded in c. 331 BC by Alexander the Great, Alexandria grew rapidly and became a major center of Hellenic civilization, eventually replacing Memphis, in present-day Greater Cairo, as Egypt's capital. During the Hellenistic period, it was home to the Lighthouse of Alexandria, which ranked among the Seven Wonders of the Ancient World, as well as the Library of Alexandria. Today, the library is reincarnated in the disc-shaped, ultramodern Bibliotheca Alexandrina. Its 15th-century seafront Qaitbay Citadel is now a museum.",
      image: "/alexandria-egypt-mediterranean-coast.jpg",
      heroImage: "/alexandria-egypt-mediterranean-coast.jpg",
      facts: [
        "Alexandria was founded by Alexander the Great in 331 BC",
        "The ancient Library of Alexandria was one of the largest and most significant libraries of the ancient world",
        "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World",
        "Alexandria was the capital of Egypt for nearly a thousand years",
        "The city has a Mediterranean climate, unlike the rest of Egypt",
      ],
      activities: [
        "Visit Bibliotheca Alexandrina",
        "Explore Qaitbay Citadel",
        "Walk along the Corniche",
        "Visit the Catacombs of Kom el Shoqafa",
        "Explore Montaza Palace gardens",
      ],
      relatedTours: ["cultural-grand-tour-14d13n", "jordan-egypt-express-10d9n"],
    },
    alula: {
      name: "AlUla",
      title: "AlUla: Ancient Nabataean Heritage",
      description:
        "AlUla is a governorate of Saudi Arabia located 380 km north of Medina in the Hejaz region. The city was historically located on the incense route. The city is home to Hegra, the first UNESCO World Heritage Site in Saudi Arabia, and the ancient Nabataean city carved into sandstone mountains.",
      longDescription:
        "AlUla has been inhabited since at least the 6th century BC and contains a remarkable concentration of largely unexcavated archaeological and heritage sites spanning several thousand years. The most famous site is Hegra (also known as Mada'in Salih), Saudi Arabia's first UNESCO World Heritage Site. Hegra was the principal southern city of the Nabataean Kingdom and features well-preserved monumental tombs with decorated facades dating from the 1st century BC to the 1st century AD. AlUla is often called an 'open-air museum' and is one of Saudi Arabia's most important archaeological and cultural destinations.",
      image: "/alula-hegra-saudi-arabia-ancient-ruins.jpg",
      heroImage: "/alula-hegra-saudi-arabia-ancient-ruins.jpg",
      facts: [
        "Hegra (Mada'in Salih) is Saudi Arabia's first UNESCO World Heritage Site",
        "AlUla contains over 200,000 years of human history",
        "The Nabataeans carved over 100 monumental tombs into the sandstone mountains",
        "AlUla was an important stop on the ancient incense trade route",
        "The site remained largely unknown to the outside world until recently",
      ],
      activities: [
        "Explore Hegra archaeological site",
        "Visit the ancient city of Dadan",
        "Tour the rock formations of Elephant Rock",
        "Experience traditional Nabataean culture",
        "Stargazing in the desert",
      ],
      relatedTours: ["jordan-alula-discovery-9d8n", "jordan-saudi-highlights-12d11n", "arabia-grand-journey-14d13n"],
    },
    riyadh: {
      name: "Riyadh",
      title: "Riyadh: Modern Saudi Capital",
      description:
        "Riyadh is the capital and largest city of Saudi Arabia. It is situated in the center of the Arabian Peninsula on a large plateau and is home to over 7 million people. The city combines modern architecture with traditional Saudi culture, featuring impressive skyscrapers alongside historic sites.",
      longDescription:
        "Riyadh has been designated a global city and is the political and administrative center of Saudi Arabia. The city has experienced very high rates of population growth, from 150,000 inhabitants in 1960 to over 7 million, according to the most recent sources. Riyadh is divided into 15 municipal districts, managed by the Municipality of Riyadh headed by the mayor. The city is now emerging as a major tourist destination, with numerous museums, cultural sites, and modern attractions. The Kingdom Centre Tower and Al Faisaliyah Center are among the most recognizable landmarks of the city's modern skyline.",
      image: "/riyadh-saudi-arabia-skyline-modern.jpg",
      heroImage: "/riyadh-saudi-arabia-skyline-modern.jpg",
      facts: [
        "Riyadh means 'the gardens' in Arabic, referring to the area's natural fertility",
        "The city is home to the Kingdom Centre, one of the tallest buildings in Saudi Arabia",
        "Riyadh has transformed from a small walled city to a modern metropolis in just 70 years",
        "The city hosts the annual Riyadh Season, a major entertainment and cultural festival",
        "Riyadh is one of the fastest-growing cities in the world",
      ],
      activities: [
        "Visit the National Museum",
        "Explore Masmak Fortress",
        "Shop at Kingdom Centre Mall",
        "Visit the Edge of the World",
        "Experience traditional souks",
      ],
      relatedTours: ["jordan-saudi-highlights-12d11n", "arabia-grand-journey-14d13n"],
    },
    jeddah: {
      name: "Jeddah",
      title: "Jeddah: Gateway to Mecca",
      description:
        "Jeddah is a city in the Hejaz region of Saudi Arabia and the country's commercial center. Established in the 7th century, it was historically the gateway for Muslim pilgrims arriving by sea to make the Hajj pilgrimage to Mecca. Today, it's a modern commercial hub and beach resort on the Red Sea.",
      longDescription:
        "Jeddah is the second-largest city in Saudi Arabia after Riyadh and the largest city in the Hejaz region. Jeddah is the principal gateway to Mecca, Islam's holiest city, which able-bodied Muslims are required to visit at least once in their lifetime. It is also a gateway to Medina, the second holiest place in Islam. Jeddah has been established as the main city of the historic Hejaz province and a historic center of arts and culture in the region. The city features a corniche along the Red Sea coast, and its historic district, Al-Balad, is a UNESCO World Heritage Site featuring traditional Hijazi architecture.",
      image: "/jeddah-saudi-arabia-red-sea-corniche.jpg",
      heroImage: "/jeddah-saudi-arabia-red-sea-corniche.jpg",
      facts: [
        "Jeddah's historic district Al-Balad is a UNESCO World Heritage Site",
        "The city is home to the King Fahd Fountain, the tallest fountain in the world",
        "Jeddah has been the gateway for Muslim pilgrims for over 1,400 years",
        "The city features over 130 kilometers of coastline along the Red Sea",
        "Jeddah is known as the 'Bride of the Red Sea'",
      ],
      activities: [
        "Explore Al-Balad historic district",
        "Walk along the Jeddah Corniche",
        "Visit the Floating Mosque",
        "Dive in the Red Sea",
        "Experience traditional souks",
      ],
      relatedTours: ["jordan-saudi-highlights-12d11n", "arabia-grand-journey-14d13n"],
    },
  }

  const destination = destinations[params.slug as keyof typeof destinations]

  if (!destination) {
    notFound()
  }

  // Filter tours that include this destination in their route
  const relatedToursData = toursData.filter((tour) =>
    tour.route.some(stop => stop.toLowerCase() === destination.name.toLowerCase()) ||
    tour.title.toLowerCase().includes(destination.name.toLowerCase())
  )

  return (
    <main className="pt-24 pb-16">
      <div className="relative h-[50vh] md:h-[60vh] bg-gradient-to-r from-amber-100 to-orange-100">
        <Image
          src={destination.heroImage || destination.image}
          alt={destination.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">{destination.name}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/destinations" className="hover:underline">
            Destinations
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>{destination.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="prose max-w-none mb-8">
              <h2 className="text-3xl font-bold mb-4">About {destination.name}</h2>
              <p>{destination.longDescription}</p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Interesting Facts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.facts.map((fact, index) => (
                  <Card key={index} className="bg-primary/5 border-none">
                    <CardContent className="p-4">
                      <p>{fact}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>



            <div>
              <h3 className="text-2xl font-bold mb-6">Tours Including {destination.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedToursData.length > 0 ? (
                  relatedToursData.slice(0, 4).map((tour) => (
                    <TourCardEnhanced
                      key={tour.id}
                      tour={tour as unknown as Tour}
                      colorTheme="amber"
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-2">No specific tours found for this destination at the moment.</p>
                )}
              </div>
            </div>


          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Form */}
              <UniversalBookingForm destinationName={destination.name} />

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


// Helper functions
function getTourTitle(slug: string): string {
  const titles: Record<string, string> = {
    "best-of-jordan": "Best of Jordan",
    "petra-wadi-rum-adventure": "Petra & Wadi Rum Adventure",
    "jordan-highlights": "Jordan Highlights",
    "petra-explorer": "Petra Explorer",
    "desert-expedition": "Desert Expedition",
    "wadi-rum-stars": "Wadi Rum Under the Stars",
    "jordan-adventure-tour": "Jordan Adventure Tour",
    "dead-sea-relaxation": "Dead Sea Relaxation",
    "jordan-wellness-retreat": "Jordan Wellness Retreat",
    "amman-city-explorer": "Amman City Explorer",
    "jordan-cultural-tour": "Jordan Cultural Tour",
    "jordan-historical-tour": "Jordan Historical Tour",
    "northern-jordan-explorer": "Northern Jordan Explorer",
    "aqaba-beach-holiday": "Aqaba Beach Holiday",
    "red-sea-adventure": "Red Sea Adventure",
    "jordan-diving-tour": "Jordan Diving Tour",
    "jordan-egypt-express-10d9n": "Jordan & Egypt Express",
    "classic-jordan-nile-cruise-12d11n": "Classic Jordan & Nile Cruise",
    "cultural-grand-tour-14d13n": "Cultural Grand Tour",
    "jordan-alula-discovery-9d8n": "Jordan & AlUla Discovery",
    "jordan-saudi-highlights-12d11n": "Jordan & Saudi Highlights",
    "arabia-grand-journey-14d13n": "Arabia Grand Journey",
  }
  return titles[slug] || "Jordan Tour"
}

function getTourDays(slug: string): number {
  const days: Record<string, number> = {
    "best-of-jordan": 10,
    "petra-wadi-rum-adventure": 5,
    "jordan-highlights": 7,
    "petra-explorer": 3,
    "desert-expedition": 5,
    "wadi-rum-stars": 3,
    "jordan-adventure-tour": 9,
    "dead-sea-relaxation": 5,
    "jordan-wellness-retreat": 7,
    "amman-city-explorer": 3,
    "jordan-cultural-tour": 7,
    "jordan-historical-tour": 9,
    "northern-jordan-explorer": 5,
    "aqaba-beach-holiday": 7,
    "red-sea-adventure": 5,
    "jordan-diving-tour": 7,
    "jordan-egypt-express-10d9n": 10,
    "classic-jordan-nile-cruise-12d11n": 12,
    "cultural-grand-tour-14d13n": 14,
    "jordan-alula-discovery-9d8n": 9,
    "jordan-saudi-highlights-12d11n": 12,
    "arabia-grand-journey-14d13n": 14,
  }
  return days[slug] || 7
}

function getTourPrice(slug: string): number {
  const prices: Record<string, number> = {
    "best-of-jordan": 1299,
    "petra-wadi-rum-adventure": 699,
    "jordan-highlights": 899,
    "petra-explorer": 499,
    "desert-expedition": 799,
    "wadi-rum-stars": 599,
    "jordan-adventure-tour": 1199,
    "dead-sea-relaxation": 699,
    "jordan-wellness-retreat": 999,
    "amman-city-explorer": 399,
    "jordan-cultural-tour": 899,
    "jordan-historical-tour": 1099,
    "northern-jordan-explorer": 599,
    "aqaba-beach-holiday": 899,
    "red-sea-adventure": 799,
    "jordan-diving-tour": 999,
    "jordan-egypt-express-10d9n": 1599,
    "classic-jordan-nile-cruise-12d11n": 1799,
    "cultural-grand-tour-14d13n": 2099,
    "jordan-alula-discovery-9d8n": 1299,
    "jordan-saudi-highlights-12d11n": 1699,
    "arabia-grand-journey-14d13n": 2199,
  }
  return prices[slug] || 899
}

function getLocation(slug: string): string {
  const locations: Record<string, string> = {
    petra: "Southern Jordan, near Wadi Musa",
    "wadi-rum": "Southern Jordan, 60km east of Aqaba",
    "dead-sea": "Western Jordan, border with Israel/West Bank",
    amman: "Northern Jordan, capital city",
    jerash: "Northern Jordan, 48km north of Amman",
    aqaba: "Southern Jordan, on the Red Sea coast",
    cairo: "Northern Egypt, on the Nile River",
    luxor: "Southern Egypt, on the east bank of the Nile",
    aswan: "Southern Egypt, near the first cataract of the Nile",
    alexandria: "Northern Egypt, on the Mediterranean coast",
    alula: "Northwestern Saudi Arabia, Hejaz region",
    riyadh: "Central Saudi Arabia, Najd region",
    jeddah: "Western Saudi Arabia, on the Red Sea coast",
  }
  return locations[slug] || "Jordan"
}

function getHighlights(slug: string): string {
  const highlights: Record<string, string> = {
    petra: "The Treasury, The Monastery, Royal Tombs, Siq Canyon",
    "wadi-rum": "Desert landscapes, Bedouin camps, Rock formations, Stargazing",
    "dead-sea": "Floating experience, Mineral-rich mud, Luxury resorts, Sunset views",
    amman: "Citadel, Roman Theater, Rainbow Street, Traditional markets",
    jerash: "Roman ruins, Oval Plaza, Temple of Artemis, Colonnaded streets",
    aqaba: "Coral reefs, Water sports, Marine life, Beach resorts",
    cairo: "Pyramids of Giza, Egyptian Museum, Khan el-Khalili, Nile cruises",
    luxor: "Valley of the Kings, Karnak Temple, Luxor Temple, Hot air balloons",
    aswan: "Philae Temple, Aswan Dam, Felucca rides, Nubian culture",
    alexandria: "Bibliotheca Alexandrina, Qaitbay Citadel, Mediterranean beaches, Corniche",
    alula: "Hegra tombs, Elephant Rock, Ancient Nabataean sites, Desert landscapes",
    riyadh: "National Museum, Masmak Fortress, Kingdom Centre, Edge of the World",
    jeddah: "Al-Balad district, Red Sea diving, Floating Mosque, Jeddah Corniche",
  }
  return highlights[slug] || "Natural beauty, historical sites, cultural experiences"
}

function getBestTimeToVisit(slug: string): string {
  const bestTimes: Record<string, string> = {
    petra: "March to May and September to November offer mild temperatures ideal for exploring the extensive site.",
    "wadi-rum":
      "Spring (March-May) and autumn (September-November) provide comfortable temperatures for desert exploration.",
    "dead-sea": "Year-round destination, but spring and autumn offer the most pleasant temperatures for swimming.",
    amman: "Spring (April-May) and autumn (September-October) offer ideal weather for city exploration.",
    jerash: "Spring (March-May) when wildflowers bloom or autumn (September-November) for mild temperatures.",
    aqaba: "September to November for diving, or summer months for hot beach weather and warm sea temperatures.",
    cairo: "October to April offers pleasant temperatures for sightseeing, avoiding the intense summer heat.",
    luxor: "October to February provides comfortable temperatures for exploring temples and tombs.",
    aswan: "October to April is ideal, with warm days and cool evenings perfect for Nile cruises.",
    alexandria:
      "April to October for beach weather, or year-round for cultural attractions and mild Mediterranean climate.",
    alula: "October to March offers pleasant temperatures for exploring archaeological sites and desert landscapes.",
    riyadh: "November to March provides mild weather ideal for outdoor activities and sightseeing.",
    jeddah: "November to March offers the most comfortable temperatures for beach activities and city exploration.",
  }
  return bestTimes[slug] || "Spring (March-May) and autumn (September-November) offer the most pleasant weather."
}
