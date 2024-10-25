import React, { useEffect, useState } from "react";
import Tab from "./Tab";

interface Transaction {
  type: "buy" | "sell";
  date: string;
  currency: string;
  amount: number;
  price: number;
}

interface SeriesData {
  name: string;
  data: { x: string; y: number }[];
}

interface portfolioMainprops {
  rowkey: String;
  value: boolean;
}

const PortfolioMain: React.FC<portfolioMainprops> = ({ rowkey, value }) => {
  const baseCurrency = "USD";

  // const portfolioDetails = ["My Portfolio 1", "2024/06/09", "2024/10/10"];

  const [portfolioDetails, setPortfolioDetails] = useState<any>();

  const [transaction, setTransaction] = useState<any[]>([]);

  const asset = [
    {
      name: "BTC",
      data: [
        { x: "2023-01-01", y: 2000 },
        { x: "2023-01-02", y: 0 },
        { x: "2023-01-03", y: 300 },
        { x: "2023-01-04", y: 220 },
      ],
    },
    {
      name: "ETH",
      data: [
        { x: "2023-01-01", y: 200 },
        { x: "2023-01-02", y: -950 },
        { x: "2023-01-03", y: 90 },
        { x: "2023-01-04", y: 120 },
      ],
    },
    {
      name: "TRX",
      data: [
        { x: "2023-01-01", y: 20 },
        { x: "2023-01-02", y: 200 },
        { x: "2023-01-03", y: -100 },
        { x: "2023-01-04", y: 90 },
      ],
    },
    {
      name: "GALA",
      data: [
        { x: "2023-01-01", y: -50 },
        { x: "2023-01-02", y: 60 },
        { x: "2023-01-03", y: 61 },
        { x: "2023-01-04", y: 60 },
      ],
    },
    {
      name: "DOGE",
      data: [
        { x: "2023-01-01", y: 80 },
        { x: "2023-01-02", y: 60 },
        { x: "2023-01-03", y: 60 },
        { x: "2023-01-04", y: 0 },
      ],
    },
  ];

  const realized = [
    {
      name: "BTC",
      data: [
        { x: "2023-01-01", y: 2000 },
        { x: "2023-01-02", y: 0 },
        { x: "2023-01-03", y: 300 },
        { x: "2023-01-04", y: 220 },
      ],
    },
    {
      name: "ETH",
      data: [
        { x: "2023-01-01", y: 200 },
        { x: "2023-01-02", y: -950 },
        { x: "2023-01-03", y: 90 },
        { x: "2023-01-04", y: 120 },
      ],
    },
    {
      name: "TRX",
      data: [
        { x: "2023-01-01", y: 20 },
        { x: "2023-01-02", y: 200 },
        { x: "2023-01-03", y: -100 },
        { x: "2023-01-04", y: 90 },
      ],
    },
    {
      name: "GALA",
      data: [
        { x: "2023-01-01", y: -50 },
        { x: "2023-01-02", y: 60 },
        { x: "2023-01-03", y: 61 },
        { x: "2023-01-04", y: 60 },
      ],
    },
    {
      name: "DOGE",
      data: [
        { x: "2023-01-01", y: 80 },
        { x: "2023-01-02", y: 60 },
        { x: "2023-01-03", y: 60 },
        { x: "2023-01-04", y: 0 },
      ],
    },
  ];

  const unrealized = [
    {
      name: "BTC",
      data: [
        { x: "2023-01-01", y: 2000 },
        { x: "2023-01-02", y: 0 },
        { x: "2023-01-03", y: 300 },
        { x: "2023-01-04", y: 220 },
      ],
    },
    {
      name: "ETH",
      data: [
        { x: "2023-01-01", y: 200 },
        { x: "2023-01-02", y: -950 },
        { x: "2023-01-03", y: 90 },
        { x: "2023-01-04", y: 120 },
      ],
    },
    {
      name: "TRX",
      data: [
        { x: "2023-01-01", y: 20 },
        { x: "2023-01-02", y: 200 },
        { x: "2023-01-03", y: -100 },
        { x: "2023-01-04", y: 90 },
      ],
    },
    {
      name: "GALA",
      data: [
        { x: "2023-01-01", y: -50 },
        { x: "2023-01-02", y: 60 },
        { x: "2023-01-03", y: 61 },
        { x: "2023-01-04", y: 60 },
      ],
    },
    {
      name: "DOGE",
      data: [
        { x: "2023-01-01", y: 80 },
        { x: "2023-01-02", y: 60 },
        { x: "2023-01-03", y: 60 },
        { x: "2023-01-04", y: 0 },
      ],
    },
  ];

  const currecnyName = ["BTC", "ETH", "TRX", "GALA", "DOGE"];
  const currentPrice = [60000, 2500, 0.85, 0.001, 0.05];
  const availableAmount = [0.01, 0.25, 700, 250, 50];
  const averageBuyingPrice = [59000.25, 2200, 0.84, 0.0012, 0.0456];
  const averageSellingPrice = [60020, 2150, 0.9, 0.001, 0.055];
  const totalBuyingAmount = [0.016, 0.5, 950, 315, 8000.58];
  const bgcolor = [
    "from-[#F69C3D]",
    "from-[#497493]",
    "from-[#EF0027]",
    "from-[#000000]",
    "from-[#C2A633]",
  ];

  const topBuyCurrencyName = ["BTC", "TRX", "ETH"];
  const topBuySellPrice = [60000, 0.63, 2500.9];
  const topBuyDate = ["2024/10/06", "2024/10/08", "2024/10/06"];
  const topBuyPrice = [52250.2, 0.625, 2400.5];
  const topBuySellDate = ["2024/10/07", "2024/10/10", "2024/10/11"];
  const buySeries = [
    {
      name: "BTC",
      data: [
        { x: "2023-01-01", y: 50000 },
        { x: "2023-01-02", y: 52000 },
        { x: "2023-01-03", y: 60000 },
        { x: "2023-01-04", y: 59000 },
      ],
    },
    {
      name: "TRX",
      data: [
        { x: "2023-01-01", y: 0.68 },
        { x: "2023-01-02", y: 0.7 },
        { x: "2023-01-03", y: 0.65 },
        { x: "2023-01-04", y: 0.65 },
      ],
    },
    {
      name: "ETH",
      data: [
        { x: "2023-01-01", y: 2500 },
        { x: "2023-01-02", y: 2200 },
        { x: "2023-01-03", y: 2250 },
        { x: "2023-01-04", y: 2450 },
      ],
    },
  ];

  const topSellCurrencyName = ["BTC", "TRX", "ETH"];
  const topSellAverageBuyPrice = [52250.2, 0.625, 2400.5];
  const topSellDate = ["2024/10/06", "2024/10/08", "2024/10/06"];
  const topSellPrice = [60000, 0.63, 2500.9];
  const topSellCurrentPrice = [60000, 0.62, 2300.9];
  const sellSeries = [
    {
      name: "BTC",
      data: [
        { x: "2023-01-01", y: 50000 },
        { x: "2023-01-02", y: 52000 },
        { x: "2023-01-03", y: 60000 },
        { x: "2023-01-04", y: 59000 },
      ],
    },
    {
      name: "TRX",
      data: [
        { x: "2023-01-01", y: 0.68 },
        { x: "2023-01-02", y: 0.7 },
        { x: "2023-01-03", y: 0.65 },
        { x: "2023-01-04", y: 0.65 },
      ],
    },
    {
      name: "ETH",
      data: [
        { x: "2023-01-01", y: 2500 },
        { x: "2023-01-02", y: 2200 },
        { x: "2023-01-03", y: 2250 },
        { x: "2023-01-04", y: 2450 },
      ],
    },
  ];

  const selectedBuyCurrencyName = "GALA";
  const selectedBuySellPrice = 0.05;
  const selectedBuyDate = "2024/10/06";
  const selectedBuyPrice = 0.06;
  const selectedBuySellDate = "2024/10/07";
  const selectedBuySeries = [
    {
      name: "GAlA",
      data: [
        { x: "2023-01-01", y: 50000 },
        { x: "2023-01-02", y: 52000 },
        { x: "2023-01-03", y: 60000 },
        { x: "2023-01-04", y: 59000 },
      ],
    },
  ];

  const selectedSellCurrencyName = "DOGE";
  const selectedSellAverageBuyPrice = 0.6;
  const selectedSellDate = "2024/11/06";
  const selectedSellPrice = 0.65;
  const selectedSellCurrentPrice = 0.62;
  const selectedSellSeries = [
    {
      name: "DOGE",
      data: [
        { x: "2023-01-01", y: 50000 },
        { x: "2023-01-02", y: 52000 },
        { x: "2023-01-03", y: 60000 },
        { x: "2023-01-04", y: 59000 },
      ],
    },
  ];

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // Calculate the sum of the last date value (y) for each currency
  const totalCurrentBalance = asset.reduce((sum, currency) => {
    const lastValue = currency.data[currency.data.length - 1].y; // Get last y value for each currency
    return sum + lastValue;
  }, 0);

  const unrealizedProfit = unrealized.reduce((sum, currency) => {
    const lastValue = currency.data[currency.data.length - 1].y; // Get last y value for each currency
    return sum + lastValue;
  }, 0);

  const currencydetails = [
    currecnyName,
    currentPrice,
    availableAmount,
    averageBuyingPrice,
    averageSellingPrice,
    totalBuyingAmount,
    bgcolor,
  ];

  const totalIncome = totalBuyingAmount.reduce((sum, amount, index) => {
    const buyingAmountDiff = totalBuyingAmount[index] - availableAmount[index];
    const priceDiff = averageSellingPrice[index] - averageBuyingPrice[index];
    return sum + buyingAmountDiff * priceDiff;
  }, 0);

  const totalExpense = averageBuyingPrice
    .map((price, index) => price * totalBuyingAmount[index]) // Element-wise multiplication
    .reduce((sum, value) => sum + value, 0); // Sum of the multiplied values

  const currencyCurrentValues = availableAmount.map(
    (amount, index) => amount * currentPrice[index]
  );

  const topBuy = [
    topBuyCurrencyName,
    topBuySellPrice,
    topBuyDate,
    topBuyPrice,
    topBuySellDate,
    buySeries,
  ];
  const topSell = [
    topSellCurrencyName,
    topSellAverageBuyPrice,
    topSellDate,
    topSellPrice,
    topSellCurrentPrice,
    sellSeries,
  ];
  const selectedBuy = [
    selectedBuyCurrencyName,
    selectedBuySellPrice,
    selectedBuyDate,
    selectedBuyPrice,
    selectedBuyPrice,
    selectedBuySeries,
  ];
  const selectedSell = [
    selectedSellCurrencyName,
    selectedSellAverageBuyPrice,
    selectedSellDate,
    selectedSellPrice,
    selectedSellCurrentPrice,
    selectedSellSeries,
  ];
  const [isLoading, setIsLoading] = useState(true);

  const fetchtransaction = async () => {
    try {
      const res = await fetch(`/api/getTransaction?portfolioID=${rowkey}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setTransaction(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPortfolioDetails = async () => {
      try {
        const res = await fetch(
          `/api/getPortfolioDetails?portfolioID=${rowkey}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setPortfolioDetails(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolioDetails();
    // Run fetchTransaction every 30 seconds (30000 ms)
    const interval = setInterval(fetchtransaction, 30000);

    // Run fetchTransaction immediately on component mount
    fetchtransaction();

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <Tab
        baseCurrency={baseCurrency}
        transactions={transaction}
        value={value}
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
        rowkey={rowkey}
      />
    </div>
  );
};

export default PortfolioMain;
