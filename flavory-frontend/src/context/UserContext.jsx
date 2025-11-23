'use client';
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer le token du localStorage (client side only)
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      getUser();
    }
  }, [token]);

  async function getUser() {
    try {
      const res = await fetch(`/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Utilisateur non authentifié');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  }

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken }}>
        {children}
    </UserContext.Provider>
  );
};
