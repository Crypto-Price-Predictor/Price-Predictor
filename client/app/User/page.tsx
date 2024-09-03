"use client";

import React, { useEffect, useState } from "react";
import NavBar from "./../components/NavBar";
import SlideMenu from "../components/SlideMenu";
import TopicGraph from "../components/TopicGraph"; // Updated import
import TimeSelecter from "../components/TimeSelecter";
import CurrSelecter from "../components/CurrSelecter";
import AboutPred from "../components/AboutPred";
import AboutStability from "../components/AboutStability";
import axios from "axios";
import { list } from "postcss";

const Dashboard: React.FC = () => {
  const [curr, setCurr] = useState("BTC");
  const [predictions, setPredictions] = useState<number[]>([]);
  const [actual, setActual] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start
      setError(null);
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/predict?coin=${curr}`
        );
        setPredictions(response.data[0]);
        setActual(response.data[1]);
      } catch (err) {
        setError("Error fetching predictions");
        console.error(err);
      } finally {
        setLoading(false);
      }
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
      data: predictions,
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
      <NavBar />
      <div className="flex">
        <SlideMenu />
        <div className="flex-grow flex-col w-4/5 p-4">
          <div className="flex bg-base-200 p-2 rounded-lg">
            <CurrSelecter handleChange={handleCurrChange} />
            <TimeSelecter />
          </div>
          <div className="flex-grow">
            {loading ? (
              <p>Loading predictions...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <TopicGraph series={series} categories={categories} />
            )}
          </div>
        </div>

        <div className="flex-col w-1/5 p-4 pl-0">
          <div className="">
            <AboutPred parameters={parameters} values={values} />
          </div>
          <div className="">
            <AboutStability />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
