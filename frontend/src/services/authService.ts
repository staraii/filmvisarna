// AuthService with updates and comments

export interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// Login function
export const login = async (email: string, password: string) => {
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

  // Get the full response data
  const data = await response.json();
  console.log("Login response data:", data); // Log the entire response

  // Extract email and firstName if available
  return {
    email: data.email,  // Directly access email from the response
    firstName: data.firstName || '',  // Handle the case where firstName might not be present
  };
};


export const register = async (formData: FormData) => {
  const { email, password, firstName, lastName, phoneNumber } = formData;

  // Check if any field is empty
  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    throw new Error('Alla fält måste fyllas i.');
  }

  // Email format validation
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    throw new Error('Ogiltigt e-postformat.');
  }

  // Capitalize the first letter of firstName and lastName
  const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

  // Password validation requirements
  const passwordRequirements = {
    minLength: 8,
    uppercase: /[A-Z]/,          // At least one uppercase letter
    lowercase: /[a-z]/,          // At least one lowercase letter
    digit: /\d/,                 // At least one digit
    specialChar: /[!@#$%^&*.,-]/ // At least one special character
  };

  // Password validation with Swedish error messages
  if (password.length < passwordRequirements.minLength) {
    throw new Error(`Lösenordet måste vara minst ${passwordRequirements.minLength} tecken långt.`);
  }
  if (!passwordRequirements.uppercase.test(password)) {
    throw new Error('Lösenordet måste innehålla minst en versal (stort) bokstav.');
  }
  if (!passwordRequirements.lowercase.test(password)) {
    throw new Error('Lösenordet måste innehålla minst en gemen (liten) bokstav.');
  }
  if (!passwordRequirements.digit.test(password)) {
    throw new Error('Lösenordet måste innehålla minst en siffra.');
  }
  if (!passwordRequirements.specialChar.test(password)) {
    throw new Error('Lösenordet måste innehålla minst ett specialtecken (t.ex. !, @, #, $, %, ^, &, *, ., eller -).');
  }

  // Phone number validation (assuming 10 digits)
  if (!/^\d{10}$/.test(phoneNumber)) {
    throw new Error('Telefonnumret måste vara 10 siffror långt.');
  }

  // Prepare data for API, using formatted firstName and lastName
  const requestData = {
    email,
    password,
    firstName: formattedFirstName,
    lastName: formattedLastName,
    phone: phoneNumber
  };

  console.log('Skickar registreringsdata:', requestData);

  // API request to register
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Felmeddelande från servern:', errorData);
    throw new Error(errorData.message || 'Registrering misslyckades');
  }

  // Auto-login after successful registration
  const data = await login(email, password);
  return data; // This should include `{ email, firstName }`
};



// Logout function
export const logout = async () => {
  const response = await fetch('/api/login', { // Ensure this endpoint is correct
    method: 'DELETE',
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Logout failed');
  }

  return response.json();
};

// Check if authenticated
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
    firstName: data.user.firstName, // Capture firstName from the response
  };
};


// Cancel booking
export const cancelBooking = async (bookingId: number, email: string, bookingNumber: string) => {
  const response = await fetch(`/api/bookings/${bookingId}?bookingNumber=${bookingNumber}&email=${email}`, {
    method: 'DELETE', // Use DELETE for removing a booking
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Important for session management
  });

  if (!response.ok) {
    const errorData = await response.json(); // Get error details from response
    throw new Error(errorData.message || 'Failed to cancel booking');
  }

  return response.json(); // Return response data if successful
};
