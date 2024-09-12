'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface GlobalContextType {
  error: string | null;
  setError: (error: string | null) => void;
  message: string | null;
  setMessage: (message: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;

}

// Create the context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create the provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);


  return (
    <GlobalContext.Provider value={{ error, setError, message, setMessage, isLoading, setIsLoading, isAuthenticated, setIsAuthenticated }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
