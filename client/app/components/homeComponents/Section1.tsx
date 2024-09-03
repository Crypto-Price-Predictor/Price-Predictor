import React from "react";
import Image from "next/image";

interface section1Prps {
  handleClick: () => void;
}

const Section1: React.FC<section1Prps> = ({ handleClick }) => {
  return (
    <div>
      <div className="">
        <div className="px-10">
          <div className="text-6xl">
            <h1
              className="text-center text-gradient"
              style={{ fontFamily: "Montserrat" }}
            >
              Predict the Future of Crypto and Manage Your Portfolio with
              Confidence
            </h1>
          </div>
          <div className="flex flex-row pb-5">
            <div className="text-xl w-3/5 px-16 pt-10">
              <p 
                className="font1 text-justify text-gray-400"
                style={{ fontFamily: "Montserrat" }}
              >
                Leverage our cutting-edge AI tools to gain precise
                cryptocurrency price forecasts and streamline your investment
                management. Our advanced algorithms analyze market data in
                real-time, offering you clear insights and actionable
                predictions. Easily track your investments, manage risk, and
                optimize your strategy with our user-friendly platform, designed
                to help you make informed decisions and stay ahead in the
                fast-paced crypto world.
              </p>
            </div>
            <div className="w-2/5 px-16 pt-10 flex items-center justify-center">
              <button
                className="text-gray-400 bg-gradient-to-r from-pink-600 to-purple-900 w-3/4 h-1/3 text-2xl hover:opacity-50 px-4 py-2 rounded-full"
                onClick={handleClick}
              >
                Get Started
              </button>
            </div>
          </div>
          <hr id="features" className="my-10 border-t border-white" />
        </div>
      </div>
    </div>
  );
};

export default Section1;
