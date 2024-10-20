import React from 'react';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Constants for colors
const COLORS = {
  background: '#2E3B4E',
  text: '#FFFFFF',
  border: '#FFFFFF',
  centerLabel: '#FFFFFF', // Color for the center label (example: gold)
};

interface WalletProp{
  currencyName: string[],
  currencyCurrentValues: number[],
}

const Wallet: React.FC<WalletProp> = ({currencyName, currencyCurrentValues}) => {
  const numberOfCurrencies = currencyName.length;
  const series = currencyCurrentValues; // Series array representing values for each currency
  const currencies = currencyName; // Currency labels

  // Chart options
  const options = {
    chart: {
      width: 380,
      type: 'donut', // Chart type is 'donut'
      borderColor: COLORS.border, // Chart border color
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 0,
        top: 0,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: (w) => {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
              style: {
                colors: [COLORS.centerLabel], // Change text color for the total label
                fontSize: '18px', // Optional: Change font size
                fontWeight: 600, // Optional: Change font weight
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(2)}%`, // Show percentage values in data labels
      style: {
        colors: [COLORS.text], // Change text color for the labels
      },
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      show: true,
      formatter: (val, opts) => {
        return `${currencies[opts.seriesIndex]}`; // Show currency and percentage
      },
      labels: {
        colors: Array(numberOfCurrencies).fill(COLORS.text), // Set all legend text colors to white
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className="flex flex-col w-full h-56 border-2 bg-base-200 border-white p-5">
      <div className="flex flex-row justify-between text-xl text-white mb-3">
        <span className="text-center">Wallet</span>
        <span className="text-center text-lg">{numberOfCurrencies} currencies</span>
      </div>
      <div className="flex justify-center">
        <ApexChart options={options} series={series} type="donut" height={150} />
      </div>
    </div>
  );
};

export default Wallet;
