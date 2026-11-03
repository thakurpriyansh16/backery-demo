import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, ShoppingBag, Eye, Sparkles, Check } from 'lucide-react';
import { formatPrice } from '../utils/pricing';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct, onDirectOrder }) {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [isAddedQuickly, setIsAddedQuickly] = useState(false);
  const { addToCart } = useCart();

  const handleImageError = () => {
    if (imgSrc !== product.fallbackImage && product.fallbackImage) {
      setImgSrc(product.fallbackImage);
    }
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultVariant = product.variants?.find((v) => v.isDefault) || product.variants?.[0];
    addToCart({
      product,
      selectedVariant: defaultVariant,
      selectedFlavor: product.flavors?.[0] || 'Original Chef Selection',
      quantity: 1,
      dietaryPreference: product.isEgglessDefault ? 'Eggless' : 'Contains Egg',
    });
    setIsAddedQuickly(true);
    setTimeout(() => setIsAddedQuickly(false), 2000);
  };

  const startingPrice = product.variants?.length
    ? Math.min(...product.variants.map((v) => v.price))
    : product.basePrice;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-3xl overflow-hidden border border-cream-300/60 hover:border-gold/50 shadow-soft-sm hover:shadow-soft-lg transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Box */}
      <div className="relative aspect-[4/3] bg-cream-200 overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
          width="400"
          height="300"
        />

        {/* Dietary / Bestseller Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isBestseller && (
            <span className="px-2.5 py-1 rounded-full bg-chocolate text-gold text-[10px] font-bold tracking-wider uppercase shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Bestseller</span>
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full bg-rose-strawberry text-chocolate-dark text-[10px] font-bold tracking-wider uppercase shadow-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Eggless Indicator */}
        {product.isEgglessAvailable && (
          <div className="absolute top-3 right-3 z-10" title="100% Eggless available">
            <span className="w-6 h-6 rounded-md bg-white/95 backdrop-blur-sm border border-emerald-600/40 flex items-center justify-center p-1 shadow-sm">
              {/* Official Green Dot Vegetarian / Eggless mark */}
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            </span>
          </div>
        )}

        {/* Quick Actions Hover Overlay on Desktop */}
        <div className="absolute inset-0 bg-chocolate-dark/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="px-4 py-2 rounded-full bg-white text-chocolate text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-soft hover:bg-cream-100 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gold-dark" />
            <span>Customize</span>
          </button>
          
          <button
            onClick={handleQuickAdd}
            className={`p-2.5 rounded-full text-xs font-semibold tracking-wide flex items-center justify-center shadow-soft transition-colors ${
              isAddedQuickly
                ? 'bg-emerald-600 text-white'
                : 'bg-chocolate text-cream-100 hover:bg-chocolate-light'
            }`}
            title="Quick add default size to cart"
            aria-label="Quick add to cart"
          >
            {isAddedQuickly ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4 text-gold" />}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-chocolate/60 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-gold-dark">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 font-medium text-chocolate">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{product.rating}</span>
              <span className="text-chocolate/40">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-chocolate group-hover:text-gold-dark transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mt-1.5 text-xs sm:text-sm text-chocolate/70 font-light line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Size Pills Preview */}
          {product.variants?.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.variants.map((v) => (
                <span
                  key={v.id}
                  className="px-2 py-0.5 rounded-md bg-cream-200/70 text-chocolate/80 text-[10px] font-medium"
                >
                  {v.name.split(' ')[0]} {v.name.split(' ')[1] || ''}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Order CTA Footer */}
        <div className="mt-5 pt-4 border-t border-cream-200/80 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-chocolate/60 block font-medium">
              Starting from
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
              {formatPrice(startingPrice)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(product);
              }}
              className="px-3.5 py-2 rounded-full border border-cream-300 hover:border-gold text-chocolate hover:text-chocolate-dark text-xs font-semibold transition-colors"
            >
              Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDirectOrder(product);
              }}
              className="px-4 py-2 rounded-full bg-chocolate hover:bg-chocolate-light text-cream-100 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 text-gold" />
              <span>Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
