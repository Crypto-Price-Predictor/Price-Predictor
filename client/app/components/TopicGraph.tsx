// components/TopicGraph.tsx

"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import React from "react";

// Dynamically import ApexCharts with SSR disabled for Next.js compatibility
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define the props interface for type safety and IntelliSense in TypeScript
interface TopicGraphProps {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  value: boolean;
}

// Functional component for the Topic Graph using TypeScript
const TopicGraph: React.FC<TopicGraphProps> = ({
  series,
  categories,
  value,
}) => {
  // Chart configuration options using ApexOptions type for type safety
  const options: ApexOptions = {
    chart: {
      type: "area",
      zoom: {
        enabled: false, // Enable zooming feature on the chart
      },
      height: 200,
    },
    xaxis: {
      categories: categories, // Set the categories for the x-axis from props
    },
    stroke: {
      curve: "smooth", // Define the line curve as smooth
    },
    title: {},
    markers: {
      size: 5, // Set the size of the markers on the chart
    },
    tooltip: {
      enabled: true, // Enable tooltips
      x: {
        format: "dd/MM/yy HH:mm", // Set the format for the tooltip's x-value
      },
    },
    theme: {
      mode: value ? "dark" : "light", // Apply a dark theme to the chart
      palette: "palette1", // Optional: use a specific color palette
      monochrome: {
        enabled: false,
        color: "#FFFFFF", // Set the monochrome color to white
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
  };

  // Render the ApexChart component with the provided options and series
  return (
    <div
      className={`shadow-lg rounded-lg ${value ? "bg-gray-700" : "bg-white"}`}
    >
      <ApexChart options={options} series={series} type="area" height={450} />
    </div>
  );
};

export default TopicGraph;
