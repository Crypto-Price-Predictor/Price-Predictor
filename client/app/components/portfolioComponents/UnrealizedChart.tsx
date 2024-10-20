import dynamic from "next/dynamic";
import React, { useState } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface UnrealizedChartProp{
  baseCurrency: string,
  unrealized:{
    name: string,
    data:{
      x:string,
      y:number
    }[]
  }[]
}

const UnrealizedChart: React.FC<UnrealizedChartProp> = ({baseCurrency, unrealized}) => {
  const series = unrealized;

  const uniqueDates = series[0].data.map((entry) => entry.x);

  // Calculate the total for each day
  const totalSeries = [
    {
      name: 'Total Value',
      data: uniqueDates.map((date, index) => {
        const total = series.reduce((acc, coinSeries) => {
          return acc + (coinSeries.data[index]?.y || 0); // Handle missing data safely
        }, 0);
        return { x: date, y: total };
      })
    }
  ];
  
  // Options for the ApexChart
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
        text: 'Unrealized Gain/Loss (' + baseCurrency + ')', // Fixed typo in title
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

  const [isDarkMode, setIsDarkMode] = useState(false); // Renamed for clarity

  return (
    <div>
      <div className={`shadow-lg pt-8 rounded-lg bg-base-200`}>
        <ApexChart options={options} series={series} type="area" height={300} />
      </div>
      <div className="flex justify-center pt-10">
      <label className="text-white text-lg">Total Unrealized Gain/Loss</label>
      </div>
      <div className={`shadow-lg rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
        <ApexChart options={options} series={totalSeries} type="area" height={150} />
      </div>
    </div>
  );
};

export default UnrealizedChart;
