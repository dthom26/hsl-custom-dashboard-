import React from "react";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ title, data, labels }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: [
          "#6366f1", // Indigo
          "#EC4899", // Pink
          "#10B981", // Emerald
          "#F59E0B", // Amber
        ],
        hoverOffSet: 4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#f7fafc",
          font: { size: 14 },
          padding: 16,
          boxWidth: 18,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  return <Pie options={options} data={chartData} />;
}

export default PieChart;
