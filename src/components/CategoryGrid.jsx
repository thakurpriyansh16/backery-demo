import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { categories } from '../data/categories';

export default function CategoryGrid({ activeCategory, onSelectCategory, onOpenCustomCake }) {
  // Exclude 'all' for the visual cards grid to keep it dedicated to specific specialties
  const displayCategories = categories.filter((c) => c.id !== 'all');

  return (
    <section className="py-16 md:py-24 bg-cream-100 border-t border-cream-200" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200 text-gold-dark text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Patisserie Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate tracking-tight">
            Shop by Category
          </h2>
          <p className="mt-3 text-chocolate/75 text-sm sm:text-base font-light">
            From layered midnight chocolate fantasies to multi-tiered bespoke bridal centerpieces, explore our handcrafted artisanal creations.
          </p>
        </div>

        {/* Responsive Grid of Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayCategories.map((category, index) => {
            const isCustomCake = category.id === 'custom-cakes';
            const isSelected = activeCategory === category.id;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => {
                  if (isCustomCake) {
                    onOpenCustomCake();
                  } else {
                    onSelectCategory(category.id);
                    const menuEl = document.getElementById('menu');
                    if (menuEl) {
                      menuEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-white border transition-all duration-300 card-hover-effect ${
                  isSelected
                    ? 'border-gold ring-2 ring-gold/40 shadow-soft-lg'
                    : 'border-cream-300/60 hover:border-gold/40'
                }`}
              >
                {/* Image Container with Restrained Aspect Ratio */}
                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-cream-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark/80 via-chocolate-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-chocolate text-[10px] sm:text-xs font-semibold tracking-wide uppercase shadow-sm">
                      {category.badge}
                    </span>
                  </div>

                  {/* Corner Arrow Icon */}
                  <div className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 backdrop-blur-sm text-chocolate flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Bottom Text inside Image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                    <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight leading-snug group-hover:text-gold-amber transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-cream-200/90 font-light line-clamp-1 mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
