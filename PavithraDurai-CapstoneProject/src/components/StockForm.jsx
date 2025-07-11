import React, { useState } from 'react';
import './StockForm.css';
import Kuromi from '../assets/kuromi-face.png'

function StockForm() {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbol || !quantity || !buyPrice) {
      setError('Please fill in all boxes.');
      return;
    }

    setError('');
    console.log({
      symbol: symbol.toUpperCase(),
      quantity: Number(quantity),
      buyPrice: Number(buyPrice),
    });

    setSymbol('');
    setQuantity('');
    setBuyPrice('');
  };

  return (
    <div className="wrapper">
      <header className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
          alt="finance icon"
          className="icon"
        />
        <h1 className="heading">Kuromi's Finance Dashboard</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Add Stock</button>

      </form>

      {error && <p className="error">{error}</p>}

      <h2 className="sectionTitle">Stock List</h2>

      <div className="card">
        <strong>No Stocks Added yet</strong>
      </div>

      <footer className="footer">
      <p>Pavi's Finance Dashboard! 🎀</p>
      <p style={{ fontSize: '12px', color: '#888' }}>© 2025 My Finance Dashboard</p>
      </footer>

    </div>
  );
}

export default StockForm;