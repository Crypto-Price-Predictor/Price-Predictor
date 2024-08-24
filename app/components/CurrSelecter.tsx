import React from 'react'

const CurrSelecter = () => {
  
  return (
    <div className='w-1/2 justify-center flex'>
        <select className="h-12 bg-gray-700 hover:bg-gradient-to-r from-pink-600 to-purple-900 w-full max-w-xs rounded-lg">
        <option className='text-center'>Bitcoin (BTC)</option>
        <option className='text-center'>TRON (TRX)</option>
        <option className='text-center'>SOLANA (SOL) CMS</option>
        <option className='text-center'>Dogecoin (Doge)</option>
        </select>
    </div>
  )
}

export default CurrSelecter
