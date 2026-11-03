import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Filter, CheckCircle2, CakeSlice } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from './ProductCard';

export default function MenuSection({
  activeCategory,
  onSelectCategory,
  onSelectProduct,
  onDirectOrder,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'eggless', 'bestseller'

  // Filter products based on category, search query, and dietary preference
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;

      // Search match
      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flavors?.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.ingredients?.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      // Dietary match
      let matchesDietary = true;
      if (dietaryFilter === 'eggless') {
        matchesDietary = product.isEgglessAvailable;
      } else if (dietaryFilter === 'bestseller') {
        matchesDietary = product.isBestseller;
      }

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, searchQuery, dietaryFilter]);

  return (
    <section className="py-20 md:py-28 bg-cream-100 relative" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-200 border border-gold/40 text-chocolate-light text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Our Handcrafted Menu</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate tracking-tight">
            Artisanal Cakes & Desserts
          </h2>
          <p className="mt-3 text-chocolate/80 text-sm sm:text-base font-light">
            Each creation is baked with pure butter, single-origin chocolate, and fresh seasonal fruits. Select any confection to customize size, flavor, and personalized messages.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="space-y-6 mb-12">
          
          {/* Top Search & Dietary Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-chocolate/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by flavor (e.g. Belgian Truffle, Biscoff, Vanilla)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 rounded-full bg-white border border-cream-300 text-chocolate placeholder:text-chocolate/40 focus:outline-none focus:ring-2 focus:ring-gold shadow-soft-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-chocolate/50 hover:text-chocolate"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  dietaryFilter === 'all'
                    ? 'bg-chocolate text-cream-100 shadow-sm'
                    : 'bg-white border border-cream-300 text-chocolate/80 hover:bg-cream-200'
                }`}
              >
                All Confections
              </button>

              <button
                onClick={() => setDietaryFilter('eggless')}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  dietaryFilter === 'eggless'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white border border-cream-300 text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>100% Eggless Only</span>
              </button>

              <button
                onClick={() => setDietaryFilter('bestseller')}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  dietaryFilter === 'bestseller'
                    ? 'bg-gold-dark text-white shadow-sm'
                    : 'bg-white border border-cream-300 text-gold-dark hover:bg-cream-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Bestsellers</span>
              </button>
            </div>
          </div>

          {/* Category Tabs (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cream-300/60 no-scrollbar">
            {categories.map((cat) => {
              if (cat.id === 'custom-cakes') return null; // handled separately
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-chocolate text-gold shadow-soft'
                      : 'bg-cream-200/80 hover:bg-cream-200 text-chocolate/80'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-chocolate/60 mb-6">
          <span>
            Showing <strong>{filteredProducts.length}</strong> artisanal items
          </span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-gold-dark hover:underline font-semibold"
            >
              Reset to All Categories
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-cream-300 p-8">
            <CakeSlice className="w-12 h-12 text-chocolate/30 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-chocolate mb-1">
              No cakes found matching your search
            </h3>
            <p className="text-xs text-chocolate/70 max-w-sm mx-auto mb-6">
              Try adjusting your search terms or view our complete handcrafted collections.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                onSelectCategory('all');
              }}
              className="px-6 py-2.5 rounded-full bg-chocolate text-cream-100 text-xs font-semibold hover:bg-chocolate-light transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onDirectOrder={onDirectOrder}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
