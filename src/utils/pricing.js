import { siteConfig } from '../config/siteConfig.js';

/**
 * Format a numeric amount into localized currency string (e.g. ₹1,200)
 */
export function formatPrice(amount, includeSymbol = true) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    amount = 0;
  }
  const formatted = new Intl.NumberFormat(siteConfig.currency.locale, {
    maximumFractionDigits: 0,
  }).format(amount);

  return includeSymbol ? `${siteConfig.currency.symbol}${formatted}` : formatted;
}

/**
 * Calculate the price for a specific product and selected variant
 * @param {Object} product - Product data object
 * @param {Object} selectedVariant - Selected variant object or weight
 * @param {number} quantity - Quantity
 * @returns {number} Calculated total price
 */
export function calculateItemPrice(product, selectedVariant, quantity = 1) {
  if (!product) return 0;
  
  let unitPrice = product.basePrice || 0;

  if (selectedVariant && typeof selectedVariant.price === 'number') {
    unitPrice = selectedVariant.price;
  } else if (selectedVariant && typeof selectedVariant.priceDelta === 'number') {
    unitPrice = (product.basePrice || 0) + selectedVariant.priceDelta;
  }

  return unitPrice * Math.max(1, quantity);
}

/**
 * Calculate subtotal for an array of cart items
 */
export function calculateCartSubtotal(items = []) {
  return items.reduce((sum, item) => {
    const itemTotal = calculateItemPrice(item.product, item.selectedVariant, item.quantity);
    return sum + itemTotal;
  }, 0);
}
