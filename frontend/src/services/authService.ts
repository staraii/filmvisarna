// AuthService with custom validation

export interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// Validation for Registration Input Fields
const validateRegistrationInput = (formData: FormData): string | null => {
  const { email, password, firstName, lastName, phoneNumber } = formData;

  // Empty field check
  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    return "Alla fält måste fyllas i.";
  }

  // Email format validation
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return "Ogiltigt e-postformat.";
  }

  // Password validation
  const passwordRequirements = {
    minLength: 8,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    digit: /\d/,
  };

  if (password.length < passwordRequirements.minLength) {
    return `Lösenordet måste vara minst ${passwordRequirements.minLength} tecken långt.`;
  }
  if (!passwordRequirements.uppercase.test(password)) {
    return "Lösenordet måste innehålla minst en versal (stort) bokstav.";
  }
  if (!passwordRequirements.lowercase.test(password)) {
    return "Lösenordet måste innehålla minst en gemen (liten) bokstav.";
  }
  if (!passwordRequirements.digit.test(password)) {
    return "Lösenordet måste innehålla minst en siffra.";
  }

  // Phone number validation (assuming 10 digits)
  if (!/^\d{10}$/.test(phoneNumber)) {
    return "Telefonnumret måste vara 10 siffror långt.";
  }

  return null; // No errors
};

// Validation for Login Input Fields
const validateLoginInput = (email: string, password: string): string | null => {
  if (!email || !password) {
    return "E-post och lösenord måste fyllas i.";
  }

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return "Ogiltigt e-postformat.";
  }

  return null; // No errors
};

// Login function with validation
export const login = async (email: string, password: string) => {
  const validationError = validateLoginInput(email, password);
  if (validationError) {
    throw new Error(validationError); // Throw validation error immediately
  }

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json();
  console.log("Login response data:", data);

  return {
    email: data.email,
    firstName: data.firstName || '',
  };
};

// Registration function with validation
export const register = async (formData: FormData) => {
  const validationError = validateRegistrationInput(formData);
  if (validationError) {
    throw new Error(validationError); // Throw validation error immediately
  }

  const { email, password, firstName, lastName, phoneNumber } = formData;

  const requestData = {
    email,
    password,
    firstName,
    lastName,
    phone: phoneNumber,
  };

  console.log("Skickar registreringsdata:", requestData);

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Felmeddelande från servern:", errorData);
    throw new Error(errorData.message || "Registrering misslyckades");
  }

  const data = await login(email, password);
  return data; // This should include `{ email, firstName }`
};

// Logout function (unchanged)
export const logout = async () => {
  const response = await fetch('/api/login', {
    method: 'DELETE',
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Logout failed');
  }

  return response.json();
};

// Check if authenticated (unchanged)
export const getMe = async () => {
  const response = await fetch('/api/login', {
    method: 'GET',
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  const data = await response.json();
  return {
    email: data.user.email,
    firstName: data.user.firstName,
  };
};

// Cancel booking (unchanged)
export const cancelBooking = async (bookingId: number, email: string, bookingNumber: string) => {
  const response = await fetch(`/api/bookings/${bookingId}?bookingNumber=${bookingNumber}&email=${email}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to cancel booking');
  }

  return response.json();
};

// CheckSession (unchanged)
export const checkSession = async () => {
  const response = await fetch('/api/auth/check-session', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error checking session:', errorData);
    throw new Error('Failed to check session');
  }

  const data = await response.json();
  console.log('Session data:', data);
  return data.isAuthenticated ? data.user : null;
};
