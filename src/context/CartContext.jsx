import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateCartSubtotal } from '../utils/pricing';

const CartContext = createContext();

const CART_STORAGE_KEY = 'lumiere_patisserie_cart_v1';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('LocalStorage unavailable for cart', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  /**
   * Add item to cart. If exact same product, variant, flavor, and message exists, increment qty.
   */
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.selectedVariant?.id === newItem.selectedVariant?.id &&
          item.selectedFlavor === newItem.selectedFlavor &&
          (item.cakeMessage || '') === (newItem.cakeMessage || '')
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (newItem.quantity || 1),
        };
        showToast(`Updated quantity for "${newItem.product.name}" in your cart.`);
        return updated;
      }

      const itemWithId = {
        ...newItem,
        cartId: `${newItem.product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        quantity: newItem.quantity || 1,
      };

      showToast(`Added "${newItem.product.name}" to your cart! 🍰`);
      return [...prevItems, itemWithId];
    });
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => {
      const removed = prev.find((item) => item.cartId === cartId);
      if (removed) {
        showToast(`Removed "${removed.product.name}" from cart.`, 'info');
      }
      return prev.filter((item) => item.cartId !== cartId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = calculateCartSubtotal(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotal,
        toastMessage,
        setToastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
