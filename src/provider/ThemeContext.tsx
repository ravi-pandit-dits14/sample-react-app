import React, { createContext, useState } from 'react';

type ThemeContextType = {
  currentTheme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setTheme] = useState('dark'); // Default theme is 'light'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light')); // Toggle between 'light' and 'dark'
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };