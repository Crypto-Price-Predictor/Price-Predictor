import dynamic from "next/dynamic";
import React, { useState } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface RecomendationsProp{
  baseCurrency: string,
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

const Recomendations: React.FC<RecomendationsProp> = ({baseCurrency, topBuy, topSell, selectedBuy, selectedSell}) => {

    const topBuyCurrencyName = topBuy[0]
    const topBuySellPrice = topBuy[1]
    const topBuyDate = topBuy[2]
    const topBuyPrice = topBuy[3]
    const topBuySellDate = topBuy[4]

    console.log(topBuy)

    const topSellCurrencyName = topSell[0]
    const topSellAverageBuyPrice = topSell[1]
    const topSellDate = topSell[2]
    const topSellPrice = topSell[3]
    const topSellCurrentPrice = topSell[4]

    const selectedBuyCurrencyName = selectedBuy[0]
    const selectedBuySellPrice = selectedBuy[1]
    const selectedBuyDate = selectedBuy[2]
    const selectedBuyPrice = selectedBuy[3]
    const selectedBuySellDate = selectedBuy[4]
    const selectedBuySeries = selectedBuy[5]

    const selectedSellCurrencyName = selectedSell[0]
    const selectedSellAverageBuyPrice = selectedSell[1]
    const selectedSellDate = selectedSell[2]
    const selectedSellPrice = selectedSell[3]
    const selectedSellCurrentPrice = selectedSell[4]
    const selectedSellSeries = selectedSell[5]

    const buySeries = topBuy[5]

      const sellSeries = topSell[5]

      const options = {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          },
          background: '#191E24',
          parentHeightOffset: 0,
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(2); // Format y-axis values
            },
            style: {
              colors: '#9ca3af', // Y-axis values text color
            }
          },
          title: {
            text: 'Asset Value (' + baseCurrency + ')', // Fixed typo in title
            style: {
              color: '#9ca3af',
            },
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: '#9ca3af', // X-axis values text color
            }
          }
        },
        legend: {
          labels: {
            colors: '#9ca3af', // This changes the text color of the legend
          },
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return val.toFixed(2); // Format tooltip values
            }
          }
        }
      };

    const [selectedBuyCurrency, setSelectedBuyCurrency] = useState(null);

    const handleBuyCurrencyChange = (event) => {
        setSelectedBuyCurrency(event.target.value);
    };

    const [selectedSellCurrency, setSelectedSellCurrency] = useState(null);

    const handleSellCurrencyChange = (event) => {
        setSelectedSellCurrency(event.target.value);
    };


  return (
    <div className="">
        <p className='text-gray-400 pt-0 p-5'>The recommendations and predictions provided on this platform are based on our machine learning models. Please note that these predictions are for informational purposes only and do not constitute financial advice. We are not responsible for any profit or loss incurred as a result of using the information or tools on this website. We encourage users to conduct their own research and seek professional financial advice before making any investment decisions</p>
        <div className="flex flex-col w-full border-2 bg-base-200 border-white p-5">
            <div className="">
                <label className="text-white text-xl">Buy Recomendations</label>
                <div>
                    <div className='flex justify-between p-5 pt-16'>
                        <label className='text-white text-2xl'>1. {topBuyCurrencyName[0]}</label>
                        <div>
                            <label className='text-gray-400 text-lg'>Estimate Maximum Profit: </label>
                            <label className='text-green-500 text-lg'>{((topBuySellPrice[0]-topBuyPrice[0])/topBuyPrice[0]).toFixed(2)}%</label>
                            <label className='text-gray-400 text-lg'> (to </label>
                            <label className='text-red-500 text-lg'>{topBuySellDate[0]}</label>
                            <label className='text-gray-400 text-lg'>)</label>
                        </div>
                    </div>
                    <div className='flex justify-between p-5'>
                        <div>
                            <label className='text-gray-400 text-lg'>Recomended Buying Price: </label>
                            <label className='text-green-500 text-lg'>{topBuyPrice[0]} {baseCurrency}</label>
                        </div>
                        <div>
                            <label className='text-gray-400 text-lg'>Estimate Date for Recomended Price: </label>
                            <label className='text-green-500 text-lg'>{topBuyDate[0]}</label>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <label className='text-white text-lg'>Today and Predicted Next 7 Day Price for {topBuyCurrencyName[0]}</label>
                    </div>
                    <div className={`shadow-lg rounded-lg bg-base-200`}>
                        <ApexChart options={options} series={[buySeries[0]]} type="area" height={200} />
                    </div>
                </div>

                <div className="pt-16">
                    <div className='flex justify-between p-5'>
                        <label className='text-white text-2xl'>2. {topBuyCurrencyName[1]}</label>
                        <div>
                            <label className='text-gray-400 text-lg'>Estimate Maximum Profit: </label>
                            <label className='text-green-500 text-lg'>{((topBuySellPrice[1]-topBuyPrice[1])/topBuyPrice[0]).toFixed(2)}%</label>
                            <label className='text-gray-400 text-lg'> (to </label>
                            <label className='text-red-500 text-lg'>{topBuySellDate[1]}</label>
                            <label className='text-gray-400 text-lg'>)</label>
                        </div>
                    </div>
                    <div className='flex justify-between p-5'>
                        <div>
                            <label className='text-gray-400 text-lg'>Recomended Buying Price: </label>
                            <label className='text-green-500 text-lg'>{topBuyPrice[1]} {baseCurrency}</label>
                        </div>
                        <div>
                            <label className='text-gray-400 text-lg'>Estimate Date for Recomended Price: </label>
                            <label className='text-green-500 text-lg'>{topBuyDate[1]}</label>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <label className='text-white text-lg'>Today and Predicted Next 7 Day Price for {topBuyCurrencyName[1]}</label>
                    </div>
                    <div className={`shadow-lg rounded-lg bg-base-200`}>
                        <ApexChart options={options} series={[buySeries[1]]} type="area" height={200} />
                    </div>
                </div>

                <div className="pt-16">
                    <div className='flex justify-between p-5'>
                        <label className='text-white text-2xl'>3. {topBuyCurrencyName[2]}</label>
                        <div>
                            <label className='text-gray-400 text-lg'>Estimate Maximum Profit: </label>
                            <label className='text-green-500 text-lg'>{((topBuySellPrice[2]-topBuyPrice[2])/topBuyPrice[0]).toFixed(2)}%</label>
                            <label className='text-gray-400 text-lg'> (to </label>
                            <label className='text-red-500 text-lg'>{topBuySellDate[2]}</label>
                            <label className='text-gray-400 text-lg'>)</label>
                        </div>
                    </div>
                    <div className='flex justify-between p-5'>
                        <div>
                            <label className='text-gray-400 text-lg'>Recomended Buying Price: </label>
                            <label className='text-green-500 text-lg'>{topBuyPrice[2]} {baseCurrency}</label>
                        </div>
                        <div>
                            <label className='text-gray-400 text-lg'>Estimate Date for Recomended Price: </label>
                            <label className='text-green-500 text-lg'>{topBuyDate[2]}</label>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <label className='text-white text-lg'>Today and Predicted Next 7 Day Price for {topBuyCurrencyName[2]}</label>
                    </div>
                    <div className={`shadow-lg rounded-lg bg-base-200`}>
                        <ApexChart options={options} series={[buySeries[2]]} type="area" height={200} />
                    </div>
                </div>

                <div className="pt-16">
                <div className='flex justify-between p-5 pb-0'>
                    <div>
                        <label className='text-white text-2xl'>4. </label>
                        <select
                            className='text-white text-2xl bg-base-200 focus:outline-none'
                            onChange={handleBuyCurrencyChange}
                            value={selectedBuyCurrency || 'Select Currency'}
                        >
                            <option disabled>Select Currency</option>
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                            <option value="TRX">TRX</option>
                            <option value="GALA">GALA</option>
                            <option value="DOGE">DOGE</option>
                        </select>
                    </div>
                </div>

                {selectedBuyCurrency && selectedBuySeries && (
                    <>
                        <div>
                        <div className="flex justify-end p-5 pt-0">
                            <label className='text-gray-400 text-lg'>Estimate Maximum Profit: </label>
                            <label className='text-green-500 text-lg'>{((selectedBuySellPrice-selectedBuyPrice)/selectedBuyPrice).toFixed(2)}% </label>
                            <label className='text-gray-400 text-lg'> (to </label>
                            <label className='text-red-500 text-lg'> {selectedBuySellDate[2]}</label>
                            <label className='text-gray-400 text-lg'>)</label>
                        </div>
                    </div>
                    <div className='flex justify-between p-5'>
                        <div>
                            <label className='text-gray-400 text-lg'>Recomended Buying Price: </label>
                            <label className='text-green-500 text-lg'>{selectedBuyPrice} {baseCurrency}</label>
                        </div>
                        <div>
                            <label className='text-gray-400 text-lg'>Estimate Date for Recomended Price: </label>
                            <label className='text-green-500 text-lg'>{selectedBuyDate}</label>
                        </div>
                    </div>
                        <div className='flex justify-center'>
                            <label className='text-white text-lg'>Today and Predicted Next 7 Day Price for {selectedBuyCurrencyName}</label>
                        </div>
                        <div className={`shadow-lg rounded-lg bg-base-200`}>
                            <ApexChart options={options} series={selectedBuySeries} type="area" height={200} />
                        </div>
                    </>
                )}
            </div>
            </div>
        </div>

        <div className="pt-8" /> 

        <div className="flex flex-col w-full border-2 bg-base-200 border-white p-5">
            <div className="">
                <label className="text-white text-xl">Sell Recomendations</label>
                <div>
                    <div className='flex justify-between p-5 pt-16'>
                        <label className='text-white text-2xl'>1. {topSellCurrencyName[0]}</label>
                        <div>
                            <label className='text-gray-400 text-lg'>Estimate Maximum Profit: </label>
                            <label className='text-green-500 text-lg'>{((topSellPrice[0]-topSellAverageBuyPrice[0])/topSellAverageBuyPrice[0]).toFixed(2)}%</label>
                            <label className='text-gray-400 text-lg'> (to </label>
                            <label className='text-red-500 text-lg'>{topSellDate[0]}</label>
                            <label className='text-gray-400 text-lg'>)</label>
                        </div>
                    </div>
                    <div className='flex justify-between p-5'>
                        <div>
                            <label className='text-gray-400 text-lg'>Today Profit/Loss: </label>
                            <label className='text-green-500 text-lg'>{((topSellCurrentPrice[0]-topSellAverageBuyPrice[0])/topSellAverageBuyPrice[0]).toFixed(2)}%</label>
                        </div>
                        <div>
                            <label className='text-gray-400 text-lg'>Average Buying Price: </label>
                            <label className='text-green-500 text-lg'>{topSellAverageBuyPrice[0]}</label>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <label className='text-white text-lg'>Today and Predicted Next 7 Day Price for {topSellCurrencyName[0]}</label>
                    </div>
                    <div className={`shadow-lg rounded-lg bg-base-200`}>
                        <ApexChart options={options} series={[sellSeries[0]]} type="area" height={200} />
                    </div>
                </div>

                <div className="pt-16">
                <div className='flex justify-between p-5 pt-16'>
                        <label className='text-white text-2xl'>1. {topSellCurrencyName[1]}</label>
                        <div>
                            <label className='text-gray-400 text-lg'>Estimate Maximum Profit: </label>
                            <label className='text-green-500 text-lg'>{((topSellPrice[1]-topSellAverageBuyPrice[1])/topSellAverageBuyPrice[1]).toFixed(2)}%</label>
                            <label className='text-gray-400 text-lg'> (to </label>
                            <label className='text-red-500 text-lg'>{topSellDate[1]}</label>
                            <label className='text-gray-400 text-lg'>)</label>
                        </div>
                    </div>
                    <div className='flex justify-between p-5'>
                        <div>
                            <label className='text-gray-400 text-lg'>Today Profit/Loss: </label>
                            <label className='text-green-500 text-lg'>{((topSellCurrentPrice[1]-topSellAverageBuyPrice[1])/topSellAverageBuyPrice[1]).toFixed(2)}%</label>
                        </div>
                        <div>
                            <label className='text-gray-400 text-lg'>Average Buying Price: </label>
                            <label className='text-green-500 text-lg'>{topSellAverageBuyPrice[1]}</label>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <label className='text-white text-lg'>Today and Predicted Next 7 Day Price for {topSellCurrencyName[1]}</label>
                    </div>
                    <div className={`shadow-lg rounded-lg bg-base-200`}>
                        <ApexChart options={options} series={[sellSeries[1]]} type="area" height={200} />
                    </div>
                </div>

                <div className="pt-16">
                <div className='flex justify-between p-5 pt-16'>
                        <label className='text-white text-2xl'>1. {topSellCurrencyName[2]}</label>
                        <div>
                            <label className='text-gray-400 text-lg'>Estimate Maximum Profit: </label>
                            <label className='text-green-500 text-lg'>{((topSellPrice[2]-topSellAverageBuyPrice[2])/topSellAverageBuyPrice[2]).toFixed(2)}%</label>
                            <label className='text-gray-400 text-lg'> (to </label>
                            <label className='text-red-500 text-lg'>{topSellDate[2]}</label>
                            <label className='text-gray-400 text-lg'>)</label>
                        </div>
                    </div>
                    <div className='flex justify-between p-5'>
                        <div>
                            <label className='text-gray-400 text-lg'>Today Profit/Loss: </label>
                            <label className='text-green-500 text-lg'>{((topSellCurrentPrice[2]-topSellAverageBuyPrice[2])/topSellAverageBuyPrice[2]).toFixed(2)}%</label>
                        </div>
                        <div>
                            <label className='text-gray-400 text-lg'>Average Buying Price: </label>
                            <label className='text-green-500 text-lg'>{topSellAverageBuyPrice[2]}</label>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <label className='text-white text-lg'>Today and Predicted Next 7 Day Price for {topSellCurrencyName[2]}</label>
                    </div>
                    <div className={`shadow-lg rounded-lg bg-base-200`}>
                        <ApexChart options={options} series={[sellSeries[2]]} type="area" height={200} />
                    </div>
                </div>

                <div className="pt-16">
                <div className='flex justify-between p-5 pb-0'>
                    <div>
                        <label className='text-white text-2xl'>4. </label>
                        <select
                            className='text-white text-2xl bg-base-200 focus:outline-none'
                            onChange={handleSellCurrencyChange}
                            value={selectedSellCurrency || 'Select Currency'}
                        >
                            <option disabled>Select Currency</option>
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                            <option value="TRX">TRX</option>
                            <option value="GALA">GALA</option>
                            <option value="DOGE">DOGE</option>
                        </select>
                    </div>
                </div>

                {selectedSellCurrency && selectedSellSeries && (
                    <>
                        <div>
                        <div className="flex justify-end p-5 pt-0">
                            <label className='text-gray-400 text-lg'>Estimate Maximum Profit: </label>
                            <label className='text-green-500 text-lg'>{((selectedSellPrice-selectedSellAverageBuyPrice)/selectedSellAverageBuyPrice).toFixed(2)}% </label>
                            <label className='text-gray-400 text-lg'> (to </label>
                            <label className='text-red-500 text-lg'> {selectedSellDate}</label>
                            <label className='text-gray-400 text-lg'>)</label>
                        </div>
                    </div>
                    <div className='flex justify-between p-5'>
                        <div>
                            <label className='text-gray-400 text-lg'>Today Profit/Loss: </label>
                            <label className='text-green-500 text-lg'>{((selectedSellCurrentPrice-selectedSellAverageBuyPrice)/selectedSellAverageBuyPrice).toFixed(2)}% </label>
                        </div>
                        <div>
                            <label className='text-gray-400 text-lg'>Average Buying Price: </label>
                            <label className='text-green-500 text-lg'>{selectedSellAverageBuyPrice}</label>
                        </div>
                    </div>
                        <div className='flex justify-center'>
                            <label className='text-white text-lg'>Today and Predicted Next 7 Day Price for {selectedSellCurrencyName}</label>
                        </div>
                        <div className={`shadow-lg rounded-lg bg-base-200`}>
                            <ApexChart options={options} series={selectedSellSeries} type="area" height={200} />
                        </div>
                    </>
                )}
            </div>
            </div>
        </div>
    </div>
  )
}

export default Recomendations