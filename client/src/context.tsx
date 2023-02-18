import React, { createContext, useContext, useState } from 'react';

import Room from './interfaces/Room.interface';
import User from './interfaces/User.interface';

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
