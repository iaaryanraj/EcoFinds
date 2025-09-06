import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('ecofinds_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('ecofinds_users') || '[]');
      const foundUser = users.find((u: User) => u.email === email && u.password === password);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('ecofinds_user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('ecofinds_users') || '[]');
      
      // Check if user already exists
      if (users.find((u: User) => u.email === email)) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        password,
        createdAt: new Date()
      };

      users.push(newUser);
      localStorage.setItem('ecofinds_users', JSON.stringify(users));
      
      setUser(newUser);
      localStorage.setItem('ecofinds_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecofinds_user');
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;

      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('ecofinds_user', JSON.stringify(updatedUser));

      // Update in users array
      const users = JSON.parse(localStorage.getItem('ecofinds_users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('ecofinds_users', JSON.stringify(users));
      }

      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
