/**
 * Lumière Patisserie - Centralized Site & Business Configuration
 * 
 * ============================================================================
 * OWNER INSTRUCTIONS:
 * Update the values below with your bakery's actual business information.
 * Any change made here will automatically reflect throughout the entire website,
 * including WhatsApp ordering, footer, contact section, announcement bar, and SEO.
 * ============================================================================
 */

export const siteConfig = {
  // Brand Identity
  bakeryName: "Lumière Artisan Patisserie",
  shortName: "Brand name",
  tagline: "A Little Slice of Happiness",
  subTagline: "Handcrafted celebration cakes, French entremets, and artisanal pastries baked fresh daily with pure butter and Belgian couverture.",

  // Top Announcement Banner (Editable promo text)
  announcement: {
    enabled: true,
    text: "✨ Freshly baked with love · Bespoke custom cakes for every milestone · Instant WhatsApp confirmation",
    linkText: "Order Now",
    linkHref: "#menu",
  },

  // Owner WhatsApp Configuration (CRITICAL FOR ORDERING)
  // Format: International format WITHOUT '+', spaces, dashes, or parentheses.
  // Example for India: '91' followed by 10-digit mobile number -> '919876543210'
  // Example for UK: '447123456789' | Example for US: '14155552671'
  whatsappNumber: "919876543210", // REPLACE WITH OWNER'S ACTUAL WHATSAPP NUMBER
  whatsappNumberFormatted: "+91 98765 43210",
  whatsappDefaultGreeting: "Bonjour Lumière Patisserie! I'd love to inquire about your handcrafted desserts.",

  // Contact Details
  contact: {
    phone: "+91 98765 43210",
    phoneTel: "+919876543210",
    email: "bonjour@lumierepatisserie.com",
    address: {
      line1: "14 Rue Saint-Honoré Boulevard, Jubilee Enclave",
      line2: "Near Rosewood Park, 100 Feet Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      country: "India",
    },
    // Google Maps pin or search URL
    googleMapsUrl: "https://maps.google.com/?q=Jubilee+Enclave+Bengaluru",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.892695843187!2d77.6410183153648!3d12.97871699085141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae168285555555%3A0x123456789abcdef!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
  },

  // Business Hours
  businessHours: {
    weekdays: "9:00 AM – 10:00 PM",
    weekends: "8:30 AM – 10:30 PM",
    kitchenOpen: "Fresh batches come out at 10:00 AM & 3:30 PM daily",
  },

  // Currency & Locale
  currency: {
    symbol: "₹",
    code: "INR",
    locale: "en-IN",
  },

  // Delivery & Pickup Guidelines
  delivery: {
    sameDayCutoff: "Cut-off for same-day delivery is 5:00 PM (minimum 4 hours lead time).",
    customCakeNotice: "Custom & tiered celebration cakes require at least 24 to 48 hours advance notice.",
    freeDeliveryThreshold: 1500, // in currency units
    standardDeliveryFee: 120,
    deliveryRadiusKm: 15,
    pickupLocationNote: "Complimentary pickup available at our boutique counter during opening hours.",
  },

  // Social Profiles
  social: {
    instagram: "https://instagram.com/lumierepatisserie",
    instagramHandle: "@lumiere.patisserie",
    facebook: "https://facebook.com/lumierepatisserie",
    pinterest: "https://pinterest.com/lumierepatisserie",
  },

  // Production Deployment URL (used for canonical URLs and social previews)
  productionUrl: "https://lumierepatisserie.com",

  // Brand Pillars / Trust Indicators
  features: [
    {
      title: "100% Pure Butter & Couverture",
      desc: "Zero hydrogenated vegetable oils or compound chocolate. Only pure creamery butter and single-origin Belgian chocolate.",
    },
    {
      title: "Handcrafted Fresh Daily",
      desc: "Every sponge, ganache, and compote is whipped from scratch every morning in small artisanal batches.",
    },
    {
      title: "100% Eggless Options",
      desc: "Delicate eggless recipes developed over 5 years that deliver identical moistness, crumb, and rich flavor.",
    },
    {
      title: "Bespoke Custom Tiers",
      desc: "Personalized design consultations to turn your dream wedding, birthday, or milestone cake into an edible masterpiece.",
    },
  ],
};

export default siteConfig;
