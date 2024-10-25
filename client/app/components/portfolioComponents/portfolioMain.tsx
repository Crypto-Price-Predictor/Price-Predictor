import React, { useState } from 'react';
import Tab from './Tab';

interface Transaction {
  type: 'buy' | 'sell';
  date: string;
  currency: string;
  amount: number;
  price: number;
}

interface SeriesData {
  name: string;
  data: { x: string; y: number }[];
}

const PortfolioMain = () => {
  const baseCurrency = 'USD';

  const portfolioDetails = ['My Portfolio 1', '2024/06/09', '2024/10/10'];

  const Transactions: Transaction[] = [
    { type: 'buy', date: '2024/05/06', currency: 'BTC', amount: 500, price: 6000.52 },
    { type: 'sell', date: '2024/05/07', currency: 'ETH', amount: 300, price: 1500.75 },
    { type: 'buy', date: '2024/05/08', currency: 'DOGE', amount: 2000, price: 0.05 },
    { type: 'sell', date: '2024/05/09', currency: 'BTC', amount: 100, price: 6100.22 },
    { type: 'buy', date: '2024/05/10', currency: 'ETH', amount: 450, price: 1550.65 },
    { type: 'sell', date: '2024/05/11', currency: 'BTC', amount: 600, price: 6200.10 },
    { type: 'buy', date: '2024/05/12', currency: 'GALA', amount: 5000, price: 0.10 },
    { type: 'sell', date: '2024/05/13', currency: 'BTC', amount: 200, price: 6300.55 },
    { type: 'buy', date: '2024/05/14', currency: 'TRX', amount: 4000, price: 0.12 },
    { type: 'sell', date: '2024/05/15', currency: 'ETH', amount: 500, price: 1600.85 },
    { type: 'buy', date: '2024/05/16', currency: 'BTC', amount: 350, price: 6400.95 },
    { type: 'sell', date: '2024/05/17', currency: 'DOGE', amount: 2500, price: 0.06 },
    { type: 'buy', date: '2024/05/18', currency: 'BTC', amount: 150, price: 6500.30 },
    { type: 'sell', date: '2024/05/19', currency: 'GALA', amount: 4000, price: 0.11 },
    { type: 'buy', date: '2024/05/20', currency: 'BTC', amount: 250, price: 6600.45 },
  ];

  const asset = [
    {
      name: 'BTC',
      data: [
        { x: '2023-01-01', y: 2000 },
        { x: '2023-01-02', y: 0 },
        { x: '2023-01-03', y: 300 },
        { x: '2023-01-04', y: 220 },
      ]
    },
    {
      name: 'ETH',
      data: [
        { x: '2023-01-01', y: 200 },
        { x: '2023-01-02', y: -950 },
        { x: '2023-01-03', y: 90 },
        { x: '2023-01-04', y: 120 },
      ]
    },
    {
      name: 'TRX',
      data: [
        { x: '2023-01-01', y: 20 },
        { x: '2023-01-02', y: 200 },
        { x: '2023-01-03', y: -100 },
        { x: '2023-01-04', y: 90 },
      ]
    },
    {
      name: 'GALA',
      data: [
        { x: '2023-01-01', y: -50 },
        { x: '2023-01-02', y: 60 },
        { x: '2023-01-03', y: 61 },
        { x: '2023-01-04', y: 60 },
      ]
    },
    {
      name: 'DOGE',
      data: [
        { x: '2023-01-01', y: 80 },
        { x: '2023-01-02', y: 60 },
        { x: '2023-01-03', y: 60 },
        { x: '2023-01-04', y: 0 },
      ]
    }
  ];

  const realized = [
    {
      name: 'BTC',
      data: [
        { x: '2023-01-01', y: 2000 },
        { x: '2023-01-02', y: 0 },
        { x: '2023-01-03', y: 300 },
        { x: '2023-01-04', y: 220 },
      ]
    },
    {
      name: 'ETH',
      data: [
        { x: '2023-01-01', y: 200 },
        { x: '2023-01-02', y: -950 },
        { x: '2023-01-03', y: 90 },
        { x: '2023-01-04', y: 120 },
      ]
    },
    {
      name: 'TRX',
      data: [
        { x: '2023-01-01', y: 20 },
        { x: '2023-01-02', y: 200 },
        { x: '2023-01-03', y: -100 },
        { x: '2023-01-04', y: 90 },
      ]
    },
    {
      name: 'GALA',
      data: [
        { x: '2023-01-01', y: -50 },
        { x: '2023-01-02', y: 60 },
        { x: '2023-01-03', y: 61 },
        { x: '2023-01-04', y: 60 },
      ]
    },
    {
      name: 'DOGE',
      data: [
        { x: '2023-01-01', y: 80 },
        { x: '2023-01-02', y: 60 },
        { x: '2023-01-03', y: 60 },
        { x: '2023-01-04', y: 0 },
      ]
    }
  ];

  const unrealized = [
    {
      name: 'BTC',
      data: [
        { x: '2023-01-01', y: 2000 },
        { x: '2023-01-02', y: 0 },
        { x: '2023-01-03', y: 300 },
        { x: '2023-01-04', y: 220 },
      ]
    },
    {
      name: 'ETH',
      data: [
        { x: '2023-01-01', y: 200 },
        { x: '2023-01-02', y: -950 },
        { x: '2023-01-03', y: 90 },
        { x: '2023-01-04', y: 120 },
      ]
    },
    {
      name: 'TRX',
      data: [
        { x: '2023-01-01', y: 20 },
        { x: '2023-01-02', y: 200 },
        { x: '2023-01-03', y: -100 },
        { x: '2023-01-04', y: 90 },
      ]
    },
    {
      name: 'GALA',
      data: [
        { x: '2023-01-01', y: -50 },
        { x: '2023-01-02', y: 60 },
        { x: '2023-01-03', y: 61 },
        { x: '2023-01-04', y: 60 },
      ]
    },
    {
      name: 'DOGE',
      data: [
        { x: '2023-01-01', y: 80 },
        { x: '2023-01-02', y: 60 },
        { x: '2023-01-03', y: 60 },
        { x: '2023-01-04', y: 0 },
      ]
    }
  ];

    const currecnyName = ['BTC', 'ETH','TRX','GALA','DOGE']
    const currentPrice = [60000,2500,0.85,0.001,0.05]
    const availableAmount = [0.01, 0.25, 700, 250, 50]
    const averageBuyingPrice = [59000.25, 2200, 0.84, 0.0012, 0.0456]
    const averageSellingPrice = [60020, 2150, 0.9, 0.001, 0.055]
    const totalBuyingAmount = [0.016, 0.5, 950, 315, 8000.58]
    const bgcolor = ['from-[#F69C3D]','from-[#497493]','from-[#EF0027]','from-[#000000]','from-[#C2A633]']

    const topBuyCurrencyName = ['BTC', 'TRX', 'ETH']
    const topBuySellPrice = [60000, 0.630, 2500.9]
    const topBuyDate = ['2024/10/06', '2024/10/08', '2024/10/06']
    const topBuyPrice = [52250.20, 0.625, 2400.5]
    const topBuySellDate = ['2024/10/07', '2024/10/10', '2024/10/11']
    const buySeries = [
      {
        name: 'BTC',
        data: [
          { x: '2023-01-01', y: 50000 },
          { x: '2023-01-02', y: 52000 },
          { x: '2023-01-03', y: 60000 },
          { x: '2023-01-04', y: 59000 },
        ]
      },
      {
        name: 'TRX',
        data: [
          { x: '2023-01-01', y: 0.68 },
          { x: '2023-01-02', y: 0.7 },
          { x: '2023-01-03', y: 0.65 },
          { x: '2023-01-04', y: 0.65 },
        ]
      },
      {
        name: 'ETH',
        data: [
          { x: '2023-01-01', y: 2500 },
          { x: '2023-01-02', y: 2200 },
          { x: '2023-01-03', y: 2250 },
          { x: '2023-01-04', y: 2450 },
        ]
      }
    ];


    const topSellCurrencyName = ['BTC', 'TRX', 'ETH']
    const topSellAverageBuyPrice = [52250.20, 0.625, 2400.5]
    const topSellDate = ['2024/10/06', '2024/10/08', '2024/10/06']
    const topSellPrice = [60000, 0.630, 2500.9]
    const topSellCurrentPrice = [60000, 0.62, 2300.9]
    const sellSeries = [
      {
        name: 'BTC',
        data: [
          { x: '2023-01-01', y: 50000 },
          { x: '2023-01-02', y: 52000 },
          { x: '2023-01-03', y: 60000 },
          { x: '2023-01-04', y: 59000 },
        ]
      },
      {
        name: 'TRX',
        data: [
          { x: '2023-01-01', y: 0.68 },
          { x: '2023-01-02', y: 0.7 },
          { x: '2023-01-03', y: 0.65 },
          { x: '2023-01-04', y: 0.65 },
        ]
      },
      {
        name: 'ETH',
        data: [
          { x: '2023-01-01', y: 2500 },
          { x: '2023-01-02', y: 2200 },
          { x: '2023-01-03', y: 2250 },
          { x: '2023-01-04', y: 2450 },
        ]
      }
    ];

    const selectedBuyCurrencyName = 'GALA'
    const selectedBuySellPrice = 0.05
    const selectedBuyDate = '2024/10/06'
    const selectedBuyPrice = 0.06
    const selectedBuySellDate = '2024/10/07'
    const selectedBuySeries = [
        {
          name: 'GAlA',
          data: [
            { x: '2023-01-01', y: 50000 },
            { x: '2023-01-02', y: 52000 },
            { x: '2023-01-03', y: 60000 },
            { x: '2023-01-04', y: 59000 },
          ]
        },
    ]

    const selectedSellCurrencyName = "DOGE"
    const selectedSellAverageBuyPrice = 0.6
    const selectedSellDate = '2024/11/06'
    const selectedSellPrice = 0.65
    const selectedSellCurrentPrice = 0.62
    const selectedSellSeries = [
        {
          name: 'DOGE',
          data: [
            { x: '2023-01-01', y: 50000 },
            { x: '2023-01-02', y: 52000 },
            { x: '2023-01-03', y: 60000 },
            { x: '2023-01-04', y: 59000 },
          ]
        },
    ]

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // Calculate the sum of the last date value (y) for each currency
const totalCurrentBalance = asset.reduce((sum, currency) => {
  const lastValue = currency.data[currency.data.length - 1].y;  // Get last y value for each currency
  return sum + lastValue;
}, 0);
  
const unrealizedProfit = unrealized.reduce((sum, currency) => {
  const lastValue = currency.data[currency.data.length - 1].y;  // Get last y value for each currency
  return sum + lastValue;
}, 0);

const currencydetails = [currecnyName, currentPrice, availableAmount, averageBuyingPrice, averageSellingPrice, totalBuyingAmount, bgcolor]

const totalIncome = totalBuyingAmount.reduce((sum, amount, index) => {
  const buyingAmountDiff = totalBuyingAmount[index] - availableAmount[index];
  const priceDiff = averageSellingPrice[index] - averageBuyingPrice[index];
  return sum + (buyingAmountDiff * priceDiff);
}, 0);

const totalExpense = averageBuyingPrice
  .map((price, index) => price * totalBuyingAmount[index]) // Element-wise multiplication
  .reduce((sum, value) => sum + value, 0); // Sum of the multiplied values

  const currencyCurrentValues = availableAmount.map((amount, index) => amount * currentPrice[index]);

  const topBuy = [topBuyCurrencyName, topBuySellPrice, topBuyDate, topBuyPrice, topBuySellDate, buySeries];
  const topSell = [topSellCurrencyName, topSellAverageBuyPrice, topSellDate, topSellPrice, topSellCurrentPrice, sellSeries];
  const selectedBuy = [selectedBuyCurrencyName, selectedBuySellPrice, selectedBuyDate, selectedBuyPrice, selectedBuyPrice, selectedBuySeries];
  const selectedSell = [selectedSellCurrencyName, selectedSellAverageBuyPrice, selectedSellDate, selectedSellPrice, selectedSellCurrentPrice, selectedSellSeries];

  return (
    <div>
      <Tab 
        baseCurrency={baseCurrency} 
        transactions={Transactions} 
        portfolioDetails={portfolioDetails} 
        series={asset} 
        realized={realized} 
        unrealized={unrealized} 
        totalCurrentBalance={totalCurrentBalance} 
        unrealizedProfit={unrealizedProfit} 
        currencydetails={currencydetails}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        currencyName={currecnyName}
        currencyCurrentValues={currencyCurrentValues}
        topBuy={topBuy}
        topSell={topSell}
        selectedBuy={selectedBuy}
        selectedSell={selectedSell}
      />
    </div>
  );
};

export default PortfolioMain;
