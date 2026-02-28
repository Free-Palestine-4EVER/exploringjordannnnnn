#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const localesDir = path.join(__dirname, '..', 'lib', 'i18n', 'locales');
const locales = ['bg','cs','da','de','el','es','et','fi','fr','hr','hu','it','lt','lv','nl','no','pl','pt','ro','ru','sk','sl','sv','tr','uk'];

for (const lang of locales) {
  const filePath = path.join(localesDir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Fix: Add failedToSend to bookingForm if missing
  if (!content.includes('failedToSend')) {
    content = content.replace(
      /(daysLabel:\s*"[^"]*",?)\s*\n(\s*\},?\s*\n)/m,
      (match, p1, p2) => {
        // Check if this is inside bookingForm by looking back
        return `${p1}\n    failedToSend: "Failed to send. Please try again.",\n${p2}`;
      }
    );
  }
  
  // Fix: Add tourDetail new keys if missing
  if (!content.includes('hotelClassLabel')) {
    content = content.replace(
      /(shareTrip:\s*"[^"]*",?)\s*\n(\s*\},?\s*\n)/m,
      `$1\n    reviews: "reviews",\n    hotelClassLabel: "Hotels",\n    orSimilar: "* Or similar properties based on availability",\n    pricingFinalNote: "Final pricing will be confirmed based on your specific requirements.",\n    highSeason: "High Season",\n    lowSeason: "Low Season",\n    travelers2: "2 travelers",\n    travelers3to5: "3-5 travelers",\n    travelers6to7: "6-7 travelers (Most Popular)",\n    travelers8to9: "8-9 travelers",\n    travelers10to14: "10-14 travelers",\n    hotelDescription: "Choose from three hotel classes. All carefully selected.",\n    pricingDescription: "Prices vary by season, group size, and hotel class.",\n    season: "Season",\n$2`
    );
  }
  
  // Fix: Add secondaryHero new keys if missing
  if (!content.includes('startJourney')) {
    content = content.replace(
      /(expertAdvice:\s*"[^"]*",?)\s*\n(\s*\},?\s*\n)/m,
      `$1\n    badge: "Premium Travel Experience",\n    title: "We are one stop",\n    titleHighlight: "full service",\n    titleEnd: "from airport to airport",\n    subtitle: "Experience a seamless journey where every detail is handled with precision.",\n    seamlessTransfers: "Seamless Transfers",\n    seamlessTransfersDesc: "Private luxury transport from the moment you land until you leave.",\n    fullProtection: "Full Protection",\n    fullProtectionDesc: "Fully licensed and insured services for your complete peace of mind.",\n    support247: "24/7 Support",\n    support247Desc: "Round-the-clock assistance throughout your entire stay in Jordan.",\n    startJourney: "Start Your Journey",\n$2`
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ v2 patched ${lang}.ts`);
}
