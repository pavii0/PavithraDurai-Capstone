import React from 'react';
import StockForm from './components/StockForm';
import kuromi from './assets/kuromi.png';
import './app.css';


function App() {
  return (
    <>
    <div className="top-heading">
      <h1>My Finance Dashboard</h1>
      <img 
      src={kuromi} alt="kuromi" className='kuromi-picture'
      />
      </div>
      <StockForm />
    </>
  );
}

export default App;

