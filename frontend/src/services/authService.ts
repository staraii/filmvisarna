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
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  // Expect response to include `firstName` if login is successful
  const data = await response.json();
  console.log("Login response data:", data); // Verify data structure in console
   return {
    email: data.user.email,
    firstName: data.user.firstName, // Capture firstName here
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
  const response = await fetch('/api/logout', { // Ensure this endpoint is correct
    method: 'POST',
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

