import React from 'react';
import { useStorageState } from './expo-secure-storage';

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve({ success: false }),
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = async (username: string, password: string) => {
    try {
      // Send a request to the Flask server for authentication
      const response = await fetch('YOUR_FLASK_SERVER_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // If authentication is successful, set the session
        setSession(username);
        return { success: true };
      } else {
        
        // Handle authentication failure
        const errorResponse = await response.json();
        return { success: false, error: errorResponse.message || 'Authentication failed' };
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      return { success: false, error: 'An error occurred during authentication' };
    }
  };

  const signOut = () => {
    // Perform sign-out logic here, if needed
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
