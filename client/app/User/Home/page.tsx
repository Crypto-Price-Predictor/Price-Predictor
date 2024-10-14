"use client";

import React, { useEffect, useState } from "react";
import TopicGraph from "../../components/TopicGraph"; // Updated import
import TimeSelecter from "../../components/TimeSelecter";
import CurrSelecter from "../../components/CurrSelecter";
import AboutPred from "../../components/AboutPred";
import AboutStability from "../../components/AboutStability";
import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import axios, { AxiosResponse } from "axios";

interface homeProps {
  value: boolean;
}

// Define types for the API response
interface PredictionResponse {
  future_predictions: number[][];
  actual: number[][];
  history: number[];
}

const Dashboard: React.FC<homeProps> = ({ value }) => {
  const [curr, setCurr] = useState("BTC");
  const [predictions, setPredictions] = useState<number[]>([]);
  const [history, setHistory] = useState<number[]>([]);
  const [actual, setActual] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //   const [background, setBackground] = useState(value ? "black" : "white");
  const [messageApi, contextHolder] = message.useMessage();

  const success = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true); // Set loading to true at the start
      setError(null);
      setTimeout(async () => {
        try {
          const response: AxiosResponse<PredictionResponse> = await axios.get(
            `http://127.0.0.1:5000/predict?coin=${curr}`
          );
          setPredictions(response.data.future_predictions[0]);
          setActual(response.data.actual[0]);
          setHistory(response.data.history);
          success("success", "Data fetched successfully");
        } catch (err: any) {
          if (err.response) {
            // Server responded with a status code out of 2xx range
            setError(`Error: ${err.response.status} - ${err.response.data}`);
          } else if (err.request) {
            // Request was made but no response received
            setError("Network Error: No response from the server");
          } else {
            // Something else caused the error
            setError(`Error: ${err.message}`);
          }
          success("error", "Error fetching data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }, 1400);
    };

    fetchData();
  }, [curr]);

  const series = [
    {
      name: "Actual", // Name of the series
      data: actual, // Data points for the series
    },
    {
      name: "Predict",
      data: history.concat(predictions),
    },
  ];

  // Categories for the x-axis
  const categories = [
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5",
    "Day 6",
    "Day 7",
    "Day 8",
    "Day 9",
    "Day 10",
    "Day 11",
  ];

  //AboutPred parameters
  const parameters = [
    "Prediction accuracy (MSE)",
    "Prediction Error (Presentage error)",
    "Some other parameters",
  ];
  const values = ["0.2", "2.5%", "xxx"];

  const handleCurrChange = async (curr: string) => {
    setCurr(curr);
  };

  return (
    <div>
      {contextHolder}
      <div className="flex">
        <div className="flex-grow flex-col w-4/5">
          <div
            className={`flex ${
              value ? "bg-gray-700" : "bg-stone-200"
            } p-2 rounded-lg m-4`}
          >
            <CurrSelecter handleChange={handleCurrChange} value={value} />
            <TimeSelecter value={value} />
          </div>
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center h-full p-56">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <p className="flex justify-center items-center text-red-500 p-56">
                {error}
              </p>
            ) : (
              <TopicGraph
                series={series}
                categories={categories}
                value={value}
              />
            )}
          </div>
        </div>

        <div className="flex-col w-1/5 p-4 pl-0 m-2">
          <div className="">
            <AboutPred parameters={parameters} values={values} value={value} />
          </div>
          <div className="">
            <AboutStability value={value} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
