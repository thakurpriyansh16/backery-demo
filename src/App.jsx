import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { siteConfig } from './config/siteConfig';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import MenuSection from './components/MenuSection';
import CustomCakeBuilder from './components/CustomCakeBuilder';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import GalleryShowcase from './components/GalleryShowcase';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseProduct = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenCustomCake = () => {
    const el = document.getElementById('custom-cakes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-cream-100 selection:bg-rose-dusty/30 selection:text-chocolate-dark">
        {/* Top Promotional Announcement Bar */}
        <AnnouncementBar />

        {/* Sticky Header Navigation */}
        <Navbar onOpenCustomCake={handleOpenCustomCake} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero onOpenCustomCake={handleOpenCustomCake} />

          {/* Shop By Category Visual Grid */}
          <CategoryGrid
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onOpenCustomCake={handleOpenCustomCake}
          />

          {/* Full Interactive Menu & Catalog */}
          <MenuSection
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onSelectProduct={handleOpenProduct}
            onDirectOrder={handleOpenProduct}
          />

          {/* Interactive Bespoke Custom Cake Consultation Builder */}
          <CustomCakeBuilder />

          {/* About The Bakery & Craftsmanship */}
          <AboutSection />

          {/* Client Testimonials */}
          <Testimonials />

          {/* Visual Confectionery Gallery / Instagram Showcase */}
          <GalleryShowcase />

          {/* Delivery Info & FAQs */}
          <FAQSection />

          {/* Boutique Atelier Contact & Map */}
          <ContactSection />
        </main>

        {/* Global Footer */}
        <Footer onOpenCustomCake={handleOpenCustomCake} />

        {/* Interactive Product Details & Customization Modal */}
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseProduct}
        />

        {/* Multi-Item Slide-Over Cart Drawer */}
        <CartDrawer />

        {/* Floating Quick WhatsApp Assistance Button (Bottom-Left) */}
        <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              siteConfig.whatsappDefaultGreeting
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white p-3.5 pr-4 rounded-full shadow-soft-xl border border-emerald-500/40 transition-all hover:scale-105"
            title="Chat directly with our baker on WhatsApp"
            aria-label="Direct WhatsApp assistance"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-700 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-semibold tracking-wide hidden md:inline">
              Chat with Baker
            </span>
          </a>
        </div>

        {/* Toast Notification Container */}
        <Toast />
      </div>
    </CartProvider>
  );
}
