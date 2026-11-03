import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  Camera,
  Layers,
  Heart,
  Calendar,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { createWhatsAppCustomCakeInquiry, isWhatsAppConfigured } from '../utils/whatsapp';
import { validateCustomCakeForm } from '../utils/validation';

export default function CustomCakeBuilder({ isOpen, onClose }) {
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [tierCount, setTierCount] = useState('Single Tier (1.5 – 2 kg)');
  const [servings, setServings] = useState('15 – 20 Guests');
  const [shape, setShape] = useState('Classic Round');
  const [flavorBase, setFlavorBase] = useState('Belgian Chocolate Truffle');
  const [frostingType, setFrostingType] = useState('Swiss Meringue Buttercream');
  const [budgetRange, setBudgetRange] = useState('₹2,500 – ₹4,500');
  const [themeDescription, setThemeDescription] = useState('');
  const [referenceNote, setReferenceNote] = useState('');
  const [fulfillment, setFulfillment] = useState('Pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2); // 48 hrs notice recommended
    return d.toISOString().split('T')[0];
  });

  const [errors, setErrors] = useState({});
  const [fallbackUrl, setFallbackUrl] = useState('');

  const minDate = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateCustomCakeForm({
      customerName,
      customerPhone,
      preferredDate,
      theme: themeDescription,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    if (!isWhatsAppConfigured()) {
      alert('Bakery WhatsApp number is not configured in siteConfig.js');
      return;
    }

    const payload = {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      occasion,
      preferredDate,
      tierCount,
      servings,
      shape,
      flavorBase,
      frostingType,
      budgetRange,
      themeDescription: themeDescription.trim(),
      referenceNote: referenceNote.trim(),
      fulfillment,
      deliveryAddress: fulfillment === 'Delivery' ? deliveryAddress.trim() : '',
    };

    const url = createWhatsAppCustomCakeInquiry(payload);
    setFallbackUrl(url);

    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      console.warn('Popup blocked, fallback available');
    }
  };

  return (
    <section className="py-20 bg-cream-200/50 relative overflow-hidden" id="custom-cakes">
      {/* Decorative background flourishes */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-rose-strawberry/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-100 border border-gold/40 text-chocolate-light text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Bespoke Confectionery Atelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate tracking-tight">
            Design Your Custom Celebration Cake
          </h2>
          <p className="mt-3 text-chocolate/80 text-sm sm:text-base font-light">
            Whether it’s a romantic multi-tiered wedding centerpiece, whimsical first birthday, or modern sculptural birthday cake — our master pastry chefs bring your vision to life.
          </p>
        </div>

        {/* Builder Interactive Form Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl sm:rounded-[2.5rem] shadow-soft-xl border border-gold/30 p-6 sm:p-10 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Occasion & Shape */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-chocolate text-gold text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif text-lg font-bold text-chocolate">
                  Occasion & Silhouette
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                    Occasion / Event
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-cream-100 border border-cream-300 rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none"
                  >
                    <option value="Milestone Birthday">Milestone Birthday</option>
                    <option value="Grand Wedding Cake">Grand Wedding Cake</option>
                    <option value="Anniversary Celebration">Anniversary Celebration</option>
                    <option value="Baby Shower / Gender Reveal">Baby Shower / Gender Reveal</option>
                    <option value="Engagement & Roka">Engagement & Roka</option>
                    <option value="Corporate Gala / Brand Launch">Corporate Gala / Brand Launch</option>
                    <option value="Whimsical Theme Cake">Kids Whimsical Theme Cake</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                    Architectural Shape
                  </label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-cream-100 border border-cream-300 rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none"
                  >
                    <option value="Classic Cylindrical Round">Classic Cylindrical Round</option>
                    <option value="Romantic Heart-Shaped (Lambeth Style)">Romantic Vintage Heart</option>
                    <option value="Contemporary Sharp Square / Cube">Contemporary Sharp Square</option>
                    <option value="Sculpted 3D Silhouette">Sculpted 3D Silhouette</option>
                    <option value="Arch / Tall Extended Pillar">Tall Extended Pillar</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Tiers, Servings & Budget */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-chocolate text-gold text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif text-lg font-bold text-chocolate">
                  Tiers, Servings & Budget Range
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                    Tiers
                  </label>
                  <select
                    value={tierCount}
                    onChange={(e) => setTierCount(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-cream-100 border border-cream-300 rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none"
                  >
                    <option value="Single Tier (1.0 – 2.0 kg)">Single Tier (1.0 – 2.0 kg)</option>
                    <option value="2 Tiers Grand (2.5 – 3.5 kg)">2 Tiers Grand (2.5 – 3.5 kg)</option>
                    <option value="3 Tiers Wedding (4.0 – 6.0 kg)">3 Tiers Wedding (4.0 – 6.0 kg)</option>
                    <option value="4+ Tiers Showstopper">4+ Tiers Showstopper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                    Expected Guests
                  </label>
                  <select
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-cream-100 border border-cream-300 rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none"
                  >
                    <option value="10 – 15 Guests">10 – 15 Guests</option>
                    <option value="20 – 30 Guests">20 – 30 Guests</option>
                    <option value="40 – 60 Guests">40 – 60 Guests</option>
                    <option value="75+ Guests">75+ Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                    Budget Preference
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-cream-100 border border-cream-300 rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none"
                  >
                    <option value="₹2,000 – ₹3,500">₹2,000 – ₹3,500 (Petite)</option>
                    <option value="₹3,500 – ₹6,000">₹3,500 – ₹6,000 (Signature)</option>
                    <option value="₹6,000 – ₹12,000">₹6,000 – ₹12,000 (Multi-Tier)</option>
                    <option value="₹12,000+ Haute Couture">₹12,000+ (Grand Bridal)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Flavor & Exterior Frosting */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-chocolate text-gold text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif text-lg font-bold text-chocolate">
                  Flavor Profile & Exterior Finish
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                    Base Sponge Flavor
                  </label>
                  <select
                    value={flavorBase}
                    onChange={(e) => setFlavorBase(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-cream-100 border border-cream-300 rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none"
                  >
                    <option value="Belgian Chocolate Truffle (70% Callebaut)">Belgian Chocolate Truffle (70% Callebaut)</option>
                    <option value="Madagascar Vanilla Bean & Wild Berry">Madagascar Vanilla Bean & Wild Berry</option>
                    <option value="Lotus Biscoff Speculoos Cream">Lotus Biscoff Speculoos Cream</option>
                    <option value="Classic Red Velvet Philadelphia">Classic Red Velvet Philadelphia</option>
                    <option value="Hazelnut Praline Royaltine Crunch">Hazelnut Praline Royaltine Crunch</option>
                    <option value="Pistachio Rosewater & Cardamom">Pistachio Rosewater & Cardamom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                    Exterior Frosting
                  </label>
                  <select
                    value={frostingType}
                    onChange={(e) => setFrostingType(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-cream-100 border border-cream-300 rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none"
                  >
                    <option value="Velvety Swiss Meringue Buttercream">Velvety Swiss Meringue Buttercream</option>
                    <option value="High-Gloss Cocoa Mirror Glaze">High-Gloss Cocoa Mirror Glaze</option>
                    <option value="White Chocolate Ganache Canvas">White Chocolate Ganache Canvas</option>
                    <option value="Vintage Piping (Lambeth / Frills)">Vintage Piping (Lambeth / Frills)</option>
                    <option value="Fondant Sculpted Cover">Fondant Sculpted Cover</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Theme, Reference Photos & Fulfillment */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-chocolate text-gold text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-serif text-lg font-bold text-chocolate">
                  Theme Description & Date
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                    Theme / Color Palette / Decor Notes <span className="text-rose-deep">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your vision: e.g. Pastel sage green and blush pink palette with edible gold leaf, fresh eucalyptus sprigs, and a custom acrylic gold topper 'Sarah is 30'..."
                    value={themeDescription}
                    onChange={(e) => setThemeDescription(e.target.value)}
                    className={`w-full text-xs sm:text-sm bg-cream-100 border rounded-xl p-3.5 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none ${
                      errors.theme ? 'border-rose-deep ring-1 ring-rose-deep' : 'border-cream-300'
                    }`}
                  />
                  {errors.theme && (
                    <p className="text-[11px] text-rose-deep mt-1">{errors.theme}</p>
                  )}
                </div>

                {/* Reference Photo Guidance Box */}
                <div className="p-4 rounded-2xl bg-cream-100 border border-gold/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-chocolate flex-shrink-0 mt-0.5">
                    <Camera className="w-4 h-4 text-gold-dark" />
                  </div>
                  <div className="text-xs text-chocolate/80 space-y-1">
                    <p className="font-semibold text-chocolate">
                      Have Pinterest or Instagram Reference Photos?
                    </p>
                    <p className="font-light leading-relaxed">
                      Simply submit this form to open WhatsApp, and you can attach your images or moodboard screenshots directly into the chat for our head pastry chef to review!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                      Celebration Date <span className="text-rose-deep">*</span>
                    </label>
                    <input
                      type="date"
                      min={minDate}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full text-xs sm:text-sm bg-cream-100 border rounded-xl p-3 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none ${
                        errors.preferredDate ? 'border-rose-deep ring-1 ring-rose-deep' : 'border-cream-300'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="text-[11px] text-rose-deep mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                      Your Full Name <span className="text-rose-deep">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ananya Sen"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full text-xs sm:text-sm bg-cream-100 border rounded-xl p-3 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none ${
                        errors.customerName ? 'border-rose-deep ring-1 ring-rose-deep' : 'border-cream-300'
                      }`}
                    />
                    {errors.customerName && (
                      <p className="text-[11px] text-rose-deep mt-1">{errors.customerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-chocolate/80 mb-2">
                      WhatsApp Number <span className="text-rose-deep">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={`w-full text-xs sm:text-sm bg-cream-100 border rounded-xl p-3 text-chocolate focus:ring-2 focus:ring-gold focus:outline-none ${
                        errors.customerPhone ? 'border-rose-deep ring-1 ring-rose-deep' : 'border-cream-300'
                      }`}
                    />
                    {errors.customerPhone && (
                      <p className="text-[11px] text-rose-deep mt-1">{errors.customerPhone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-cream-200">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-chocolate hover:bg-chocolate-light text-cream-100 font-semibold text-sm shadow-soft-lg hover:shadow-soft-xl flex items-center justify-center gap-3 transition-all duration-300 group mx-auto"
              >
                <MessageCircle className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                <span>Submit Custom Cake Inquiry via WhatsApp</span>
              </button>

              <p className="text-center text-xs text-chocolate/60 mt-3">
                Submits your tailored requirements to our head chef. We will confirm date availability and quote a transparent final price within 2 business hours.
              </p>

              {fallbackUrl && (
                <div className="text-center mt-3">
                  <a
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-800 hover:underline font-medium"
                  >
                    <span>Click here to open WhatsApp directly</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
