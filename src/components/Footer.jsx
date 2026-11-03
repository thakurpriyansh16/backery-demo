import React from 'react';
import { Heart, Instagram, Facebook, MessageCircle, Phone, Mail, Sparkles, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Footer({ onOpenCustomCake }) {
  return (
    <footer className="bg-chocolate-dark text-cream-100 border-t border-gold/30 pt-16 pb-12 overflow-hidden relative">
      {/* Decorative ambient gold glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-cream-200/15">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold text-chocolate font-serif font-bold text-xl flex items-center justify-center">
                L
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  {siteConfig.bakeryName}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-amber block">
                  Haute Patisserie Française
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-200/75 max-w-sm leading-relaxed font-light">
              {siteConfig.subTagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-chocolate text-cream-100 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-chocolate text-cream-100 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  siteConfig.whatsappDefaultGreeting
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-600/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80 font-light">
              <li>
                <a href="#menu" className="hover:text-gold transition-colors">Our Menu</a>
              </li>
              <li>
                <button
                  onClick={onOpenCustomCake}
                  className="hover:text-gold transition-colors text-left"
                >
                  Custom Tiers
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-gold transition-colors">Our Philosophy</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-gold transition-colors">Client Reviews</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold transition-colors">Cake Gallery</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold transition-colors">Order FAQs</a>
              </li>
            </ul>
          </div>

          {/* Specialties (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold">
              Creations
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80 font-light">
              <li>Belgian Truffle Cakes</li>
              <li>100% Eggless Sponges</li>
              <li>Lotus Biscoff Tiers</li>
              <li>Gourmet Fudgy Brownies</li>
              <li>Artisanal Cupcakes</li>
              <li>Multi-Tier Bridal Cakes</li>
            </ul>
          </div>

          {/* Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold">
              Boutique Hours
            </h4>
            <div className="text-xs text-cream-200/80 space-y-1 font-light">
              <p>Mon – Fri: {siteConfig.businessHours.weekdays}</p>
              <p>Sat – Sun: {siteConfig.businessHours.weekends}</p>
              <p className="pt-2 text-gold-amber font-medium">
                {siteConfig.contact.phone}
              </p>
              <p className="text-cream-200/60 truncate">
                {siteConfig.contact.email}
              </p>
            </div>
          </div>

        </div>

        {/* Privacy & WhatsApp Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-cream-200/60 font-light">
          <div className="flex items-center gap-2 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
            <span>
              <strong>Privacy Assurance:</strong> Order customization details are shared directly with the bakery owner on WhatsApp when you proceed. No sensitive payment or card details are captured on this site.
            </span>
          </div>

          <div className="text-center md:text-right text-cream-200/60">
            © {new Date().getFullYear()} {siteConfig.bakeryName}. Handcrafted with love.
          </div>
        </div>

      </div>
    </footer>
  );
}
