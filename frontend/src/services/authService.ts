

// Login
export const login = async (email: string, password: string) => {
  const response = await fetch('/api/login', { // Ensure the URL is correct
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }), // Use email instead of username
    credentials: 'include' // Important to include cookies in the request
  });

  if (!response.ok) {
    const errorData = await response.json(); // Get the error details
    throw new Error(errorData.message || 'Login failed'); // Throw an error with a message
  }

  return response.json(); // Return the response data if successful
};

// Signup
interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const register = async (formData: FormData) => {
  const { email, password, firstName, lastName, phoneNumber } = formData;

  // Ensure all required fields are present
  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    throw new Error('All fields must be filled out.');
  }

  // Prepare the request data
  const requestData = {
    email, 
    password,
    firstName,  // Ensure these match your backend expectations
    lastName,   
    phone: phoneNumber // Ensure this matches your backend field
  };

  console.log('Submitting registration data:', requestData); // Log request data

  // Send the POST request to the backend
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData), // Send JSON body
    credentials: 'include' // Important for including cookies/session
  });

  // Handle the response
  if (!response.ok) {
    const errorData = await response.json(); // Get error details from response
    console.error('Error response:', errorData); // Log error for debugging
    throw new Error(errorData.message || 'Registration failed'); // Throw error with message
  }
  // After successful registration, auto-login the user
  // Reuse the existing login logic with the newly registered email and password
  return await login(email, password);
};


// Logout
export const logout = async () => {
  const response = await fetch('/api/login', {
    method: 'DELETE', // It's common to use POST for logout
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json(); // Fetch error response
    throw new Error(errorData.message || 'Logout failed');
  }

  return response.json();
};

const handleRegister = async () => {
  try {
    await register({ email, password, firstName, lastName, phoneNumber });
    // This should trigger the useEffect in AuthProvider
  } catch (error) {
    console.error("Registration failed:", error);
  }
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

  return response.json();
};


