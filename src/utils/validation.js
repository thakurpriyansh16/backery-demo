/**
 * Form and order input validation utilities
 */

export function validateOrderForm(formData) {
  const errors = {};

  // Customer Name
  if (!formData.customerName || !formData.customerName.trim()) {
    errors.customerName = 'Please enter your full name.';
  } else if (formData.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters.';
  }

  // Customer Phone
  const phoneClean = (formData.customerPhone || '').replace(/\D/g, '');
  if (!formData.customerPhone || !formData.customerPhone.trim()) {
    errors.customerPhone = 'Please enter your mobile/WhatsApp number.';
  } else if (phoneClean.length < 10) {
    errors.customerPhone = 'Please enter a valid 10-digit mobile number.';
  }

  // Requested Date
  if (!formData.requestedDate) {
    errors.requestedDate = 'Please select your preferred date.';
  } else {
    const selectedDate = new Date(formData.requestedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.requestedDate = 'Please choose today or a future date.';
    }
  }

  // Delivery Address (if Delivery is selected)
  if (formData.deliveryPreference === 'Delivery') {
    if (!formData.deliveryAddress || !formData.deliveryAddress.trim()) {
      errors.deliveryAddress = 'Please provide your delivery address & pincode.';
    } else if (formData.deliveryAddress.trim().length < 8) {
      errors.deliveryAddress = 'Please provide a complete address for seamless delivery.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateCustomCakeForm(formData) {
  const errors = {};

  if (!formData.customerName || !formData.customerName.trim()) {
    errors.customerName = 'Please enter your name.';
  }

  const phoneClean = (formData.customerPhone || '').replace(/\D/g, '');
  if (!formData.customerPhone || !formData.customerPhone.trim()) {
    errors.customerPhone = 'Please enter your contact number.';
  } else if (phoneClean.length < 10) {
    errors.customerPhone = 'Please enter a valid 10-digit mobile number.';
  }

  if (!formData.preferredDate) {
    errors.preferredDate = 'Please select the celebration date.';
  }

  if (!formData.theme || !formData.theme.trim()) {
    errors.theme = 'Please specify the celebration theme or style.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
