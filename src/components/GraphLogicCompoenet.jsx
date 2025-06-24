import React from "react";
import BarChart from "./BarChart";
import { useState } from "react";

function GraphLogicCompoenet({ title, calfunction, csvData }) {
  const [selectedYear, setSelectedYear] = useState("2024"); // state for selected year
  // You can add more state variables for month or other selectors if needed.

  // hanlder functions will be found below
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Call the calculation function with the CSV data and selected year
  // The calfunction is expected to return an array of objects with 'month' and 'avg' properties.
  const resultArr = calfunction(csvData, selectedYear);
  const labels = resultArr.map((item) => (item.month ? item.month : item.day));
  const data = resultArr.map((item) => item.avg);
  return (
    <div className="graph-ui-component">
      <BarChart title={title} labels={labels} data={data} />
      <select
        onChange={handleYearChange}
        name="year"
        id="year"
        defaultValue={"2024"}
      >
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
      </select>
    </div>
  );
}

export default GraphLogicCompoenet;
