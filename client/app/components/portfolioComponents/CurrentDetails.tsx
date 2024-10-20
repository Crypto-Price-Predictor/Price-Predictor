import React from 'react'

interface CurrencyDetailsProp{
    baseCurrency: string,
    totalCurrentBalance: number,
    unrealizedProfit: number,
}

const CurrentDetails: React.FC<CurrencyDetailsProp> = ({baseCurrency, totalCurrentBalance, unrealizedProfit}) => {
    const currentProfit = unrealizedProfit
    const currentBalance = totalCurrentBalance
    const currentInvesment = totalCurrentBalance - unrealizedProfit
    const profitPresentage = (currentProfit / currentInvesment)*100

  return (
    <div>
        <div className='flex flex-col w-full h-56 border-2 bg-base-200 border-white'>
            <div className='flex flex-row justify-between text-xl text-white p-5'>
                <label className='text-center'>Current Balance</label>
                <label className='text-center'>{currentBalance} {baseCurrency}</label>
            </div>
            <div className='flex flex-row justify-between text-lg  p-5'>
                <div className='flex flex-col'>
                    <label className='text-center text-gray-400'>Current Gain/Loss</label>
                    <label className='text-center text-white'>{currentProfit} {baseCurrency}</label>
                    <label className='text-center text-white'>({profitPresentage}%)</label>                    
                </div>
                <div>
                <div className='flex flex-col'>
                    <label className='text-center text-gray-400'>Current Invesment</label>
                    <label className='text-center text-white'>{currentInvesment} {baseCurrency}</label>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CurrentDetails