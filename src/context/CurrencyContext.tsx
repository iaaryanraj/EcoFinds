import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Currency {
  code: string;
  symbol: string;
  rate: number; // Conversion rate from USD
}

interface CurrencyContextType {
  currency: Currency;
  currencies: Currency[];
  toggleCurrency: () => void;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

const availableCurrencies: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'INR', symbol: '₹', rate: 83.12 } // Approximate conversion rate
];

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(availableCurrencies[0]); // Default to USD

  const toggleCurrency = () => {
    const currentIndex = availableCurrencies.findIndex(c => c.code === currency.code);
    const nextIndex = (currentIndex + 1) % availableCurrencies.length;
    setCurrency(availableCurrencies[nextIndex]);
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = price * currency.rate;
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const value: CurrencyContextType = {
    currency,
    currencies: availableCurrencies,
    toggleCurrency,
    formatPrice
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};