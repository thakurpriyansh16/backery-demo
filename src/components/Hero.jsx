import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, ArrowRight, Award, Clock, Heart } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Hero({ onOpenCustomCake }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-cream-100 via-cream-200/50 to-cream-100">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-rose-strawberry/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200 border border-gold/30 text-chocolate-light text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse-subtle" />
              <span>Haute Patisserie Française & Bespoke Tiers</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-chocolate leading-[1.08]">
              A Little Slice of <br />
              <span className="italic font-normal font-cormorant gold-gradient-text">
                Pure Happiness.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-chocolate/80 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              Handcrafted artisan celebration cakes, French entremets, and rich cocoa brownies whipped daily with pure creamery butter, single-origin Belgian chocolate, and Madagascar vanilla beans.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-chocolate text-cream-100 hover:bg-chocolate-light font-medium px-8 py-4 rounded-full shadow-soft-lg hover:shadow-soft-xl hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>Explore Our Cakes</span>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  siteConfig.whatsappDefaultGreeting
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-chocolate hover:text-chocolate-dark font-medium px-7 py-4 rounded-full border border-cream-300 hover:border-gold/60 shadow-soft hover:shadow-soft-lg transition-all duration-300 group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-cream-300/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-bold text-chocolate">100%</span>
                <span className="text-xs text-chocolate/70 font-medium">Pure Butter & Couverture</span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-x border-cream-300/80 px-2">
                <span className="font-serif text-2xl font-bold text-chocolate">Eggless</span>
                <span className="text-xs text-chocolate/70 font-medium">Sponges Available</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-bold text-chocolate">Same Day</span>
                <span className="text-xs text-chocolate/70 font-medium">Delivery (4 hrs lead)</span>
              </div>
            </div>
          </motion.div>

          {/* Right Cake Composition Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md sm:max-w-lg">
              {/* Backing decorative frame */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-rose-dusty/30 via-cream-300/40 to-gold/20 transform rotate-3 scale-95 -z-10" />

              {/* Main Masterpiece Image Card */}
              <div className="relative rounded-[2.25rem] overflow-hidden bg-cream-200 border-2 border-white shadow-soft-xl aspect-[4/5] sm:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80"
                  alt="Belgian Chocolate Truffle Celebration Cake"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  width="600"
                  height="600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[11px] uppercase tracking-widest text-gold-amber font-semibold block mb-0.5">
                    Chef's Signature
                  </span>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                    Belgian Dark Truffle & 24K Gold
                  </p>
                </div>
              </div>

              {/* Floating Badge 1 - Top Left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-soft-lg border border-gold/30 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-rose-strawberry/20 text-rose-deep flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-rose-deep" />
                </div>
                <div>
                  <p className="text-xs font-bold text-chocolate leading-tight">Baked Fresh Daily</p>
                  <p className="text-[11px] text-chocolate/70">Zero Preservatives</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom Right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-4 sm:-right-6 bg-chocolate text-cream-100 p-4 rounded-2xl shadow-soft-xl border border-gold/40 max-w-[200px]"
              >
                <div className="flex items-center gap-1.5 text-gold mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-[11px] uppercase font-bold tracking-wider">Top Rated</span>
                </div>
                <p className="text-xs font-medium text-cream-200/90 leading-snug">
                  4.9★ from 500+ celebrations across the city
                </p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
