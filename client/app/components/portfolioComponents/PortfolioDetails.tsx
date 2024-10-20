import React, { useState } from 'react';

interface Transaction {
  [x: string]: any;
  type: 'buy' | 'sell';
  date: string;
  currency: string;
  amount: number;
  price: number;
}


interface PortfolioFetailsProp{
  baseCurrency: String,
  transactions: Transaction,
  portfolioDetails: String[],
}

const PortfolioDetails: React.FC<PortfolioFetailsProp> = ({baseCurrency, transactions,portfolioDetails}) => {
  const portfolioName = portfolioDetails[0]; // Default name value

  const [name, setName] = useState(portfolioName); // State for the input value
  const [isDisabled, setIsDisabled] = useState(true); // State to toggle disabled

  const creaedDate = portfolioDetails[1];
  const lastDate = portfolioDetails[2];
  // const baseCurrency = 'USD'

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled); // Toggle the disabled state
  };

  const handleChange = (e) => {
    setName(e.target.value); // Set the input value to state
  };

  return (
    <div>
      <div className='flex flex-col  w-full'>
        <div className='flex flex-row w-full bg-base-200 p-1 h-full rounded-full'>
          <input
            type='text'
            className='w-full bg-base-200 rounded-full text-center text-slate-400 pt-1 text-3xl focus:outline-none'
            value={name} // Bind the input value to the state `name`
            onChange={handleChange} // Handle change event
            disabled={isDisabled} // Set disabled state
          />

          {/* Button to toggle the disabled state */}
          <button className="btn bg-gradient-to-r from-pink-600 to-purple-900 rounded-full" onClick={toggleDisabled}>
            {isDisabled ? 'Edit' : 'Change'}
          </button>
        </div>

        <label className='flex text-white pt-5'>Created Date: {creaedDate.toString()}</label>
        <label className='flex text-white'>Last Modified Date: {lastDate.toString()}</label>
        <label className='flex text-white pb-5'>Base Currency: {baseCurrency.toString()}</label>

        <h1 className='text-center text-white text-lg pb-1'>History</h1>

        <div className="h-64 p-4 bg-base-200 text-white rounded-3xl w-full">
          {/* Scrollable container */}
      <div className="overflow-y-auto max-h-56 scrollbar-gray-700">
        {/* Transaction Table */}
        <table className="min-w-full table-auto text-white">
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="bg-base-200">
                <td className="border-t border-gray-400 px-4 py-2">{transaction.date}</td>
                <td
                  className={`border-t border-gray-400 px-4 py-2 ${
                    transaction.type === 'buy' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {transaction.type.toUpperCase()}
                </td>
                <td className="border-t border-gray-400 px-4 py-2">{transaction.currency}</td>
                <td className="border-t border-gray-400 px-4 py-2">{transaction.amount}</td>
                <td className="border-t border-gray-400 px-4 py-2">{transaction.price}</td>
                <td className="border-t border-gray-400 px-4 py-2">{(transaction.price * transaction.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Scrollbar Styling */}
      <style jsx>{`
        .scrollbar-gray-700::-webkit-scrollbar {
          width: 12px;
        }
      `}</style>
        </div>

      </div>
    </div>
  );
};

export default PortfolioDetails;
