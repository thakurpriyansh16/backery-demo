import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage, setToastMessage } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm w-full px-4">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="pointer-events-auto bg-chocolate-dark text-cream-100 p-4 rounded-2xl shadow-soft-xl border border-gold/30 flex items-start gap-3"
            role="status"
            aria-live="polite"
          >
            {toastMessage.type === 'info' ? (
              <Info className="w-5 h-5 text-rose-strawberry flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-sm font-medium leading-snug">
              {toastMessage.message}
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-cream-200/60 hover:text-cream-100 p-0.5 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
