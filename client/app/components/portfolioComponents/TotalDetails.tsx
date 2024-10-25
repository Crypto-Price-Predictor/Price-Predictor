import React from 'react'
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TotalDetailsProp{
    baseCurrency: string,
    totalIncome: number,
    totalExpense: number,
}

const TotalDetails: React.FC<TotalDetailsProp> = ({baseCurrency, totalIncome, totalExpense}) => {
    const totalProfit = (totalIncome / totalExpense) * 100;

    const options = {
        chart: {
            type: 'bar',
            height: 10,
            toolbar: {
                show: false // Disable the download button and entire toolbar
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
                distributed: true,
            }
        },
        colors: ['#FDC204', '#B98D1A'],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            labels:{
                show: false
            },
            categories: ['Income', 'Expenses'],
            axisBorder: {
                show: false // Remove x-axis border line
            },
            axisTicks: {
                show: false // Remove x-axis ticks
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#9CA3AF', // Change y-axis label text color to white (or any color you prefer)
                    fontSize: '14px'
                }
            }
        },
        grid: {
            show: false // Remove chart divide lines (grid)
        },
        legend: {
            show: false
        },
    };

    const series = [{
        data: [totalIncome, totalExpense]
    }];

    return (
        <div>
            <div className='flex flex-col w-full h-56 border-2 bg-base-200 border-white'>
                <div className='flex flex-row text-gray-400 text-lg justify-between p-5 pb-1'>
                    <label className='text-gray-400'>Realized Income</label>
                    <label className='text-white'>{totalIncome.toFixed(2)} {baseCurrency}</label>
                </div>
                <div className='flex flex-row text-gray-400 text-lg justify-between px-5 '>
                    <label className='text-gray-400'>Total Expense</label>
                    <label className='text-white'>{totalExpense.toFixed(2)} {baseCurrency}</label>
                </div>
                <div className='flex flex-row text-gray-400 text-lg justify-between px-5'>
                    <label className='text-gray-400'>Realized Gain/Loss Percentage</label>
                    <label className='text-white'>{totalProfit.toFixed(2)}%</label>
                </div>

                <div className=''>
                    <ApexChart options={options} series={series} type="bar" height={120} />
                </div>

            </div>
        </div>
    );
};

export default TotalDetails;
