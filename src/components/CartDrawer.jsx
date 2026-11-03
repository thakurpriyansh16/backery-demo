import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  Info,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';
import { siteConfig } from '../config/siteConfig';
import { createWhatsAppCartCheckout, isWhatsAppConfigured } from '../utils/whatsapp';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
  } = useCart();

  // Checkout form details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [requestedDate, setRequestedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [deliveryPreference, setDeliveryPreference] = useState('Pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [fallbackUrl, setFallbackUrl] = useState('');

  const minDate = new Date().toISOString().split('T')[0];

  // Delivery fee calculation
  const isFreeDelivery = cartSubtotal >= siteConfig.delivery.freeDeliveryThreshold;
  const deliveryFee =
    deliveryPreference === 'Delivery'
      ? isFreeDelivery
        ? 0
        : siteConfig.delivery.standardDeliveryFee
      : 0;

  const grandTotal = cartSubtotal + deliveryFee;

  const validateCartCheckout = () => {
    const errs = {};
    if (!customerName.trim()) {
      errs.customerName = 'Please enter your name';
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!customerPhone.trim() || cleanPhone.length < 10) {
      errs.customerPhone = 'Valid 10-digit phone required';
    }
    if (!requestedDate) {
      errs.requestedDate = 'Select delivery/pickup date';
    }
    if (deliveryPreference === 'Delivery' && (!deliveryAddress.trim() || deliveryAddress.trim().length < 8)) {
      errs.deliveryAddress = 'Full address required for delivery';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckoutWhatsApp = () => {
    if (!validateCartCheckout()) return;

    if (!isWhatsAppConfigured()) {
      alert('Bakery WhatsApp number not configured in siteConfig.js.');
      return;
    }

    const checkoutDetails = {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      requestedDate,
      deliveryPreference,
      deliveryAddress: deliveryPreference === 'Delivery' ? deliveryAddress.trim() : '',
      generalNotes: generalNotes.trim(),
      subtotal: cartSubtotal,
      deliveryFee,
      grandTotal,
    };

    const url = createWhatsAppCartCheckout(cartItems, checkoutDetails);
    setFallbackUrl(url);

    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      console.warn('Popup blocked');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-chocolate-dark/50 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-cream-100 shadow-soft-xl border-l border-gold/30 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-cream-300 flex items-center justify-between bg-cream-200/50">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-chocolate" />
                  <h2 className="font-serif text-xl font-bold text-chocolate">
                    Your Patisserie Basket
                  </h2>
                  <span className="text-xs bg-chocolate text-gold font-bold px-2 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-cream-300/60 text-chocolate transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List or Empty State */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mb-4 text-chocolate/50">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="font-serif text-xl font-bold text-chocolate mb-1">
                      Your basket is empty
                    </p>
                    <p className="text-xs text-chocolate/70 max-w-xs mb-6">
                      Discover our handcrafted chocolate truffles, red velvet sponges, and artisanal entremets.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        const menu = document.getElementById('menu');
                        if (menu) menu.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 rounded-full bg-chocolate text-cream-100 text-xs font-semibold hover:bg-chocolate-light transition-colors"
                    >
                      Explore Menu
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {cartItems.map((item) => {
                        const itemPrice =
                          item.selectedVariant?.price || item.product.basePrice;
                        return (
                          <div
                            key={item.cartId}
                            className="bg-white p-3.5 rounded-2xl border border-cream-300/80 shadow-soft-sm flex gap-3.5 items-start"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-16 h-16 rounded-xl object-cover bg-cream-200 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-serif text-sm font-bold text-chocolate truncate">
                                  {item.product.name}
                                </h4>
                                <button
                                  onClick={() => removeFromCart(item.cartId)}
                                  className="text-chocolate/40 hover:text-rose-deep p-0.5 transition-colors"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <p className="text-[11px] text-chocolate/70 font-medium">
                                {item.selectedVariant?.name || 'Standard'}
                                {item.selectedFlavor ? ` · ${item.selectedFlavor}` : ''}
                              </p>

                              {item.cakeMessage && (
                                <p className="text-[10px] text-gold-dark italic truncate mt-0.5">
                                  "{item.cakeMessage}"
                                </p>
                              )}

                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 bg-cream-100 border border-cream-300 rounded-full px-2 py-0.5">
                                  <button
                                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                    className="w-4 h-4 text-chocolate font-bold flex items-center justify-center hover:text-gold-dark"
                                  >
                                    -
                                  </button>
                                  <span className="text-xs font-bold text-chocolate">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                    className="w-4 h-4 text-chocolate font-bold flex items-center justify-center hover:text-gold-dark"
                                  >
                                    +
                                  </button>
                                </div>
                                <span className="font-serif text-sm font-bold text-chocolate">
                                  {formatPrice(itemPrice * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Customer Fulfillment Details for Cart Checkout */}
                    <div className="pt-4 border-t border-cream-300 space-y-3 bg-cream-200/40 p-4 rounded-2xl">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-chocolate">
                        Delivery & Recipient Details
                      </h4>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <input
                            type="text"
                            placeholder="Your Name *"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className={`w-full text-xs p-2 rounded-xl bg-white border ${
                              errors.customerName ? 'border-rose-deep' : 'border-cream-300'
                            }`}
                          />
                        </div>
                        <div>
                          <input
                            type="tel"
                            placeholder="Phone Number *"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className={`w-full text-xs p-2 rounded-xl bg-white border ${
                              errors.customerPhone ? 'border-rose-deep' : 'border-cream-300'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <input
                            type="date"
                            min={minDate}
                            value={requestedDate}
                            onChange={(e) => setRequestedDate(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl bg-white border border-cream-300 text-chocolate"
                          />
                        </div>
                        <div className="flex gap-1">
                          {['Pickup', 'Delivery'].map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setDeliveryPreference(mode)}
                              className={`flex-1 text-xs py-1.5 rounded-xl font-medium border ${
                                deliveryPreference === mode
                                  ? 'bg-chocolate text-cream-100 border-chocolate'
                                  : 'bg-white border-cream-300 text-chocolate'
                              }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>

                      {deliveryPreference === 'Delivery' && (
                        <div>
                          <textarea
                            rows={2}
                            placeholder="Delivery Address & Landmark *"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className={`w-full text-xs p-2 rounded-xl bg-white border ${
                              errors.deliveryAddress ? 'border-rose-deep' : 'border-cream-300'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Cart Footer & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-cream-300 bg-white space-y-3">
                  <div className="space-y-1.5 text-xs text-chocolate/80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-chocolate">{formatPrice(cartSubtotal)}</span>
                    </div>
                    {deliveryPreference === 'Delivery' && (
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>{isFreeDelivery ? 'FREE' : formatPrice(deliveryFee)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-chocolate pt-2 border-t border-cream-200">
                      <span>Grand Total (Est.)</span>
                      <span className="font-serif text-lg">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutWhatsApp}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3.5 px-4 rounded-full shadow-soft-lg flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
                    <span>Send Basket to WhatsApp</span>
                  </button>

                  <p className="text-[10px] text-center text-chocolate/60">
                    Submits all {cartItems.length} items to baker on WhatsApp for review. Final total & payment link confirmed in chat.
                  </p>

                  {fallbackUrl && (
                    <div className="text-center">
                      <a
                        href={fallbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-800 hover:underline"
                      >
                        <span>Open WhatsApp manually</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
