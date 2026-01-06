// Auto-detect environment and return appropriate backend URL
const getBackendUrl = () => {
  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';
  
  // Return appropriate backend URL
  if (isDevelopment) {
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  } else {
    return import.meta.env.VITE_BACKEND_URL || 'https://chatapp-backend-0iwk.onrender.com';
  }
};

// Export the backend URL
export const BACKEND_URL = getBackendUrl();

// Log current environment for debugging
console.log('🌍 Environment:', import.meta.env.DEV ? 'Development' : 'Production');
console.log('🔗 Backend URL:', BACKEND_URL);