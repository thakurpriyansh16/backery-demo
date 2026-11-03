import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, MessageCircle, Menu, X, Sparkles, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenCustomCake }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Our Menu', href: '#menu' },
    { name: 'Custom Cakes', href: '#custom-cakes', onClick: onOpenCustomCake },
    { name: 'About Us', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-100/90 backdrop-blur-md shadow-soft border-b border-cream-300/40 py-3'
          : 'bg-cream-100/70 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-lg p-1"
          >
            {/* Cloche/Crown Emblem */}
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-chocolate text-gold flex items-center justify-center shadow-soft-sm group-hover:scale-105 transition-transform">
              <span className="font-serif text-lg font-bold">D</span>
            </div>
            <div>
              <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-chocolate block leading-none">
                Demould 
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold-dark font-medium block mt-1">
                Bakery Cafe
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className="text-chocolate/80 hover:text-chocolate font-medium text-sm tracking-wide transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* WhatsApp Direct Link */}
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                siteConfig.whatsappDefaultGreeting
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-chocolate/80 hover:text-chocolate px-3 py-2 rounded-full border border-cream-300 hover:border-gold/60 transition-colors"
              title="Chat directly with our baker on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span className="hidden xl:inline">WhatsApp Chat</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-cream-200/80 hover:bg-cream-200 text-chocolate transition-colors border border-cream-300/60"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-chocolate text-gold text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream-100 shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Primary Order CTA */}
            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-chocolate text-cream-100 hover:bg-chocolate-light font-medium text-sm px-5 py-2.5 rounded-full shadow-soft hover:shadow-soft-lg transition-all duration-300 group"
            >
              <Sparkles className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
              <span>Order Now</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 sm:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-cream-200 text-chocolate"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-chocolate text-gold text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-cream-200 text-chocolate focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="sm:hidden border-b border-cream-300 bg-cream-100/98 px-4 pt-3 pb-6 shadow-soft-lg overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.onClick) link.onClick(e);
                  }}
                  className="px-4 py-2.5 text-base font-medium text-chocolate rounded-xl hover:bg-cream-200/70 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-3 border-t border-cream-200 flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    siteConfig.whatsappDefaultGreeting
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-emerald-600/30 text-emerald-800 bg-emerald-50/50 font-medium text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="#menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-chocolate text-cream-100 font-medium text-sm shadow-soft"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Explore Menu & Order</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
