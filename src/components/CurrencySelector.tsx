import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import './CurrencySelector.css';

const CurrencySelector: React.FC = () => {
  const { currency, toggleCurrency } = useCurrency();
  const isINR = currency.code === 'INR';

  return (
    <div className="currency-selector">
      <div className="currency-labels">
        <span className={`currency-label ${!isINR ? 'active' : ''}`}>USD</span>
        <span className={`currency-label ${isINR ? 'active' : ''}`}>INR</span>
      </div>
      <div className="toggle-switch" onClick={toggleCurrency}>
        <div className={`toggle-slider ${isINR ? 'toggled' : ''}`}>
          <span className="toggle-symbol">{currency.symbol}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencySelector;