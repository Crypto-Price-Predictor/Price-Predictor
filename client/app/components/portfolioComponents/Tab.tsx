import React from 'react'
import ByeSell from './ByeSell';
import CurrentDetails from './CurrentDetails';
import TotalDetails from './TotalDetails';
import Wallet from './Wallet';
import CurrencyDetails from './CurrencyDetails';
import Overall from './Overall';
import Recomendations from './Recomendations';
import History from './History';

interface Transaction {
  type: 'buy' | 'sell';
  date: string;
  currency: string;
  amount: number;
  price: number;
}

interface TabProps {
  baseCurrency: string,
  transactions: Transaction[],
  portfolioDetails:String[],
  series: {
    name: string,
    data:{
      x:string,
      y:number
    }[]
  }[]

  realized:{
    name: string,
    data:{
      x:string,
      y:number
    }[]
  }[]

  unrealized:{
    name: string,
    data:{
      x:string,
      y:number
    }[]
  }[]

  totalCurrentBalance:number,
  unrealizedProfit: number,
  currencydetails:(string[] | number[])[],

  totalIncome:number,
  totalExpense:number,

  currencyCurrentValues:number[],
  currencyName: string[],

  topBuy:(string[] | number[] | {
    name: string,
    data:{
      x:string,
      y:number
    }[]
  }[])[],

  topSell:(string[] | number[] | {
    name: string,
    data:{
      x:string,
      y:number
    }[]
  }[])[],

  selectedBuy:(string | number | { name: string; data: { x: string; y: number; }[]; }[])[],

  selectedSell:(string | number | { name: string; data: { x: string; y: number; }[]; }[])[],
}
const Tab: React.FC<TabProps> = ({ baseCurrency, transactions,portfolioDetails, series, realized, unrealized, totalCurrentBalance, unrealizedProfit,currencydetails, totalIncome, totalExpense, currencyName,currencyCurrentValues,topBuy, topSell, selectedBuy, selectedSell })=> {
  return (
    <div>
        <div role="tablist" className="tabs tabs-boxed bg-black">
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Edit" />
          <div role="tabpanel" className="tab-content p-10"><ByeSell baseCurrency={baseCurrency} transactions={transactions} portfolioDetails={portfolioDetails}/></div>

          <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Visualize"
              defaultChecked />
          <div role="tabpanel" className="tab-content p-5 bg-black">
            <div className='flex flex-row w-full'>
              <div className='w-1/3 p-2'>
                <CurrentDetails baseCurrency={baseCurrency} totalCurrentBalance={totalCurrentBalance} unrealizedProfit={unrealizedProfit} />
              </div>
              <div className='w-1/3 p-2'>
                <TotalDetails baseCurrency={baseCurrency} totalIncome={totalIncome} totalExpense={totalExpense} />
              </div>
              <div className='w-1/3 p-2'>
                <Wallet currencyName={currencyName} currencyCurrentValues={currencyCurrentValues} />
              </div>
            </div>    

            <div  className='p-2'>
              <CurrencyDetails baseCurrency={baseCurrency} currencydetails={currencydetails}/>
            </div>

            <div className='p-2'>
              <Overall series={series} baseCurrency={baseCurrency} realized={realized} unrealized={unrealized} />
            </div>

            <div className='p-2'>
              <History baseCurrency={baseCurrency} transactions={transactions} />
            </div>
          </div>
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Recomendations" />
          <div role="tabpanel" className="tab-content p-10">
            <Recomendations baseCurrency={baseCurrency} topBuy={topBuy} topSell={topSell} selectedBuy={selectedBuy} selectedSell={selectedSell} />
          </div>
        </div>
    </div>
  )
}

export default Tab