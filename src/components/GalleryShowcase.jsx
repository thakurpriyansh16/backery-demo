import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Eye, X, Sparkles, ExternalLink } from 'lucide-react';
import { galleryData } from '../data/galleryData';
import { siteConfig } from '../config/siteConfig';

export default function GalleryShowcase() {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section className="py-20 bg-cream-100" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 sm:mb-16">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200 text-gold-dark text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Confectionery Visual Gallery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate tracking-tight">
              From Our Oven to Your Table
            </h2>
          </div>

          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-cream-200 text-chocolate border border-cream-300 shadow-soft text-xs font-semibold tracking-wide transition-all group"
          >
            <Instagram className="w-4 h-4 text-rose-deep group-hover:scale-110 transition-transform" />
            <span>Follow {siteConfig.social.instagramHandle}</span>
            <ExternalLink className="w-3.5 h-3.5 text-chocolate/50" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => setActivePhoto(item)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-square bg-cream-200 cursor-pointer shadow-soft-sm hover:shadow-soft-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-chocolate-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-6 text-white">
                <span className="text-[10px] sm:text-xs font-bold text-gold uppercase tracking-wider self-start px-2 py-0.5 rounded-full bg-chocolate/80">
                  {item.tag}
                </span>

                <div>
                  <h4 className="font-serif text-sm sm:text-base md:text-lg font-bold leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-cream-200/80 line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-chocolate-dark/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-soft-xl border border-gold/40"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-chocolate flex items-center justify-center hover:bg-white shadow-soft transition-transform hover:scale-105"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[4/3] bg-cream-200 overflow-hidden">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-xs uppercase font-bold text-gold-dark tracking-wider">
                  {activePhoto.tag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-chocolate mt-1">
                  {activePhoto.title}
                </h3>
                <p className="text-sm text-chocolate/80 mt-2 font-light leading-relaxed">
                  {activePhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
