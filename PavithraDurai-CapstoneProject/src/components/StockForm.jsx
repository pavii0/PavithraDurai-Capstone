import React, { useState, useEffect, useCallback, useContext } from 'react';
import './StockForm.css';
import { StockContext } from '../context/StockContext';
import Kuromi from '../assets/kuromi-face.png';

const API_KEY = 'HT6R9OG0Q3WE8VTZ'; 

function StockForm() {
  const { stocks, setStocks } = useContext(StockContext);
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [error, setError] = useState('');

  const fetchStockPrice = useCallback(async (symbol) => {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();
    return parseFloat(data["Global Quote"]["05. price"]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symbol || !quantity || !buyPrice) {
      setError('Please fill in all boxes.');
      return;
    }

    setError('');
    try {
      const price = await fetchStockPrice(symbol);
      if (!price || isNaN(price)) {
        setError('Invalid stock symbol.');
        return;
      }

      const profit = (price - parseFloat(buyPrice)) * parseInt(quantity);
      const newStock = {
        symbol: symbol.toUpperCase(),
        quantity,
        buyPrice,
        currentPrice: price.toFixed(2),
        profitLoss: profit.toFixed(2),
      };

      setStocks([...stocks, newStock]);
    } catch (err) {
      setError('Error.');
    }

    setSymbol('');
    setQuantity('');
    setBuyPrice('');
  };

  useEffect(() => {
    const refreshPrices = async () => {
      const updated = await Promise.all(
        stocks.map(async (stock) => {
          const price = await fetchStockPrice(stock.symbol);
          const profit =
            (price - parseFloat(stock.buyPrice)) * parseInt(stock.quantity);
          return {
            ...stock,
            currentPrice: price.toFixed(2),
            profitLoss: profit.toFixed(2),
          };
        })
      );
      setStocks(updated);
    };

    if (stocks.length > 0) {
      refreshPrices();
    }
  }, []); 

  return (
    <div className="wrapper">
      <header className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
          alt="finance icon"
          className="icon"
        />
        <h1 className="heading">Finance Dashboard</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
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

      {stocks.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>No stocks added yet.</p>
      ) : (
        <>
          <h2 className="sectionTitle">Stock List</h2>
          {stocks.map((stock, index) => (
            <div key={index} className="card">
              <p><strong>Symbol:</strong> {stock.symbol}</p>
              <p>Quantity: {stock.quantity}</p>
              <p>Purchase Price: {stock.buyPrice}</p>
              <p>Current Price: {stock.currentPrice}</p>
              <p>
                <strong style={{ color: stock.profitLoss >= 0 ? '#00cc66' : '#cc0000' }}>
                  Profit/Loss:
                </strong>{' '}
                <strong style={{ color: stock.profitLoss >= 0 ? '#00cc66' : '#cc0000' }}>
                  ${stock.profitLoss}
                </strong>
              </p>
            </div>
          ))}
        </>
      )}

      <footer className="footer">
        <p>Pavi's Finance Dashboard! 🎀</p>
        <p style={{ fontSize: '12px', color: '#888' }}>© 2025 My Finance Dashboard</p>
      </footer>
    </div>
  );
}

export default StockForm;
