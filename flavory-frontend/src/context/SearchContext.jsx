'use client';
import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [formData, setFormData] = useState({ title: "", ingredient: "" });

  return (
    <SearchContext.Provider value={{ formData, setFormData }}>
      {children}
    </SearchContext.Provider>
  );
};