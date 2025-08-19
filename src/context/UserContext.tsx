import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("wowuser");
    if (storedUser) setUserState(JSON.parse(storedUser));
  }, []);

  // Update state and localStorage together
  const setUser = (userData: User | null) => {
    setUserState(userData);
    if (userData) localStorage.setItem("wowuser", JSON.stringify(userData));
    else localStorage.removeItem("wowuser");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("wowuser"); // user info
    localStorage.removeItem("token");   // JWT token
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
