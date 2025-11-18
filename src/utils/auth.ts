// Utility functions for authentication and cross-domain navigation

/**
 * Check if user is authenticated (has valid, non-expired token in localStorage)
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  // Check if token has expired (1 hour from login)
  const expirationTime = localStorage.getItem('tokenExpiration');
  if (expirationTime) {
    const expiration = parseInt(expirationTime, 10);
    if (Date.now() > expiration) {
      // Token expired, clear it
      logout();
      return false;
    }
  } else {
    // If no expiration time is set, assume old token format and clear it
    logout();
    return false;
  }

  return true;
};

/**
 * Get authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
  if (!isAuthenticated()) {
    return null;
  }
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
 * Logout user by clearing all auth data
 */
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiration');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
};

/**
 * Redirect to GPT app with authentication token
 * Note: This function should be called with checkGptAccess from AuthContext first
 * Note: localStorage is domain-specific, so the GPT app has its own separate storage.
 * We keep the auth data on the main site so users stay logged in when they return.
 */
export const redirectToGPT = async (
  gptUrl: string = 'https://gpt.floracarbon.ai/',
  checkGptAccess?: () => Promise<{ hasAccess: boolean; message?: string }>
): Promise<void> => {
  const token = getAuthToken();
  
  if (!token) {
    // If not authenticated, redirect to auth page
    console.log('⚠️ User not authenticated, redirecting to login page');
    window.location.href = '/auth';
    return;
  }

  // Check GPT access if function is provided
  if (checkGptAccess) {
    const accessCheck = await checkGptAccess();
    if (!accessCheck.hasAccess) {
      // Access denied - this should be handled by the component showing UpgradePrompt
      throw new Error(accessCheck.message || 'Access denied');
    }
  }

  // Get user data to pass to GPT app
  const userData = getUserData();
  
  console.log('🔄 Redirecting to GPT app with authentication token');
  console.log('👤 User data that will be passed:', userData);

  // Redirect to GPT app with token as URL parameter
  // The GPT app will receive the token via URL parameter and store it in its own localStorage
  const url = new URL(gptUrl);
  url.searchParams.set('token', token);
  
  // Also pass user data if available
  if (userData.name) {
    url.searchParams.set('name', userData.name);
  }
  if (userData.email) {
    url.searchParams.set('email', userData.email);
  }
  
  window.location.href = url.toString();
};

