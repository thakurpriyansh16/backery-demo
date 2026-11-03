import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function ContactSection() {
  return (
    <section className="py-20 md:py-28 bg-cream-100 border-t border-cream-200" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200 text-gold-dark text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visit or Connect</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate tracking-tight">
            Our Boutique Atelier
          </h2>
          <p className="mt-3 text-chocolate/75 text-sm sm:text-base font-light">
            Drop by our fragrance-filled pastry counter for cake tastings and pickup, or reach our concierge directly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Cards: Contact Info & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cream-200 flex items-center justify-center text-chocolate flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold-dark" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-chocolate mb-1">
                    Boutique Location
                  </h4>
                  <p className="text-xs sm:text-sm text-chocolate/80 leading-relaxed font-light">
                    {siteConfig.contact.address.line1}
                    <br />
                    {siteConfig.contact.address.line2}
                    <br />
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.state} — {siteConfig.contact.address.pincode}
                  </p>
                  <a
                    href={siteConfig.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-dark hover:text-chocolate mt-3 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cream-200 flex items-center justify-center text-chocolate flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-lg font-bold text-chocolate mb-1">
                    Baking & Boutique Hours
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm text-chocolate/80 font-light">
                    <div className="flex justify-between">
                      <span>Monday – Friday:</span>
                      <span className="font-semibold text-chocolate">{siteConfig.businessHours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday & Sunday:</span>
                      <span className="font-semibold text-chocolate">{siteConfig.businessHours.weekends}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gold-dark italic mt-2">
                    {siteConfig.businessHours.kitchenOpen}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect Quick Card */}
            <div className="p-6 rounded-3xl bg-chocolate text-cream-100 shadow-soft-lg border border-gold/30">
              <h4 className="font-serif text-lg font-bold mb-2 text-cream-100">
                Direct WhatsApp Concierge
              </h4>
              <p className="text-xs text-cream-200/80 mb-4 font-light leading-relaxed">
                Need urgent assistance, delivery updates, or an ingredient inquiry? Message our team directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    siteConfig.whatsappDefaultGreeting
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 text-cream-100 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-white/20"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  <span>Call {siteConfig.contact.phone}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map Preview & Pickup Counter */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-cream-200 border border-cream-300 shadow-soft relative flex flex-col min-h-[380px]">
            <iframe
              title="Bakery Boutique Location"
              src={siteConfig.contact.embedMapUrl}
              className="w-full h-full min-h-[360px] border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay Banner at Bottom */}
            <div className="bg-white/95 backdrop-blur-md p-4 border-t border-cream-300 flex items-center justify-between text-xs">
              <span className="font-semibold text-chocolate">
                📍 Free visitor parking available in front of our boutique.
              </span>
              <a
                href={siteConfig.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
