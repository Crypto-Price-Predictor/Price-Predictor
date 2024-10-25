import React, { useState } from 'react';

interface Transaction {
    [x: string]: any;
    type: 'buy' | 'sell';
    date: string;
    currency: string;
    amount: number;
    price: number;
  }

interface HistoryProp{
    baseCurrency: string,
    transactions: Transaction[],
}

const History: React.FC<HistoryProp> = ({baseCurrency, transactions}) => {

  return (
    <div className="flex flex-col w-full border-2 bg-base-200 border-white p-5">
      <h1 className="text-white text-xl mb-4 pb-5">Transaction History</h1>

      {/* Scrollable container */}
      <div className="overflow-y-auto max-h-96 scrollbar-gray-700">
        {/* Transaction Table */}
        <table className="min-w-full table-auto text-white">
          <thead className="sticky top-0 bg-gray-800">
            <tr>
              <th className="px-4 py-2 border-b border-gray-400">Date</th>
              <th className="px-4 py-2 border-b border-gray-400">Type</th>
              <th className="px-4 py-2 border-b border-gray-400">Currency</th>
              <th className="px-4 py-2 border-b border-gray-400">Amount</th>
              <th className="px-4 py-2 border-b border-gray-400">Price Per Unit ({baseCurrency})</th>
              <th className="px-4 py-2 border-b border-gray-400">Total Price ({baseCurrency})</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="bg-gray-700">
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
        .scrollbar-gray-700::-webkit-scrollbar-thumb {
          background-color: #4b5563; /* Tailwind gray-700 */
          border-radius: 6px;
        }
        .scrollbar-gray-700::-webkit-scrollbar-track {
          background-color: #1f2937; /* Tailwind gray-800 */
        }
      `}</style>
    </div>
  );
}

export default History;
