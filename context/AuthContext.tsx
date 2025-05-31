import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initial authentication state

  // Removed useEffect: Initial redirect is handled by app/index.tsx
  // Subsequent redirects are handled by app/index.tsx reacting to isAuthenticated changes

  const signIn = () => {
    // In a real app, this would involve authenticating with a backend
    setIsAuthenticated(true);
    // app/index.tsx will handle the redirect after this state change
  };

  const signOut = () => {
    // In a real app, this would involve clearing tokens/session on backend and frontend
    setIsAuthenticated(false);
    // app/index.tsx will handle the redirect after this state change
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
} 