"use Client";

import React from "react";

interface currSelecterProps {
  handleChange: (curr: string) => void;
}

const CurrSelecter: React.FC<currSelecterProps> = ({ handleChange }) => {
  return (
    <div className="w-1/2 justify-center flex">
      <select
        className="h-12 bg-gray-700 hover:bg-gradient-to-r from-pink-600 to-purple-900 w-full max-w-xs rounded-lg"
        onChange={(e) => handleChange(e.target.value)}
      >
        <option className="text-center" value={"BTC"}>
          Bitcoin (BTC)
        </option>
        <option className="text-center" value={"TRX"}>
          TRON (TRX)
        </option>
        {/* <option className="text-center">SOLANA (SOL) CMS</option> */}
        <option className="text-center">Dogecoin (Doge)</option>
        <option className="text-center" value={"SHIB"}>
          Shiba-inu (SHIB)
        </option>
      </select>
    </div>
  );
};

export default CurrSelecter;
