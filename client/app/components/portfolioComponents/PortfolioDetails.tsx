import React, { useState } from "react";
import { format } from "date-fns";
import { NoticeType } from "antd/es/message/interface";
import { message } from "antd";

interface PortfolioFetailsProp {
  baseCurrency: String;
  transactions: any[];
  portfolioDetails: any;
  rowkey: String;
  value: boolean;
}

const PortfolioDetails: React.FC<PortfolioFetailsProp> = ({
  baseCurrency,
  transactions,
  portfolioDetails,
  rowkey,
  value,
}) => {
  const portfolioName = portfolioDetails.name; // Default name value

  const [name, setName] = useState(portfolioName); // State for the input value
  const [isDisabled, setIsDisabled] = useState(true); // State to toggle disabled
  const [messageApi, contextHolder] = message.useMessage();

  const success = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const creaedDate = format(
    new Date(portfolioDetails.createdDate),
    "yyyy-MM-dd"
  );
  const lastDate = format(
    new Date(portfolioDetails.modifiedDate),
    "yyyy-MM-dd"
  );
  // const baseCurrency = 'USD'

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled); // Toggle the disabled state
  };

  const handleChange = (e: any) => {
    setName(e.target.value); // Set the input value to state
  };

  const handleClick = async () => {
    try {
      if (name !== portfolioName) {
        const res = await fetch("/api/editPortfolio", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ portfolioID: rowkey, name: name }),
        });
        if (res.ok) {
          success("success", "Portfolio edited successfully");
        }
      } else {
        success("error", "No change detected");
      }
    } catch (err) {
      console.log(err);
    } finally {
      toggleDisabled();
    }
  };

  return (
    <div className={`${value ? "bg-black text-white" : "bg-white text-black"}`}>
      {contextHolder}
      <div
        className={`flex flex-col  w-full ${
          value ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`flex flex-row w-full ${
            value ? "bg-base-200" : "bg-slate-200 text-black"
          } p-1 h-full rounded-full`}
        >
          <input
            type="text"
            className={`w-full rounded-full text-center ${
              value ? "text-slate-400 bg-base-200" : "bg-white text-black"
            } pt-1 text-2xl focus:outline-none`}
            value={name} // Bind the input value to the state `name`
            onChange={handleChange} // Handle change event
            disabled={isDisabled} // Set disabled state
          />

          {/* Button to toggle the disabled state */}
          {isDisabled ? (
            <button
              className="btn bg-gradient-to-r from-pink-600 to-purple-900 rounded-full text-white"
              onClick={toggleDisabled}
            >
              Edit
            </button>
          ) : (
            <button
              className="btn bg-gradient-to-r from-pink-600 to-purple-900 rounded-full"
              onClick={handleClick}
            >
              Change
            </button>
          )}
        </div>

        <label className={`flex ${value ? "text-white" : "text-black"} pt-5`}>
          Created Date: {creaedDate.toString()}
        </label>
        <label className={`flex ${value ? "text-white" : "text-black"} pt-5`}>
          Last Modified Date: {lastDate.toString()}
        </label>
        <label className={`flex ${value ? "text-white" : "text-black"} pt-5`}>
          Base Currency: {baseCurrency.toString()}
        </label>

        <h1
          className={`text-center ${
            value ? "text-white" : "text-black"
          } text-lg pb-1`}
        >
          History
        </h1>

        <div className="h-64 p-4 bg-base-200 text-white rounded-3xl w-full">
          {/* Scrollable container */}
          <div className="overflow-y-auto max-h-56 scrollbar-gray-700">
            {/* Transaction Table */}
            <table className="min-w-full table-auto text-white">
              <tbody>
                {transactions.map((transaction: any, index: any) => (
                  <tr key={index} className="bg-base-200">
                    <td className="border-t border-gray-400 px-4 py-2">
                      {format(new Date(transaction.date), "yyyy-MM-dd")}
                    </td>
                    <td
                      className={`border-t border-gray-400 px-4 py-2 ${
                        transaction.type === "buy"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type.toUpperCase()}
                    </td>
                    <td className="border-t border-gray-400 px-4 py-2">
                      {transaction.coin}
                    </td>
                    <td className="border-t border-gray-400 px-4 py-2">
                      {transaction.initial_amount}
                    </td>
                    <td className="border-t border-gray-400 px-4 py-2">
                      {transaction.boughtPrice}
                    </td>
                    <td className="border-t border-gray-400 px-4 py-2">
                      {(
                        transaction.boughtPrice * transaction.initial_amount
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Custom Scrollbar Styling */}
          <style jsx>{`
            .scrollbar-gray-700::-webkit-scrollbar {
              width: 12px;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;
