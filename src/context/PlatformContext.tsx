"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CowData, MOCK_CATTLE, User, MOCK_USERS } from '../lib/data';

export type CartItem = {
  cowId: string;
  shares: number;
};

type Notification = {
  id: string;
  message: string;
  read: boolean;
  time: string;
};

type PlatformContextType = {
  cart: CartItem[];
  addToCart: (cowId: string, shares: number) => void;
  removeFromCart: (cowId: string) => void;
  updateCartItem: (cowId: string, shares: number) => void;
  
  wishlist: string[]; // array of cow IDs
  toggleWishlist: (cowId: string) => void;
  
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  
  getCowById: (id: string) => CowData | undefined;
  
  currentUser: User;
  updateCurrentUser: (data: Partial<User>) => void;
  getUserById: (id: string) => User | undefined;
};

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', message: 'Welcome to Qurbani Share!', read: false, time: 'Just now' },
  ]);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);

  const addToCart = (cowId: string, shares: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.cowId === cowId);
      if (existing) {
        return prev.map((item) =>
          item.cowId === cowId ? { ...item, shares: item.shares + shares } : item
        );
      }
      return [...prev, { cowId, shares }];
    });
  };

  const removeFromCart = (cowId: string) => {
    setCart((prev) => prev.filter((item) => item.cowId !== cowId));
  };

  const updateCartItem = (cowId: string, shares: number) => {
    setCart((prev) =>
      prev.map((item) => (item.cowId === cowId ? { ...item, shares } : item))
    );
  };

  const toggleWishlist = (cowId: string) => {
    setWishlist((prev) =>
      prev.includes(cowId) ? prev.filter((id) => id !== cowId) : [...prev, cowId]
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getCowById = (id: string) => MOCK_CATTLE.find(c => c.id === id);

  const updateCurrentUser = (data: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...data }));
  };

  const getUserById = (id: string) => {
    // If it's the current user, return the updated current user state
    if (id === currentUser.id) return currentUser;
    // Otherwise look in the mock database
    return MOCK_USERS.find(u => u.id === id);
  };

  return (
    <PlatformContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        wishlist,
        toggleWishlist,
        notifications,
        markNotificationRead,
        getCowById,
        currentUser,
        updateCurrentUser,
        getUserById
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}
