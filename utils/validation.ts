export const validateRequired = (value: string): string | null => {
  if (!value || value.trim().length === 0) {
    return 'This field is required';
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return null;
};

export const validatePassport = (passport: string): string | null => {
  const passportRegex = /^[A-Z0-9]{6,9}$/;
  if (!passportRegex.test(passport)) {
    return 'Please enter a valid passport number';
  }
  return null;
};

export const validateCardNumber = (cardNumber: string): string | null => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d{16}$/.test(cleaned)) {
    return 'Please enter a valid 16-digit card number';
  }
  return null;
};

export const validateExpiryDate = (expiryDate: string): string | null => {
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const monthNum = parseInt(month);
  const yearNum = parseInt(year);

  if (isNaN(monthNum) || isNaN(yearNum)) {
    return 'Invalid date format';
  }

  if (monthNum < 1 || monthNum > 12) {
    return 'Invalid month';
  }

  if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
    return 'Card has expired';
  }

  return null;
};

export const validateCVV = (cvv: string): string | null => {
  if (!/^\d{3,4}$/.test(cvv)) {
    return 'Please enter a valid CVV';
  }
  return null;
}; 