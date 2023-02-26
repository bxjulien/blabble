import React, { createContext, useContext, useState } from 'react';

import Room from './types/Room.interface';
import User from './types/User.interface';
import { useEffect } from 'react';

const AppContext = createContext<UseAppContextType | null>(null);

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface UseAppContextType {
  user: User | null;
  setUser: (user: User | null) => void;

  rooms: Room[] | null;
  setRooms: (rooms: Room[] | null) => void;
}

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [rooms, setRooms] = useState<Room[] | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const value = {
    user,
    setUser,

    rooms,
    setRooms,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = (): UseAppContextType => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
