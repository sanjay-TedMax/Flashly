import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CoinsContextType {
  coins: number | null;
  setCoins: (coins: number) => void;
}

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export const CoinsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<number | null>(null);

  return (
    <CoinsContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (context === undefined) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
};