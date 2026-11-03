import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-cream-100 overflow-hidden relative" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl overflow-hidden aspect-[3/4] shadow-soft-lg border-2 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"
                  alt="Pastry chef tempering chocolate in the patisserie atelier"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-3xl overflow-hidden aspect-[3/4] shadow-soft-lg border-2 border-white mt-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=700&q=80"
                  alt="Freshly whipped genoise sponge and tartlet shells"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>

            {/* Central Circular Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-chocolate text-cream-100 p-3 shadow-soft-xl border-4 border-cream-100 flex flex-col items-center justify-center text-center">
              <Sparkles className="w-5 h-5 text-gold mb-1" />
              <span className="font-serif text-[11px] font-bold uppercase tracking-wider text-gold">
                Artisanal
              </span>
              <span className="text-[10px] text-cream-200/80">Batch Baked</span>
            </div>
          </div>

          {/* Right Brand Story Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200 border border-gold/30 text-chocolate-light text-xs font-semibold tracking-wider uppercase">
              <Heart className="w-3.5 h-3.5 text-rose-deep" />
              <span>Our Baking Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate tracking-tight leading-tight">
              Where Haute French Technique Meets Pure Passion.
            </h2>

            <p className="text-chocolate/80 text-sm sm:text-base leading-relaxed font-light">
              At <strong>{siteConfig.bakeryName}</strong>, we believe every celebratory moment deserves a cake that tastes just as breathtaking as it looks. We reject shortcut premixes, artificial preservatives, and industrial vegetable fats.
            </p>

            <p className="text-chocolate/80 text-sm sm:text-base leading-relaxed font-light">
              Instead, our kitchen honors timeless pastry traditions: slow-simmered berry compotes, single-origin Belgian chocolate ganache tempered to an immaculate gloss, and pure creamery butter whipped to cloud-like lightness.
            </p>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {siteConfig.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-cream-300/70 shadow-soft-sm"
                >
                  <h4 className="font-serif text-sm font-bold text-chocolate mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-chocolate/70 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote Signature */}
            <div className="pt-4 border-t border-cream-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-cream-300 border border-gold/40">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80"
                  alt="Head Pastry Chef"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-serif text-sm font-bold text-chocolate italic">
                  "A dessert isn’t just food; it’s the centerpiece of joy in every memory."
                </p>
                <p className="text-xs text-gold-dark font-medium uppercase tracking-wider mt-0.5">
                  Head Chef & Founder · {siteConfig.shortName}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
