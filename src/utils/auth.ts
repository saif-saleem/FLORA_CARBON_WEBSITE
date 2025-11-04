// Utility functions for authentication and cross-domain navigation

/**
 * Check if user is authenticated (has token in localStorage)
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Get authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Get user data from localStorage
 */
export const getUserData = (): { name: string | null; email: string | null } => {
  return {
    name: localStorage.getItem('userName'),
    email: localStorage.getItem('userEmail'),
  };
};

/**
 * Redirect to GPT app with authentication token
 * Clears localStorage before redirecting (since localStorage is domain-specific)
 */
export const redirectToGPT = (gptUrl: string = 'https://gpt.floracarbon.ai/'): void => {
  const token = getAuthToken();
  
  if (!token) {
    // If not authenticated, redirect to auth page
    console.log('⚠️ User not authenticated, redirecting to login page');
    window.location.href = '/auth';
    return;
  }

  // Get user data before clearing
  const userData = getUserData();
  
  // Clear localStorage on current domain (since it's domain-specific)
  // The GPT app will receive the token via URL parameter and store it in its own localStorage
  localStorage.clear();
  
  console.log('🧹 Cleared localStorage before redirecting to GPT app');
  console.log('👤 User data that will be passed:', userData);

  // Redirect to GPT app with token as URL parameter
  const url = new URL(gptUrl);
  url.searchParams.set('token', token);
  
  // Also pass user data if available
  if (userData.name) {
    url.searchParams.set('name', userData.name);
  }
  if (userData.email) {
    url.searchParams.set('email', userData.email);
  }
  
  console.log('🔄 Redirecting to GPT app with authentication token');
  window.location.href = url.toString();
};

