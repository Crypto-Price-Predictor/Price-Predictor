import React from 'react';

interface CuurrencyDetailsProp{
    baseCurrency: string,
    currencydetails:(string[] | number[])[],
}

const CurrencyDetails: React.FC<CuurrencyDetailsProp> = ({baseCurrency, currencydetails}) => {

    const currecnyName = currencydetails[0]
    const currentPrice = currencydetails[1]
    const availableAmount = currencydetails[2]
    const averageBuyingPrice = currencydetails[3]
    const averageSellingPrice = currencydetails[4]
    const totalBuyingAmount = currencydetails[5]
    const bgcolor = currencydetails[6]
    const numberOfItems = currecnyName.length

    const items = Array.from({ length: numberOfItems }, (_, index) => ({
        id: index,
        // bgColor: index % 2 === 0 ? 'bg-red-500' : 'bg-blue-500', // Alternate colors for demonstration
    }));

    return (
        <div className="flex justify-center flex-col">
            <div className="carousel w-full max-w-7xl p-5 gap-4 py-0">
                {items.map((item) => (
                    <div key={item.id} className="carousel-item w-1/3 border-2 bg-base-200 border-white">
                        <div className={`w-full h-full bg-base-200`}>
                            <div className={`flex flex-row justify-between bg-gradient-to-b ${bgcolor[item.id]} to-base-200`}>
                                <label className='text-xl text-white text-center pt-2 pb-1 px-5'>{currecnyName[item.id]}</label>  
                                <div className='flex flex-col items-center'>
                                    <label className='text-lg text-white text-center px-5 pt-2'>Current Price</label>
                                    <label className='text-lg text-white text-center pb-1 px-5'>{currentPrice[item.id]}  {baseCurrency}</label>
                                </div>
                            </div>
                            <div>
                                <div className='flex justify-between'>
                                    <label className='text-base text-gray-400 text-center pb-1 px-5'>Available Amount</label>
                                    <label className='text-base text-white text-center pb-1 px-5'>{availableAmount[item.id]} {currecnyName[item.id]} ({(availableAmount[item.id] * currentPrice[item.id]).toFixed(2)})</label>
                                </div>
                                <div className='flex justify-between'>
                                    <label className='text-base text-gray-400 text-center pb-1 px-5'>Unrealized Gain/Loss</label>
                                    <label className='text-base text-white text-center pb-1 px-5'>{(availableAmount[item.id] * (currentPrice[item.id] - averageBuyingPrice[item.id])).toFixed(2)} {baseCurrency}</label>
                                </div>
                                <div className='flex justify-between'>
                                    <label className='text-base text-gray-400 text-center pb-1 px-5'>Total Buy</label>
                                    <label className='text-base text-white text-center pb-1 px-5'>{totalBuyingAmount[item.id]} {currecnyName[item.id]}</label>
                                </div>
                                <div className='flex justify-between'>
                                    <label className='text-base text-gray-400 text-center pb-1 px-5'>Total Sell</label>
                                    <label className='text-base text-white text-center pb-1 px-5'>{totalBuyingAmount[item.id] - availableAmount[item.id]} {currecnyName[item.id]}</label>
                                </div>
                                <div className='flex justify-between'>
                                    <label className='text-base text-gray-400 text-center pb-1 px-5'>Realized Gain/Loss</label>
                                    <label className='text-base text-white text-center pb-5 px-5'>{((totalBuyingAmount[item.id] - availableAmount[item.id])*(averageSellingPrice[item.id] - averageBuyingPrice[item.id])).toFixed(2)} {baseCurrency} ({(((totalBuyingAmount[item.id] - availableAmount[item.id])*(averageSellingPrice[item.id] - averageBuyingPrice[item.id])) / averageBuyingPrice[item.id]).toFixed(2)}%)</label>
                                </div>

                                {/* <div className="flex justify-end items-end">
                                    <button className='px-3 py-1 text-white'>Trading History</button>
                                </div> */}
                            </div>
                        </div>  
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CurrencyDetails;
