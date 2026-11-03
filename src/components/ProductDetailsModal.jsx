import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MessageCircle,
  ShoppingBag,
  Clock,
  Sparkles,
  Calendar,
  MapPin,
  Check,
  AlertCircle,
  Info,
  ExternalLink,
} from 'lucide-react';
import { formatPrice, calculateItemPrice } from '../utils/pricing';
import { createWhatsAppOrder, isWhatsAppConfigured } from '../utils/whatsapp';
import { validateOrderForm } from '../utils/validation';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../config/siteConfig';

export default function ProductDetailsModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  const { addToCart } = useCart();

  // Selected Options
  const [selectedVariant, setSelectedVariant] = useState(
    () => product.variants?.find((v) => v.isDefault) || product.variants?.[0] || null
  );
  const [selectedFlavor, setSelectedFlavor] = useState(
    () => product.flavors?.[0] || 'Standard Formulation'
  );
  const [quantity, setQuantity] = useState(1);
  const [dietaryPreference, setDietaryPreference] = useState(
    product.isEgglessDefault ? '100% Eggless' : 'Contains Egg'
  );

  // Customization & Customer Info
  const [cakeMessage, setCakeMessage] = useState('');
  const [requestedDate, setRequestedDate] = useState(() => {
    // Default to tomorrow or today + lead hours
    const d = new Date();
    d.setDate(d.getDate() + (product.leadTimeHours >= 24 ? 1 : 0));
    return d.toISOString().split('T')[0];
  });
  const [requestedTime, setRequestedTime] = useState('Afternoon (2:00 PM – 5:00 PM)');
  const [deliveryPreference, setDeliveryPreference] = useState('Pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  // UI States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  // Reset variant if product changes
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants?.find((v) => v.isDefault) || product.variants?.[0] || null);
      setSelectedFlavor(product.flavors?.[0] || 'Standard Formulation');
      setQuantity(1);
      setErrors({});
      setGeneratedWhatsAppUrl('');
      setShowOrderSummary(false);
    }
  }, [product]);

  // Minimum date allowed is today
  const minDate = new Date().toISOString().split('T')[0];

  // Pricing calculation
  const unitPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const totalPrice = unitPrice * quantity;

  // Build order payload
  const currentOrderDetails = {
    productName: product.name,
    variantName: selectedVariant?.name || 'Standard Size',
    flavor: selectedFlavor,
    quantity,
    unitPrice,
    totalPrice,
    cakeMessage: cakeMessage.trim(),
    dietaryPreference,
    requestedDate,
    requestedTime,
    deliveryPreference,
    deliveryAddress: deliveryPreference === 'Delivery' ? deliveryAddress.trim() : '',
    customerName: customerName.trim(),
    customerPhone: customerPhone.trim(),
    additionalInstructions: additionalInstructions.trim(),
  };

  const handleValidation = () => {
    const { isValid, errors: validationErrors } = validateOrderForm({
      customerName,
      customerPhone,
      requestedDate,
      deliveryPreference,
      deliveryAddress,
    });
    setErrors(validationErrors);
    return isValid;
  };

  const handleReviewAndOrderWhatsApp = () => {
    if (!handleValidation()) {
      setShowOrderSummary(false);
      return;
    }

    if (!isWhatsAppConfigured()) {
      alert(
        'The bakery owner WhatsApp number is not yet configured. Please check siteConfig.js to set your number.'
      );
      return;
    }

    const whatsappUrl = createWhatsAppOrder(currentOrderDetails);
    setGeneratedWhatsAppUrl(whatsappUrl);
    setShowOrderSummary(true);

    // Open WhatsApp in new tab
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Popup blocked - the URL is preserved in the UI fallback
      console.warn('Popup blocked, rendering fallback direct button');
    }
  };

  const handleAddToCart = () => {
    addToCart({
      product,
      selectedVariant,
      selectedFlavor,
      quantity,
      cakeMessage: cakeMessage.trim(),
      dietaryPreference,
      requestedDate,
      requestedTime,
      deliveryPreference,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-chocolate-dark/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-cream-100 rounded-3xl shadow-soft-xl overflow-hidden border border-gold/30 my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-chocolate flex items-center justify-center shadow-soft transition-transform hover:scale-105"
          aria-label="Close product modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Visual Showcase & Ingredients */}
          <div className="md:col-span-5 bg-cream-200/70 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-cream-300/60">
            <div>
              {/* Product Hero Image */}
              <div className="rounded-2xl overflow-hidden aspect-square bg-cream-300 shadow-soft mb-6 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.isEgglessAvailable && (
                  <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-800 border border-emerald-600/30 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>100% Eggless Option</span>
                  </div>
                )}
              </div>

              {/* Title & Category */}
              <span className="text-xs uppercase tracking-widest text-gold-dark font-bold block mb-1">
                {product.categoryName}
              </span>
              <h2
                id="product-modal-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-chocolate leading-tight"
              >
                {product.name}
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-chocolate/80 leading-relaxed font-light">
                {product.fullDescription}
              </p>

              {/* Ingredients Pill Showcase */}
              {product.ingredients?.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-[11px] uppercase tracking-wider text-chocolate/70 font-semibold mb-2">
                    Finest Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/80 border border-cream-300 text-chocolate/80 text-[11px] font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Lead Time & Assurance Note */}
            <div className="mt-6 pt-4 border-t border-cream-300/80 flex items-center gap-3 text-chocolate/70 text-xs">
              <Clock className="w-4 h-4 text-gold flex-shrink-0" />
              <span>
                Preparation Notice: <strong>{product.prepTime}</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Customization & Direct WhatsApp Order Form */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 bg-white/60">
            {/* Live Pricing Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-cream-200">
              <div>
                <span className="text-xs text-chocolate/60 uppercase tracking-wider block font-medium">
                  Total Investment
                </span>
                <span className="font-serif text-3xl font-bold text-chocolate">
                  {formatPrice(totalPrice)}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-chocolate/60 ml-2">
                    ({formatPrice(unitPrice)} each × {quantity})
                  </span>
                )}
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center gap-3 bg-cream-100 border border-cream-300 rounded-full px-3 py-1.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full bg-white hover:bg-cream-200 text-chocolate font-bold flex items-center justify-center transition-colors disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-chocolate text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 rounded-full bg-white hover:bg-cream-200 text-chocolate font-bold flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* 1. Size / Portion Selection */}
            {product.variants?.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate mb-2.5">
                  1. Select Size / Portion <span className="text-rose-deep">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-gold bg-cream-100 ring-2 ring-gold/40 shadow-soft-sm'
                            : 'border-cream-300 hover:border-cream-400 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-chocolate">{variant.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-gold-dark" />}
                        </div>
                        <span className="text-xs font-semibold text-gold-dark block mt-1">
                          {formatPrice(variant.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Flavor Options Selection */}
            {product.flavors?.length > 1 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate mb-2">
                  2. Flavor Notes
                </label>
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-cream-300 rounded-xl px-3.5 py-2.5 text-chocolate focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  {product.flavors.map((flavor, i) => (
                    <option key={i} value={flavor}>
                      {flavor}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 3. Dietary Choice */}
            {product.isEgglessAvailable && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate mb-2">
                  3. Dietary Formulation
                </label>
                <div className="flex gap-3">
                  {['100% Eggless', 'Contains Egg'].map((pref) => (
                    <label
                      key={pref}
                      className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                        dietaryPreference === pref
                          ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 ring-1 ring-emerald-600'
                          : 'border-cream-300 bg-white text-chocolate/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dietary"
                        checked={dietaryPreference === pref}
                        onChange={() => setDietaryPreference(pref)}
                        className="sr-only"
                      />
                      <span>{pref}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Custom Cake Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-chocolate mb-1.5 flex justify-between">
                <span>4. Message on Cake (Optional)</span>
                <span className="text-chocolate/50 font-normal">{cakeMessage.length}/35</span>
              </label>
              <input
                type="text"
                maxLength={35}
                placeholder="e.g. Happy 30th Birthday Rahul! 🎉"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                className="w-full text-xs sm:text-sm bg-white border border-cream-300 rounded-xl px-3.5 py-2.5 text-chocolate placeholder:text-chocolate/35 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            {/* 5. Fulfillment & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate mb-1.5">
                  Desired Date <span className="text-rose-deep">*</span>
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={requestedDate}
                  onChange={(e) => setRequestedDate(e.target.value)}
                  className={`w-full text-xs sm:text-sm bg-white border rounded-xl px-3.5 py-2.5 text-chocolate focus:outline-none focus:ring-2 focus:ring-gold ${
                    errors.requestedDate ? 'border-rose-deep ring-1 ring-rose-deep' : 'border-cream-300'
                  }`}
                />
                {errors.requestedDate && (
                  <p className="text-[11px] text-rose-deep mt-1">{errors.requestedDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate mb-1.5">
                  Fulfillment Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Pickup', 'Delivery'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDeliveryPreference(mode)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        deliveryPreference === mode
                          ? 'border-chocolate bg-chocolate text-cream-100 shadow-sm'
                          : 'border-cream-300 bg-white text-chocolate/80 hover:bg-cream-100'
                      }`}
                    >
                      {mode === 'Pickup' ? 'Boutique Pickup' : 'Home Delivery'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Conditional Delivery Address */}
            {deliveryPreference === 'Delivery' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-1.5"
              >
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate">
                  Delivery Address & Pincode <span className="text-rose-deep">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Apartment/Villa No, Street, Landmark, Pincode"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className={`w-full text-xs sm:text-sm bg-white border rounded-xl p-3 text-chocolate placeholder:text-chocolate/35 focus:outline-none focus:ring-2 focus:ring-gold ${
                    errors.deliveryAddress ? 'border-rose-deep ring-1 ring-rose-deep' : 'border-cream-300'
                  }`}
                />
                {errors.deliveryAddress && (
                  <p className="text-[11px] text-rose-deep">{errors.deliveryAddress}</p>
                )}
              </motion.div>
            )}

            {/* 6. Customer Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-cream-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate mb-1.5">
                  Your Full Name <span className="text-rose-deep">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full text-xs sm:text-sm bg-white border rounded-xl px-3.5 py-2.5 text-chocolate placeholder:text-chocolate/35 focus:outline-none focus:ring-2 focus:ring-gold ${
                    errors.customerName ? 'border-rose-deep ring-1 ring-rose-deep' : 'border-cream-300'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-[11px] text-rose-deep mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate mb-1.5">
                  Mobile / WhatsApp <span className="text-rose-deep">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={`w-full text-xs sm:text-sm bg-white border rounded-xl px-3.5 py-2.5 text-chocolate placeholder:text-chocolate/35 focus:outline-none focus:ring-2 focus:ring-gold ${
                    errors.customerPhone ? 'border-rose-deep ring-1 ring-rose-deep' : 'border-cream-300'
                  }`}
                />
                {errors.customerPhone && (
                  <p className="text-[11px] text-rose-deep mt-1">{errors.customerPhone}</p>
                )}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-chocolate mb-1.5">
                Special Chef Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Less sugar, extra candles, golden sparkler"
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                className="w-full text-xs sm:text-sm bg-white border border-cream-300 rounded-xl px-3.5 py-2.5 text-chocolate placeholder:text-chocolate/35 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            {/* Order Confirmation Notice */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Clicking <strong>"Order on WhatsApp"</strong> sends this order inquiry directly to our baker's WhatsApp. The order is subject to baker review & confirmation. No immediate payment is charged.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleReviewAndOrderWhatsApp}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3.5 px-6 rounded-full shadow-soft-lg hover:shadow-soft-xl flex items-center justify-center gap-2.5 transition-all duration-200 text-sm group"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-700 group-hover:scale-110 transition-transform" />
                <span>Review & Order on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-cream-200 hover:bg-cream-300/80 text-chocolate font-semibold py-3.5 px-6 rounded-full border border-cream-300 flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-chocolate" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Fallback link if popup was blocked */}
            {generatedWhatsAppUrl && (
              <div className="pt-2 text-center">
                <a
                  href={generatedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-800 hover:underline font-medium"
                >
                  <span>Did WhatsApp not open? Click here to continue manually</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
