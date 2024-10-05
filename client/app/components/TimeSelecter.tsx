import React from "react";

interface timeSelecterProps {
  value: boolean;
}

const TimeSelecter: React.FC<timeSelecterProps> = ({ value }) => {
  return (
    <div className="w-1/2 justify-center flex ">
      <select
        className={`h-12 ${
          value ? "bg-gray-600 text-white" : "bg-white text-black"
        } hover:bg-gradient-to-r from-pink-600 to-purple-900 w-full max-w-xs rounded-lg`}
      >
        <option className="text-center">Hourly</option>
        <option className="text-center">Daily</option>
        <option className="text-center">Monthly</option>
      </select>
    </div>
  );
};

export default TimeSelecter;
