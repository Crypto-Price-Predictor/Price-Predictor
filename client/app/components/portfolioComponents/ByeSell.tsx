import React, { useState } from 'react';
import { your } from './../../../.next/static/chunks/main-app';
import PortfolioDetails from './PortfolioDetails'

const getCurrentDate = (): string => {
  const today = new Date();
  
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month starts at 0, so add 1
  const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed

  return `${year}/${month}/${day}`; // Return in YYYY/MM/DD format
};

interface Transaction {
  type: 'buy' | 'sell';
  date: string;
  currency: string;
  amount: number;
  price: number;
}

interface byeSellProp{
  baseCurrency: String,
  transactions: Transaction[],
  portfolioDetails: String[],
}

const ByeSell: React.FC<byeSellProp> = ({baseCurrency, transactions, portfolioDetails}) => {
  const [activeButton, setActiveButton] = useState('buy');

  const [formValues, setFormValues] = useState({
    price: '',
    amount: '',
    date: getCurrentDate(),
    fee: '0.00',
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show the alert on submit
    setShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    // Reset form values
    setFormValues({
      price: '',
      amount: '',
      date: getCurrentDate(),
      fee: '0.00',
    });
  };

  return (
    <div>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-black rounded-box grid h-full flex-grow place-items-center w-1/2">
          <div className='text-white w-full mr-10 gap-5'>
            <div className="join grid grid-cols-2 mb-4">
              <button
                className={`join-item btn btn-outline hover:bg-blue-500 hover:text-white ${activeButton === 'buy' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveButton('buy')}
              >
                Buy
              </button>

              <button
                className={`join-item btn btn-outline hover:bg-red-500 hover:text-white ${activeButton === 'sell' ? 'bg-red-500 text-white' : ''}`}
                onClick={() => setActiveButton('sell')}
              >
                Sell
              </button>
            </div>

            <select className="bg-black focus:outline-none mb-4">
              <option>BTC/USDT</option>
              <option>TRX/USDT</option>
              <option>DOGE/USDT</option>
              <option>ETH/USDT</option>
              <option>GALA/USDT</option>
            </select>

            <div className='bg-base-200 p-1 mb-4 rounded-xl w-full'>
              <h1 className='text-center text-slate-400'>Price (USDT)</h1>
              <input
                className='w-full bg-base-200 text-center pt-1 text-xl focus:outline-none'
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
              />
            </div>

            <div className='bg-base-200 p-1 mb-4 rounded-xl w-full'>
              <h1 className='text-center text-slate-400'>Amount</h1>
              <input
                className='w-full bg-base-200 text-center pt-1 text-xl focus:outline-none'
                name="amount"
                value={formValues.amount}
                onChange={handleInputChange}
              />
            </div>

            <div className='bg-base-200 p-1 mb-4 rounded-xl w-full'>
              <h1 className='text-center text-slate-400'>Date</h1>
              <input
                className='w-full bg-base-200 text-center pt-1 text-xl focus:outline-none'
                placeholder='YYYY/MM/DD'
                name="date"
                value={formValues.date}
                onChange={handleInputChange}
              />
            </div>

            <div className='bg-base-200 p-1 mb-4 rounded-xl w-full'>
              <h1 className='text-center text-slate-400'>Est. Fee</h1>
              <input
                className='w-full bg-base-200 text-center pt-1 text-xl focus:outline-none'
                name="fee"
                value={formValues.fee}
                onChange={handleInputChange}
              />
            </div>

            <div className='flex justify-center items-center'>
              <button className="btn w-1/2 bg-gradient-to-r from-pink-600 to-purple-900" onClick={handleSubmit}>Submit</button>
            </div>

            {/* Show success alert if showAlert is true */}
            {showAlert && (
              <div 
                role="alert" 
                className="alert alert-success mt-4 fixed top-4 left-1/2 transform -translate-x-1/2 w-72"
                style={{ zIndex: 1000 }} // Ensure it's on top of the content
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Succesfully add your trade to the portfolio!</span>
              </div>
            )}
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-black rounded-box grid h-full flex-grow place-items-center w-1/2"><PortfolioDetails baseCurrency={baseCurrency} transactions={transactions} portfolioDetails={portfolioDetails}/></div>
      </div>
    </div>
  );
};

export default ByeSell;
