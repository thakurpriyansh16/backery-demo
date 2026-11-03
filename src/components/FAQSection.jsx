import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { faqData } from '../data/faqData';
import { siteConfig } from '../config/siteConfig';

export default function FAQSection() {
  const [openId, setOpenId] = useState(faqData[0]?.id || null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 md:py-28 bg-cream-200/50 relative" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 border border-gold/30 text-gold-dark text-xs font-semibold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Essential Ordering Guide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-chocolate/75 text-sm sm:text-base font-light">
            Everything you need to know about our ingredients, WhatsApp ordering flow, lead times, and doorstep delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl sm:rounded-3xl border border-cream-300/80 bg-white shadow-soft-sm overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-gold/60"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-chocolate">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-chocolate flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-chocolate text-gold' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-chocolate/80 text-xs sm:text-sm leading-relaxed font-light border-t border-cream-200/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-gold/40 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg font-bold text-chocolate">
              Have a bespoke request or dietary allergy?
            </h4>
            <p className="text-xs text-chocolate/70 mt-1 font-light">
              Chat directly with our head baker. We're delighted to customize our recipes.
            </p>
          </div>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              siteConfig.whatsappDefaultGreeting
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-2 shadow-soft transition-colors flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
