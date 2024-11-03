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


// Signup function
export const register = async (formData: FormData) => {
  const { email, password, firstName, lastName, phoneNumber } = formData;

  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    throw new Error('All fields must be filled out.');
  }

  const requestData = {
    email,
    password,
    firstName,
    lastName,
    phone: phoneNumber
  };

  console.log('Submitting registration data:', requestData);

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error(errorData.message || 'Registration failed');
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
