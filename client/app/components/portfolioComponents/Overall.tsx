import React, { useState } from 'react';
import AssestChart from './AssestChart';
import UnrealizedChart from './UnrealizedChart';
import RealizedChart from './RealizedChart';

interface OverallProp{
  baseCurrency: string,
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
}

const Overall: React.FC<OverallProp> = ({baseCurrency, series, realized, unrealized}) => {
  const [selectedOption, setSelectedOption] = useState('Assets'); // Track the selected button

  return (
    <div>
      <div className="flex flex-col w-full border-2 bg-base-200 border-white p-5">
        <div className="">
          <label className="text-white text-xl">Overall Growth</label>

          {/* Button Group: Asset, Unrealized Gain/Loss, Realized Gain/Loss */}
          <div className="join join-vertical lg:join-horizontal gap-2 pl-36">
            <button
              className={`px-2 py-1 ${selectedOption === 'Assets' ? 'bg-gray-700 text-white' : 'text-gray-400'} rounded-lg`}
              onClick={() => setSelectedOption('Assets')}
            >
              Assets
            </button>
            <button
              className={`px-2 py-1 ${selectedOption === 'Unrealized Gain/Loss' ? 'bg-gray-700 text-white' : 'text-gray-400'} rounded-lg`}
              onClick={() => setSelectedOption('Unrealized Gain/Loss')}
            >
              Unrealized Gain/Loss
            </button>
            <button
              className={`px-2 py-1 ${selectedOption === 'Realized Gain/Loss' ? 'bg-gray-700 text-white' : 'text-gray-400'} rounded-lg`}
              onClick={() => setSelectedOption('Realized Gain/Loss')}
            >
              Realized Gain/Loss
            </button>
          </div>

          {/* Button Group: Time Period Options */}
          <div className="join join-vertical lg:join-horizontal gap-2 pl-36">
            <button className="px-2 py-1 focus:bg-gray-700 text-gray-400 focus:text-white rounded-lg">7 day</button>
            <button className="px-2 py-1 focus:bg-gray-700 text-gray-400 focus:text-white rounded-lg">30 day</button>
            <button className="px-2 py-1 focus:bg-gray-700 text-gray-400 focus:text-white rounded-lg">3 month</button>
            <button className="px-2 py-1 focus:bg-gray-700 text-gray-400 focus:text-white rounded-lg">1 year</button>
          </div>

          {/* Conditionally render AssestChart if "Assets" is selected */}
          <div className="">
            {selectedOption === 'Assets' && <AssestChart baseCurrency={baseCurrency} series={series} />}
          </div>
          <div className="">
            {selectedOption === 'Unrealized Gain/Loss' && <UnrealizedChart baseCurrency={baseCurrency} unrealized={unrealized} />}
          </div>
          <div className="">
            {selectedOption === 'Realized Gain/Loss' && <RealizedChart baseCurrency={baseCurrency} realized={realized} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overall;
