import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section className="py-20 bg-cream-200/40 relative overflow-hidden" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 border border-gold/30 text-gold-dark text-xs font-semibold tracking-wider uppercase mb-3">
            <Star className="w-3.5 h-3.5 fill-gold-dark" />
            <span>Celebration Memories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate tracking-tight">
            Loved Across 500+ Gatherings
          </h2>
          <p className="mt-3 text-chocolate/75 text-sm sm:text-base font-light">
            Real stories and notes shared by clients who trusted us with their milestone birthdays, weddings, and celebrations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-cream-300/60 flex flex-col justify-between card-hover-effect"
            >
              <div>
                {/* Star rating & quote mark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-cream-300" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-chocolate/85 leading-relaxed font-light italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-5 mt-5 border-t border-cream-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-chocolate flex items-center gap-1.5">
                      <span>{review.name}</span>
                      {review.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Verified Customer" />
                      )}
                    </h4>
                    <p className="text-[11px] text-chocolate/60 font-medium">
                      {review.role}
                    </p>
                  </div>
                  <span className="text-[10px] text-chocolate/40 font-medium">
                    {review.celebrationDate}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
