// components/TopicGraph.tsx

"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import React from "react";
import { pred } from "../User/Home/page"; // Import the predicted values

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

  const totalPoints = categories.length;
  const defaultRange = totalPoints > 30 ? totalPoints - 30 : 0;

  // Assume predicted values are stored in the "pred" array
  const modifiedSeries = series.map((item, index) => ({
    ...item,
    markers: {
      size: index === 1 ? 0 : 2, // Assuming the predicted series is at index 1
    },
  }));

  // Chart configuration options using ApexOptions type for type safety
  const options: ApexOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: true,
        autoScaleYaxis:true // Enable zooming feature on the chart
      },
      height: 200,
    },
    dataLabels: {
    enabled: false, // Disable data labels
  },
    xaxis: {
      categories: categories,
      range: 30, // Set the default range to display the last 30 points
      min: defaultRange, // Set the categories for the x-axis from props
    },
    stroke: {
      curve: "smooth", // Define the line curve as smooth
      width: [2,2,2,2], // Set the width of the lines on the chart
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ['#90EE90', '#90EE90'], // Light green for shading
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    title: {},
    // markers: {
    //   size: 2, // Set the size of the markers on the chart
    // },
    colors: ["#0000FF", "#90EE90", "#008000","#008000"],
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
