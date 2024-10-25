import React, { useEffect, useState } from "react";
import PortfolioDetails from "./PortfolioDetails";
import { NoticeType } from "antd/es/message/interface";
import { Flex, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const getCurrentDate = (): string => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month starts at 0, so add 1
  const day = String(today.getDate()).padStart(2, "0"); // Get the day and pad with leading zero if needed

  return `${year}/${month}/${day}`; // Return in YYYY/MM/DD format
};

interface Transaction {
  type: "buy" | "sell";
  date: string;
  currency: string;
  amount: number;
  price: number;
}

interface byeSellProp {
  baseCurrency: String;
  rowkey: String;
  portfolioDetails: any;
  value: boolean;
}

const ByeSell: React.FC<byeSellProp> = ({
  baseCurrency,
  rowkey,
  portfolioDetails,
  value,
}) => {
  const [activeButton, setActiveButton] = useState("buy");

  const [formValues, setFormValues] = useState({
    price: "",
    amount: "",
    date: getCurrentDate(),
    fee: "0.00",
    coin: "BTC",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [trades, setTrades] = useState<any[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

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
        setTrades(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(portfolioDetails);
    fetchtransaction();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    // Hide the alert after 3 seconds
    setTimeout(async () => {
      try {
        if (formValues.amount && formValues.price) {
          const res = await fetch("/api/addTransaction", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: activeButton,
              Portfolio: rowkey,
              amount: formValues.amount,
              price: formValues.price,
              date: new Date(),
              profit: 0,
              coin: formValues.coin,
            }),
          });
          console.log(res);

          if (res.ok) {
            const data = await res.json();
            // console.log("User created:", data);
            success("success", "Transaction added successfully");
            setFormValues({
              price: "",
              amount: "",
              date: getCurrentDate(),
              fee: "0.00",
              coin: "BTC",
            });
            fetchtransaction();
          } else {
            console.error("Error adding transaction");
            success("error", "Error adding transaction");
            setIsLoading(false);
          }
        } else {
          console.error("Error adding transaction");
          success("error", "Error adding transaction");
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <div>
      {contextHolder}
      <div className="flex w-full flex-col lg:flex-row">
        <div
          className={`card ${
            value ? "bg-black text-white" : "bg-white text-black"
          } rounded-box grid h-full flex-grow place-items-center w-1/2`}
        >
          <div className="text-white w-full mr-10 gap-5">
            <div className="join grid grid-cols-2 mb-4">
              <button
                className={`join-item btn btn-outline hover:bg-blue-500 hover:text-white ${
                  activeButton === "buy" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setActiveButton("buy")}
              >
                Buy
              </button>

              <button
                className={`join-item btn btn-outline hover:bg-red-500 hover:text-white ${
                  activeButton === "sell" ? "bg-red-500 text-white" : ""
                }`}
                onClick={() => setActiveButton("sell")}
              >
                Sell
              </button>
            </div>

            <select
              className={`${
                value ? "bg-black text-white" : "bg-white text-black"
              } focus:outline-none mb-4`}
              name="coin"
              onChange={handleInputChange}
            >
              <option value={"BTC"}>BTC/USDT</option>
              <option value={"TRX"}>TRX/USDT</option>
              <option value={"DOGE"}>DOGE/USDT</option>
              <option value={"ETH"}>ETH/USDT</option>
              <option value={"GALA"}>GALA/USDT</option>
            </select>

            <div
              className={`${
                value ? "bg-base-200" : "bg-slate-200 text-black"
              } p-1 mb-4 rounded-xl w-full`}
            >
              <h1
                className={`text-center ${
                  value ? "text-slate-400" : "text-black"
                }`}
              >
                Price (USDT)
              </h1>
              <input
                className={`w-full ${
                  value ? "bg-base-200" : "bg-white text-black"
                } text-center pt-1 text-xl focus:outline-none rounded-xl`}
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
              />
            </div>

            <div
              className={`${
                value ? "bg-base-200" : "bg-slate-200 text-black"
              } p-1 mb-4 rounded-xl w-full`}
            >
              <h1
                className={`text-center ${
                  value ? "text-slate-400" : "text-black"
                }`}
              >
                Amount
              </h1>
              <input
                className={`w-full ${
                  value ? "bg-base-200" : "bg-white text-black"
                } text-center pt-1 text-xl focus:outline-none rounded-xl`}
                name="amount"
                value={formValues.amount}
                onChange={handleInputChange}
              />
            </div>

            <div
              className={`${
                value ? "bg-base-200" : "bg-slate-200 text-black"
              } p-1 mb-4 rounded-xl w-full`}
            >
              <h1
                className={`text-center ${
                  value ? "text-slate-400" : "text-black"
                }`}
              >
                Date
              </h1>
              <input
                className={`w-full ${
                  value ? "bg-base-200" : "bg-white text-black"
                } text-center pt-1 text-xl focus:outline-none rounded-xl`}
                placeholder="YYYY/MM/DD"
                name="date"
                value={formValues.date}
                onChange={handleInputChange}
              />
            </div>

            <div
              className={`${
                value ? "bg-base-200" : "bg-slate-200 text-black"
              } p-1 mb-4 rounded-xl w-full`}
            >
              <h1
                className={`text-center ${
                  value ? "text-slate-400" : "text-black"
                }`}
              >
                Est. Fee
              </h1>
              <input
                className={`w-full ${
                  value ? "bg-base-200" : "bg-white text-black"
                } text-center pt-1 text-xl focus:outline-none rounded-xl`}
                name="fee"
                value={formValues.fee}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                className="btn w-1/2 bg-gradient-to-r from-pink-600 to-purple-900 text-white"
                onClick={handleSubmit}
                aria-disabled={isLoading}
              >
                {isLoading ? (
                  <Flex align="center" gap="middle">
                    <Spin
                      indicator={<LoadingOutlined spin role="status" />}
                      className="text-white"
                    />
                  </Flex>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div
          className={`card ${
            value ? "bg-black" : "bg-white"
          } rounded-box grid h-full flex-grow place-items-center w-1/2`}
        >
          <PortfolioDetails
            baseCurrency={baseCurrency}
            transactions={trades}
            portfolioDetails={portfolioDetails}
            rowkey={rowkey}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};

export default ByeSell;
