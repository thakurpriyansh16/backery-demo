# 🍰 Lumière Artisan Patisserie — Premium Cake & Confectionery Website

A luxury, editorial-grade frontend bakery website and WhatsApp ordering platform designed for high-end boutique patisseries, artisanal cake studios, and celebration dessert brands.

Inspired by Parisian haute patisseries, this project combines warm cream aesthetics (`#FFF8F0`), chocolate typography (`#40271F`), delicate gold accents (`#C8A46B`), and dusty rose tones (`#D8A4A8`) with an effortless WhatsApp click-to-chat conversion funnel.

---

## 🌟 Key Highlights & Features

- **Direct-to-WhatsApp Ordering:** Zero backend, zero database, zero API credentials required. Generates dynamic, structured order summaries and transmits them directly to the bakery owner's WhatsApp using official click-to-chat format.
- **Variant & Size Pricing Engine:** Instant live price calculation based on selected weights (0.5 kg, 1 kg, 1.5 kg, 2 kg, party boxes) and flavor profiles.
- **Custom Cake Interactive Atelier:** Dedicated multi-step bespoke tier builder for weddings, milestone birthdays, and theme cakes with inspiration photo guidance.
- **Frontend Shopping Basket:** Slide-over cart drawer with quantity adjustments, custom cake inscriptions, automatic delivery fee calculation, and multi-item WhatsApp checkout.
- **Dietary & Category Filtering:** Instant search by keywords and filter tabs for 100% Eggless creations, Bestsellers, Wedding Tiers, French Pastries, Cupcakes, and Gourmet Brownies.
- **Order Review & Confirmation Disclaimer:** Clear customer assurance explaining that clicking "Order on WhatsApp" submits a request to the baker for availability & confirmation; no unverified immediate card charges.
- **SEO & Local Business Ready:** Complete with semantic HTML5, Open Graph tags, Twitter Card metadata, XML sitemap, `robots.txt`, and Schema.org `Bakery` JSON-LD structured data.

---

## 📁 Project Architecture

```
lumiere-patisserie/
├── public/
│   ├── favicon.svg             # Custom luxury patisserie cloche icon
│   ├── robots.txt              # Search engine crawler instructions
│   └── sitemap.xml             # XML sitemap with priority routes
├── src/
│   ├── config/
│   │   └── siteConfig.js       # ⭐ SINGLE POINT OF CONFIGURATION FOR OWNER
│   ├── data/
│   │   ├── categories.js       # Bakery menu categories
│   │   ├── products.js         # Realistic product catalog with variants
│   │   ├── testimonials.js     # Celebration reviews & client feedback
│   │   ├── faqData.js          # Accordion FAQ answers
│   │   └── galleryData.js      # Behind-the-scenes Instagram showcase
│   ├── utils/
│   │   ├── whatsapp.js         # WhatsApp order message builders & URL encoder
│   │   ├── pricing.js          # Localized currency & subtotal calculations
│   │   └── validation.js       # Client-side input validation
│   ├── context/
│   │   └── CartContext.jsx     # Basket state & localStorage persistence
│   ├── components/
│   │   ├── AnnouncementBar.jsx # Editable top promo ribbon
│   │   ├── Navbar.jsx          # Responsive header & mobile navigation
│   │   ├── Hero.jsx            # Split editorial hero with floating badges
│   │   ├── CategoryGrid.jsx    # Visual category cards with hover zoom
│   │   ├── MenuSection.jsx     # Product grid, search, and category tabs
│   │   ├── ProductCard.jsx     # Individual product card with eggless badge
│   │   ├── ProductDetailsModal.jsx # Size picker, inscription, & direct order
│   │   ├── CartDrawer.jsx      # Slide-over cart & WhatsApp checkout
│   │   ├── CustomCakeBuilder.jsx # Bespoke consultation inquiry builder
│   │   ├── AboutSection.jsx    # French craftsmanship brand storytelling
│   │   ├── Testimonials.jsx    # Client celebration reviews
│   │   ├── GalleryShowcase.jsx # Confectionery photo gallery with lightbox
│   │   ├── FAQSection.jsx      # Interactive order FAQ accordion
│   │   ├── ContactSection.jsx  # Boutique map, address, & direct hours
│   │   ├── Footer.jsx          # Luxury footer with privacy assurance
│   │   └── Toast.jsx           # Subtle feedback notifications
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Tailwind directives & luxury styling
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## ⚙️ How the Bakery Owner Customizes the Website

All business-critical information is stored in **one single file**: `src/config/siteConfig.js`.

### 1. Owner's WhatsApp Number (Most Important)
Open `src/config/siteConfig.js` and edit:

```javascript
// International format WITHOUT '+', spaces, or dashes
// For India: '91' followed by 10 digits -> '919876543210'
// For USA: '1' followed by 10 digits -> '14155552671'
// For UK: '44' followed by mobile number -> '447123456789'
whatsappNumber: "919876543210",
whatsappNumberFormatted: "+91 98765 43210",
```

### 2. Business Address & Operating Hours
Edit `contact` and `businessHours` in `src/config/siteConfig.js`:

```javascript
contact: {
  phone: "+91 98765 43210",
  email: "bonjour@yourbakery.com",
  address: {
    line1: "Your Street Name",
    city: "Your City",
    state: "Your State",
    pincode: "560038"
  },
  googleMapsUrl: "https://maps.google.com/?q=Your+Bakery+Location",
  embedMapUrl: "YOUR_GOOGLE_MAPS_EMBED_IFRAME_SRC"
}
```

### 3. Products & Pricing
Open `src/data/products.js` to modify product names, base prices, variant sizes, flavor options, and photos.

---

## 🚀 Local Development Setup

Ensure you have [Node.js](https://nodejs.org) (v18 or higher) installed:

```bash
# 1. Navigate to project folder
cd lumiere-patisserie

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🚢 Production Deployment Guide

### Deploying to Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will auto-detect as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

### Deploying to Netlify
1. Sign in to [Netlify](https://netlify.com) and select **"Add new site" > "Import an existing project"**.
2. Select your repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy Site**.

---

## 📋 Launch Checklist for the Bakery Owner

Before going live with real customers:
- [ ] Replace `siteConfig.whatsappNumber` with your actual WhatsApp business number.
- [ ] Test placing a sample cake order on a mobile device and verify the message arrives in WhatsApp.
- [ ] Update your store's physical address and opening hours in `siteConfig.js`.
- [ ] Replace the Google Maps embed URL with your exact bakery pin.
- [ ] Confirm your pricing in `src/data/products.js` matches your actual menu.
- [ ] Add your real Instagram handle in `siteConfig.social.instagram`.
- [ ] Update the domain URL in `public/sitemap.xml` and `siteConfig.productionUrl`.
