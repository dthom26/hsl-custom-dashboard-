import React from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ title, data, labels }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: "#6EE7B7",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: !!title,
        text: title,
        color: "#cbd5e0",
        font: { size: 20 },
      },
      tooltip: { enabled: true, backgroundColor: "#222", titleColor: "#fff" },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#cbd5e0", font: { size: 14 } },
        border: { color: "#cbd5e0" },
      },
      y: {
        grid: { display: false, color: "#cbd5e0" },
        ticks: { color: "#cbd5e0", font: { size: 14 } },
        border: { color: "#cbd5e0" },
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}

export default BarChart;
