import { siteConfig } from '../config/siteConfig.js';
import { formatPrice } from './pricing.js';

/**
 * Clean and validate owner WhatsApp number
 */
export function getCleanWhatsAppNumber() {
  const rawNumber = siteConfig.whatsappNumber || '';
  return rawNumber.replace(/[^0-9]/g, '');
}

/**
 * Check if the owner's WhatsApp number is properly configured
 */
export function isWhatsAppConfigured() {
  const cleanNumber = getCleanWhatsAppNumber();
  return cleanNumber && cleanNumber.length >= 10;
}

/**
 * Construct WhatsApp click-to-chat URL for an individual product order
 * 
 * @param {Object} orderDetails - Complete details of the order
 * @returns {string} Fully encoded wa.me URL
 */
export function createWhatsAppOrder(orderDetails) {
  const cleanNumber = getCleanWhatsAppNumber();
  if (!cleanNumber) {
    console.warn("Lumière Patisserie: WhatsApp phone number is not configured in siteConfig.js");
    return '';
  }

  const {
    productName,
    variantName,
    flavor,
    quantity = 1,
    unitPrice,
    totalPrice,
    cakeMessage,
    dietaryPreference,
    requestedDate,
    requestedTime,
    deliveryPreference,
    deliveryAddress,
    customerName,
    customerPhone,
    additionalInstructions,
  } = orderDetails;

  // Format message lines with clean patisserie styling
  const lines = [
    `Bonjour! I would like to place an order with *${siteConfig.bakeryName}*.`,
    '',
    '🍰 *ORDER REQUEST*',
    `• Product: *${productName || 'Bespoke Item'}*`,
    variantName ? `• Size / Portion: ${variantName}` : null,
    flavor ? `• Flavor: ${flavor}` : null,
    dietaryPreference ? `• Dietary Preference: ${dietaryPreference}` : null,
    `• Quantity: ${quantity}`,
    unitPrice ? `• Unit Price: ${formatPrice(unitPrice)}` : null,
    `• *Estimated Total: ${formatPrice(totalPrice || unitPrice * quantity)}*`,
    '',
    '🎀 *CUSTOMIZATION & TIMING*',
    cakeMessage ? `• Message on Cake: "${cakeMessage}"` : '• Message on Cake: None',
    requestedDate ? `• Requested Date: ${requestedDate}` : null,
    requestedTime ? `• Preferred Time Slot: ${requestedTime}` : null,
    `• Fulfillment: *${deliveryPreference || 'Pickup'}*`,
    deliveryPreference === 'Delivery' && deliveryAddress ? `• Delivery Address: ${deliveryAddress}` : null,
    additionalInstructions ? `• Special Instructions: ${additionalInstructions}` : null,
    '',
    '👤 *CUSTOMER DETAILS*',
    `• Name: ${customerName || 'Customer'}`,
    `• Phone: ${customerPhone || 'Not provided'}`,
    '',
    '----------------------------------------',
    '✨ *Note:* I understand this submits an order request for confirmation and does not automatically confirm the order. Please confirm availability and final payment details. Merci beaucoup!',
  ].filter(Boolean);

  const fullMessage = lines.join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Construct WhatsApp click-to-chat URL for multi-item cart checkout
 * 
 * @param {Array} cartItems - Array of cart items
 * @param {Object} customerDetails - Customer and fulfillment details
 * @returns {string} Fully encoded wa.me URL
 */
export function createWhatsAppCartCheckout(cartItems = [], customerDetails = {}) {
  const cleanNumber = getCleanWhatsAppNumber();
  if (!cleanNumber) return '';

  const {
    customerName,
    customerPhone,
    requestedDate,
    requestedTime,
    deliveryPreference = 'Pickup',
    deliveryAddress = '',
    generalNotes = '',
    subtotal = 0,
    deliveryFee = 0,
    grandTotal = 0,
  } = customerDetails;

  const lines = [
    `Bonjour! I would like to place a combined order with *${siteConfig.bakeryName}*.`,
    '',
    `🛒 *ITEMS IN CART (${cartItems.length} items)*`,
    '----------------------------------------',
  ];

  cartItems.forEach((item, index) => {
    lines.push(
      `*${index + 1}. ${item.product.name}*`,
      `   • Size: ${item.selectedVariant?.name || 'Standard'}`,
      item.selectedFlavor ? `   • Flavor: ${item.selectedFlavor}` : null,
      `   • Qty: ${item.quantity} × ${formatPrice(item.selectedVariant?.price || item.product.basePrice)}`,
      `   • Subtotal: ${formatPrice((item.selectedVariant?.price || item.product.basePrice) * item.quantity)}`,
      item.cakeMessage ? `   • Cake Message: "${item.cakeMessage}"` : null,
      ''
    );
  });

  lines.push(
    '----------------------------------------',
    `*Order Subtotal: ${formatPrice(subtotal)}*`,
    deliveryPreference === 'Delivery' ? `*Estimated Delivery Fee: ${formatPrice(deliveryFee)}*` : null,
    `*ESTIMATED GRAND TOTAL: ${formatPrice(grandTotal)}*`,
    '',
    '📅 *FULFILLMENT DETAILS*',
    `• Preference: *${deliveryPreference}*`,
    `• Date: ${requestedDate}`,
    requestedTime ? `• Time: ${requestedTime}` : null,
    deliveryPreference === 'Delivery' && deliveryAddress ? `• Delivery Address: ${deliveryAddress}` : null,
    generalNotes ? `• Instructions / Notes: ${generalNotes}` : null,
    '',
    '👤 *CUSTOMER CONTACT*',
    `• Name: ${customerName}`,
    `• Phone: ${customerPhone}`,
    '',
    '✨ *Note:* Order submitted for baker review and confirmation. Kindly reply with availability and payment instructions. Merci!',
  );

  const fullMessage = lines.filter(Boolean).join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Construct WhatsApp click-to-chat URL for Custom Cake Bespoke Consultation
 * 
 * @param {Object} customCake - Details from the custom cake inquiry builder
 * @returns {string} Fully encoded wa.me URL
 */
export function createWhatsAppCustomCakeInquiry(customCake) {
  const cleanNumber = getCleanWhatsAppNumber();
  if (!cleanNumber) return '';

  const {
    customerName,
    customerPhone,
    occasion,
    preferredDate,
    tierCount,
    servings,
    shape,
    flavorBase,
    frostingType,
    budgetRange,
    themeDescription,
    referenceNote,
    fulfillment,
    deliveryAddress,
  } = customCake;

  const lines = [
    `Bonjour! I'd like to book a *Bespoke Custom Cake Consultation* with *${siteConfig.bakeryName}*.`,
    '',
    '🎂 *CUSTOM CAKE SPECIFICATIONS*',
    `• Occasion: *${occasion || 'Celebration'}*`,
    `• Date Required: *${preferredDate}*`,
    `• Tiers: ${tierCount || 'Single Tier'}`,
    `• Estimated Servings: ${servings || '15-20 guests'}`,
    `• Cake Shape: ${shape || 'Round Classic'}`,
    `• Base Sponge Flavor: ${flavorBase || "Chef's Signature"}`,
    `• Frosting / Exterior: ${frostingType || 'Swiss Meringue Buttercream'}`,
    `• Approximate Budget: ${budgetRange || 'Flexible'}`,
    `• Theme & Styling Notes: ${themeDescription || 'See reference images'}`,
    referenceNote ? `• Reference Photo Note: ${referenceNote}` : '• Reference Photo: I will send inspirational photos here in this chat.',
    '',
    '📍 *FULFILLMENT*',
    `• Preference: ${fulfillment || 'Pickup'}`,
    fulfillment === 'Delivery' && deliveryAddress ? `• Address: ${deliveryAddress}` : null,
    '',
    '👤 *CLIENT CONTACT*',
    `• Name: ${customerName}`,
    `• Phone: ${customerPhone}`,
    '',
    '✨ *Note:* I understand bespoke cakes require confirmation of design complexity and date availability. Looking forward to discussing the design!',
  ].filter(Boolean);

  const fullMessage = lines.join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(fullMessage)}`;
}
