// Private validation functions - not exported to public API

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

export function isValidAmount(amount: number): boolean {
  return amount > 0 && amount <= 10000000; // Max 1 crore
}

export function isValidDateRange(startDate: string, endDate: string): boolean {
  if (!startDate || !endDate) return true; // Optional dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end && end <= new Date();
}

export function sanitizeSearchQuery(query: string): string {
  return query.trim().replace(/[<>\"'&]/g, '');
}

export function validateRole(role: string): boolean {
  const validRoles = ['super-admin', 'admin', 'team-lead', 'member'];
  return validRoles.includes(role);
}