// src/utils/api.ts

// Login
export const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:5002/api/login', { // Ensure the URL is correct
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
export const signup = async (email: string, password: string) => {
  const response = await fetch('http://localhost:5002/api/register', { // Ensure the URL is correct
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }), // Use email instead of username
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
};

// Logout
export const logout = async () => {
  const response = await fetch('http://localhost:5002/api/login', {
    method: 'DELETE',
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return response.json();
};

// Check if authenticated
export const getMe = async () => {
  const response = await fetch('http://localhost:5002/api/login', {
    method: 'GET',
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  return response.json();
};


