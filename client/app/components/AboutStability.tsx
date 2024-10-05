import React from "react";

interface stabilityProps {
  value: boolean;
}

const AboutStability: React.FC<stabilityProps> = ({ value }) => {
  return (
    <div className={`${value ? "text-white" : "text-black"}`}>
      AboutStability
    </div>
  );
};

export default AboutStability;
